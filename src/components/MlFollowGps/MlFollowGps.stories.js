import React from "react";

import MlFollowGps from "./MlFollowGps";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
	title: "MapComponents/MlFollowGps",
	component: MlFollowGps,
	argTypes: {
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => <MlFollowGps {...props}/>;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	followUserPosition: false
};
