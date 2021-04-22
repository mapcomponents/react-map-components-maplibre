import React from "react";

import MlLayerMagnify from "./MlLayerMagnify";
import MlWmsLayerMulti from "../MlWmsLayerMulti/MlWmsLayerMulti";
import TopToolbar from "../../ui_components/TopToolbar";

import multiMapContextDecorator from "../../decorators/MultiMapContextDecorator";

import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MapComponents/MlLayerMagnify",
  component: MlLayerMagnify,
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
        mapId={args.wmsLayerMapId}
      />
    </TopToolbar>
    <MlLayerMagnify map1Id="map_1" map2Id="map_2"  magnifierRadius={args.magnifierRadius}/>
  </>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  wmsLayerMapId: "map_2",
  magnifierRadius: 100
};

