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

const GeojsonExample = (args) => {
  const { source } = useSource({ ...args });

  useLayer({
    mapId: args.mapId,
    layerId: "layer1",
    source: source?.id ? source.id : "",
    options: {
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "red",
      },
    },
    insertBeforeLayer: false,
  });
  useLayer({
    mapId: args.mapId,
    layerId: "layer2",
    source: source?.id ? source.id : "",
    options: {
      type: "circle",
      paint: {
        "circle-radius": 4,
        "circle-color": "green",
      },
    },
    insertBeforeLayer: false,
  });
  return <></>;
};

const VectorExample = (args) => {
  const { source } = useSource({ ...args });
  const mapHook = useMap({
    mapId: args.mapId,
    waitForLayer: false,
  });
  useEffect(() => {
    if (!mapHook.map) return;
    mapHook.map.addLayer(
      {
        id: "vector-lineLayer",
        type: "line",
        source: args.sourceId,
        minzoom: 0,
        maxzoom: 22,
        "source-layer": "landuse",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: { "line-width": 2, "line-color": "#ff0000" },
      },
      false,
      mapHook.componentId
    );
    mapHook.map.addLayer(
      {
        id: "vector-FillLayer",
        type: "fill",
        source: args.sourceId,
        minzoom: 0,
        maxzoom: 22,
        "source-layer": "landuse",
        paint: {
          "fill-color": "#32a850",
          "fill-opacity": 0.4,
        },
      },
      false,
      mapHook.componentId
    );
  }, [mapHook.map]);
  return <></>;
};

const RasterExample = (args) => {
  const { source } = useSource({ ...args });
  const mapHook = useMap({
    mapId: args.mapId,
    waitForLayer: false,
  });
  useEffect(() => {
    if (!mapHook.map) return;
    mapHook.map.addLayer(
      {
        id: "raster-wms",
        type: "raster",
        source: args.sourceId,
        minzoom: 0,
        maxzoom: 22,
      },
      false,
      mapHook.componentId
    );
  }, [mapHook.map]);
  return <></>;
};

export const useGeojsonSourceExample = GeojsonExample.bind({});
useGeojsonSourceExample.args = {
  mapId: "map_1",
  sourceId: "geojson-source",
  source: {
    type: "geojson",
    data: wg_geojson,
  },
};

export const useVectorSourceExample = VectorExample.bind({});
useVectorSourceExample.args = {
  mapId: "map_1",
  sourceId: "vector-source",
  source: {
    type: "vector",
    tiles: [vectorUrl],
    tilesize: 512,
    attribution: "",
  }
};

export const useRasterSourceExample = RasterExample.bind({});
useRasterSourceExample.args = {
  mapId: "map_1",
  sourceId: "raster-source",
  source: {
    type: "raster",
    tiles: ["https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&styles=&layers=nw_uraufnahme_rw"],
    tilesize: 256,
    attribution: "",
  }
};
