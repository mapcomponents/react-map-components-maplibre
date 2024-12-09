import { useState, useEffect, useRef, useCallback } from 'react';


import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import useMap from '../useMap';
import { Feature } from 'geojson';
import { MapEventType } from 'maplibre-gl';
import featureEditorStyle from './utils/FeatureEditorStyle';
import { MapLibreGlEventName } from 'src/components/MapLibreMap/lib/MapLibreGlWrapper';

export interface useFeatureEditorProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
	/**
	 * Input GeoJson data at initialization
	 */
	geojson?: Feature;
	/**
	 * Callback function that is called each time the GeoJson data has changed within MlFeatureEditor.
	 * First parameter is the new GeoJson feature.
	 */
	onChange?: (para: Feature[]) => void;
	/**
	 * Callback function that is called each time the GeoJson data within has been finished within MlFeatureEditor.
	 * First parameter is the new GeoJson feature.
	 */
	onFinish?: () => void;
	/**
	 * Feature editor modes:
	 * - draw_line_string
	 * - draw_polygon
	 * - draw_point
	 * - simple_select
	 * - direct_select
	 */
	mode?: keyof MapboxDraw.Modes;
}

/**
 * GeoJson Feature editor that allows to create or manipulate GeoJson data
 */
const useFeatureEditor = (props: useFeatureEditorProps) => {
	const draw = useRef<MapboxDraw>();
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const drawToolsInitialized = useRef(false);
	const [drawToolsReady, setDrawToolsReady] = useState(false);
	const [feature, setFeature] = useState<Feature[]>();
	const style = featureEditorStyle();

	const modeChangeHandler = useCallback(
		(e: MapEventType & { mode: keyof MapboxDraw.Modes }) => {
			console.log('MlFeatureEditor mode change to ' + e.mode);
			//setDrawMode(e.mode);
			if (typeof props.onFinish === 'function' && e.mode === 'simple_select') {
				props.onFinish();
			}
		},
		[props.onFinish]
	);

	useEffect(() => {
		if (mapHook.map && !drawToolsInitialized.current) {
			drawToolsInitialized.current = true;

			if (
				mapHook.map.map.style &&
				mapHook.map.map.getSource('mapbox-gl-draw-cold') &&
				draw.current
			) {
				// remove old Mapbox-gl-Draw from Mapbox instance when hot-reloading this component during development
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				draw.current?.remove();
			}

			draw.current = new MapboxDraw({
				displayControlsDefault: false,
				defaultMode: props.mode || 'simple_select',
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				modes: Object.assign({}, MapboxDraw.modes),
				userProperties: true,
				styles: style,
			});

			mapHook.map.addControl(draw.current, 'top-left', mapHook.componentId);

			mapHook.map.on('draw.modechange' as MapLibreGlEventName, modeChangeHandler, mapHook.componentId);

			setDrawToolsReady(true);
		}
	}, [mapHook.map, props, drawToolsInitialized, modeChangeHandler]);

	useEffect(() => {
		if (!mapHook.map || !drawToolsReady) return;

		const changeHandler = () => {
			if (draw.current) {
				// update drawnFeatures state object
				const currentFeatureCollection = draw.current.getAll?.();
				setFeature(currentFeatureCollection?.features);
				if (typeof props.onChange === 'function') {
					props.onChange(currentFeatureCollection?.features);
				}
			}
		};

		mapHook.map.on('mouseup', changeHandler);
		mapHook.map.on('touchend', changeHandler);

		return () => {
			if (!mapHook.map) return;

			mapHook.map.map.off('mouseup', changeHandler);
			mapHook.map.map.off('touchend', changeHandler);
		};
	}, [drawToolsReady, mapHook.map]);

	useEffect(() => {
		if (draw.current && props.geojson?.geometry) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			draw.current.set({ type: 'FeatureCollection', features: [props.geojson] });
		}
	}, [props.geojson, drawToolsReady]);

	useEffect(() => {
		if (props.mode && draw.current && draw.current?.getMode?.() !== props.mode) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			draw.current?.changeMode?.(props.mode);
			if (props.mode !== 'simple_select' && props.mode !== 'direct_select') {
				draw.current.set({ type: 'FeatureCollection', features: [] });
			}
		}
	}, [props.mode, mapHook.map]);

	return {
		feature,
		drawToolsReady,
		draw: draw.current,
	};
};

export default useFeatureEditor;
