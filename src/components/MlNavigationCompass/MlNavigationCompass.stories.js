import React from "react";

import MlNavigationCompass from "./MlNavigationCompass";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlNavigationCompass",
  component: MlNavigationCompass,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlNavigationCompass />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
