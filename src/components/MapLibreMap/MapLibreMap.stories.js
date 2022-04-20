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
    <MapLibreMap
      options={args.options}
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
      }}
    />
  </MapComponentsProvider>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
  options: {
    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
    center: [8.607, 53.1409349],
    zoom: 14
  },
};
ExampleConfig.parameters = {};
