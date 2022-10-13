import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlDeckGlTerrainLayer from "./MlDeckGlTerrainLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

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
//<MlFillExtrusionLayer />

const Template = (args) => (
  <TopToolbar>
    <MlDeckGlTerrainLayer />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
