import React, { useEffect, useState } from 'react';

import MlSpatialElevationProfile from './MlSpatialElevationProfile';
import MlGPXViewer from '../MlGPXViewer/MlGPXViewer';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import GeoJsonProvider from '../../components/MlGPXViewer/util/GeoJsonProvider';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import TopToolbar from '../../ui_components/TopToolbar';
import useMap from '../../hooks/useMap';
import MlSpatialElevationProfileInstructions from './util/MlSpatialElevationProfileInstructions';
import { Button } from '@mui/material';
import MlSpatialElevationProfileDemoViewer from '../MlGPXViewer/util/MlGPXDemoLoader';

const storyoptions = {
	title: 'MapComponents/MlSpatialElevationProfile',
	component: MlSpatialElevationProfile,
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

const Template = (args) => {
	const mediaIsMobile = useMediaQuery('(max-width:900px)');

	const [demoMode, setDemoMode] = useState(false);
	const [guide, setGuide] = useState(false);
	const mapHook = useMap({ mapId: 'map_1' });

	const handleClick1 = () => {
		setDemoMode(!demoMode);
	};
	const handleClick2 = () => {
		setGuide(true);
		setTimeout(() => {
			setGuide(false);
		}, 9000);
	};

	const textColor = () => {
		if (demoMode) {
			return 'white';
		} else {
			return 'steelblue';
		}
	};

	const textColor2 = () => {
		if (guide) {
			return 'white';
		} else {
			return 'steelblue';
		}
	};

	useEffect(() => {
		if (!mapHook.map) return;
		if (mapHook.map.map.getPitch() != 60) {
			mapHook.map.map.setPitch(60);
		}
	}, [mapHook.map]);

	return (
		<>
			<TopToolbar>
				<MlSpatialElevationProfileInstructions open={guide} />
				<Button
					variant="contained"
					onClick={handleClick2}
					color={guide ? 'primary' : 'inherit'}
					sx={{ color: textColor2, marginRight: '10px' }}
				>
					Guide me through
				</Button>
				<Button
					variant="contained"
					onClick={handleClick1}
					color={demoMode ? 'primary' : 'inherit'}
					sx={{ color: textColor }}
				>
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
				<MlSpatialElevationProfileDemoViewer enabled={demoMode} />
				<MlGPXViewer />
				<MlSpatialElevationProfile />
			</GeoJsonProvider>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
