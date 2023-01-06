import React from "react";

import useGpx from "./useGpx";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
	title: "MapComponents/useGpx",
	component: useGpx,
	argTypes: {
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => <useGpx />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
