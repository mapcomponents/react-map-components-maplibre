import React, { useState } from 'react';

import MlVectorTileLayer, { MlVectorTileLayerProps } from './MlVectorTileLayer';
import TopToolbar from '../../ui_components/TopToolbar';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import { Button } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlVectorTileLayer',
	component: MlVectorTileLayer,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args:MlVectorTileLayerProps) => {
	const [showLayer, setShowLayer] = useState(true);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						color="primary"
						variant={showLayer ? 'contained' : 'outlined'}
						onClick={() => setShowLayer(!showLayer)}
					>
						Vector Tile Layer
					</Button>
				}
			/>
			{showLayer ? <MlVectorTileLayer {...args} /> : ''}
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	mapId: 'map_1',
	url: 'https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf',
	layers: [
		{
			id: 'water',
			type: 'fill',
			'source-layer': 'water',
			layout: {},
			paint: { 'fill-color': '#0905f5', 'fill-opacity': 0.5 },
			maxzoom: 20,
		},
		{
			id: 'buildings',
			type: 'fill',
			'source-layer': 'building',
			layout: {},
			paint: { 'fill-color': '#717875' },
			maxzoom: 20,
		},
	],
	sourceOptions: {
		minzoom: 0,
	},
};
//
