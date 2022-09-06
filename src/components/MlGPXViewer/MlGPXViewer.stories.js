import React from "react";

import MlGPXViewer from "./MlGPXViewer";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import GeoJsonProvider from "./util/GeoJsonProvider";

const storyoptions = {
	title: "MapComponents/MlGPXViewer",
	component: MlGPXViewer,
	argTypes: {
		options: {
			control: {
				type: "object",
			},
		},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => (
	<>
		<GeoJsonProvider>
			<MlGPXViewer />
		</GeoJsonProvider>
	</>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
