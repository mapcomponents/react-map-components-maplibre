import useSource from "./useSource";
import React, { useEffect } from "react";
import useMap from "./useMap";
import useLayer from "./useLayer";

import mapContextDecorator from "../decorators/MapContextDecorator";
import MlGeoJsonLayer from "../components/MlGeoJsonLayer/MlGeoJsonLayer";
import wg_geojson from "./assets/pointWG.json";
const vectorUrl =
  "https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf";

const storyoptions = {
  title: "Hooks/UseSource",
  component: useSource,
  argTypes: {},
  decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args) => {
  const { source } = useSource({ ...args });
  console.log(source);

  useLayer({
    mapId: args.mapId,
    layerId: "layer1",
    source: source?.id ? source.id : "",
    options: {
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "#B42222",
      },
    },
    insertBeforeLayer: false,
  });

  return <></>;
};

export const useGeojsonSourceExample = Template.bind({});

useGeojsonSourceExample.args = {
  mapId: "map_1",
  sourceId: "my-source",
  data: wg_geojson,
  type: "geojson",
};

export const useVectorSourceExample = Template.bind({});

useVectorSourceExample.args = {
  mapId: "map_1",
  sourceId: "my-source",
  url: vectorUrl,
  tilesize: 512,
  type: "vector",
};
