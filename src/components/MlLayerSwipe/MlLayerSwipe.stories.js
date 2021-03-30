import React from "react";

import MlLayerSwipe from "./MlLayerSwipe";
import MlWmsLayerMulti from "../MlWmsLayerMulti/MlWmsLayerMulti";
import TopToolbar from "../../ui_components/TopToolbar";

import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlLayerSwipe",
  component: MlLayerSwipe,
  options: {
    tags: ["bla", "blub"],
    type: "blubtype",
    justSomeProp: 123,
  },
  parameters: {
    options: {
      tags: ["bla", "blub"],
      type: "blubtype",
      justSomeProp: 123,
    },
  },
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: multiMapContextDecorator,
};

const Template = (args) => (
  <TopToolbar>
    <MlWmsLayerMulti
      url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme"
      layer="nw_uraufnahme_rw"
      sourceOptions={{
        minzoom: 13,
        maxzoom: 20,
      }}
      mapId="map_1"
    />
    <MlLayerSwipe map1Id="map_1" map2Id="map_2" />
  </TopToolbar>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
//
