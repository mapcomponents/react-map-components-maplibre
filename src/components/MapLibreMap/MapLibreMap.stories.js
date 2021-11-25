import React from "react";

import MapLibreMap from "./MapLibreMap";
import { MapComponentsProvider } from "@mapcomponents/react-core";

const storyoptions = {
  title: "Core/MapLibreMap",
  component: MapLibreMap,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
  },
};
export default storyoptions;

const Template = (args) => (
  <MapComponentsProvider>
    <MapLibreMap options={args.options} />
  </MapComponentsProvider>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
  options: {
    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
    center: [8.607, 53.1409349],
    maxBounds: [
      [1.40625, 43.452919],
      [17.797852, 55.973798],
    ],
  },
};
ExampleConfig.parameters = {};
