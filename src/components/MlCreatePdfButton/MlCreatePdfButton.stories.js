import React from "react";

import { MapLibreMap } from "../";
import MlCreatePdfButton from "./MlCreatePdfButton";
import { MapComponentsProvider } from "react-map-components-core";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlCreatePdfButton",
  component: MlCreatePdfButton,
  argTypes: {
    colora: {
      control: {
        type: "color",
      },
    },
    options: {
      control: {
        type: "object",
      },
    },
  },
};

const Template = (args) => (
  <MapComponentsProvider>
    <div className="navbar">
      <MlCreatePdfButton />
    </div>
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
