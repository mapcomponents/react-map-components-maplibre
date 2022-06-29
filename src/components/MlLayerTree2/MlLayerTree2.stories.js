import React from "react";

import MlLayerTree2 from "./MlLayerTree2";

import mapContextDecorator from "../../decorators/MapContextDecorator";
import sample_geojson_1 from "../MlGeoJsonLayer/assets/sample_1.json";
import sample_polygon_1 from "../MlGeoJsonLayer/assets/sample_polygon_1.json";
import useMapState from "../../hooks/useMapState";
import useMap from "../../hooks/useMap";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import MlMarker from "../MlMarker/MlMarker";
import MlWmsLayer from "../MlWmsLayer/MlWmsLayer";
import MlVectorTileLayer from "../MlVectorTileLayer/MlVectorTileLayer";

const storyoptions = {
  title: "MapComponents/MlLayerTree2",
  component: MlLayerTree2,
  argTypes: {},
  decorators: mapContextDecorator,
};
export default storyoptions;

const geoJsonArray = [sample_geojson_1, sample_polygon_1];

let layerConfig = [
  {
    label: "Group 0",
    id: "group_0",
    branches: [
      {
        label: "WMS",
        id: "layer_2",
        branches: [],
        layer: (
          <MlWmsLayer
            layerId="layer_2"
            layout={{ visibility: "visible" }}
            url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme"
            urlParameters={{ layers: "nw_uraufnahme_rw" }}
            key="2"
          />
        ),
      },
      {
        label: "Geojson Line",
        id: "layer_0",
        branches: [],
        layer: (
          <MlGeoJsonLayer
            layout={{ visibility: "visible" }}
            layerId="layer_0"
            geojson={geoJsonArray[0]}
            key="1"
          />
        ),
      },
    ],
  },
  {
    label: "Group 1",
    id: "group_1",
    branches: [
      {
        label: "Geojson Polygon",
        id: "layer_4",
        branches: [],
        layer: (
          <MlGeoJsonLayer
            layerId="layer_4"
            geojson={geoJsonArray[1]}
            key="4"
            layout={{ visibility: "visible" }}
          />
        ),
      },
      // {
      //   label: "Vector Tile Layer",
      //   layer: <MlVectorTileLayer {...vectorTileLayerConfig}></MlVectorTileLayer>,
      // },
    ],
  },
  // {
  //   label: "Single Layer",
  //   visible: true,
  //   layer: <MlVectorTileLayer {...vectorTileLayerConfig}></MlVectorTileLayer>,
  // },
];

const Template = (args) => {
  const mapId = "map_1";
  // TODO Currently not working
  // const marker = {
  //   content: "WhereGroup",
  //   lng: 7.0851268,
  //   lat: 50.73884,
  //   mapId: mapId,
  // };
  const vectorTileLayerConfig = {
    mapId: "map_1",
    url: "https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf",
    layers: {
      landuseLine: {
        "source-layer": "landuse",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: { "line-width": 2, "line-color": "#ff0000" },
      },
    },
  };
  const mapHook = useMap({ mapId: mapId });

  return (
    <>
      <MlLayerTree2 layerConfig={layerConfig} />
    </>
  );
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
