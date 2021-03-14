import React from "react";

import MlWmsLayerMulti from "./MlWmsLayerMulti";
import TopToolbar from "../../ui_components/TopToolbar";

import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlWmsLayerMulti",
  component: MlWmsLayerMulti,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: multiMapContextDecorator,
};

const Template = (args) => (
  <TopToolbar>
    <MlWmsLayerMulti
      url={args.url}
      layer={args.layer}
      sourceOptions={args.sourceOptions}
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
