import React from "react";

import MlLayerSwipe from "./MlLayerSwipe";
import TopToolbar from "../../ui_components/TopToolbar";

import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlLayerSwipe",
  component: MlLayerSwipe,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: multiMapContextDecorator,
};

const Template = (args) => (
  <TopToolbar>
    <MlLayerSwipe map1Id="map_1" map2Id="map_2" />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
//
