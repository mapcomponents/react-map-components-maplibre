import React, { useContext, useRef, useEffect, useState } from 'react';
import turf, { bbox, center } from '@turf/turf';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';
import FileCopy from '@mui/icons-material/FileCopy';
import { Popup, LngLatBoundsLike, GeoJSONSource } from 'maplibre-gl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import GeoJsonContext from './GeoJsonContext';
import toGeoJSON from '../gpxConverter';
import useMediaQuery from '@mui/material/useMediaQuery';
import useMap from '../../../hooks/useMap';
import sample1 from '../util/sample1.json';
import sample2 from '../util/sample2.json';
import sample3 from '../util/sample3.json';
//import sample_1 from '../../MlGeoJsonLayer/assets/sample_1.json'
import MlGeoJsonLayer from '../../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { Zoom } from '@mui/material';

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '80%',
	width: 150,
	height: 300,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

/**
 * MlGPXVDemoiewer returns a button to load a Demo GPX Track into the map.
 */
const MlGPXDemoViewer = (props) => {
	const initializedRef = useRef(false);
	const [openModal, setOpenModal] = useState(false);
	const [open, setIsOpen] = useState(false);
	const [showLayers, setShowLayers] = useState(true);
	const [metaData, setMetaData] = useState([]);
	const [selectedSample, setSelectedSample] = useState();
	const mapHook = useMap({ mapId: 'map_1' });
	const dataSource = useContext(GeoJsonContext);
	const sourceName = 'import-source';
	const layerNameLines = 'importer-layer-lines';
	const layerNamePoints = 'importer-layer-points';

	const mediaIsMobile = useMediaQuery('(max-width:900px)');

	const toogleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	const handleClick = (e) => {
		setOpenModal(true);
	};

	const handleSelect = (e) => {
		
		setShowLayers(true);

			if (e.target.value === 'sample1') {
			setSelectedSample(sample1);
		} else if (e.target.value === 'sample2') {
			setSelectedSample(sample2);
		} else {
			setSelectedSample(sample3);
		}

	};
	const handleLoad = () => {
		setOpenModal(false);
		if (props.enabled && selectedSample !== undefined){
		setCamera();
		}
	}

	
	const handleClose = () => {
		setOpenModal(false);
		
	};

	
	useEffect(() => {
		if (!props.enabled) {
			setShowLayers(false);
		}
	}, [props.enabled]);


	function setCamera() {
		let bounds = bbox(selectedSample);
//		let gpxCenter = center(selectedSample);
console.log(bounds);
		mapHook.map.map.fitBounds([bounds[0]-0.01,bounds[1]-0.01,bounds[2]+0.01,bounds[3]+0.01]);
	}
	

	return (
		<>
			{showLayers && (
				<>
					<MlGeoJsonLayer
						type="line"
						mapId="map_1"
						layerId="gpx-line"
						geojson={selectedSample}
						paint={{
							'line-width': 4,
							'line-color': 'rgba(212, 55, 23,0.5)',
						}}
					/>
					<MlGeoJsonLayer
						type="circle"
						mapId="map_1"
						layerId="gpx-point"
						geojson={selectedSample}
						options={{ filter: ['==', '$type', 'Point'] }}
						paint={{ 'circle-color': 'rgba(72, 77, 99,0.5)', 'circle-radius': 7 }}
					/>
				</>
			)}

			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						GPX demo files
					</Typography>
					<Divider />
				
					<Button value="sample1" onClick={handleSelect}>
						mountain_trail.gpx
					</Button>
					<Button value="sample2" onClick={handleSelect}>
						bycycle_tour.gpx
					</Button>
					<Button value="sample3" onClick={handleSelect}>
						treckking.gpx
					</Button>

					<Button variant='outlined' onClick={handleLoad}> Load </Button>
				</Box>
			</Modal>

			{props.enabled && (
				<div
					style={{
						position: 'fixed',
						right: '5px',
						bottom: mediaIsMobile ? '40px' : '25px',
						display: 'flex',
						flexDirection: 'column',
						gap: '5px',
						zIndex: 3000,
					}}
				>
					<IconButton
						onClick={handleClick}
						style={{
							backgroundColor: 'red',
						}}
						size="large"
					>
						<FileCopy />
					</IconButton>
					<IconButton
						onClick={toogleDrawer}
						style={{
							backgroundColor: 'rgba(255,255,255,1)',
						}}
						size="large"
					>
						<InfoIcon />
					</IconButton>
				</div>
			)}
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
					{metaData?.map((item) => (
						<ListItem key={`item--${item.id}`}>
							<ListItemText primary={item.value} />
						</ListItem>
					))}
				</List>
			</Drawer>
		</>
	);
};

export default MlGPXDemoViewer;
