import React from "react";

import useLayerHoverPopup from "./useLayerHoverPopup";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
	title: "MapComponents/useLayerHoverPopup",
	component: useLayerHoverPopup,
	argTypes: {
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => <useLayerHoverPopup />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
