import React from "react";

import MlWmsLayer from "./MlWmsLayer";
import TopToolbar from "../../ui_components/TopToolbar";

import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";

import "../../App.css";

const storyoptions = {
  title: "MapComponents/MlWmsLayer",
  component: MlWmsLayer,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: multiMapContextDecorator,
};
export default storyoptions;

const Template = (args) => (
  <TopToolbar>
    <MlWmsLayer
      url={args.url}
      layer={args.layer}
      sourceOptions={args.sourceOptions}
      mapId="map_2"
    />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  url: "https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",
  layer: "nw_uraufnahme_rw",
  sourceOptions: {
    minzoom: 13,
    maxzoom: 20,
  },
  url_2: "https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",
  layer_2: "nw_uraufnahme_rw",
};
//
