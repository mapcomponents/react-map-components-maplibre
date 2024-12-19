import React, { useEffect, useRef } from 'react';
import { bbox, featureCollection } from '@turf/turf';
import { FeatureCollection, GeoJSON } from 'geojson';
import { LngLatBoundsLike } from 'maplibre-gl';
import useMap from '../../hooks/useMap';
import useGpx, { MetadataType } from '../../hooks/useGpx/useGpx';
import useLayerHoverPopup from '../../hooks/useLayerHoverPopup/LayerHoverPopup';
import useSource from '../../hooks/useSource';
import useLayer from '../../hooks/useLayer';
import { v4 as uuidv4 } from 'uuid';

export interface MlGpxViewerProps {
	/**
	 * Id of the target MapLibre instance in mapHook
	 */
	mapId?: string;
	/**
	 * The layerId of an existing layer this layer should be rendered visually beneath
	 * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
	 */
	insertBeforeLayer?: string;
	/**
	 * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
	 */
	idPrefix?: string;
	gpxData: string | undefined;
	onParseGpxData: (arg0: {
		geojson: FeatureCollection | undefined;
		metadata: MetadataType[];
	}) => void;
}

/**
 * MlGpxViewer visualizes a given GPX Track on the map
 */
const MlGpxViewer = (props: MlGpxViewerProps) => {
	const parsedGpx = useGpx({ data: props.gpxData });
	const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });
	const sourceName = useRef('gpx-viewer-source-' + uuidv4());
	const layerNameLines = useRef('importer-layer-lines-' + uuidv4());
	const layerNamePoints = useRef('importer-layer-points-' + uuidv4());

	useLayerHoverPopup({
		layerId: layerNamePoints.current,
		getPopupContent: (feature) => feature?.properties?.name,
	});

	useSource({
		mapId: props.mapId,
		sourceId: sourceName.current,
		source: {
			type: 'geojson',
			data: (parsedGpx.geojson || featureCollection([])) as (string | GeoJSON),
		},
	});

	useLayer({
		layerId: layerNameLines.current,
		options: {
			type: 'line',
			paint: {
				'line-width': 4,
				'line-color': 'rgba(212, 55, 23,0.5)',
			},
			source: sourceName.current,
		},
		insertBeforeLayer: props.insertBeforeLayer,
	});

	useLayer({
		layerId: layerNamePoints.current,
		options: {
			type: 'circle',
			paint: {
				'circle-color': 'rgba(72, 77, 99,0.5)',
				'circle-radius': 7,
			},
			filter: ['==', '$type', 'Point'],
			source: sourceName.current,
		},
		insertBeforeLayer: props.insertBeforeLayer,
	});

	useEffect(() => {
		if (!mapHook.map || !parsedGpx.geojson) return;

		if (typeof props.onParseGpxData === 'function') {
			props.onParseGpxData(parsedGpx);
		}

		// fit map view to GeoJSON bbox

		const bounds = bbox(parsedGpx.geojson);
		mapHook.map.map.fitBounds(bounds as LngLatBoundsLike);
	}, [parsedGpx]);

	return <></>;
};

MlGpxViewer.defaultProps = {};

export default MlGpxViewer;
