import React from "react";

import MlLayer from "./MlLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlLayer",
  component: MlLayer,
  argTypes: {
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlLayer />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
