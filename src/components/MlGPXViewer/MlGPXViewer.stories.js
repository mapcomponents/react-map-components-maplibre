import React, { useEffect, useState } from 'react';
import MlGPXViewer from './MlGPXViewer';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import GeoJsonProvider from './util/GeoJsonProvider';
import LineStyler from '../MlGeoJsonLayer/story_utils/MlGeoJsonLayer.lineStyler';
import MlGPXViewerInstructions from './util/MlGPXViewerInstructions';
import TopToolbar from '../../ui_components/TopToolbar';
import { Paper, Button } from '@mui/material';
import MlGPXDemoViewer from './util/demoViewer';
import { RestaurantTwoTone } from '@mui/icons-material';
import { Color } from 'maplibre-gl';
import useMap from '../../hooks/useMap';

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

const Template = (props) => {
	const [demoMode, setDemoMode] = useState(false);
	const mapHook = useMap({ mapId: 'map_1' });
	const handleClick = () => {
		setDemoMode(!demoMode);
	
	};
	useEffect(()=>{
		mapHook.map?.map.setCenter([7.100175528281227, 50.73487992742369]);
		mapHook.map?.map.setZoom(10);	
	}, [mapHook.map])

	return (
		<>
			<TopToolbar>
				<MlGPXViewerInstructions />
				<Button variant="contained" onClick={handleClick} color={demoMode ? "primary" : "inherit"}> 
					Demo Mode
				</Button>
			</TopToolbar>
			<GeoJsonProvider>
				<MlGPXDemoViewer enabled={demoMode} />
				<MlGPXViewer ></MlGPXViewer>
			</GeoJsonProvider>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
