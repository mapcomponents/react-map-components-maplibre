import React, { useCallback, useRef, useContext, useEffect } from 'react';
import MapContext from '../../contexts/MapContext';
import { polygon, lineString, featureCollection } from '@turf/helpers';
import { distance, lineOffset } from '@turf/turf';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import useSource from '../../hooks/useSource';
import useLayer from '../../hooks/useLayer';
import getElevationData from './util/getElevationData';

/**
 * MlSpatialElevationProfile returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 *
 * @component
 */
const MlSpatialElevationProfile = (props) => {

	const mapContext = useContext(MapContext);

	const componentId = useRef(
		(props.idPrefix ? props.idPrefix : 'MlSpatialElevationProfile-') + uuidv4()
	);
	const mapRef = useRef(null);
	const initializedRef = useRef(false);

	const sourceName = useRef('elevationprofile-' + uuidv4());
	const layerName = useRef('elevationprofile-layer-' + uuidv4());

useSource({
		mapId: props.mapId,
		sourceId: sourceName.current,
		source: {
			type: 'geojson',
			data: props.geojson || featureCollection([]),
		},
	});
	
useLayer({
		layerId: layerName.current,
		source: sourceName.current,
		
		options: {
			type: 'fill-extrusion',
			paint: {
			'fill-extrusion-height': ['get', 'height'],
			'fill-extrusion-opacity': 0.9,
			'fill-extrusion-color': [
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
			],
		},
		},
		insertBeforeLayer: props.insertBeforeLayer,
		
	},
);


	useEffect(() => {
		let _componentId = componentId.current;
		return () => {
			// This is the cleanup function, it is called when this react component is removed from react-dom
			if (mapRef.current) {
				mapRef.current.cleanup(_componentId);

				mapRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		
		if (!mapContext.mapExists(props.mapId) || !props?.geojson?.features || initializedRef.current)
			return;

		initializedRef.current = true;
		mapRef.current = mapContext.getMap(props.mapId);

	}, [mapContext.mapIds, props.insertBeforeLayer, props.mapId, props.geojson, mapContext]);

	useEffect(() => {
		if (!mapRef.current || !mapRef.current.getLayer(layerName.current)) return;
		if (!props.geojson?.features) return;
		

		const line = props.geojson.features.find((element) => {
			return element.geometry.type === 'LineString';
		});

		if (!line || !line.geometry) return;
		
		mapRef.current.getSource(sourceName.current)?.setData(getElevationData(line, mapRef.current, layerName.current, props.elevationFactor));
	}, [props.geojson, props.elevationFactor, mapContext]);

	return <></>;
};

MlSpatialElevationProfile.defaultProps = {
	elevationFactor: 1,
};

MlSpatialElevationProfile.propTypes = {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId: PropTypes.string,
	/**
	 * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
	 */
	idPrefix: PropTypes.string,
	/**
	 * Number describes the factor of the height of the elevation
	 */
	elevationFactor: PropTypes.number,
	/**
	 * The layerId of an existing layer this layer should be rendered visually beneath
	 * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
	 */
	insertBeforeLayer: PropTypes.string,
};

export default MlSpatialElevationProfile;
