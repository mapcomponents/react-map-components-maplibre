import React, { useState, useContext, useRef, useEffect } from "react";
import MlWmsLayer from "../MlWmsLayer/MlWmsLayer";
import MlLayerSwitcher from "./MlLayerSwitcher";
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer'
import mapContextDecorator from "../../decorators/MapContextDecorator";
import sample_geojson_1 from "./assets/sample_1.json";
import sample_geojson_2 from "./assets/sample_2.json";

const storyoptions = {
  title: "MapComponents/MlLayerSwitcher",
  component: MlLayerSwitcher,
  argTypes: {
    url: {},
    layer: {},
  },
  decorators: mapContextDecorator,
};
export default storyoptions;
const layerId = "nw_uraufnahme_rw";
const Template = (args) => {
  const [geojson, setGeojson] = useState(sample_geojson_1);
  return (
    <>
      <MlWmsLayer
        url={args.url}
        urlParameters={{ layers: args.layer }}
        sourceOptions={args.sourceOptions}
        layerId="historic"
      />
      <MlWmsLayer
        url={args.url2}
        urlParameters={{ layers: args.layer2 }}
        sourceOptions={args.sourceOptions}
        layerId={args.layer2}
      />
      <MlGeoJsonLayer type="line" geojson={geojson} layerId="geojson1" />
      <MlGeoJsonLayer type="line" geojson={sample_geojson_2} layerId="geojson2" />
      <MlLayerSwitcher
        baseSourceConfig={{
          active: args.baseSourcesActive,
          layers: args.layers,
        }}
        detailLayerConfig={{
          layers: [
            {
              label: "GeoJson 1",
              layerId: "geojson1",
              src: "/assets/historic.png",
              active: true,
            },
          ],
        }}
      />
      ;
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
  url: "https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme",
  url2: "https://www.wms.nrw.de/geobasis/wms_nw_dop",
  layer: "nw_uraufnahme_rw",
  layer2: "WMS_NW_DOP",
  sourceOptions: {
    minzoom: 13,
    maxzoom: 20,
  },
  baseSourcesActive: true,
  layers: [
    {
      label: "Historic",
      layerId: "historic",
      src: "/assets/historic.png",
    },
    {
      label: "Straßenkarte",
      layerId: "styleBase",
      src: "/assets/osm.png",
    },
    {
      label: "DOP",
      layerId: "WMS_NW_DOP",
      src: "/assets/dop.png",
    },
  ],
};
