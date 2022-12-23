import React, { useContext, useRef, useEffect, useState, useCallback } from 'react';
import { bbox } from '@turf/turf';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InfoIcon from '@mui/icons-material/Info';
import FileCopy from '@mui/icons-material/FileCopy';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import GeoJsonContext from './GeoJsonContext';
import toGeoJSON from '../gpxConverter';
import useMediaQuery from '@mui/material/useMediaQuery';
import useMap from '../../../hooks/useMap';
import Grid from '@mui/material/Grid';
import { ListItemButton } from '@mui/material';

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '60%',
	width: 350,
	height: 280,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

const mobileStyle = {
	position: 'absolute',
	top: '30%',
	left: '20%',
	width: 200,
	height: 300,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

/**
 * MlGpxDemoLoader returns a button to load a Demo GPX Track into the map.
 */
const MlGpxDemoLoader = (props) => {
	const [openModal, setOpenModal] = useState(false);
	const [infoOpen, setInfoOpen] = useState(false);
	const [metaData, setMetaData] = useState([]);
	const [selectedSample, setSelectedSample] = useState();
	const mapHook = useMap({ mapId: 'map_1' });
	const dataSource = useContext(GeoJsonContext);
	const sourceName = 'import-source';
	const [file, setFile] = useState();
	const reader = useRef(new FileReader());
	reader.current.onload = (payload) => {
		if (!payload) return;
		setFile(payload.currentTarget.result);
	};

	const mediaIsMobile = useMediaQuery('(max-width:900px)');

	const toogleDrawer = () => {
		setInfoOpen(!infoOpen);
	};

	const handleClick = () => {
		setOpenModal(true);
	};

	const handleSelect = (e) => {
		if (e.target.innerText === 'mountain_trail.gpx') {
			setSelectedSample('assets/sample1.gpx');
		} else if (e.target.innerText === 'bycycle_tour.gpx') {
			setSelectedSample('assets/sample2.gpx');
		} else {
			setSelectedSample('assets/sample3.gpx');
		}

		e.target.style.backgroundColor = 'lightgray';
	};

	useEffect(() => {
		if (!selectedSample) return;
		fetch(selectedSample)
			.then(function (response) {
				return response.blob();
			})
			.then(function (gpx) {
				reader.current.readAsText(gpx);
			});
	}, [selectedSample]);

	const handleLoad = useCallback(() => {
		addGPXToMap(file);
		setOpenModal(false);
	}, [file]);

	const handleClose = () => {
		setOpenModal(false);
	};

	const addGPXToMap = (gpxAsString) => {
		if (!mapHook.map || !dataSource.setData) return;
		try {
			setMetaData([]);
			const domParser = new DOMParser();
			const gpxDoc = domParser.parseFromString(gpxAsString, 'application/xml');
			const metadata = gpxDoc.querySelector('metadata');
			metadata?.childNodes.forEach((node) => {
				let value = node.textContent;
				const title = node.nodeName;

				if (node.nodeName === 'link') {
					value = node.getAttribute('href');
				}
				if (value?.trim().length) {
					const metaDatEntry = {
						title: title,
						value: value,
						id: new Date().getTime(),
					};
					setMetaData((prevState) => [...prevState, metaDatEntry]);
				}
			});
			const data = toGeoJSON.gpx(gpxDoc);
			dataSource.setData(data);
			mapHook.map.map.getSource(sourceName).setData(data);
			const bounds = bbox(data);
			mapHook.map.map.fitBounds(bounds);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={mediaIsMobile ? mobileStyle : modalStyle}>
					<Grid container>
						<Grid xs={10}>
							<Typography id="modal-modal-title" variant="h6">
								GPX demo files
							</Typography>
						</Grid>
						<Grid xs={2}>
							<Button onClick={handleClose}>
								<CloseIcon sx={{ color: 'black' }} />
							</Button>
						</Grid>
					</Grid>
					<Divider />

					<List>
						<ListItem>
							<ListItemButton value="sample1" onClick={handleSelect}>
								<ListItemText> mountain_trail.gpx </ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider variant="inset" component="li" />
						<ListItem>
							<ListItemButton value="sample2" onClick={handleSelect}>
								<ListItemText> bycycle_tour.gpx </ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider variant="inset" component="li" />
						<ListItem>
							<ListItemButton value="sample3" onClick={handleSelect}>
								<ListItemText>treckking.gpx </ListItemText>
							</ListItemButton>
						</ListItem>
						<Divider variant="inset" component="li" />
					</List>

					<Grid>
						<Button
							variant="outlined"
							onClick={handleLoad}
							sx={{ display: 'block', marginLeft: 'auto' }}
						>
							Load
						</Button>
					</Grid>
				</Box>
			</Modal>

			<Drawer variant="persistent" anchor="left" open={infoOpen}>
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
					{metaData.map((item) => (
						<ListItem key={`item--${item.id}`}>
							<ListItemText primary={item.value} />
						</ListItem>
					))}
				</List>
			</Drawer>

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
							backgroundColor: '#cbd300',
						}}
						size="large"
					>
						<FileCopy />
					</IconButton>
					<IconButton
						onClick={toogleDrawer}
						style={{
							backgroundColor: '#cbd300',
						}}
						size="large"
					>
						<InfoIcon />
					</IconButton>
				</div>
			)}
		</>
	);
};

export default MlGpxDemoLoader;
