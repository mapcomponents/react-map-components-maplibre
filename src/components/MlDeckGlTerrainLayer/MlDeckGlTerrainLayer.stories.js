import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlDeckGlTerrainLayer from "./MlDeckGlTerrainLayer";
import MlCompositeLayer from "../MlCompositeLayer/MlCompositeLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const storyoptions = {
  title: "MapComponents/MlDeckGlTerrainLayer",
  component: MlDeckGlTerrainLayer,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
  decorators: mapContextDecorator,
};
export default storyoptions;
//<MlCompositeLayer />

const Template = (args) => (
  <TopToolbar>
    <MlDeckGlTerrainLayer />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
