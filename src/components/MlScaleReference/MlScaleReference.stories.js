import React from "react";

import MlScaleReference from "./MlScaleReference";

import TopToolbar from "../../ui_components/TopToolbar";
import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlScaleReference",
  component: MlScaleReference,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => (
  <TopToolbar>
    <MlScaleReference {...props} />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
