import React, { useRef, useEffect, useContext, useCallback } from "react";

import * as turf from "@turf/turf";
import { MapContext } from "react-map-components-core";

import { _transitionToGeojson } from "./util/transitionFunctions";

const msPerStep = 50;

const MlGeoJsonLayer = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const idSuffixRef = useRef(props.idSuffix || new Date().getTime());
  const oldGeojsonRef = useRef(null);
  const mapRef = useRef(null);
  const transitionInProgressRef = useRef(false);
  const currentTransitionStepRef = useRef(false);
  const transitionGeojsonDataRef = useRef([]);
  const transitionGeojsonCommonDataRef = useRef([]);
  const layerId = props.layerId || "MlGeoJsonLayer-";

  useEffect(() => {
    let mapObject = mapContext.getMap(props.mapId);
    let layerSourceId = layerId + idSuffixRef.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        if (mapRef.current.style && mapRef.current.getLayer(layerSourceId)) {
          mapRef.current.removeLayer(layerSourceId);
        }
        if (mapRef.current.style && mapRef.current.getSource(layerSourceId)) {
          mapRef.current.removeSource(layerSourceId);
        }

        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (
      !mapContext.mapExists(props.mapId) ||
      !mapContext.getMap(props.mapId).style ||
      !mapContext.getMap(props.mapId).getLayer(layerId + idSuffixRef.current)
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.paint) {
      mapContext
        .getMap(props.mapId)
        .setPaintProperty(layerId + idSuffixRef.current, key, props.paint[key]);
    }
  }, [props.paint, layerId, mapContext, props.mapId]);

  const transitionToGeojson = useCallback(
    (newGeojson) => {
      console.log("TRANSITION CALLED");
      _transitionToGeojson(
        newGeojson,
        props,
        transitionGeojsonCommonDataRef,
        transitionGeojsonDataRef,
        transitionInProgressRef,
        oldGeojsonRef,
        msPerStep,
        currentTransitionStepRef,
        mapRef.current,
        layerId,
        idSuffixRef
      );
    },
    [props]
  );

  useEffect(() => {
    if (
      !mapContext.mapExists(props.mapId) ||
      !mapContext.getMap(props.mapId).getSource(layerId + idSuffixRef.current)
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (
      typeof props.transitionTime !== "undefined" &&
      props.type === "line" &&
      oldGeojsonRef.current
    ) {
      transitionInProgressRef.current = false;
      currentTransitionStepRef.current = false;
      transitionGeojsonDataRef.current = [];
      transitionGeojsonCommonDataRef.current = [];
      transitionToGeojson(props.geojson);
    } else {
      mapContext
        .getMap(props.mapId)
        .getSource(layerId + idSuffixRef.current)
        .setData(props.geojson);
    }
    oldGeojsonRef.current = props.geojson;
  }, [
    props.geojson,
    layerId,
    props.mapId,
    mapContext,
    props.type,
    transitionToGeojson,
    props.transitionTime,
  ]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (
      !mapContext.getMap(props.mapId).getSource(layerId + idSuffixRef.current) &&
      props.geojson
    ) {
      let geojson = props.geojson;

      if (
        props.type === "line" &&
        typeof props.transitionTime !== "undefined" &&
        props.transitionTime &&
        typeof props.geojson.geometry !== "undefined"
      ) {
        var tmpChunks = turf.lineChunk(props.geojson, 0.01);
        geojson = tmpChunks.features[0];
      }

      mapRef.current = mapContext.getMap(props.mapId);

      mapContext.getMap(props.mapId).addLayer(
        {
          id: layerId + idSuffixRef.current,
          source: {
            type: "geojson",
            data: geojson,
          },
          type: props.type || "line",
          paint: props.paint || {
            "line-color": "rgb(100,200,100)",
            "line-width": 10,
          },
        },
        props.insertBeforeLayer
      );
      if (
        props.type === "line" &&
        typeof props.transitionTime !== "undefined" &&
        typeof props.geojson.geometry !== "undefined"
      ) {
        transitionToGeojson(props.geojson);
        setTimeout(() => {
          oldGeojsonRef.current = props.geojson;
        }, props.transitionTime / 2);
      }
    }
  }, [
    mapContext.mapIds,
    mapContext,
    layerId,
    props.geojson,
    props.insertBeforeLayer,
    props.mapId,
    props.type,
    props.transitionTime,
    props.paint,
    transitionToGeojson,
  ]);

  return <></>;
};

export default MlGeoJsonLayer;
