import React from "react";

import MlNavigationTools from "./MlNavigationTools";

import noNavToolsDecorator from "../../decorators/NoNavToolsDecorator";
import BuildIcon from "@mui/icons-material/Build";
import Button from "@mui/material/Button";

const storyoptions = {
	title: 'MapComponents/MlNavigationTools',
	component: MlNavigationTools,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: noNavToolsDecorator,
};
export default storyoptions;

const Template = (args) => <MlNavigationTools {...args} />;
export const DefaultConfig = Template.bind({});
DefaultConfig.parameters = {};
DefaultConfig.args = {};

export const No3dButton = Template.bind({});
No3dButton.parameters = {};
No3dButton.args = {
	show3DButton: false,
};

export const ShowCenterLocationButton = Template.bind({});
ShowCenterLocationButton.parameters = {};
ShowCenterLocationButton.args = {
	showFollowGpsButton: false,
	showCenterLocationButton: true,
};

export const AlterToolPosition = Template.bind({});
AlterToolPosition.parameters = {};
AlterToolPosition.args = {
	sx: { top: '10px' },
};

export const NoZoomButtons = Template.bind({});
NoZoomButtons.parameters = {};
NoZoomButtons.args = {
	showZoomButtons: false,
};

export const NoFollowGpsButton = Template.bind({});
NoFollowGpsButton.parameters = {};
NoFollowGpsButton.args = {
	showFollowGpsButton: false,
};

export const CustomButton = Template.bind({});
CustomButton.parameters = {};
CustomButton.args = {
	children: (
		<Button variant="navtools" onClick={() => {}}>
			<BuildIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
		</Button>
	),
};
export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};

