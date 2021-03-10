import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlCompositeLayer from "./MlCompositeLayer";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlCompositeLayer",
  component: MlCompositeLayer,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
};

const Template = (args) => (
  <TopToolbar>
    <MlCompositeLayer />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
