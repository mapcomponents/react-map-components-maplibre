import * as React from 'react';
import { useState, useContext, useEffect, useRef } from 'react';
import { useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FileCopy from '@mui/icons-material/FileCopy';
import InfoIcon from '@mui/icons-material/Info';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { addGPXToMap } from '../MlGPXViewer';
import toGeoJSON from "../gpxConverter";
import sample1 from '../util/sample1.json';
import useMap from '../../../hooks/useMap';
import MlGeoJsonLayer from '../../MlGeoJsonLayer/MlGeoJsonLayer';
import sample_1 from '../../MlGeoJsonLayer/assets/sample_1.json';


const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '80%',
	transform: 'translate(-50%, -50%)',
	width: 150,
	height: 300,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function MlGPXViewerSampleLoader() {
	const reader = new FileReader();
	const mapHook = useMap( {mapId:"MapId_1"});
	const initializedRef = useRef(false);
	const mediaIsMobile = useMediaQuery('(max-width:900px)');

	//const dataSource = useContext(GeoJsonContext);

	const sourceName = "import-source";
	const layerNameLines = "importer-layer-lines";
	const layerNamePoints = "importer-layer-points";

	const [open, setOpen] = useState(false);
	const [openSample1, setOpenSample1] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	
	const loadSample1 = () => {
		setOpen(false);
		setOpenSample1(true);
		console.log()
	};

	
	/*
	const file = reader.readAsText('../util/sample.gpx');
	const GPXfile = toGeoJSON.gpx(file);

	console.log(GPXfile);
*/
	
/*
	React.useEffect(() => {
		if (openSample1) {
			addGPXToMap(GPXfile);
		}
	}, [openSample1]);
*/
	return (
		<>
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={modalStyle}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							GPX demo files
						</Typography>
						<Divider />
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Here a list of demo files to display in the map
						</Typography>
						<Button onClick={loadSample1}> sample1.gpx </Button>
					</Box>
				</Modal>
			</div>
			<div
				style={{
					position: 'fixed',
					right: '5px',
					bottom: mediaIsMobile ? '240px' : '150px',
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					zIndex: 1000,
				}}
			>
				<IconButton
					//onClick={manualUpload}
					style={{
						backgroundColor: 'rgba(255,255,255,1)',
					}}
					size="large"
					onClick={handleOpen}
				>
					<input
						//ref={fileupload}
						//onChange={fileUploadOnChange}
						type="file"
						id="input"
						multiple
						style={{ display: 'none' }}
					></input>
					<FilePresentIcon />
				</IconButton>
			</div>

			{openSample1 && (
				<MlGeoJsonLayer 
			type="line"
            mapId="map_1"
            layerId="Sample1"
            geojson={sample_1}
				/>
			)}
		</>
	);
}
