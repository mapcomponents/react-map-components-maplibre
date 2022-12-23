import React, { useContext, useEffect } from 'react';
import { bbox, FeatureCollection } from '@turf/turf';
import { LngLatBoundsLike } from 'maplibre-gl';
import GeoJsonContext from './util/GeoJsonContext';
import useMap from '../../hooks/useMap';
import useGpx, { MetadataType } from '../../hooks/useGpx/useGpx';
import useLayerHoverPopup from '../../hooks/useLayerHoverPopup/useLayerHoverPopup';
import useSource from '../../hooks/useSource';
import useLayer from '../../hooks/useLayer';

interface MlGPXViewerProps {
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
 * MlGPXViewer returns a dropzone and a button to load a GPX Track into the map.
 */
const MlGPXViewer = (props: MlGPXViewerProps) => {
	const parsedGpx = useGpx({ data: props.gpxData });
	const dataSource = useContext(GeoJsonContext);
	const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });
	const sourceName = 'import-source';
	const layerNameLines = 'importer-layer-lines';
	const layerNamePoints = 'importer-layer-points';

	useLayerHoverPopup({
		layerId: layerNamePoints,
		getPopupContent: (feature) => feature?.properties?.name,
	});

	useSource({
		mapId: props.mapId,
		sourceId: sourceName,
		source: {
			type: 'geojson',
			data: dataSource.data,
		},
	});

	useLayer({
		layerId: layerNameLines,
		source: sourceName,
		options: {
			type: 'line',
			paint: {
				'line-width': 4,
				'line-color': 'rgba(212, 55, 23,0.5)',
			},
		},
		insertBeforeLayer: props.insertBeforeLayer,
	});

	useLayer({
		layerId: layerNamePoints,
		source: sourceName,
		options: {
			type: 'circle',
			paint: {
				'circle-color': 'rgba(72, 77, 99,0.5)',
				'circle-radius': 7,
			},
			filter: ['==', '$type', 'Point'],
		},
		insertBeforeLayer: props.insertBeforeLayer,
	});

	useEffect(() => {
		if (!mapHook.map || !dataSource.setData || !parsedGpx.geojson) return;

		dataSource.setData(parsedGpx.geojson);

		if (typeof props.onParseGpxData === 'function') {
			props.onParseGpxData(parsedGpx);
		}
		// fit map view to GeoJSON bbox
		const bounds = bbox(parsedGpx.geojson);
		mapHook.map.map.fitBounds(bounds as LngLatBoundsLike);
	}, [parsedGpx]);

	return <></>;
};

MlGPXViewer.defaultProps = {};

export default MlGPXViewer;