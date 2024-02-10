import React, { useRef, useEffect, useContext, FC, RefObject } from 'react';

import MapContext, { MapContextType } from '../../contexts/MapContext';
import MapLibreGlWrapper from './lib/MapLibreGlWrapper';

import { MapOptions as MapOptionsType, Map } from 'maplibre-gl';
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
const MapLibreMap: FC<MapLibreMapProps> = (props: MapLibreMapProps) => {
	const mapRef = useRef<MapLibreGlWrapper>();
	const mapContainer = useRef<HTMLDivElement>();

	const mapContext = useContext<MapContextType>(MapContext);

	const mapIdRef = useRef(props.mapId);
	const initializedRef = useRef(false);
	const currentStyle = useRef(props.options?.style);

	useEffect(() => {
		const mapId = mapIdRef.current;

		return () => {
			initializedRef.current = false;
			mapContext.removeMap(mapId);
			if (mapRef.current) {
				mapRef.current.map?.remove?.();
				mapRef.current.cancelled = true;
				mapRef.current = undefined;
			}
		};
	}, []);

	useEffect(() => {
		if (initializedRef.current) return;

		if (mapContainer.current) {
			initializedRef.current = true;
			mapRef.current = new MapLibreGlWrapper({
				mapOptions: {
					style: '',
					...props.options,
					...(props?.options?.style ? {} : { style: defaultProps?.options?.style }),
					container: mapContainer.current,
				},
				onReady: (map: Map, wrapper: MapLibreGlWrapper) => {
					map.once('load', () => {
						if (!wrapper?.cancelled) {
							// add maplibre instance to window for debugging purposes
							window['_map'] = map;
							if (props.mapId) {
								mapContext.registerMap(props.mapId, wrapper);
							} else {
								mapContext.setMap(wrapper);
							}
						} else {
							map.remove();
						}
					});
				},
			});
		}
	}, [props.options, props.mapId]);

	useEffect(() => {
		if (
			mapRef.current?.map &&
			props?.options?.style &&
			currentStyle.current !== props.options.style
		) {
			currentStyle.current = props.options.style;
			mapRef.current.map.setStyle(props.options.style);
		}
	}, [props?.options?.style]);

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
