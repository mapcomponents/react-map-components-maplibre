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

const Template = (args) => {
  const mapId = "map_1";
  const geoJsonArray = [sample_geojson_1, sample_polygon_1];
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
  const mapState = useMapState({
    mapId: mapId,
    watch: {
      layers: true,
    },
  });

  /**
   * Type: LayerTree
   */
  const mockOrgTreeList = [
    {
      label: "Liberty Health",
      id: "1",
      branches: [
        {
          label: "Pacific Northwest",
          id: "2",
          branches: [
            {
              label: "East Portland Clinic",
              id: "3",
              branches: [],
            },
            {
              label: "Beaverton / Tigard",
              id: "4",
              branches: [],
            },
            {
              label: "Lake Oswego Regency",
              id: "5",
              branches: [],
            },
          ],
        },
        {
          label: "Alaska",
          id: "6",
          branches: [],
        },
      ],
    },
    {
      label: "Northstar Alliance",
      id: "7",
      branches: [
        {
          label: "Chicago",
          id: "8",
          branches: [
            {
              label: "Southwest Region",
              id: "9",
              branches: [
                {
                  label: "Desplains",
                  id: "10",
                  branches: [],
                },
                {
                  label: "Oak Lawn",
                  id: "11",
                  branches: [],
                },
              ],
            },
            {
              label: "Northwest Region",
              id: "12",
              branches: [
                {
                  label: "East Morland",
                  id: "13",
                  branches: [],
                },
              ],
            },
          ],
        },
        {
          label: "New York",
          id: "14",
          branches: [
            {
              label: "Manhattan",
              id: "15",
              branches: [],
            },
            {
              label: "Queens",
              id: "16",
              branches: [],
            },
            {
              label: "5372 Arlington Heights",
              id: "17",
              branches: [],
            },
            {
              label: "The Earlmore Institute of Health",
              id: "18",
              branches: [],
            },
          ],
        },
      ],
    },
    {
      label: "Single Item",
      id: "9",
      branches: [],
    },
  ];

  let layerConfig = [
    {
      label: "Group 0",
      id: "0",
      branches: [
        {
          label: "Geojson Line",
          id: "1",
          branches: [],
          layer: (
            <MlGeoJsonLayer
              layout={{ visibility: "visible" }}
              layerId="1"
              geojson={geoJsonArray[0]}
              key="1"
            />
          ),
        },
        {
          label: "WMS",
          id: "2",
          branches: [],
          layer: (
            <MlWmsLayer
              layerId="2"
              layout={{ visibility: "none" }}
              url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme"
              urlParameters={{ layers: "nw_uraufnahme_rw" }}
              key="2"
            />
          ),
        },
      ],
    },
    {
      label: "Group 1",
      id: "3",
      branches: [
        {
          label: "Geojson Polygon",
          id: "4",
          branches: [],
          layer: (
            <MlGeoJsonLayer
              layerId="4"
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

  return <MlLayerTree2 layerConfig={layerConfig} />;
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
