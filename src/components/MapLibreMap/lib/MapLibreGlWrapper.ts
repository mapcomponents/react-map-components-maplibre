/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
	Map,
	IControl,
	MapOptions as MapOptionsType,
	MapEventType,
	MapLayerEventType,
	StyleImageInterface,
	LayerSpecification,
	CustomLayerInterface,
	SourceSpecification,
	ControlPosition,
	StyleImageMetadata,
} from 'maplibre-gl';
import { Map as MapType, Style } from 'maplibre-gl';

type WrapperEventArgArray = [MapLibreGlWrapperEventName, MapLibreGlWrapperEventHandlerType];
type EventArgArray = [
	keyof MapLayerEventType | keyof MapEventType,
	string | ((arg0: unknown) => void),
	((arg0: unknown) => void)?,
];
type LayerState = {
	id: string;
	type: string;
	visible: boolean;
	baseLayer: boolean;
};
type ViewportState = {
	center: { lng: number; lat: number };
	zoom: number;
	bearing: number;
	pitch: number;
};

/**
 * Creates a MapLibre-gl-js instance and offers all of the native MapLibre functions and properties as well as additional functionality such as element registration & cleanup and more events.
 *
 * @param {object} props
 *
 * @class
 */

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface MapLibreGlWrapper extends MapType {
	addImage: (
		id: string,
		image:
			| HTMLImageElement
			| ImageBitmap
			| ImageData
			| {
					width: number;
					height: number;
					data: Uint8Array | Uint8ClampedArray;
			  }
			| StyleImageInterface,
		key?: Partial<StyleImageMetadata> | string | undefined,
		componentId?: string | undefined
	) => this;
	addLayer: (
		layer:
			| (LayerSpecification & {
					source?: string | SourceSpecification | undefined;
			  })
			| (CustomLayerInterface & {
					source?: string | SourceSpecification | undefined;
			  }),
		beforeId?: string | undefined,
		componentId?: string | undefined
	) => this;
	cancelled: boolean;
}

interface MapLibreGlWrapperEventHandlers {
	layerchange: {
		handler: (ev: unknown) => void;
		options?: object | string;
	}[];
	viewportchange: {
		handler: (ev: unknown) => void;
		options?: object | string;
	}[];
	addsource: {
		handler: (
			ev: unknown,
			wrapper?: MapLibreGlWrapper,
			data?: { [source_id: string]: string }
		) => void;
	}[];
	addlayer: {
		handler: (ev: unknown) => void;
		options?: object | string;
	}[];
}

export type MapLibreGlWrapperEventHandlerType =
	| MapLibreGlWrapperEventHandlers['layerchange'][number]['handler']
	| MapLibreGlWrapperEventHandlers['viewportchange'][number]['handler']
	| MapLibreGlWrapperEventHandlers['addsource'][number]['handler']
	| MapLibreGlWrapperEventHandlers['addlayer'][number]['handler'];

export type MapLibreGlEventName = keyof MapLayerEventType | keyof MapEventType | string;

export type MapLibreGlWrapperEventName = keyof MapLibreGlWrapperEventHandlers;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class MapLibreGlWrapper {
	[key: string]: any;
	registeredElements: {
		[key: string]: {
			layers: [string?];
			sources: [string?];
			images: [string?];
			controls: [(IControl | unknown)?];
			events: [EventArgArray?];
			wrapperEvents: [WrapperEventArgArray?];
		};
	};
	baseLayers: [string?];
	firstSymbolLayer: string | undefined;
	eventHandlers: MapLibreGlWrapperEventHandlers;
	wrapper: {
		on: (
			eventName: MapLibreGlWrapperEventName,
			handler: MapLibreGlWrapperEventHandlerType,
			options?: object | string,
			componentId?: string
		) => void;
		off: (type: string, handler: MapLibreGlWrapperEventHandlerType) => void;
		fire: (eventName: string, context?: unknown) => void;
		layerState: LayerState[];
		layerStateString: string;
		oldLayerStateStrings: object;
		buildLayerObject: (layer: ReturnType<Style['getLayer']>) => LayerState | undefined;
		buildLayerObjects: () => LayerState[];
		refreshLayerState: () => void;
		viewportState: ViewportState;
		viewportStateString: string;
		oldViewportStateString: string;
		getViewport: () => {
			center: { lng: number; lat: number };
			zoom: number;
			bearing: number;
			pitch: number;
		};
		refreshViewport: () => void;
	};
	initRegisteredElements: (componentId: string, force?: boolean | undefined) => void;
	addNativeMaplibreFunctionsAndProps: () => void;
	map: MapType;
	style: Style;

	styleJson: object;
	addSource: (id: string, source: SourceSpecification, componentId?: string | undefined) => this;
	addControl: (
		control: IControl | unknown,
		position?: ControlPosition | undefined,
		componentId?: string | undefined
	) => this;
	on: (
		type: MapLibreGlEventName,
		layerId: string | ((ev: unknown) => void),
		handler?: ((ev: MapEventType & unknown) => Map | void) | string,
		componentId?: string | undefined
	) => this;
	cleanup: (componentId: string) => void;

	constructor(props: {
		mapOptions: MapOptionsType;
		onReady: (map: MapType, context: unknown) => void;
	}) {
		// closure variable to safely point to the object context of the current MapLibreGlWrapper instance
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;

		// element registration and cleanup on a component level is experimental
		this.registeredElements = {};

		// array of base layer ids, all layers that have been added by the style passed to the MapLibreGl coonstructor
		this.baseLayers = [];

		// layer id of the first symbol layer
		this.firstSymbolLayer = undefined;

		// event handlers registered in MapLibreGlWrapper
		this.eventHandlers = {
			layerchange: [],
			viewportchange: [],
			addsource: [],
			addlayer: [],
		};

		// functions and properties provided by the wrapper
		// Add new functions and properties introduced by the wrapper to this object to prevent collisions due to future MapLibre API changes
		this.wrapper = {
			/**
			 * Subscribe the given event handler to an event
			 *
			 * @param {string} eventName
			 * @param {function} handler
			 * @param {object} options
			 * @param {string} componentId
			 * @returns {undefined}
			 */
			on: (
				eventName: MapLibreGlWrapperEventName,
				handler: MapLibreGlWrapperEventHandlerType,
				options?: object | string,
				componentId?: string
			) => {
				if (!self.eventHandlers[eventName]) return;

				if (typeof options === 'string') {
					componentId = options;
					options = {};
				}

				self.eventHandlers[eventName].push({ handler, options });

				const _arguments: WrapperEventArgArray = [eventName, handler];
				if (componentId && typeof componentId === 'string') {
					self.initRegisteredElements(componentId);
					self.registeredElements[componentId].wrapperEvents.push(_arguments);
				}
			},
			/**
			 * Unsubscribes the given event handler from an event
			 *
			 * @param {string} eventName
			 * @param {function} handler
			 * @returns {undefined}
			 */
			off: (eventName: MapLibreGlWrapperEventName, handler: MapLibreGlWrapperEventHandlerType) => {
				if (!self.eventHandlers[eventName]) return;

				self.eventHandlers[eventName] = self.eventHandlers[eventName].filter((item) => {
					if (!Object.is(item.handler, handler)) {
						return item;
					}
					return false;
				});
			},
			/**
			 * Calls all event handlers that have been subscribed to the given eventName
			 *
			 * @param {string} eventName
			 * @param {object} context
			 * @returns {undefined}
			 */
			fire: (eventName: MapLibreGlWrapperEventName, context: any) => {
				if (!self.eventHandlers[eventName]) return;

				const scope = context || window;
				const event = new Event(eventName);

				self.eventHandlers[eventName].forEach(function (
					item:
						| MapLibreGlWrapper['eventHandlers']['layerchange'][0]
						| MapLibreGlWrapper['eventHandlers']['viewportchange'][0]
						| MapLibreGlWrapper['eventHandlers']['addsource'][0]
						| MapLibreGlWrapper['eventHandlers']['addlayer'][0]
				) {
					item.handler.call(scope, event, self, context);
				});
			},
			/**
			 * Array containing an object for each layer in the MapLibre instance providing information on visibility, loading state, order, paint & layout properties
			 */
			layerState: [],
			/**
			 * Maps layerIds to layerState in JSON string form for quick deep comparisons
			 */
			layerStateString: '',
			/**
			 * Previous Version of layerStateString
			 */
			oldLayerStateStrings: {},
			/**
			 * Builds the layer info object for a given layer id
			 *
			 * @param {string} layer
			 * @returns object
			 */
			buildLayerObject: (layer: ReturnType<Style['getLayer']>) => {
				//if (self.baseLayers.indexOf(layer.id) === -1) {
				//let paint = {};
				//let values = layer.paint?._values;
				//Object.keys(values || {}).map((propName) => {
				//	paint[propName] =
				//		typeof values[propName].value !== "undefined"
				//			? values[propName].value.value
				//			: values[propName];
				//});
				//let layout = {};
				//values = layer.layout?._values;
				//Object.keys(values || {}).map((propName) => {
				//	layout[propName] =
				//		typeof values[propName].value !== "undefined"
				//			? values[propName].value.value
				//			: values[propName];
				//});
				if (!layer) return;
				return {
					id: layer.id,
					type: layer.type,
					visible: layer.visibility === 'none' ? false : true,
					baseLayer: self.baseLayers.indexOf(layer.id) !== -1,
					//paint,
					//layout,
					//filter: layers[layerId].filter,
					//layout: layers[layerId].layout,
					//maxzoom: layers[layerId].maxzoom,
					//metadata: layers[layerId].metadata,
					//minzoom: layers[layerId].minzoom,
					//paint: layers[layerId].paint.get(),
					//source: layers[layerId].source,
					//sourceLayer: layers[layerId].sourceLayer,
				};
				//}
			},
			/**
			 * Returns an array of layer state info objects for all layers in the MapLibre instance
			 *
			 * @returns array
			 */
			buildLayerObjects: () => {
				return self.map.style._order
					.map((layerId: string) => {
						return self.wrapper.buildLayerObject(self.map.style._layers[layerId]);
					})
					.filter((n) => typeof n !== 'undefined') as LayerState[];
			},
			/**
			 * Updates layer state info objects
			 */
			refreshLayerState: () => {
				self.wrapper.layerState = self.wrapper.buildLayerObjects();
				if (JSON.stringify(self.wrapper.layerState) !== self.wrapper.layerStateString) {
					self.wrapper.fire('layerchange');
					self.wrapper.layerStateString = JSON.stringify(self.wrapper.layerState);
				}
			},
			/**
			 * Object containing information on the current viewport state
			 */
			viewportState: {
				center: { lng: 0, lat: 0 },
				zoom: 0,
				bearing: 0,
				pitch: 0,
			},
			/**
			 * The same data as viewportState in JSON string form for quick deep comparisons
			 */
			viewportStateString: '{}',
			/**
			 * Previous version of viewportStateString
			 */
			oldViewportStateString: '{}',
			getViewport: () =>
				typeof self.map.getCenter === 'function'
					? {
							center: (({ lng, lat }) => ({ lng, lat }))(self.map.getCenter()),
							zoom: self.map.getZoom(),
							bearing: self.map.getBearing(),
							pitch: self.map.getPitch(),
						}
					: {
							center: { lng: 0, lat: 0 },
							zoom: 0,
							bearing: 0,
							pitch: 0,
						},
			refreshViewport: () => {
				self.wrapper.viewportState = self.wrapper.getViewport();
			},
		};

		this.cancelled = false;

		/**
		 * Initializes an empty registered elements object for the given componentId
		 *
		 * @param {string} componentId
		 * @param {boolean} force
		 */
		this.initRegisteredElements = (componentId: string, force?: boolean | undefined) => {
			if (
				typeof self.registeredElements[componentId] === 'undefined' ||
				(typeof force !== 'undefined' && force)
			) {
				self.registeredElements[componentId] = {
					layers: [],
					sources: [],
					images: [],
					events: [],
					controls: [],
					wrapperEvents: [],
				};
			}
		};

		/**
		 * Overrides MapLibre-gl-js addLayer function providing an additional componentId parameter for the wrapper element registration.
		 *
		 * @param {object} layer
		 * @param {string} beforeId
		 * @param {string} componentId
		 */
		this.addLayer = (layer, beforeId, componentId) => {
			if (!self.map.style) {
				return this;
			}
			if (componentId && typeof componentId === 'string' && typeof layer.id !== 'undefined') {
				self.initRegisteredElements(componentId);
				self.registeredElements[componentId].layers.push(layer.id);

				if (layer?.source && typeof layer?.source !== 'string') {
					self.registeredElements[componentId].sources.push(layer.id);
				}
			}

			self.map.addLayer(layer, beforeId);
			self.wrapper.fire('addlayer', { layer_id: layer.id });
			return this;
		};

		/**
		 * Overrides MapLibre-gl-js addSource function providing an additional componentId parameter for the wrapper element registration.
		 *
		 * @param {string} sourceId
		 * @param {object} source
		 * @param {object} options
		 * @param {string} componentId
		 * @returns {undefined}
		 */
		this.addSource = (sourceId, source, componentId) => {
			if (!self.map.style) {
				return this;
			}
			if (componentId && typeof componentId === 'string' && typeof sourceId !== 'undefined') {
				self.initRegisteredElements(componentId);
				self.registeredElements[componentId].sources.push(sourceId);
			}

			self.map.addSource(sourceId, source);
			self.wrapper.fire('addsource', { source_id: sourceId });
			return this;
		};

		/**
		 * Overrides MapLibre-gl-js addImage function providing an additional componentId parameter for the wrapper element registration.
		 *
		 * @param {string} id
		 * @param {*} image
		 * @param {*} ref
		 * @param {string} componentId
		 */
		this.addImage = (id, image, meta, componentId) => {
			if (!self.map.style) {
				return this;
			}
			if (typeof meta === 'string' && typeof componentId === 'undefined') {
				return self.addImage(id, image, undefined, meta);
			}
			if (componentId && typeof componentId === 'string' && typeof id !== 'undefined') {
				self.initRegisteredElements(componentId);
				self.registeredElements[componentId].images.push(id);
			}

			self.map.addImage(id, image, meta as Partial<StyleImageMetadata> | undefined);
			return this;
		};

		/**
		 * Overrides MapLibre-gl-js on function providing an additional componentId parameter for the wrapper element registration.
		 *
		 * @param {string} type
		 * @param {string} layerId
		 * @param {function} handler
		 * @param {string} componentId
		 */
		this.on = (
			type: MapLibreGlEventName,
			layerId: string | ((ev: unknown) => void),
			handler: (ev: unknown) => void,
			componentId?: string
		) => {
			if (typeof handler === 'string' && typeof layerId === 'function') {
				return self.on.call(self, type, undefined, layerId, handler);
			}

			let _arguments: EventArgArray = [type as EventArgArray[0], layerId, handler];
			if (!layerId) {
				_arguments = [type, handler] as EventArgArray;
			}

			if (componentId && typeof componentId === 'string') {
				self.initRegisteredElements(componentId);
				self.registeredElements[componentId].events.push(_arguments);
			}

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			self.map.on(..._arguments);
			return this;
		};

		/**
		 * Overrides MapLibre-gl-js addControl function providing an additional componentId parameter for the wrapper element registration.
		 *
		 * @param {object} control
		 * @param {string} position
		 * @param {string} componentId
		 */
		this.addControl = (control, position, componentId) => {
			if (componentId && typeof componentId === 'string') {
				self.initRegisteredElements(componentId);
				self.registeredElements[componentId].controls.push(control);
			}

			self.map.addControl(control as IControl, position);
			return this;
		};

		/**
		 * Removes anything that has been added to the maplibre instance referenced with componentId
		 *
		 * @param {string} componentId
		 */
		this.cleanup = (componentId: string) => {
			if (self.map.style && typeof self.registeredElements[componentId] !== 'undefined') {
				// cleanup layers
				self.registeredElements[componentId].layers.forEach((item: string) => {
					if (self.map.style.getLayer(item)) {
						self.map.style.removeLayer(item);
					}
				});

				// cleanup sources
				self.registeredElements[componentId].sources.forEach((item: string) => {
					if (self.map.style.getSource(item)) {
						self.map.style.removeSource(item);
					}
				});

				// cleanup images
				self.registeredElements[componentId].images.forEach((item: string) => {
					if (self.map.hasImage(item)) {
						self.map.style.removeImage(item);
					}
				});

				// cleanup events
				self.registeredElements[componentId].events.forEach((item: EventArgArray) => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					self.map.off(...item);
				});

				// cleanup controls
				self.registeredElements[componentId].controls.forEach((item: IControl | unknown) => {
					self.map.removeControl(item as IControl);
				});

				// cleanup wrapper events
				self.registeredElements[componentId].wrapperEvents.forEach((item: WrapperEventArgArray) => {
					self.wrapper.off(...item);
				});

				self.initRegisteredElements(componentId, true);
			}
		};

		// add style prop functions that require map._update to be called afterwards
		const updatingStyleFunctions = [
			'moveLayer',
			'removeLayer',
			'removeSource',
			'setPaintProperty',
			'setLayoutProperty',
		];
		updatingStyleFunctions.forEach((item) => {
			this[item] = (...props: any[]) => {
				//@ts-ignore
				if (self.map && self.map.style && typeof self.map.style[item] === 'function') {
					//@ts-ignore
					self.map.style[item](...props);
				}
				return self.map._update ? self.map._update(true) : undefined;
			};
		});

		// add style prop functions
		const styleFunctions = [
			'getLayer',
			'getSource',
			'listImages',
			'getPaintProperty',
			'getLayoutProperty',
			'removeImage',
		];
		styleFunctions.forEach((item) => {
			this[item] = (...props: any[]) => {
				if (self.map && self.map.style) {
					//@ts-ignore
					return self.map.style[item](...props);
				}
				return false;
			};
		});

		this.addNativeMaplibreFunctionsAndProps = () => {
			//	add MapLibre-gl functions
			Object.getOwnPropertyNames(Object.getPrototypeOf(this.map)).forEach((item) => {
				if (typeof this[item] === 'undefined') {
					//@ts-ignore
					this[item] = (...props: any[]) => self.map[item](...props);
				}
			});

			//	add MapLibre-gl properties
			Object.keys(this.map).forEach((item) => {
				if (typeof this[item] === 'undefined') {
					//@ts-ignore
					this[item] = self.map[item];
				}
			});
		};

		// add functions that are missing on the MapLibre instances prototype
		const missingFunctions = [
			'getZoom',
			'setZoom',
			'getCenter',
			'setCenter',
			'getBearing',
			'setBearing',
			'getPitch',
			'setPitch',
			'jumpTo',
			'flyTo',
			'panTo',
			'panBy',
			'panBy',
			'zoomTo',
			'zoomIn',
			'zoomOut',
			'getPadding',
			'setPadding',
			'rotateTo',
			'resetNorth',
			'resetNorthPitch',
			'snapToNorth',
			'cameraForBounds',
			'fitBounds',
			'fitScreenCoordinates',
			'getFreeCameraOptions',
			'setFreeCameraOptions',
			'easeTo',
			'stop',
		];
		missingFunctions.forEach((item) => {
			this[item] = (...props: any[]) => {
				//@ts-ignore
				if (typeof self.map[item] === 'function') {
					//@ts-ignore
					return self.map[item].call(self.map, ...props);
				}
				return undefined;
			};
		});

		// initialize the MapLibre-gl instance
		const initializeMapLibre = async () => {
			// if mapOptions style URL is given and if it is not a mapbox URL fetch the json and initialize the mapbox object
			if (
				typeof props.mapOptions.style === 'string' &&
				props.mapOptions.style.indexOf('mapbox://') === -1
			) {
				await fetch(props.mapOptions.style)
					.then((response) => {
						if (response.ok) {
							return response.json();
						} else {
							throw new Error('error loading map style.json');
						}
					})
					.then((styleJson) => {
						styleJson.layers.forEach((item: any) => {
							self.baseLayers.push(item.id);
							if (!self.firstSymbolLayer && item.type === 'symbol') {
								self.firstSymbolLayer = item.id;
							}
						});
						self.styleJson = styleJson;
						props.mapOptions.style = styleJson;
					})
					.catch((error) => {
						console.log(error);
					});
			}

			self.map = new Map(props.mapOptions) as MapType;

			self.addNativeMaplibreFunctionsAndProps();
			self.wrapper.refreshViewport();
			self.wrapper.fire('viewportchange');

			self.map.on('load', () => {
				self.addNativeMaplibreFunctionsAndProps();
			});

			self.map.on('move', () => {
				self.wrapper.viewportState = self.wrapper.getViewport();
				self.wrapper.fire('viewportchange');
			});
			self.map.on('idle', () => {
				self.wrapper.refreshLayerState();
			});
			self.map.on('data', () => {
				self.wrapper.refreshLayerState();
			});
			if (typeof props.onReady === 'function') {
				props.onReady(self.map, self);
			}
		};
		initializeMapLibre();
	}
}
export default MapLibreGlWrapper;

export type { LayerState, ViewportState };
