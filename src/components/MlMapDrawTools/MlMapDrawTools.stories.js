import React from "react";

import { MapLibreMap } from "../";
import { MapComponentsProvider } from "react-map-components-core";
import MlMapDrawTools from "./MlMapDrawTools";

import Nav from "react-bootstrap/Nav";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlMapDrawTools",
  component: MlMapDrawTools,
  argTypes: {},
};

const Template = (args) => (
  <MapComponentsProvider>
    <Nav as="ul" className="navbar">
      <MlMapDrawTools />
    </Nav>
    <MapLibreMap options={args.options} />
  </MapComponentsProvider>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.args = {
  colora: "#ffffff",
  options: {
    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
    center: [8.607, 53.1409349],
    maxBounds: [
      [1.40625, 43.452919],
      [17.797852, 55.973798],
    ],
  },
};
