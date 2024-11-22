import React from "react";
import MlCreatePngButton from "./MlCreatePngButton";
import TopToolbar from "../../ui_components/TopToolbar";
import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
	title: 'MapComponents/MlCreatePngButton',
	component: MlCreatePngButton,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => <TopToolbar unmovableButtons={<MlCreatePngButton />} />;

export const ExampleConfig = Template.bind({});
