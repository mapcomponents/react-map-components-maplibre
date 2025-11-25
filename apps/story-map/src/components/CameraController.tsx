import { Feature, LineString, Position } from 'geojson';
import { MlGeoJsonLayer, useMap } from '@mapcomponents/react-maplibre';
import routeData from '../assets/route.json';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef } from 'react';
import useCameraFollowPath from './useCameraFollowPath';
import { StationType, useStationContext } from '../contexts/StationContext';
import { AutoplayOptions } from '../App';
import { LngLatLike } from 'maplibre-gl';
import * as turf from '@turf/turf';

interface CameraControllerProps {
	pause: boolean;
	zoom: number;
	speed: number;
	pitch: number;
	showRoute: boolean;
	useCutRoute: boolean;
	setAutoplay: Dispatch<SetStateAction<AutoplayOptions>>;
}

export interface CameraPositionType {
	zoom?: number;
	pitch?: number;
	bearing?: number;
}

export function distanceBetweenPoints(
	lng_1: number,
	lat_1: number,
	lng_2: number,
	lat_2: number
): number {
	const R = 6371; // km
	const q_1 = (lat_1 * Math.PI) / 180; // q, n => lat, lng in radians
	const q_2 = (lat_2 * Math.PI) / 180;
	const n_1 = (lng_1 * Math.PI) / 180;
	const n_2 = (lng_2 * Math.PI) / 180;
	return (
		2 *
		R *
		Math.asin(
			Math.sqrt(
				Math.sin((q_2 - q_1) / 2) ** 2 +
					Math.cos(q_1) * Math.cos(q_2) * Math.sin((n_2 - n_1) / 2) ** 2
			)
		)
	);
}

const cutRoute = (coordinates: Position, route: Feature<LineString>) => {
	const snappedPoint = turf.nearestPointOnLine(route, coordinates);
	const snappedCoords = snappedPoint.geometry.coordinates;
	const coords = route.geometry.coordinates;

	const idx = coords.findIndex(
		([lng, lat]) => Math.abs(lng - snappedCoords[0]) < 1e-9 && Math.abs(lat - snappedCoords[1]) < 1e-9
	);

	if (idx > 0 && idx < coords.length - 1) {
		// Split manually at the vertex
		return {
			...route,
			geometry: {
				...route.geometry,
				coordinates: coords.slice(idx),
			},
		};
	}

	// Fallback to turf.lineSplit for non-vertex points
	const split = turf.lineSplit(route, snappedPoint);
	return split.features[1] || route;
};

const CameraController = (props: CameraControllerProps) => {
	const { selectedStation, stationInformations, selectStationById } = useStationContext();
	const breakPoints = useMemo(
		() => stationInformations.map((station: StationType) => station.breakpoint),
		[stationInformations]
	);
	const mapHook = useMap();
	const breakPoint = useRef<number>(0);

	const route = useMemo(() => {
		if (props.useCutRoute && selectedStation) {
			return cutRoute(selectedStation.breakpoint, routeData as Feature<LineString>);
		} else return routeData as Feature<LineString>;
	}, [props.useCutRoute, selectedStation, routeData]);

	const handlePositionChange = useCallback(
		(position: LngLatLike) => {
			if (breakPoint.current >= breakPoints.length) return;
			const dist = distanceBetweenPoints(
				breakPoints[breakPoint.current][0],
				breakPoints[breakPoint.current][1],
				position[0],
				position[1]
			);

			if (dist < 0.01) {
				props.setAutoplay((prev) => ({
					...prev,
					isPaused: true,
				}));
				const currentStation = stationInformations[breakPoint.current];
				if (stationInformations[breakPoint.current].presentationPosition)
					positionCamera(position, stationInformations[breakPoint.current].presentationPosition);
				selectStationById(currentStation.id);
				breakPoint.current += 1;
			}
		},
		[breakPoints, selectStationById, props]
	);

	const positionCamera = (position: LngLatLike, cameraPosition: CameraPositionType | undefined) => {
		setTimeout(() => {
			if (mapHook.map && cameraPosition && position) {
				mapHook.map.easeTo({
					center: position,
					...cameraPosition,
					easing: (t) => t,
					essential: true,
				});
			}
		}, 100);
	};

	const cameraFollowPath = useCameraFollowPath({
		route: route,
		pause: props.pause,
		zoom: props.zoom,
		speed: props.speed,
		pitch: props.pitch,
		onPositionChange: handlePositionChange,
	});

	useEffect(() => {
		cameraFollowPath.play();
	}, [cameraFollowPath]);

	return (
		<>
			{props.showRoute && route && (
				<MlGeoJsonLayer
					geojson={route}
					type="line"
					options={{
						paint: {
							'line-color': '#ec9a00',
							'line-width': 5,
							'line-opacity': 0.8,
						},
					}}
				/>
			)}
		</>
	);
};

export default CameraController;
