import React from "react";

import MlUseMapDebugger, { MlUseMapDebuggerProps } from "./MlUseMapDebugger";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
	title: "MapComponents/MlUseMapDebugger",
	component: MlUseMapDebugger,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props:MlUseMapDebuggerProps) => {
	return (
		<>
			<MlUseMapDebugger {...props} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	mapId: "map_1",
};
