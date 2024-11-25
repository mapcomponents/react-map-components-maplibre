import { useEffect, useCallback, useRef } from 'react';

import * as turf from '@turf/turf';
import useMap from '../useMap';
import { LngLatBoundsLike, LngLatLike } from 'maplibre-gl';

interface useCameraFollowPathProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
	/* pause is an useRef const and is triggerd in the storie */
	pause?: boolean;
	/* zoom is an useRef const and is triggerd in the storie */
	zoom?: number;
	/* pitch is an useRef const and is triggerd in the storie */
	pitch?: number;
	/* speed is an useRef const and is triggerd in the storie */
	speed?: number;
	/* kmPerStep is an useRef const */
	kmPerStep?: number;
	/* route is a json file, which is defined loaded in the storie */
	route?: any;
	/* stepDuration is a const */
	stepDuration?: number;
	/* timeoutId is an useRef const */
	timeoutId?: number;
}
export type { useCameraFollowPathProps };

/**
 * Component template
 *
 */
const useCameraFollowPath = (props: useCameraFollowPathProps) => {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	// without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
	const initializedRef = useRef(false);
	const pause = useRef<boolean | undefined>(props.pause);
	const zoom = useRef<number | undefined>(props.zoom);
	const pitch = useRef<number | undefined>(props.pitch);
	const step = useRef(1);
	const speed = useRef<number | undefined>(props.speed);
	const timeoutId = useRef();

	const kmPerStep = props.kmPerStep || 0.01;
	const routeDistance = turf.length(props.route);
	const stepDuration = props.stepDuration || 70;

	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	useEffect(() => {
		pause.current = props.pause;
		if (!pause.current) {
			play();
		}
	}, [props.pause]);
	useEffect(() => {
		if (!mapHook.map) return;
		zoom.current = props.zoom;
		if (typeof zoom.current !== 'undefined' && mapHook.map.map.getZoom() !== zoom.current) {
			mapHook.map.map.setZoom(zoom.current);
		}
	}, [mapHook.map, props.zoom]);
	useEffect(() => {
		if (!mapHook.map) return;
		pitch.current = props.pitch;
		if (typeof pitch.current !== 'undefined' && pitch.current !== mapHook.map.map.getPitch()) {
			mapHook.map.map.setPitch(pitch.current);
		}
	}, [mapHook.map, props.pitch]);
	useEffect(() => {
		speed.current = props.speed;
	}, [props.speed]);

	const disableInteractivity = useCallback(() => {
		if (!mapHook.map) return;
		mapHook.map.map['scrollZoom'].disable();
		mapHook.map.map['boxZoom'].disable();
		mapHook.map.map['dragRotate'].disable();
		mapHook.map.map['dragPan'].disable();
		mapHook.map.map['keyboard'].disable();
		mapHook.map.map['doubleClickZoom'].disable();
		mapHook.map.map['touchZoomRotate'].disable();
	}, [mapHook.map]);
	const enableInteractivity = useCallback(() => {
		if (!mapHook.map) return;
		mapHook.map.map['scrollZoom'].enable();
		mapHook.map.map['boxZoom'].enable();
		mapHook.map.map['dragRotate'].enable();
		mapHook.map.map['dragPan'].enable();
		mapHook.map.map['keyboard'].enable();
		mapHook.map.map['doubleClickZoom'].enable();
		mapHook.map.map['touchZoomRotate'].enable();
	}, [mapHook.map]);

	function centerRoute() {
		if (!mapHook.map || !props.route) return;
		const bbox = turf.bbox(props.route);
		let bounds: LngLatBoundsLike;
		if (bbox && bbox.length > 3) {
			bounds = [
				[bbox[0], bbox[1]],
				[bbox[2], bbox[3]],
			];
			mapHook.map.map.fitBounds(bounds, { padding: 100 });
		}
	}
	function play() {
		if (!mapHook.map) return;

		if (!pause.current) {
			disableInteractivity();
			if (typeof zoom.current !== 'undefined' && mapHook.map.map.getZoom() !== zoom.current) {
				mapHook.map.map.setZoom(zoom.current);
			}

			const alongRoutelati: number[] = turf.along(props.route, step.current * kmPerStep).geometry
				.coordinates;

			if (step.current * kmPerStep < routeDistance) {
				mapHook.map.map.easeTo({
					center: alongRoutelati as LngLatLike,
					bearing: turf.bearing(
						turf.point([mapHook.map.map.getCenter().lng, mapHook.map.map.getCenter().lat]),
						turf.point(alongRoutelati)
					),
					duration: stepDuration,
					essential: true,
				});
				if (typeof speed.current !== 'undefined') {
					step.current = step.current + speed.current;
				} else {
					step.current++;
				}
				console.log('PAN MOVE');
				setTimeout(() => {
					play();
				}, 100);
			} else {
				mapHook.map.map.setPitch(0);
				centerRoute();
				enableInteractivity();
				console.log('ENABLE CONTROLS');
				step.current = 1;
			}
		} else {
			enableInteractivity();
		}
	}

	function reset() {
		if (!mapHook.map) return;
		centerRoute();
		enableInteractivity();
		step.current = 1;
	}

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
		centerRoute();
	}, [mapHook.map]);

	useEffect(() => {
		return () => {
			if (timeoutId.current) {
				clearTimeout(timeoutId.current);
			}
		};
	}, []);

	return {
		play: play,
		reset: reset,
	};
};

useCameraFollowPath.defaultProps = {
	mapId: undefined,
	zoom: 18,
};

export default useCameraFollowPath;
