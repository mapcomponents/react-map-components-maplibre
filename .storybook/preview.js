import React from "react";

import { MapComponentsProvider } from "react-map-components-core";
import MapLibreMap from "../src/components/MapLibreMap/MapLibreMap";

export const decorators = [
  (Story) => (
    <MapComponentsProvider>
      <Story />
      <MapLibreMap
        options={{
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          //center: [8.607, 53.1409349],
          zoom: 13,
          center: [7.0851268, 50.73884],
          maxBounds: [
            [1.40625, 43.452919],
            [17.797852, 55.973798],
          ],
        }}
      />
    </MapComponentsProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
