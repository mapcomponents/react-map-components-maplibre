import React from "react";

import MlNavigationTools from "./MlNavigationTools";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlNavigationTools",
  component: MlNavigationTools,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlNavigationTools />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
