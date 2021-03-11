import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlThreeJsLayer from "./MlThreeJsLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlThreeJsLayer",
  component: MlThreeJsLayer,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
  decorators: mapContextDecorator,
};

const Template = (args) => (
  <TopToolbar>
    <MlThreeJsLayer />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
