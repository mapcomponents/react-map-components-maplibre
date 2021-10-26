import React from "react";

import MlMarker from "./MlMarker";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlMarker",
  component: MlMarker,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlMarker />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
