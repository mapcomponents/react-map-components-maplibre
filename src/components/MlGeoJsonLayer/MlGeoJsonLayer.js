import React, { useRef, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";

import { v4 as uuidv4 } from "uuid";
import * as turf from "@turf/turf";
import { MapContext } from "@mapcomponents/react-core";

import { _transitionToGeojson } from "./util/transitionFunctions";

const msPerStep = 50;

/**
 * Adds source and layer of types "line", "fill" or "circle" to display GeoJSON data on the map.
 *
 * @component
 */
const MlGeoJsonLayer = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const oldGeojsonRef = useRef(null);
  const mapRef = useRef(null);
  const initializedRef = useRef(false);
  const transitionInProgressRef = useRef(false);
  const transitionTimeoutRef = useRef(undefined);
  const currentTransitionStepRef = useRef(false);
  const transitionGeojsonDataRef = useRef([]);
  const transitionGeojsonCommonDataRef = useRef([]);
  const componentId = useRef(
    (props.layerId ? props.layerId : "MlGeoJsonLayer-") + (props.idSuffix || uuidv4())
  );
  const layerId = useRef(props.layerId || componentId.current);

  useEffect(() => {
    let _componentId = componentId.current;
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if(transitionTimeoutRef.current){
        clearTimeout(transitionTimeoutRef.current)
      }
      if (mapRef.current) {

        mapRef.current.cleanup(_componentId);

        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.paint) {
      mapContext.getMap(props.mapId).setPaintProperty(componentId.current, key, props.paint[key]);
    }
  }, [props.paint, mapContext, props.mapId]);

  const transitionToGeojson = useCallback(
    (newGeojson) => {
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
        componentId.current,
        transitionTimeoutRef
      );
    },
    [props]
  );

  useEffect(() => {
    if (!mapRef.current?.getSource?.(componentId.current) || !initializedRef.current) return;
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
      mapRef.current.getSource(componentId.current).setData(props.geojson);
    }
    oldGeojsonRef.current = props.geojson;
  }, [
    props.geojson,
    props.mapId,
    mapContext,
    props.type,
    transitionToGeojson,
    props.transitionTime,
  ]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (props.geojson) {
      initializedRef.current = true;
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

      mapRef.current.addLayer(
        {
          id: layerId.current,
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
        props.insertBeforeLayer,
        componentId.current
      );

      if (typeof props.onHover !== "undefined") {
        mapRef.current.on("mousemove", componentId.current, props.onHover, componentId.current);
      }

      if (typeof props.onClick !== "undefined") {
        mapRef.current.on("click", componentId.current, props.onClick, componentId.current);
      }

      if (typeof props.onLeave !== "undefined") {
        mapRef.current.on("mouseleave", componentId.current, props.onLeave, componentId.current);
      }

      if (
        props.type === "line" &&
        typeof props.transitionTime !== "undefined" &&
        typeof props.geojson.geometry !== "undefined"
      ) {
        transitionToGeojson(props.geojson);
        oldGeojsonRef.current = props.geojson;
      }
    }
  }, [mapContext.mapIds, mapContext, props, transitionToGeojson]);

  return <></>;
};

MlGeoJsonLayer.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Type of the layer that will be added to the MapLibre instance.
   * Possible values: "line", "circle", "fill"
   */
  type: PropTypes.string,
  /**
   * Paint object, that is passed to the addLayer call.
   * Possible propsdepend on the layer type.
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
   */
  paint: PropTypes.object,
  /**
   * GeoJSON data that is supposed to be rendered by this component.
   */
  geojson: PropTypes.object,
  /**
   * Id of an existing layer in the mapLibre instance to help specify the layer order
   * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
   */
  insertBeforeLayer: PropTypes.string,
  /**
   * Id of the new layer and source that are added to the MapLibre instance
   */
  layerId: PropTypes.string,
  /**
   * Click event handler that is executed whenever a geometry rendered by this component is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Hover event handler that is executed whenever a geometry rendered by this component is hovered.
   */
  onHover: PropTypes.func,
  /**
   * Leave event handler that is executed whenever a geometry rendered by this component is
   * left/unhovered.
   */
  onLeave: PropTypes.func,
  /**
   * Creates transition animation whenever the geojson prop changes.
   * Only works with layer type "line" and LineString GeoJSON data.
   */
  transitionTime: PropTypes.number,
  /**
   * Id suffix string that is appended to the componentId.
   * Probably removed soon.
   */
  idSuffix: PropTypes.string,
};

export default MlGeoJsonLayer;
