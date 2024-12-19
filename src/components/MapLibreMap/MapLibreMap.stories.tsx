import React, { useState } from "react";

import MapLibreMap, { MapLibreMapProps } from './MapLibreMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { Button } from '@mui/material';
import TopToolbar from '../../ui_components/TopToolbar';
import sample_geojson_1 from '../MlGeoJsonLayer/assets/sample_1.json';
import {FeatureCollection} from 'geojson';
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

const Template = (args:MapLibreMapProps) => {
	return <MapLibreMap options={{ ...args.options }} />;
};

export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
	options: {
		style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
		center: [8.607, 53.1409349],
		zoom: 14,
	},
};

const styles = [
	{ name: 'OSM-Bright', url: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json' },
	{
		name: 'OSM-Fiord-Color',
		url: 'https://wms.wheregroup.com/tileserver/style/osm-fiord-color.json',
	},
];

const StyleChangeTemplate = (args:MapLibreMapProps) => {
	const [activeStyle, setActiveStyle] = useState(styles[1].url);

	return (
		<>
			<TopToolbar
				buttons={
					<>
						{styles.map((style) => (
							<Button
								key={style.name}
								variant={activeStyle === style.url ? 'contained' : 'outlined'}
								onClick={() => {
									setActiveStyle(style.url);
								}}
								sx={{
									marginRight: '10px',
									marginTop: { xs: '10px', sm: '0px' },
								}}
							>
								{style.name}
							</Button>
						))}
					</>
				}
			/>
			<MapLibreMap options={{ ...args.options, style: activeStyle }} />
			<MlGeoJsonLayer type="line" geojson={sample_geojson_1 as FeatureCollection} />
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
