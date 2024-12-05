import React, { useRef, useMemo } from 'react';
import { featureCollection } from '@turf/helpers';
import { Feature, FeatureCollection, GeoJSON } from 'geojson';
import { v4 as uuidv4 } from 'uuid';
import useSource from '../../hooks/useSource';
import useLayer from '../../hooks/useLayer';
import getElevationData from './util/getElevationData';
import { Coordinates, DataDrivenPropertyValueSpecification } from 'maplibre-gl';

const defaultFillExtrusionColor: (string | number | string[])[] = [
	'interpolate',
	['linear'],
	['get', 'height'],
	0,
	'rgba(0, 0, 255, 0)',
	0.1,
	'royalblue',
	0.3,
	'cyan',
	0.5,
	'lime',
	0.7,
	'yellow',
	1,
	'yellow',
];
/**
 * MlSpatialElevationProfile returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 *
 * @component
 */

interface geojson {
	features: Feature | FeatureCollection | undefined;
}

export interface MlSpatialElevationProfileProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * GeoJSON data that is supposed to be rendered by this component.
	 */
	//geojson: {features: Feature | FeatureCollection | undefined };
	geojson: geojson | FeatureCollection | undefined;
	/**
	 * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
	 */
	idPrefix?: string;
	/**
	 * Number describes the factor of the height of the elevation
	 */
	elevationFactor?: number;
	/**
	 * The layerId of an existing layer this layer should be rendered visually beneath
	 * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
	 */
	insertBeforeLayer?: string;
}

const MlSpatialElevationProfile = (props: MlSpatialElevationProfileProps) => {
	const sourceName = useRef('elevationprofile-' + uuidv4());
	const layerName = useRef('elevationprofile-layer-' + uuidv4());
	const elevationFactor =
		props.elevationFactor || MlSpatialElevationProfile.defaultProps.elevationFactor;

	const _geojsonInfo = useMemo(() => {
		if (!props?.geojson?.features) return;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const line = props.geojson.features?.find((element: Feature) => {
			return element.geometry.type === 'LineString';
		});

		if (!line || !line.geometry) return;

		const heights = line.geometry.coordinates.map((coordinate: Coordinates) => {
			return coordinate[2];
		});

		const min = Math.min(...heights);

		let max = Math.max(...heights) - min;

		max = max === 0 ? 1 : max;

		return { max, min, line };
	}, [props.geojson]);

	const _fillExtrusionColor: (string | number | string[])[] = useMemo(() => {
		if (!_geojsonInfo) return defaultFillExtrusionColor;

		return [
			'interpolate',
			['linear'],
			['get', 'height'],
			0,
			'rgb(0,255,55)',
			_geojsonInfo.max * elevationFactor,
			'rgb(255,0,0)',
		];
	}, [_geojsonInfo, props.elevationFactor]);

	const _geojson = useMemo(() => {
		if (!props.geojson?.features || !_geojsonInfo) return;

		const newData = getElevationData(_geojsonInfo, elevationFactor);
		return newData;
	}, [_geojsonInfo, elevationFactor]);

	useSource({
		mapId: props.mapId,
		sourceId: sourceName.current,
		source: {
			type: 'geojson',
			data: (_geojson || featureCollection([])) as (string | GeoJSON),
		},
	});

	useLayer({
		layerId: layerName.current,
		options: {
			source: sourceName.current,
			type: 'fill-extrusion',
			paint: {
				'fill-extrusion-height': ['get', 'height'],
				'fill-extrusion-opacity': 0.9,
				'fill-extrusion-color': (_fillExtrusionColor ||
					defaultFillExtrusionColor) as DataDrivenPropertyValueSpecification<string>,
			},
		},
		insertBeforeLayer: props.insertBeforeLayer,
	});

	return <></>;
};

MlSpatialElevationProfile.defaultProps = {
	elevationFactor: 1,
};

export default MlSpatialElevationProfile;
