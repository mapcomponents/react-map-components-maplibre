import React, { useEffect, useRef } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import { Fade, ListItemButton, Paper, Theme } from '@mui/material';

const modalStyle = {
	position: 'absolute',
	zIndex: 500,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '400px',
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
	bgcolor: 'background.paper',
	boxShadow: 24,
	zIndex: 200,
	overflow: 'scroll',
};

interface MlGpxDemoLoaderProps {
	open: boolean;
	close: () => void;
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
		path: 'assets/sample3.gpx',
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
	};

	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

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

	useEffect(() => {
		loadSample('assets/sample2.gpx');
	}, []);

	return (
		<>
			{props.open && (
				<Fade in={props.open} appear={false}>
					<Box sx={mediaIsMobile ? mobileStyle : modalStyle}>
						<Paper sx={{ padding: '20px' }}>
							<Grid container>
								<Grid item xs={10}>
									<Typography id="modal-modal-title" variant="h6">
										GPX demo files
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
								<List>
									{samples.map((el, idx) => (
										<>
											<ListItem key={idx}>
												<ListItemButton
													onClick={() => {
														loadSample(el.path);
														props.close();
													}}
												>
													<ListItemText>{el.name}</ListItemText>
												</ListItemButton>
											</ListItem>
											<Divider key={'div' + idx} variant="inset" component="li" />
										</>
									))}
								</List>
							</Grid>
						</Paper>
					</Box>
				</Fade>
			)}
		</>
	);
};

export default MlGpxDemoLoader;
