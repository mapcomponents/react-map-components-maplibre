import React from "react";

import MlImageMarkerLayer from "./MlImageMarkerLayer";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import wgMarker from "./assets/wg-marker.png";

const storyoptions = {
  title: "MapComponents/MlImageMarkerLayer",
  component: MlImageMarkerLayer,
  argTypes: { },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => (
  <MlImageMarkerLayer
    options={{
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {
            id: "test",
          },
          geometry: {
            type: "Point",
            coordinates: [7.0847929969609424, 50.73855193187643],
          },
        },
      },
      layout: {
        "icon-allow-overlap": true,
        "icon-size": 0.14,
        "icon-offset": [0, -180],
      },
    }}
    imgSrc={wgMarker}
  />
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
