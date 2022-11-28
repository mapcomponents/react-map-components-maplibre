import React from "react";

import MlTemporalController from "./MlTemporalController";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
	title: "MapComponents/MlTemporalController",
	component: MlTemporalController,
	argTypes: {
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlTemporalController />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
