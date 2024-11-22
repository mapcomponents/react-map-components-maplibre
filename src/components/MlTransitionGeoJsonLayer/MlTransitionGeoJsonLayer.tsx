import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as turf from '@turf/turf';
import useMap from '../../hooks/useMap';
import { _transitionToGeojson } from './util/transitionFunctions';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { Feature, FeatureCollection } from 'geojson';
import { MlGeoJsonLayerProps } from '../MlGeoJsonLayer/MlGeoJsonLayer';

const msPerStep = 50;

export type MlTransitionGeoJsonLayerProps = MlGeoJsonLayerProps & {
	transitionTime?: number;
	geojson?: Feature;
};

/**
 * Adds source and layer of types "line", "fill" or "circle" to display GeoJSON data on the map.
 */
const MlTransitionGeoJsonLayer = (props: MlTransitionGeoJsonLayerProps) => {
	// ignore eslint. Only using `geojson` for destructuring
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { geojson, ...restProps } = props;

	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const initializedRef = useRef(false);

	// transition effect variables
	const oldGeojsonRef = useRef<Feature | FeatureCollection>();
	const transitionInProgressRef = useRef(false);
	const transitionTimeoutRef = useRef(undefined);
	const currentTransitionStepRef = useRef(false);
	const transitionGeojsonDataRef = useRef([]);
	const transitionGeojsonCommonDataRef = useRef([]);
	const [displayGeojson, setDisplayGeojson] = useState(turf.featureCollection([]));

	useEffect(() => {
		return () => {
			// This is the cleanup function, it is called when this react component is removed from react-dom
			if (transitionTimeoutRef.current) {
				clearTimeout(transitionTimeoutRef.current);
			}
		};
	}, []);

	const transitionToGeojson = useCallback(() => {
		_transitionToGeojson(
			props,
			transitionGeojsonCommonDataRef,
			transitionGeojsonDataRef,
			transitionInProgressRef,
			oldGeojsonRef,
			msPerStep,
			currentTransitionStepRef,
			mapHook.map,
			transitionTimeoutRef,
			setDisplayGeojson
		);
	}, [props, mapHook.map]);

	useEffect(() => {
		if (!mapHook.map || !initializedRef.current) return;

		if (
			typeof props.transitionTime !== 'undefined' &&
			props.type === 'line' &&
			oldGeojsonRef.current
		) {
			transitionInProgressRef.current = false;
			currentTransitionStepRef.current = false;
			transitionGeojsonDataRef.current = [];
			transitionGeojsonCommonDataRef.current = [];
			transitionToGeojson();
		}
		oldGeojsonRef.current = props.geojson;
	}, [mapHook.map, transitionToGeojson, props]);

	const startTransition = useCallback(() => {
		if (
			props.type === 'line' &&
			typeof props.transitionTime !== 'undefined' &&
			props.transitionTime &&
			typeof props.geojson !== 'undefined' &&
			JSON.stringify(oldGeojsonRef.current) !== JSON.stringify(props.geojson)
		) {
			transitionToGeojson();
			oldGeojsonRef.current = props.geojson;
		}
	}, [props, transitionToGeojson]);

	useEffect(() => {
		if (!mapHook.mapIsReady || !props.geojson) return;

		initializedRef.current = true;

		startTransition();
	}, [mapHook.mapIsReady, startTransition, props]);

	return (
		<>
			<MlGeoJsonLayer {...restProps} geojson={displayGeojson} />
		</>
	);
};

export default MlTransitionGeoJsonLayer;
