import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlKeplerGlLayer from "./MlKeplerGlLayer";

import keplerDecorator from "../../decorators/KeplerDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlKeplerGlLayer",
  component: MlKeplerGlLayer,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
  decorators: keplerDecorator,
};

const Template = (args) => <MlKeplerGlLayer />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
