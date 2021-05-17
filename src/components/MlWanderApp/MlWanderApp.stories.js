import React from "react";

import MlWanderApp from "./MlWanderApp";

import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";

const storyoptions = {
  title: "Applications/MlWanderApp",
  component: MlWanderApp,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: multiMapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlWanderApp wmsLayerMapId={args.wmsLayerMapId} />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  wmsLayerMapId: "map_2",
};
