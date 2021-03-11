import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlThreeJsLayer from "./MlThreeJsLayer";
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
};

const Template = (args) => (
  <TopToolbar>
    <MlThreeJsLayer />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
