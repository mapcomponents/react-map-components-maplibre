import React from "react";

import MlGeoJsonLayer from "./MlGeoJsonLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const storyoptions = {
  title: "MapComponents/MlGeoJsonLayer",
  component: MlGeoJsonLayer,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlGeoJsonLayer />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
