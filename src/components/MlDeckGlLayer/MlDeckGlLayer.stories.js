import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlDeckGlLayer from "./MlDeckGlLayer";
import MlCompositeLayer from "../MlCompositeLayer/MlCompositeLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlDeckGlLayer",
  component: MlDeckGlLayer,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
  decorators: mapContextDecorator,
};
//<MlCompositeLayer />

const Template = (args) => (
  <TopToolbar>
    <MlDeckGlLayer />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
