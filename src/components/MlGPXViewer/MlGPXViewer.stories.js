import React, { useState } from 'react';
import MlGPXViewer from './MlGPXViewer';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import GeoJsonProvider from './util/GeoJsonProvider';
import MlGPXViewerInstructions from './util/MlGPXViewerInstructions';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import MlGPXDemoLoader from './util/demoViewer';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const storyoptions = {
	title: 'MapComponents/MlGPXViewer',
	component: MlGPXViewer,
	argTypes: {
		options: {
			control: {
				type: 'object',
			},
		},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [demoMode, setDemoMode] = useState(false);
	const [guide, setGuide] = useState(false);

	const handleClick1 = () => {
		setDemoMode(!demoMode);
		
	};
	const handleClick2 = ()=>{
		setGuide(true);
		setTimeout(()=>{
			setGuide(false)
		}, 9000);
	}

	const textColor = () =>{
		if(demoMode){
			return "white"
		} else {
			return "steelblue"
		}
	}

	const textColor2 = () =>{
		if(guide){
			return "white"
		} else {
			return "steelblue"
		}
	}

	return (
		<>
			<TopToolbar>
				<MlGPXViewerInstructions open={guide} />
				<Button variant="contained" onClick={handleClick2}  color={guide ? "primary" : "inherit"} sx={{ color: textColor2, marginRight: '10px' }}> Guide me through</Button>
				<Button variant="contained" onClick={handleClick1} color={demoMode ? "primary" : "inherit"} sx={{ color: textColor }}> 
					Demo Mode
				</Button>
			</TopToolbar>
			<IconButton
				style={{
					position: 'absolute',
					right: '5px',
					bottom: mediaIsMobile ? '145px' : '130px',
					backgroundColor: 'rgba(255,255,255,1)',
					zIndex: 1000,
				}}
				title="Download sample-data"
				size="large"
				href="assets/sample.gpx"
				target="blank"
			>
				<FileDownloadIcon />
			</IconButton>
			<GeoJsonProvider>
				<MlGPXDemoLoader enabled={demoMode} />
				<MlGPXViewer />
			</GeoJsonProvider>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
