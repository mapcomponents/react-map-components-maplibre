import React from "react";

import MlMarker from "./MlMarker";

import mapContextDecorator from "../../decorators/MapContextDecorator";

const storyoptions = {
  title: "MapComponents/MlMarker",
  component: MlMarker,
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => <MlMarker {...args}/>;

export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
  content: 'WhereGroup',
  lng: 7.0851268,
  lat: 50.73884,
  mapId: 'map_1',
};
