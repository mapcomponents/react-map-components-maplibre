import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Typography, Button, Divider, TextField, Grid, Fade, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';


const modalStyle = {
	position: 'absolute',
	zIndex: 500,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '400px',
	height: '600px',
	boxShadow: 20,
	alignItems: 'center',
	padding: 0,
	opacity: 1,
	transition: 'opacity 1s',
};

const mobileStyle = {
	position: 'absolute',
	top: '10%',
	left: '20%',
	width: '60%',
	height: '70%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	zIndex: 200,
	overflow: 'scroll',
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

export interface wmsLinksProps {
	load: (str: string) => void;
	open: boolean;
	close: () => void;
	
}

export default function WMSLinks(props: wmsLinksProps) {
	const mediaIsMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
	const [selectedSample, setSelectedSample] = useState<string>();
	
	const Links = () => {
		return (
			<>
				{wmsServices.map((el) => (
					<Grid item xs={12} sx={{ marginTop: 5 }} key={el.id}>
						<Typography variant="h6">{el.title}</Typography>
						<Typography variant="body2">{el.description}</Typography>
						<TextField value={el.link} size="small"></TextField>
						<Button
							variant="contained"
							sx={{ marginTop: 0.2 }}
							onClick={() => {
								setSelectedSample(el.link);
								document.getElementById('wms_text_field')?.focus()
							}}
						>
							<ContentCopyIcon />
						</Button>
						<Divider sx={{ marginTop: '10px' }} />
					</Grid>
				))}
			</>
		);
	};

	useEffect(() => {
		if (selectedSample) {
			props.load(selectedSample);
		}
	}, [selectedSample]);

	return (
		<>
			{props.open && (
				<Fade in={props.open} appear={false}>
					<Box sx={mediaIsMobile ? mobileStyle : modalStyle}>
						<Paper sx={{ padding: '20px' }}>
							<Grid container>
								<Grid item xs={10}>
									<Typography id="modal-modal-title" variant="h6">
										WMS Links
									</Typography>
								</Grid>
								<Grid item xs={2}>
									<Button onClick={props.close}>
										<CloseIcon sx={{ color: 'text.primary' }} />
									</Button>
								</Grid>
							</Grid>
							<Divider />
							<Grid container>
								<Links />
							</Grid>
						</Paper>
					</Box>
				</Fade>
			)}
		</>
	);
}
