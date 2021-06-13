import React, { useRef, useEffect, useContext, useCallback } from "react";

import * as turf from "@turf/turf";
import { MapContext } from "react-map-components-core";

const msPerStep = 50;

const MlGeoJsonLayer = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const idPostfixRef = useRef(props.idSuffix || new Date().getTime());
  const oldGeojsonRef = useRef(null);
  const mapRef = useRef(null);
  const transitionInProgressRef = useRef(false);
  const currentTransitionStepRef = useRef(false);
  const transitionGeojsonDataRef = useRef([]);
  const transitionGeojsonCommonDataRef = useRef([]);
  const layerId = props.layerId || "MlGeoJsonLayer-";

  useEffect(() => {
    let mapObject = mapContext.getMap(props.mapId);
    let layerSourceId = layerId + idPostfixRef.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapObject && mapObject.getLayer(layerSourceId)) {
        mapObject.removeLayer(layerSourceId);
      }
      if (mapObject && mapObject.getSource(layerSourceId)) {
        mapObject.removeSource(layerSourceId);
      }
    };
  }, []);

  useEffect(() => {
    if (
      !mapContext.mapExists(props.mapId) ||
      !mapContext.getMap(props.mapId).getLayer(layerId + idPostfixRef.current)
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.paint) {
      mapContext
        .getMap(props.mapId)
        .setPaintProperty(layerId + idPostfixRef.current, key, props.paint[key]);
    }
  }, [props.paint, layerId, mapContext, props.mapId]);

  const showNextTransitionSegment = useCallback(() => {
    if (
      typeof mapRef.current.getSource(layerId + idPostfixRef.current) ===
        "undefined" ||
      !transitionInProgressRef.current
    ) {
      setTimeout(showNextTransitionSegment, msPerStep);
      return;
    }
    if (
      typeof transitionGeojsonDataRef.current[currentTransitionStepRef.current] !==
      "undefined"
    ) {
      let newData =
        currentTransitionStepRef.current + 1 ===
        transitionGeojsonDataRef.current.length
          ? props.geojson
          : turf.lineString([
              ...transitionGeojsonCommonDataRef.current,
              ...transitionGeojsonDataRef.current[currentTransitionStepRef.current]
                .geometry.coordinates,
            ]);

      mapRef.current.getSource(layerId + idPostfixRef.current).setData(newData);

      if (typeof props.onTransitionFrame === "function") {
        props.onTransitionFrame(newData);
      }

      currentTransitionStepRef.current++;
      if (
        transitionInProgressRef.current &&
        currentTransitionStepRef.current < transitionGeojsonDataRef.current.length
      ) {
        setTimeout(showNextTransitionSegment, msPerStep);
      } else {
        if (typeof props.onTransitionEnd === "function") {
          props.onTransitionEnd(props.geojson);
        }
        transitionInProgressRef.current = false;
      }
    }
  }, [props, layerId]);

  const transitionToGeojson = useCallback(
    (newGeojson) => {
      // create the transition geojson between oldGeojsonRef.current and props.geojson
      console.log("start transition");

      // create a geojson that contains no common point between the two line features
      let transitionCoordinatesShort = [];
      let transitionCoordinatesLong = [];
      let targetCoordinates = [];
      let srcCoordinates = [];
      transitionGeojsonCommonDataRef.current = [];
      let sourceGeojson = oldGeojsonRef.current || {
        geometry: {
          type: "LineString",
          coordinates: [],
        },
        properties: {},
        type: "Feature",
      };

      let targetGeojson = newGeojson;

      let longerGeojson = targetGeojson;
      let shorterGeojson = sourceGeojson;
      let reverseOrder = false;
      // In case one geojson is missing completely use the first two coordinates of the other geojson
      if (
        typeof longerGeojson.geometry === "undefined" &&
        typeof shorterGeojson.geometry !== "undefined" &&
        shorterGeojson.geometry.coordinates.length > 1
      ) {
        longerGeojson = turf.lineString(
          shorterGeojson.geometry.coordinates.slice(0, 2)
        );
      } else if (
        typeof shorterGeojson.geometry === "undefined" &&
        typeof longerGeojson.geometry !== "undefined" &&
        longerGeojson.geometry.coordinates.length > 1
      ) {
        shorterGeojson = turf.lineString(
          longerGeojson.geometry.coordinates.slice(0, 2)
        );
      } else if (
        typeof shorterGeojson.geometry === "undefined" &&
        typeof longerGeojson.geometry === "undefined"
      ) {
        return;
      }

      if (
        longerGeojson.geometry.coordinates.length <
        shorterGeojson.geometry.coordinates.length
      ) {
        longerGeojson = sourceGeojson;
        shorterGeojson = targetGeojson;
        reverseOrder = true;
      }

      console.log(shorterGeojson);
      console.log(longerGeojson);
      if (longerGeojson && shorterGeojson) {
        for (
          var i = 0, len = longerGeojson.geometry.coordinates.length;
          i < len;
          i++
        ) {
          if (
            typeof shorterGeojson.geometry.coordinates[i] !== "undefined" &&
            longerGeojson.geometry.coordinates[i][0] ===
              shorterGeojson.geometry.coordinates[i][0] &&
            longerGeojson.geometry.coordinates[i][1] ===
              shorterGeojson.geometry.coordinates[i][1]
          ) {
            // if coordinates are equal
            transitionGeojsonCommonDataRef.current.push(
              longerGeojson.geometry.coordinates[i]
            );
          } else {
            if (typeof longerGeojson.geometry.coordinates[i] !== "undefined") {
              transitionCoordinatesLong.push(longerGeojson.geometry.coordinates[i]);
            }
            if (typeof shorterGeojson.geometry.coordinates[i] !== "undefined") {
              transitionCoordinatesShort.push(
                shorterGeojson.geometry.coordinates[i]
              );
            }
          }
        }
      }

      if (reverseOrder) {
        targetCoordinates = transitionCoordinatesShort;
        srcCoordinates = transitionCoordinatesLong;
      } else {
        targetCoordinates = transitionCoordinatesLong;
        srcCoordinates = transitionCoordinatesShort;
      }

      if (targetCoordinates.length < 2 && srcCoordinates < 2) return;
      // create props.transitionTime / msPerStep (=: transitionSteps) Versions of transitionGeojsonCommonDataRef.current + transitionCoordinates making the transitionCoordinates transitionCoordinatesDistance / transitionSteps longer on each step

      let transitionSteps = props.transitionTime / msPerStep;
      let srcCoordinatesDistance =
        srcCoordinates.length > 1
          ? Math.round(turf.length(turf.lineString(srcCoordinates)))
          : 0;
      let targetCoordinatesDistance =
        targetCoordinates.length > 1
          ? Math.round(turf.length(turf.lineString(targetCoordinates)))
          : 0;
      let transitionDistance = targetCoordinatesDistance + srcCoordinatesDistance;

      let srcCoordinatesShare = srcCoordinatesDistance / transitionDistance;
      let srcTransitionSteps = Math.round(transitionSteps * srcCoordinatesShare);
      let srcPerStepDistance =
        Math.round((srcCoordinatesDistance / srcTransitionSteps) * 100) / 100;

      let targetCoordinatesShare = targetCoordinatesDistance / transitionDistance;
      let targetTransitionSteps = Math.round(
        transitionSteps * targetCoordinatesShare
      );
      let targetPerStepDistance =
        Math.round((targetCoordinatesDistance / targetTransitionSteps) * 100) / 100;

      transitionGeojsonDataRef.current = [];

      console.log(
        "src steps: " +
          srcTransitionSteps +
          " target steps: " +
          targetTransitionSteps
      );
      // use srcPerStepDistance as src coordinates are always animated backwards
      let loopStepDistance = srcCoordinatesDistance;
      for (i = 0; i < srcTransitionSteps; i++) {
        loopStepDistance -= srcPerStepDistance;
        if (loopStepDistance <= 0) {
          loopStepDistance = 0.1;
        }
        let tmpChunks = turf.lineChunk(
          turf.lineString(srcCoordinates),
          loopStepDistance
        );
        transitionGeojsonDataRef.current.push(tmpChunks.features[0]);
      }
      loopStepDistance = 0;
      for (i = 0; i < targetTransitionSteps; i++) {
        loopStepDistance += targetPerStepDistance;
        if (loopStepDistance <= 0) {
          loopStepDistance = 0.1;
        }
        let tmpChunks = turf.lineChunk(
          turf.lineString(targetCoordinates),
          loopStepDistance
        );
        transitionGeojsonDataRef.current.push(tmpChunks.features[0]);
      }
      transitionGeojsonDataRef.current.push(props.geojson);

      console.log(targetPerStepDistance);
      console.log(transitionGeojsonDataRef.current);

      currentTransitionStepRef.current = 1;
      transitionInProgressRef.current = true;
      setTimeout(showNextTransitionSegment, msPerStep);
    },
    [props.geojson, showNextTransitionSegment, props.transitionTime]
  );

  useEffect(() => {
    if (
      !mapContext.mapExists(props.mapId) ||
      !mapContext.getMap(props.mapId).getSource(layerId + idPostfixRef.current)
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
        .getSource(layerId + idPostfixRef.current)
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
      !mapContext.getMap(props.mapId).getSource(layerId + idPostfixRef.current) &&
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
          id: layerId + idPostfixRef.current,
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
