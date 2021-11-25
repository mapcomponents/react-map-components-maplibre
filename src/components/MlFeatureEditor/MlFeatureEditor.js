import React, { useState, useEffect, useContext, useRef } from "react";
import "./MlFeatureEditor.css";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import CustomPolygonMode from "./custom-polygon-mode";
import CustomSelectMode from "./custom-select-mode";
import CustomDirectSelectMode from "./custom-direct-select-mode";
import { v4 as uuidv4 } from "uuid";

import { MapContext } from "@mapcomponents/react-core";

function MlFeatureEditor(props) {
  const mapRef = useRef(null);
  const draw = useRef(null);
  const mapContext = useContext(MapContext);
  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlFeatureEditor-") + uuidv4()
  );
  const onChangeRef = useRef(props.onChange);

  const [drawToolsInitialized, setDrawToolsInitialized] = useState(false);
  const [drawToolsReady, setDrawToolsReady] = useState(false);

  const [mouseUpTrigger, setMouseUpTrigger] = useState(false);

  const modeChangeHandler = (e) => {
    console.log("MlFeatureEditor mode change to " + e.mode);
    //setDrawMode(e.mode);
  };

  const mouseUpHandler = () => {
    setMouseUpTrigger(Math.random());
  };

  useEffect(() => {
    let _componentId = componentId.current;
    return () => {
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        //mapRef.current.removeControl(draw.current, "top-left");
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

      mapRef.current.on("draw.modechange", modeChangeHandler, componentId.current);

      mapRef.current.addControl(draw.current, "top-left", componentId.current);

      mapRef.current.on("mouseup", mouseUpHandler, componentId.current);

      setDrawToolsReady(true);
    }
  }, [mapContext.map, mapContext, props, drawToolsInitialized]);

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
      if (typeof onChangeRef.current === "function") {
        onChangeRef.current(currentFeatureCollection.features);
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
