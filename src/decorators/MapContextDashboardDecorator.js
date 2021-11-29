import React from "react";

import { MapComponentsProvider } from "@mapcomponents/react-core";
import "./style.css";

const decorators = [
  (Story) => (
    <MapComponentsProvider>
        <Story />
    </MapComponentsProvider>
  ),
];

export default decorators;
