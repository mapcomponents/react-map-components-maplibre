import React from "react";

import MlVectorTileLayer from "./MlVectorTileLayer";
import TopToolbar from "../../ui_components/TopToolbar";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
	title: "MapComponents/MlVectorTileLayer",
	component: MlVectorTileLayer,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => (
	<TopToolbar>
		<MlVectorTileLayer {...args} />
	</TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	mapId: "map_1",
	url:
		"https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf",
	layers: [
		{
			id: "water",
			type: "fill",
			"source-layer": "water",
			layout: {},
			paint: { "fill-color": "#0905f5", "fill-opacity": 0.5 },
		},
		{
			id: "buildings",
			type: "fill",
			"source-layer": "building",
			layout: {},
			paint: { "fill-color": "#717875" },
		},
	],
	sourceOptions: {
		minzoom: 0,
		maxzoom: 20,
	},
};
//
