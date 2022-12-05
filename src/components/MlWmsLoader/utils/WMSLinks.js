import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
	Modal,
	Box,
	Divider,
	Grid,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
	position: 'absolute',
	top: '20%',
	left: '60%',
	width: '25%',
	height: '55%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	zIndex: 200,
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

export default function WMSLinks(props) {
	const [openModal, setOpenModal] = useState(false);
	const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [selectedSample, setSelectedSample] = useState();

	useEffect(() => {
		if (selectedSample) {
			props.load(selectedSample);
		}
	}, [selectedSample]);

	const handleClick = () => {
		setOpenModal(true);
	};

	const handleClose = () => {
		setOpenModal(false);
	};
	const handleLoad = (e) => {
		if (e.target.innerText === 'HistOSM') {
			setSelectedSample('https://maps.heigit.org/histosm/wms');
		} else if (e.target.innerText === 'magOSM') {
			setSelectedSample('https://magosm.magellium.com/geoserver/wms');
		} else {
			setSelectedSample('https://www.wms.nrw.de/geobasis/wms_nw_vdop');
		}
	};
	const handleSelect = (e) => {
		setSelectedSample(e.target.value);
	};

	return (
		<>
			{props.open && (
				<Box sx={mediaIsMobile ? mobileStyle : modalStyle}>
					<Grid container>
						<Grid xs={10}>
							<Typography id="modal-modal-title" variant="h6">
								WMS Links
							</Typography>
						</Grid>
						<Grid xs={2}>
							<Button onClick={props.close}>
								<CloseIcon sx={{ color: 'black' }} />
							</Button>
						</Grid>
					</Grid>
					<Divider />
					<Box>
						<List>
							<ListItem>
								<ListItemButton value="https://maps.heigit.org/histosm/wms" onClick={handleLoad}>
									<ListItemText>HistOSM </ListItemText>
								</ListItemButton>
							</ListItem>
							<Typography variant="body2" marginLeft={3}> HistOSM is a service to visually explore historic objects stored in the OpenStreetMap database. The WMS serviceis runed by the University of Heidelberg GIScience Research Group. </Typography>
							<Divider variant="middle" component="li" />
							<ListItem>
								<ListItemButton
									value="https://magosm.magellium.com/geoserver/wms"
									onClick={handleLoad}
								>
									<ListItemText>MagOSM </ListItemText>
								</ListItemButton>
								
							</ListItem>
                            <Typography variant="body2" marginLeft={3}> Developed by Magellium, the magOSM project provides services related to thematic data from OpenStreetMap. Currently these services are provided at the scale of metropolitan France. The data of the different services are updated daily.</Typography>
							<Divider variant="middle" component="li" />
							<ListItem>
								<ListItemButton
									value="https://www.wms.nrw.de/geobasis/wms_nw_vdop"
									onClick={handleLoad}
								>
									<ListItemText>NRW vdop </ListItemText>
								</ListItemButton>
							</ListItem>
                            <Typography variant="body2" marginLeft={3}> Orthophotos are high-resolution, undistorted, true-to-scale images of the earth's surface. In this service, the German state of Nordreihn Westfallen provides users with the intermediate results from the production process of digital orthophotos (DOP).</Typography>
							<Divider variant="middle" component="li" />
						</List>
					</Box>
				</Box>
			)}
		</>
	);
}
