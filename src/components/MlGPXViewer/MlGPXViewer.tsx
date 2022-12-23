import React, { useContext,  useEffect, useState } from 'react';
import { bbox } from '@turf/turf';
import IconButton from '@mui/material/IconButton';
import FileCopy from '@mui/icons-material/FileCopy';
import InfoIcon from '@mui/icons-material/Info';
import { LngLatBoundsLike } from 'maplibre-gl';
import GeoJsonContext from './util/GeoJsonContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import useMap from '../../hooks/useMap';
import useGpx from '../../hooks/useGpx/useGpx';
import Dropzone from '../../ui_components/Dropzone';
import useLayerHoverPopup from '../../hooks/useLayerHoverPopup/useLayerHoverPopup';
import useSource from '../../hooks/useSource';
import useLayer from '../../hooks/useLayer';
import UploadButton from '../../ui_components/UploadButton';
import MetadataDrawer from './util/MetadataDrawer';

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
}

/**
 * MlGPXViewer returns a dropzone and a button to load a GPX Track into the map.
 */
const MlGPXViewer = (props: MlGPXViewerProps) => {
	const [gpxData, setGpxData] = useState();
	const { geojson, metadata } = useGpx({ data: gpxData });

	const dataSource = useContext(GeoJsonContext);
	const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });
	const sourceName = 'import-source';
	const layerNameLines = 'importer-layer-lines';
	const layerNamePoints = 'importer-layer-points';

	const [metadataDrawerOpen, setMetadataDrawerOpen] = useState(false);
	const mediaIsMobile = useMediaQuery('(max-width:900px)');

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
		if (!mapHook.map || !dataSource.setData) return;

		dataSource.setData(geojson);

		// fit map view to GeoJSON bbox
		const bounds = bbox(geojson);
		mapHook.map.map.fitBounds(bounds as LngLatBoundsLike);
	}, [geojson]);

	return (
		<>
			<div
				style={{
					position: 'fixed',
					right: '5px',
					bottom: mediaIsMobile ? '40px' : '25px',
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					zIndex: 1000,
				}}
			>
				<UploadButton
					setData={setGpxData}
					buttonComponent={
						<IconButton
							style={{
								backgroundColor: 'rgba(255,255,255,1)',
							}}
							size="large"
						>
							<FileCopy />
						</IconButton>
					}
				/>
				<IconButton
					onClick={() => {
						setMetadataDrawerOpen((prevState) => !prevState);
					}}
					style={{
						backgroundColor: 'rgba(255,255,255,1)',
					}}
					size="large"
				>
					<InfoIcon />
				</IconButton>
			</div>
			<MetadataDrawer metadata={metadata} open={metadataDrawerOpen} />
			<Dropzone setData={(data) => setGpxData(data)} />
		</>
	);
};

MlGPXViewer.defaultProps = {};

export default MlGPXViewer;