import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
	Box,
	Button,
	Divider,
	Fade,
	Grid,
	Paper,
	TextField,
	Theme,
	Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
	left: '5%',
	right: '5%',
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
		link: 'https://maps.heigit.org/histosm/wms/',
	},
	{
		id: '2',
		title: 'New Jersey Infrared 1995',
		description:
			'This service was created to provide convenient internet access to 1995 - 1997 New Jersey orthophotos in false color infrared.',
		link: 'https://img.nj.gov/imagerywms/Infrared1995',
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
	openWMSLoader: (boolean: boolean) => void;
}

export default function WMSLinks(props: wmsLinksProps) {
	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
	const [selectedSample, setSelectedSample] = useState<string>();

	const Links = () => {
		return (
			<>
				{mediaIsMobile ? (
					<div style={{ width: '105%', height: '70%' }}>
						{wmsServices.map((el) => (
							<Grid sx={{ marginTop: 5 }} key={el.id} size={12}>
								<Accordion>
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<Typography marginRight={1.5} variant="h6">
											{el.title}
										</Typography>
										<Button
											variant="contained"
											sx={{ marginTop: 0.2 }}
											onClick={() => {
												setSelectedSample(el.link);
												document.getElementById('wms_text_field')?.focus();
												props.openWMSLoader(true);
											}}
										>
											<ContentCopyIcon />
										</Button>
									</AccordionSummary>
									<div>
										<Typography variant="body2">{el.description}</Typography>
										<TextField value={el.link} size="small" />

										<Divider sx={{ marginTop: '10px' }} />
									</div>
								</Accordion>
							</Grid>
						))}
					</div>
				) : (
					<>
						{wmsServices.map((el) => (
							<Grid sx={{ marginTop: 5 }} key={el.id} size={12}>
								<Typography variant="h6">{el.title}</Typography>
								<Typography variant="body2">{el.description}</Typography>
								<TextField value={el.link} size="small"></TextField>
								<Button
									variant="contained"
									sx={{ marginTop: 0.2 }}
									onClick={() => {
										setSelectedSample(el.link);
										document.getElementById('wms_text_field')?.focus();
									}}
								>
									<ContentCopyIcon />
								</Button>
								<Divider sx={{ marginTop: '10px' }} />
							</Grid>
						))}
					</>
				)}
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
						<Paper sx={{ padding: '10px' }}>
							<Grid container>
								<Grid size={10}>
									<Typography id="modal-modal-title" variant="h6">
										WMS Links
									</Typography>
								</Grid>
								<Grid size={2}>
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
