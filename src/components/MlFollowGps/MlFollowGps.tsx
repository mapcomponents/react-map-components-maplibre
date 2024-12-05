import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import useMap from '../../hooks/useMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';

import { Button } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import {
	point,
	circle,
	lineArc,
	bbox,
	booleanContains,
	bboxPolygon,
} from '@turf/turf';
import {Feature, Point, BBox} from 'geojson';
import { CircleLayerSpecification, FillLayerSpecification, LngLatBoundsLike } from 'maplibre-gl';

export interface MlFollowGpsProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * The layerId of an existing layer this layer should be rendered visually beneath
	 * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
	 */
	insertBeforeLayer?: string;
	/**
	 * By default a dot will be shown on the map at the user's location. Set to false to disable.
	 */
	showUserLocation?: boolean;
	/**
	 * By default a cone will be shown on the map at the user's location to indicate the device's orientation.
	 * Set to false to disable.
	 */
	showOrientation?: boolean;
	/**
	 * By default, if showUserLocation is true, a transparent circle will be drawn around the user location
	 * indicating the accuracy (95% confidence level) of the user's location. Set to false to disable.
	 */
	showAccuracyCircle?: boolean;
	/**
	 * Use the MapLibre.flyTo function to center the map to the current users position if true.
	 * Otherwise the MapLibre.setCenter function is used.
	 */
	useFlyTo?: boolean;
	/**
	 * Center map to current position once updated location data is recieved.
	 * "false" will center the map once on component activation and then display the updated user location on the map.
	 */
	centerUserPosition?: boolean;
	/**
	 * Orientation cone paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the orientation cone polygon.
	 * Use any available paint prop from layer type "fill".
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
	 */
	orientationConePaint?: FillLayerSpecification['paint'];
	/**
	 * Position circle paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the position circle.
	 * Use any available paint prop from layer type "circle".
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
	 */
	circlePaint?: CircleLayerSpecification['paint'];
	/**
	 * Active button font color
	 */
	onColor?: string;
	/**
	 * Inactive button font color
	 */
	offColor?: string;
	/**
	 * Accuracy paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the accuracy polygon.
	 * Use any available paint prop from layer type "fill".
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
	 */
	accuracyPaint?: FillLayerSpecification['paint'];
}

/**
 * Adds a button that makes the map follow the users GPS position using
 * navigator.geolocation.watchPosition if activated
 *
 */
const MlFollowGps = (props: MlFollowGpsProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [isFollowed, setIsFollowed] = useState(false);
	const [userLocationGeoJson, setUserLocationGeoJson] = useState<Feature<Point>>();
	const [locationAccessDenied, setLocationAccessDenied] = useState(false);
	const [accuracyGeoJson, setAccuracyGeoJson] = useState<Feature>();
	const [deviceOrientation, setDeviceOrientation] = useState(0);
	const initiallyCentered = useRef(false);

	const getLocationSuccess = useCallback(
		(pos: GeolocationPosition) => {
			if (!mapHook.map) return;

			if ((!props.centerUserPosition && !initiallyCentered.current) || props.centerUserPosition) {
				if (props.useFlyTo) {
					mapHook.map.map.flyTo({
						center: [pos.coords.longitude, pos.coords.latitude],
						zoom: 18,
						speed: 1,
						curve: 1,
					});
				} else {
					mapHook.map.map.setCenter([pos.coords.longitude, pos.coords.latitude]);
				}

				initiallyCentered.current = true;
			}
			if (!props.showUserLocation) return;
			const geoJsonPoint = point([pos.coords.longitude, pos.coords.latitude]);
			setUserLocationGeoJson(geoJsonPoint);
			setAccuracyGeoJson(circle(geoJsonPoint, pos.coords.accuracy / 1000));
		},
		[mapHook.map, props]
	);

	const getLocationError = () => {
		console.log('Access of user location denied');
		setLocationAccessDenied(true);
	};

	const orientationCone = useMemo(() => {
		if (!userLocationGeoJson) {
			return undefined;
		}
		const radius = 0.02;
		const bearing1 = deviceOrientation - 15;
		const bearing2 = deviceOrientation + 15;
		const options = { steps: 65 };
		const arc = lineArc(userLocationGeoJson, radius, bearing1, bearing2, options);
		const copy = arc;
		copy.geometry.coordinates.push(userLocationGeoJson.geometry.coordinates);
		copy.geometry.coordinates.slice(0, 0);
		return copy;
	}, [deviceOrientation, userLocationGeoJson]);

	const handleOrientation = (event: DeviceOrientationEvent) => {
		if (event?.alpha) {
			setDeviceOrientation(-event.alpha);
		}
	};

	useEffect(() => {
		if (isFollowed) {
			const _handleOrientation = handleOrientation;
			window.addEventListener('deviceorientation', _handleOrientation);
			return () => {
				window.removeEventListener('deviceorientation', _handleOrientation);
			};
		} else {
			initiallyCentered.current = false;
		}
		return;
	}, [isFollowed]);

	useEffect(() => {
		if (!mapHook.map) return;

		if (isFollowed) {
			const _watchId = navigator.geolocation.watchPosition(getLocationSuccess, getLocationError);

			return () => {
				navigator.geolocation.clearWatch(_watchId);
			};
		}
		return;
	}, [mapHook.map, isFollowed, getLocationSuccess]);

	useEffect(() => {
		if (accuracyGeoJson?.type) {
			const getBounds = mapHook.map?.getBounds();
			const actualBounds = [
				getBounds?._ne.lng,
				getBounds?._ne.lat,
				getBounds?._sw.lng,
				getBounds?._sw.lat,
			];
			const accurancyBounds = bbox(accuracyGeoJson) as LngLatBoundsLike;
			const contained = booleanContains(
				bboxPolygon(actualBounds as BBox),
				bboxPolygon(accurancyBounds as BBox)
			);

			if (!contained) {
				mapHook.map?.fitBounds(accurancyBounds, {
					padding: { top: 25, bottom: 25 },
				});
			}
		}
	}, [accuracyGeoJson]);

	return (
		<>
			{isFollowed && userLocationGeoJson && (
				<MlGeoJsonLayer
					geojson={accuracyGeoJson}
					type={'fill'}
					paint={{
						'fill-color': '#cbd300',
						'fill-opacity': 0.3,
						...props.accuracyPaint,
					}}
					insertBeforeLayer={props.insertBeforeLayer}
				/>
			)}

			{isFollowed && orientationCone && (
				<MlGeoJsonLayer
					geojson={orientationCone}
					type={'fill'}
					paint={{
						'fill-color': '#0000ff',
						'fill-antialias': false,
						'fill-opacity': 0.3,
						...props.orientationConePaint,
					}}
					insertBeforeLayer={props.insertBeforeLayer}
				/>
			)}

			{isFollowed && userLocationGeoJson && (
				<MlGeoJsonLayer
					geojson={userLocationGeoJson}
					type={'circle'}
					paint={{
						'circle-color': '#009ee0',
						'circle-radius': 5,
						'circle-stroke-color': '#fafaff',
						'circle-stroke-width': 1,
						...props.circlePaint,
					}}
					insertBeforeLayer={props.insertBeforeLayer}
				/>
			)}

			<Button
				variant="navtools"
				sx={{
					zIndex: 1002,
					color: isFollowed
						? (theme) => theme.palette.GPS.GPSActiveColor
						: (theme) => theme.palette.GPS.GPSInactiveColor,
					backgroundColor: isFollowed
						? (theme) => theme.palette.GPS.GPSActiveBackgroundColor
						: (theme) => theme.palette.navigation.navColor,
				}}
				disabled={locationAccessDenied}
				onClick={() => {
					setIsFollowed(!isFollowed);
				}}
			>
				<GpsFixedIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
			</Button>
		</>
	);
};

MlFollowGps.defaultProps = {
	mapId: undefined,
	offColor: '#666',
	showAccuracyCircle: true,
	showUserLocation: true,
	showOrientation: true,
	centerUserPosition: true,
	useFlyTo: false,
};

export default MlFollowGps;
