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
	const [guide, setGuide] = useState(false);
	const mapHook = useMap({ mapId: 'map_1' });

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
				<Button variant="contained" onClick={handleClick2}  color={guide ? "primary" : "inherit"} sx={{ color: textColor2 }}> Guide me through</Button>
				<Button variant="contained" onClick={handleClick1} color={demoMode ? "primary" : "inherit"} sx={{ color: textColor }}> 
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
