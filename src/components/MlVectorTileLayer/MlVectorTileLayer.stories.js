import React from "react";

import MlVectorTileLayer from "./MlVectorTileLayer";
import TopToolbar from "../../ui_components/TopToolbar";

import mapContextDecorator from "../../decorators/MapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const storyoptions = {
  title: "MapComponents/MlVectorTileLayer",
  component: MlVectorTileLayer,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => (
  <TopToolbar>
    <MlVectorTileLayer
      url={args.url}
      sourceLayer={args.sourceLayer}
      sourceOptions={args.sourceOptions}
    />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  url:
    "https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf",
  sourceLayer: "landuse",
  sourceOptions: {
    minzoom: 0,
    maxzoom: 20,
  },
};
//
