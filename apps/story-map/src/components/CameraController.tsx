import { Feature } from 'geojson';
import { MlGeoJsonLayer } from '@mapcomponents/react-maplibre';
import routeData from '../assets/route.json';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef } from 'react';
import useCameraFollowPath from './useCameraFollowPath';
import { StationType, useStationContext } from '../contexts/StationContext';
import { AutoplayOptions } from '../App';

interface CameraControllerProps {
	pause: boolean;
	zoom: number;
	speed: number;
	pitch: number;
	showRoute: boolean;
	setAutoplay: Dispatch<SetStateAction<AutoplayOptions>>;
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
const CameraController = (props: CameraControllerProps) => {
	const route = routeData as Feature;
	const { stationInformations, selectStationById } = useStationContext();
	const breakPoints = useMemo(
		() => stationInformations.map((station: StationType) => station.breakpoint),
		[stationInformations]
	);
	const breakPoint = useRef<number>(0);

	const handlePositionChange = useCallback(
		(position: number[]) => {
			if (breakPoint.current >= breakPoints.length) return;

			const dist = distanceBetweenPoints(
				breakPoints[breakPoint.current][0],
				breakPoints[breakPoint.current][1],
				position[0],
				position[1]
			);

			if (dist < 0.01) {
				console.log('stop');
				props.setAutoplay((prev) => ({
					...prev,
					isPaused: true,
				}));
				const currentStationId = stationInformations[breakPoint.current].id;
				/*selectStationById(currentStationId);*/
				breakPoint.current += 1;
			}
		},
		[breakPoints, selectStationById, props]
	);

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
