import React from "react";

import MlOrderLayers from "./MlOrderLayers";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
	title: "MapComponents/MlOrderLayers",
	component: MlOrderLayers,
	argTypes: {
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => <MlOrderLayers layerIds={['layer1','layer2']} />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};