import React from "react";

import MlCameraFollowPath from "./MlCameraFollowPath";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlCameraFollowPath",
  component: MlCameraFollowPath,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};

const Template = (args) => <MlCameraFollowPath />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
