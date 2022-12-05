import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Modal, Box, Typography, Button, Divider, TextField, Grid, Fade, Zoom } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

const modalStyle = {
	position: 'absolute',
	zIndex: 500,
	top: '55%',
	left: '80%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	height: 600,
	bgcolor: '#F1F1F1',
	border: '2px solid #000',
	boxShadow: 20,
	alignItems: 'center',
	p: 3,
	opacity: 1,
	transition: 'opacity 1s'
};

const mobileStyle = {
	position: 'absolute',
	top: '10%',
	left: '20%',
	width: '60%',
	height: '70%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	zIndex: 200,
	overflow: "scroll"
};

const wmsServices = [
	{
		id: '1',
		title: 'HistOSM',
		description: 'Historic objects stored in the OpenStreetMap database',
		link: 'https://maps.heigit.org/histosm/wms',
	},
	{
		id: '2',
		title: 'MagOSM',
		description:
			'MagOSM is a project of the company Magellium which offers services related to thematic data from OpenStreetMap. Currently these services are provided at the scale of metropolitan France. The data of the different services are updated daily.',
		link: 'https://magosm.magellium.com/geoserver/wms',
	},
	{
		id: '3',
		title: 'NRW_vdop',
		description:
			'The WMS NW vDOP Geobasis North Rhine-Westphalia provides intermediate results from the production process of the digital orthophotos (DOP).',
		link: 'https://www.wms.nrw.de/geobasis/wms_nw_vdop',
	},
];

export default function WMSLinks(props) {

	const [openModal, setOpenModal] = useState(false);
	const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [selectedSample, setSelectedSample] = useState();

	const Links = () => {
		return wmsServices.map((el) => (
			<>
				<Grid sx={{ marginTop: 5 }}>
					<Typography variant="h6">{el.title}</Typography>
					<Typography variant="body2">{el.description}</Typography>
					<TextField value={el.link} size='small' sx={{width:300}}></TextField>
					<Button
						variant="contained"
						sx={{marginTop:0.2}}
						onClick={() => {setSelectedSample(el.link)}}
					>
						<ContentCopyIcon/>
					</Button>
					<Divider sx={{marginTop:2}} />
				</Grid>
			</>
		));
	};

	useEffect(() => {
		if (selectedSample) {
			props.load(selectedSample);
		}
	}, [selectedSample]);


	const handleClose = () => {
		setOpenModal(false);
	};

	return (
		<>
			{props.open && (
				<Fade in={props.open} appear="false">
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
						<Links />
					</Box>
				</Box>
				</Fade>
			)}
			
		</>
	);
}
