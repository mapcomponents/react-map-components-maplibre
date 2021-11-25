import React from "react";

import { themes } from "@storybook/theming";

import { MapComponentsProvider } from "@mapcomponents/react-core";
import MapLibreMap from "../src/components/MapLibreMap/MapLibreMap";
import "./style.css";

export const parameters = {
  docs: {
    inlineStories: false,
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
};
