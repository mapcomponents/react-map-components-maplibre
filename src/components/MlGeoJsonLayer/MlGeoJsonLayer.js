import React, { useRef, useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";

const MlGeoJsonLayer = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const idPostfixRef = useRef(new Date().getTime());
  const layerId = props.layerId || "MlGeoJsonLayer-";

  useEffect(() => {
    return () => {
      if (mapContext.getMap(props.mapId)) {
        // This is the cleanup function, it is called when this react component is removed from react-dom
        if (
          mapContext.getMap(props.mapId).getLayer(layerId + idPostfixRef.current)
        ) {
          mapContext.getMap(props.mapId).removeLayer(layerId + idPostfixRef.current);
        }
        if (
          mapContext.getMap(props.mapId).getSource(layerId + idPostfixRef.current)
        ) {
          mapContext
            .getMap(props.mapId)
            .removeSource(layerId + idPostfixRef.current);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (
      !mapContext.mapExists(props.mapId) ||
      !mapContext.getMap(props.mapId).getSource(layerId + idPostfixRef.current)
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    mapContext
      .getMap(props.mapId)
      .getSource(layerId + idPostfixRef.current)
      .setData(props.geojson);
  }, [props.geojson]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (!mapContext.getMap(props.mapId).getSource(layerId + idPostfixRef.current)) {
      mapContext.getMap(props.mapId).addLayer({
        id: layerId + idPostfixRef.current,
        source: {
          type: "geojson",
          data: props.geojson,
        },
        type: props.type || "line",
        paint: props.paint || {
          "line-color": "rgb(100,200,100)",
          "line-width": 10,
        },
      });
    }
  }, [mapContext.mapIds, mapContext]);

  return <></>;
};

export default MlGeoJsonLayer;
