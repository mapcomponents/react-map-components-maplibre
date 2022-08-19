import React from "react";

import MlGeojsonLayerWithSource from "./MlGeojsonLayerWithSource";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlGeojsonLayerWithSource",
  component: MlGeojsonLayerWithSource,
  argTypes: {
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlGeojsonLayerWithSource />;

export const ExampleConfig = Template.bind({});
ExampleConfig.args = { mapID: "map_1" };
