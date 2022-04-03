import React, { useState, useEffect, useRef } from "react";
import "./MlFeatureEditor.css";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import CustomPolygonMode from "./custom-polygon-mode.js";
import CustomSelectMode from "./custom-select-mode.js";
import CustomDirectSelectMode from "./custom-direct-select-mode.js";

import useMap from "../../hooks/useMap";


interface MlFeatureEditorProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: string;
  /**
   * Id of an existing layer in the mapLibre instance to help specify the layer order
   * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
   */
  insertBeforeLayer: string;
  /**
   * Input GeoJson data at initialization
   */
  geojson: any;
  /**
   * Callback function that is called each time the GeoJson data within has changed within MlFeatureEditor.
   * First parameter is the new GeoJson feature.
   */
  onChange?: Function
  /**
   * Feature editor mode:
   * - "custom_select" edit features
   * - "custom_polygon" draw Polygon
   * - "draw_point" draw Point
   * - "draw_line_string" draw LineString
   */
  mode?:string
}

/**
 * GeoJson Feature editor that allows to create or manipulate GeoJson data
 */
const MlFeatureEditor = (props:MlFeatureEditorProps) => {
  const draw = useRef<MapboxDraw>();
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });
  const onChangeRef = useRef(props.onChange);

  const drawToolsInitialized = useRef(false);
  const [drawToolsReady, setDrawToolsReady] = useState(false);

  const [mouseUpTrigger, setMouseUpTrigger] = useState(0);

  const modeChangeHandler = (e:any) => {
    console.log("MlFeatureEditor mode change to " + e.mode);
    //setDrawMode(e.mode);
  };

  const mouseUpHandler = () => {
    setMouseUpTrigger(Math.random());
  };

  useEffect(() => {
    if (
      mapHook.map &&
      !drawToolsInitialized.current
    ) {
      
      drawToolsInitialized.current = true;

      if (
        mapHook.map.map.style &&
        mapHook.map.map.getSource("mapbox-gl-draw-cold") &&
        draw.current
      ) {
        // remove old Mapbox-gl-Draw from Mapbox instance when hot-reloading this component during development
        // @ts-ignore
        draw.current?.remove();
      }

      draw.current = new MapboxDraw({
        displayControlsDefault: false,
        defaultMode: props.mode || "custom_select",
        // @ts-ignore
        modes: Object.assign(
          {
            custom_polygon: CustomPolygonMode,
            custom_select: CustomSelectMode,
            custom_direct_select: CustomDirectSelectMode,
          },
          MapboxDraw.modes
        ),
      });

      mapHook.map.on("draw.modechange", modeChangeHandler, mapHook.componentId);

      mapHook.map.addControl(draw.current, "top-left", mapHook.componentId);

      mapHook.map.on("mouseup", mouseUpHandler, mapHook.componentId);

      setDrawToolsReady(true);
    }
  }, [mapHook.map,  props, drawToolsInitialized]);

  useEffect(() => {
    if (
      draw.current &&
      props.geojson?.geometry
    ) {
      // @ts-ignore
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
      // @ts-ignore
      draw.current.changeMode(props.mode);
    }
  }, [props.mode]);

  return (<></>);
}

export default MlFeatureEditor;
