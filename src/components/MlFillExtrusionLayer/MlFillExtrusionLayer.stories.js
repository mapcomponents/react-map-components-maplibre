import React from "react";

import TopToolbar from "../../ui_components/TopToolbar";
import MlFillExtrusionLayer from "./MlFillExtrusionLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlFillExtrusionLayer",
  component: MlFillExtrusionLayer,
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
    <MlFillExtrusionLayer />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
