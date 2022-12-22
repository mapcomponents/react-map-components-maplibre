import React, { useContext, useRef, useEffect, useState } from 'react';
import { bbox } from '@turf/turf';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import FileCopy from '@mui/icons-material/FileCopy';
import InfoIcon from '@mui/icons-material/Info';
import { LngLatBoundsLike } from 'maplibre-gl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import GeoJsonContext from './util/GeoJsonContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import useMap from '../../hooks/useMap';
import useGpx from '../../hooks/useGpx/useGpx';
import Dropzone from '../../ui_components/Dropzone';
import useLayerHoverPopup from '../../hooks/useLayerHoverPopup/useLayerHoverPopup';
import useSource from '../../hooks/useSource';
import useLayer from '../../hooks/useLayer';
import UploadButton from '../../ui_components/UploadButton';

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

interface MetadataType {
	title: string;
	value: string;
	id: number;
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

	const [open, setIsOpen] = useState(false);
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
						setIsOpen((prevState) => !prevState);
					}}
					style={{
						backgroundColor: 'rgba(255,255,255,1)',
					}}
					size="large"
				>
					<InfoIcon />
				</IconButton>
			</div>
			<Drawer variant="persistent" anchor="left" open={open}>
				<Typography
					variant="h6"
					style={{
						textAlign: 'center',
						padding: '1em',
					}}
					noWrap
				>
					Informationen zur Route
				</Typography>
				<Divider />
				<List>
					{metadata.map((item) => (
						<ListItem key={`item--${item.id}`}>
							<ListItemText primary={item.value} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<Dropzone setData={(data) => setGpxData(data)} />
		</>
	);
};

MlGPXViewer.defaultProps = {};

export default MlGPXViewer;