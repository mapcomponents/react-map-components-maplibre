import React from "react";

import { MapComponentsProvider } from "react-map-components-core";


const decorators = [
  (Story) => (
    <MapComponentsProvider>
      <Story />
     
    </MapComponentsProvider>
  ),
];

export default decorators;
