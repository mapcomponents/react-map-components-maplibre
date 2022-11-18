import React, { useState, useEffect, useRef } from 'react';
import './MlFeatureEditor.css';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import CustomPolygonMode from './custom-polygon-mode.js';
import CustomSelectMode from './custom-select-mode.js';
import CustomDirectSelectMode from './custom-direct-select-mode.js';

import useMap from '../../hooks/useMap';

interface MlFeatureEditorProps {
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
	geojson?: any;
	/**
	 * Callback function that is called each time the GeoJson data within has changed within MlFeatureEditor.
	 * First parameter is the new GeoJson feature.
	 */
	onChange?: Function;
	/**
	 * Callback function that is called each time the GeoJson data within has been finished within MlFeatureEditor.
	 * First parameter is the new GeoJson feature.
	 */
	onFinish?: Function;
	/**
	 * Feature editor mode:
	 * - "custom_select" edit features
	 * - "custom_polygon" draw Polygon
	 * - "draw_point" draw Point
	 * - "draw_line_string" draw LineString
	 */
	mode?: string;
}

/**
 * GeoJson Feature editor that allows to create or manipulate GeoJson data
 */
const MlFeatureEditor = (props: MlFeatureEditorProps) => {
	const draw = useRef<MapboxDraw>();
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const drawToolsInitialized = useRef(false);
	const [drawToolsReady, setDrawToolsReady] = useState(false);

	const modeChangeHandler = (e: any) => {
		console.log('MlFeatureEditor mode change to ' + e.mode);
		//setDrawMode(e.mode);
		if (
			typeof props.onFinish === 'function' &&
			(e.mode === 'custom_select' || e.mode === 'simple_select')
		) {
			props.onFinish();
		}
	};

	useEffect(() => {
		if (mapHook.map && !drawToolsInitialized.current) {
			drawToolsInitialized.current = true;

			if (
				mapHook.map.map.style &&
				mapHook.map.map.getSource('mapbox-gl-draw-cold') &&
				draw.current
			) {
				// remove old Mapbox-gl-Draw from Mapbox instance when hot-reloading this component during development
				// @ts-ignore
				draw.current?.remove();
			}

			draw.current = new MapboxDraw({
				displayControlsDefault: false,
				defaultMode: props.mode || 'custom_select',
				// @ts-ignore
				modes: Object.assign(
					{
						custom_polygon: CustomPolygonMode,
						custom_select: CustomSelectMode,
						custom_direct_select: CustomDirectSelectMode,
					},
					MapboxDraw.modes
				),
			});

			mapHook.map.addControl(draw.current, 'top-left', mapHook.componentId);

			mapHook.map.on('draw.modechange', modeChangeHandler, mapHook.componentId);

			setDrawToolsReady(true);
		}
	}, [mapHook.map, props, drawToolsInitialized]);

	useEffect(() => {
		if (!mapHook.map || !drawToolsReady) return;

		const changeHandler = () => {
			if (draw.current) {
				// update drawnFeatures state object
				if (typeof props.onChange === 'function') {
					const currentFeatureCollection = draw.current.getAll?.();
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
			draw.current.set({ type: 'FeatureCollection', features: [props.geojson] });
		}
	}, [props.geojson, drawToolsReady]);

	useEffect(() => {
		if (props.mode && draw.current) {
			// @ts-ignore
			draw.current.changeMode(props.mode);
		}
	}, [props.mode]);

	return <></>;
};

export default MlFeatureEditor;
