import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlHillshadeLayer from "./MlHillshadeLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlHillshadeLayer",
  component: MlHillshadeLayer,
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

const Template = (args) => (
  <TopToolbar>
    <MlHillshadeLayer />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
