import { useCallback, useEffect, useRef } from 'react';

import * as turf from '@turf/turf';
import { useMap } from '@mapcomponents/react-maplibre';
import { LngLatLike } from 'maplibre-gl';

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

	onPositionChange?: (position: LngLatLike) => void;
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
	const timeoutId = useRef<any | null>(null);
	const bearingRef = useRef<number | null>(null);

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
			if (props.pitch) mapHook.map?.setPitch(props.pitch);
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

	function play() {
		if (!mapHook.map) return;

		if (!pause.current) {
			disableInteractivity();
			if (typeof zoom.current !== 'undefined' && mapHook.map.map.getZoom() !== zoom.current) {
				mapHook.map.map.setZoom(zoom.current);
			}

			const alongRoutelati = turf.along(props.route, step.current * kmPerStep).geometry.coordinates;

			if (step.current * kmPerStep < routeDistance) {
				const targetBearing = turf.bearing(
					turf.point([mapHook.map.map.getCenter().lng, mapHook.map.map.getCenter().lat]),
					turf.point(alongRoutelati)
				);

				let finalBearing: number;

				// Only interpolate bearing if speed is 10 or less
				if (!speed.current || speed.current <= 10) {
					// Interpolate bearing to avoid sudden jumps
					const currentBearing = bearingRef.current ?? targetBearing;
					let bearingDiff = targetBearing - currentBearing;

					// Normalize bearing difference to shortest rotation (-180 to 180)
					if (bearingDiff > 180) bearingDiff -= 360;
					if (bearingDiff < -180) bearingDiff += 360;

					const smoothedBearing = currentBearing + bearingDiff * 0.3; // Interpolate 30% towards target
					bearingRef.current = smoothedBearing;
					finalBearing = smoothedBearing;
				} else {
					// Use target bearing directly for high speeds
					bearingRef.current = targetBearing;
					finalBearing = targetBearing;
				}

				mapHook.map.map.easeTo({
					center: alongRoutelati as LngLatLike,
					bearing: finalBearing,
					duration: stepDuration,
					easing: (t) => t,
					essential: true,
				});

				if (typeof speed.current !== 'undefined') {
					step.current = step.current + speed.current;
				} else {
					step.current++;
				}
				setTimeout(() => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					props.onPositionChange?.(alongRoutelati);
					play();
				}, 100);
			} else {
				bearingRef.current = null;
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
		enableInteractivity();
		step.current = 1;
	}

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
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

export default useCameraFollowPath;
