import React from 'react';
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
	height: 500,
	bgcolor: '#F1F1F1',
	border: '2px solid #000',
	boxShadow: 20,
	alignItems: 'center',
	p: 3,
	opacity: 1,
	transition: 'opacity 1s'
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
						onClick={() => {
							navigator.clipboard.writeText(el.link);
							props.open = false;
						}}
					>
						<ContentCopyIcon/>
					</Button>
					<Divider sx={{marginTop:2}} />
				</Grid>
			</>
		));
	};

	return (
		<>
			{props.open && (
				<Fade in={props.open} appear="false"> 
				<Box sx={modalStyle}>
					<Button sx={{ marginLeft: 45 }} onClick={props.callback} ><CloseIcon /></Button>
					<Typography id="modal-modal-title" variant="h5" component="h4">
						WMS demo links
					</Typography>

					<Typography id="modal-modal-description" variant="body2">
						This are some sample WMS services to load in the map
					</Typography>
					<Divider />
					<Box sx={{ width: 400, height: 400, bgcolor: "white", overflowY: 'scroll', p:1 }}>
						<Links />
					</Box>
				</Box>
				</Fade>
			)}
		</>
	);
}
