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
			id: "landuse1",
			type: "line",
			"source-layer": "landuse",
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: { "line-width": 2, "line-color": "#ff0000" },
		},
		{
			id: "landuse2",
			type: "line",
			"source-layer": "landuse",
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: { "line-width": 1.5, "line-color": "green" },
		},
	],
	sourceOptions: {
		minzoom: 0,
		maxzoom: 20,
	},
};
//
