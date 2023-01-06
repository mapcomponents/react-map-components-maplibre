import React, { useRef } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
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

interface MlGpxDemoLoaderProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	setGpx: (gpx: string | undefined) => void;
}

const samples = [
	{
		name: 'mountain_trail.gpx',
		path: 'assets/sample1.gpx',
	},
	{
		name: 'bycycle_tour.gpx',
		path: 'assets/sample2.gpx',
	},
	{
		name: 'treckking.gpx',
		path: 'assets/sample2.gpx',
	},
];
/**
 * MlGpxDemoLoader returns a button to load a Demo GPX Track into the map.
 */
const MlGpxDemoLoader = (props: MlGpxDemoLoaderProps) => {
	const reader = useRef(new FileReader());
	reader.current.onload = () => {
		if (!reader?.current?.result) return;
		if (typeof reader.current.result === 'string') {
			props.setGpx(reader.current.result);
		}
		handleClose();
	};

	const mediaIsMobile = useMediaQuery('(max-width:900px)');

	const loadSample = (samplePath: string) => {
		fetch(samplePath)
			.then(function (response) {
				return response.blob();
			})
			.then(function (gpx) {
				reader.current.readAsText(gpx);
			})
			.catch((error) => console.log(error));
	};

	const handleClose = () => {
		props.setOpen(false);
	};

	return (
		<>
			<Modal
				open={props.open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={mediaIsMobile ? mobileStyle : modalStyle}>
					<Grid container>
						<Grid item xs={10}>
							<Typography id="modal-modal-title" variant="h6">
								GPX demo files
							</Typography>
						</Grid>
						<Grid item xs={2}>
							<Button onClick={handleClose}>
								<CloseIcon sx={{ color: 'black' }} />
							</Button>
						</Grid>
					</Grid>
					<Divider />

					<List>
						{samples.map((el, idx) => (
							<>
								<ListItem key={idx}>
									<ListItemButton onClick={() => loadSample(el.path)}>
										<ListItemText>{el.name}</ListItemText>
									</ListItemButton>
								</ListItem>
								<Divider key={'div' + idx} variant="inset" component="li" />
							</>
						))}
					</List>
				</Box>
			</Modal>
		</>
	);
};

export default MlGpxDemoLoader;
