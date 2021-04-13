import React from "react";

import MlLayerSwipe from "./MlLayerSwipe";
import MlWmsLayerMulti from "../MlWmsLayerMulti/MlWmsLayerMulti";
import TopToolbar from "../../ui_components/TopToolbar";

import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlLayerSwipe",
  name: "MlLayerSwipe",
  component: MlLayerSwipe,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: multiMapContextDecorator,
};

const Template = (args) => (
  <>
    <TopToolbar>
      <MlWmsLayerMulti
        url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme"
        layer="nw_uraufnahme_rw"
        sourceOptions={{
          minzoom: 13,
          maxzoom: 20,
        }}
        mapId="map_2"
      />
    </TopToolbar>
    <MlLayerSwipe map1Id="map_1" map2Id="map_2" />
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
//
