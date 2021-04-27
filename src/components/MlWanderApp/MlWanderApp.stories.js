import React from "react";

import MlWanderApp from "./MlWanderApp";

import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Applications/MlWanderApp",
  component: MlWanderApp,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: multiMapContextDecorator,
};

const Template = (args) =>  <MlWanderApp wmsLayerMapId={args.wmsLayerMapId} />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  wmsLayerMapId: "map_2",
};
