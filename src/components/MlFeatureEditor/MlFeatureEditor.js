import React, { useState, useEffect, useContext, useRef } from "react";
import "./MlFeatureEditor.css";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import CustomPolygonMode from "./custom-polygon-mode";
import CustomSelectMode from "./custom-select-mode";
import CustomDirectSelectMode from "./custom-direct-select-mode";

import { MapContext } from "react-map-components-core";

function MlFeatureEditor(props) {
  const mapRef = useRef(null);
  const draw = useRef(null);
  const mapContext = useContext(MapContext);

  const [drawToolsInitialized, setDrawToolsInitialized] = useState(false);
  const [drawToolsReady, setDrawToolsReady] = useState(false);

  const [mouseUpTrigger, setMouseUpTrigger] = useState(false);

  const [drawnFeatures, setDrawnFeatures] = useState([]);

  const modeChangeHandler = (e) => {
    console.log("MlFeatureEditor mode change to " + e.mode);
    //setDrawMode(e.mode);
  };

  const mouseUpHandler = () => {
    console.log("mouseup");
    setMouseUpTrigger(Math.random());
  };

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        if (mapRef.current.style) {
          mapRef.current.off("draw.modechange", modeChangeHandler);
          mapRef.current.off("mouseup", mouseUpHandler);
        }
        mapRef.current.removeControl(draw.current, "top-left");
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (
      mapContext.mapExists(props.mapId) &&
      mapContext.getMap(props.mapId).style &&
      !drawToolsInitialized
    ) {
      mapRef.current = mapContext.getMap(props.mapId);
      setDrawToolsInitialized(true);
      if (
        mapRef.current &&
        mapRef.current.style &&
        mapRef.current.getSource("mapbox-gl-draw-cold") &&
        draw.current &&
        typeof draw.current.remove !== "undefined"
      ) {
        // remove old Mapbox-gl-Draw from Mapbox instance when hot-reloading this component during development
        draw.current.remove();
      }

      draw.current = new MapboxDraw({
        displayControlsDefault: false,
        defaultMode: props.mode || "custom_select",
        modes: Object.assign(
          {
            custom_polygon: CustomPolygonMode,
            custom_select: CustomSelectMode,
            custom_direct_select: CustomDirectSelectMode,
          },
          MapboxDraw.modes
        ),
      });

      mapRef.current.on("draw.modechange", modeChangeHandler);

      mapRef.current.addControl(draw.current, "top-left");

      mapRef.current.on("mouseup", mouseUpHandler);

      setDrawToolsReady(true);
    }
  }, [mapContext.map, mapContext, props, drawnFeatures, drawToolsInitialized]);

  useEffect(() => {
    if (
      draw.current &&
      props.geojson &&
      props.geojson.geometry &&
      props.geojson.geometry.coordinates
    ) {
      draw.current.set({ type: "FeatureCollection", features: [props.geojson] });
    }
  }, [props.geojson, drawToolsReady]);

  useEffect(() => {
    if (draw.current && mouseUpTrigger) {
      // update drawnFeatures state object
      let currentFeatureCollection = draw.current.getAll();
      if (typeof props.onChange === "function") {
        props.onChange(currentFeatureCollection.features);
      }
    }
  }, [mouseUpTrigger]);

  useEffect(() => {
    if (props.mode && draw.current) {
      draw.current.changeMode(props.mode);
    }
  }, [props.mode]);

  return <></>;
}

export default MlFeatureEditor;
