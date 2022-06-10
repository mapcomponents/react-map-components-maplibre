import React from "react";

import MlAddSource from "./MlAddSource";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlAddSource",
  component: MlAddSource,
  argTypes: {
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlAddSource />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
