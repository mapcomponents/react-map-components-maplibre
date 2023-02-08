import React, { useState } from "react";

import MapLibreMap from './MapLibreMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { Button } from '@mui/material';
import TopToolbar from '../../ui_components/TopToolbar';
import sample_geojson_1 from '../MlGeoJsonLayer/assets/sample_1.json';

import themeDecorator from '../../decorators/ThemeDecorator';

const storyoptions = {
	title: 'Core/MapLibreMap',
	component: MapLibreMap,
	argTypes: {
		options: {
			control: {
				type: 'object',
			},
		},
	},
	decorators: themeDecorator,
	parameters: {
		sourceLink: 'components/MapLibreMap/MapLibreMap.tsx',
	},
};
export default storyoptions;

const Template = (args) => {
	return (
		<MapLibreMap
			options={{ ...args.options }}
			style={{
				position: 'absolute',
				height: '100vh',
				width: '100vw',
				top: 0,
				right: 0,
				left: 0,
				bottom: 0,
				zIndex: 100,
			}}
		/>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
	options: {
		style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
		center: [8.607, 53.1409349],
		zoom: 14,
	},
};

const StyleChangeTemplate = (args) => {
	const [activeStyle, setActiveStyle] = useState(
		'https://wms.wheregroup.com/tileserver/style/osm-fiord-color.json'
	);
	const [showOsmFiord, setShowOsmFiord] = useState(true);

	return (
		<>
			<TopToolbar
				buttons={
					<>
						<Button
							variant={showOsmFiord ? 'outlined' : 'contained'}
							onClick={() => {
								setActiveStyle('https://wms.wheregroup.com/tileserver/style/osm-bright.json');
								setShowOsmFiord(false);
							}}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							OSM-Bright
						</Button>
						<br />
						<br />
						<Button
							variant={showOsmFiord ? 'contained' : 'outlined'}
							onClick={() => {
								setActiveStyle('https://wms.wheregroup.com/tileserver/style/osm-fiord-color.json');
								setShowOsmFiord(true);
							}}
						>
							OSM-Fiord-Color
						</Button>
					</>
				}
			/>
			<MapLibreMap
				options={{ ...args.options, style: activeStyle }}
				style={{
					position: 'absolute',
					height: '100vh',
					width: '100vw',
					top: 0,
					right: 0,
					left: 0,
					bottom: 0,
					zIndex: 100,
				}}
			/>
			<MlGeoJsonLayer type="line" geojson={sample_geojson_1} />
		</>
	);
};

export const StyleChangeConfig = StyleChangeTemplate.bind({});
StyleChangeConfig.args = {
	options: {
		zoom: 14.5,
		center: [7.0851268, 50.73884],
	},
};
StyleChangeConfig.parameters = {};
