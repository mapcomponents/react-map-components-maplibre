import { FC, RefObject, useContext, useEffect, useRef } from 'react';

import MapContext, { MapContextType } from '../../contexts/MapContext';
import MapLibreGlWrapper from './lib/MapLibreGlWrapper';
import { updateStyle } from '../../stores/map.store';

import { Map, MapOptions as MapOptionsType, StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export type MapLibreMapProps = {
	/**
	 * Id of the MapLibreGl(Wrapper) instance in mapContext
	 */
	mapId?: string;
	/**
	 * Config object that is passed to the MapLibreGl constructor as first parameter.
	 * See https://maplibre.org/maplibre-gl-js-docs/api/map/ for a formal documentation of al
	 * available properties.
	 */
	options?: Partial<MapOptionsType>;
	/**
	 * css style definition passed to the map container DOM element
	 */
	style?: object;
	/**
	 * When set, the component will initialise the MapLibre instance with a blank
	 * background and feed the resolved style through `updateStyle` on the Zustand
	 * store so that layers appear in the LayerTree. Pass the same key you use on
	 * `<LayerTree mapConfigKey="…" />`.
	 */
	mapConfigKey?: string;
};

const defaultProps: MapLibreMapProps = {
	mapId: undefined,
	options: {
		center: { lng: 8.607, lat: 53.1409349 },
		zoom: 11,
		container: '',
		style: {
			version: 8,
			name: 'blank',
			center: [0, 0],
			zoom: 0,
			sources: {},
			sprite: 'https://wms.wheregroup.com/tileserver/sprites/osm-bright',
			glyphs: 'https://wms.wheregroup.com/tileserver/fonts/{fontstack}/{range}.pbf',
			layers: [
				{
					id: '_background',
					type: 'background',
					paint: {
						'background-color': 'rgba(0,0,0,0)',
					},
				},
			],
		},
	},
};

type MapLibreMapComponent = FC<MapLibreMapProps> & { defaultProps: MapLibreMapProps };

/**
 * Creates a MapLibreGlWrapper instance and registers it in MapContext
 * after the MapLibre-gl load event has fired.
 *
 * MapLibreMap returns the html node that will be used by MapLibre-gl to render the map.
 * This Component must be kept unaware of any related components that interact with the MapLibre-gl
 * instance.
 *
 * @category Map components
 */
const MapLibreMap: MapLibreMapComponent = (props: MapLibreMapProps) => {
	const mapRef = useRef<MapLibreGlWrapper | null>(null);
	const mapContainer = useRef<HTMLDivElement | null>(null);

	const mapContext = useContext<MapContextType>(MapContext);

	const mapIdRef = useRef(props.mapId);
	const initializedRef = useRef(false);
	const currentStyle = useRef(props.options?.style);

	// When mapConfigKey is set we route the style through the Zustand store
	// instead of handing it to MapLibre directly.
	const manageStyleViaStore = !!props.mapConfigKey && !!props.options?.style;

	/**
	 * Resolve a style value (URL string or inline object) to a
	 * StyleSpecification and push it into the store via `updateStyle`.
	 */
	const applyStyleToStore = async (
		style: string | StyleSpecification | object,
		mapConfigKey: string
	) => {
		let resolved: StyleSpecification;
		if (typeof style === 'string') {
			const res = await fetch(style);
			resolved = (await res.json()) as StyleSpecification;
		} else {
			resolved = style as StyleSpecification;
		}
		updateStyle(mapConfigKey, resolved);
	};

	useEffect(() => {
		const mapId = mapIdRef.current;

		return () => {
			initializedRef.current = false;
			mapContext.removeMap(mapId);
			if (mapRef.current) {
				mapRef.current.map?.remove?.();
				mapRef.current.cancelled = true;
				mapRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (initializedRef.current) return;

		if (mapContainer.current) {
			initializedRef.current = true;
			if (props?.options?.style) {
				currentStyle.current = JSON.stringify(props.options.style);
			}

			// When managing the style via the store, always start with the
			// blank default background so the store owns the layer list.
			const effectiveStyle = manageStyleViaStore
				? defaultProps?.options?.style
				: props?.options?.style || defaultProps?.options?.style;

			mapRef.current = new MapLibreGlWrapper({
				mapOptions: {
					style: '',
					...props.options,
					style: effectiveStyle,
					container: mapContainer.current,
				} as MapOptionsType,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				onReady: (map: Map, wrapper: MapLibreGlWrapper) => {
					map.once('load', () => {
						if (!wrapper?.cancelled) {
							// add maplibre instance to window for debugging purposes
							(window as { [key: string]: any })['_map'] = map;
							if (props.mapId) {
								mapContext.registerMap(props.mapId, wrapper);
							} else {
								mapContext.setMap(wrapper);
							}

							// Feed the original style into the store after map is ready
							if (manageStyleViaStore && props.options?.style) {
								applyStyleToStore(props.options.style, props.mapConfigKey!);
							}
						} else {
							map.remove();
						}
					});
				},
			});
		}
	}, [props.options, props.mapId, props.mapConfigKey]);

	useEffect(() => {
		if (!mapRef.current?.map || !props?.options?.style) return;
		const newStyleString = JSON.stringify(props.options.style);
		if (currentStyle.current !== newStyleString) {
			currentStyle.current = newStyleString;
			if (manageStyleViaStore) {
				// Route style changes through the store — the MapLayerRenderer
				// will apply them to the map instance.
				applyStyleToStore(props.options.style, props.mapConfigKey!);
			} else {
				mapRef.current.map.setStyle(props.options.style);
			}
		}
	}, [props?.options?.style, manageStyleViaStore, props.mapConfigKey]);

	return (
		<div
			ref={mapContainer as RefObject<HTMLDivElement>}
			className="mapContainer"
			style={props.style}
		/>
	);
};

MapLibreMap.defaultProps = defaultProps;

export default MapLibreMap;
