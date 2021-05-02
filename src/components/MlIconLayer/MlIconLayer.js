import React, { useRef, useMemo, useEffect, useState, useContext } from "react";
import * as d3 from "d3";

import { MapContext, SimpleDataContext } from "react-map-components-core";
import DeckGlContext from "../../deckgl_components/DeckGlContext";

import { IconLayer } from "@deck.gl/layers";

import Airplane from "./assets/airplane-icon.png";

const MlIconLayer = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  const mapContext = useContext(MapContext);
  const deckGlContext = useContext(DeckGlContext);
  const simpleDataContext = useContext(SimpleDataContext);
  const initializedRef = useRef(false);
  const layerName = "deckgl-iconlayer";
  const currentFrame = useRef(null);
  const timer = useRef(null);
  const fetchEverySeconds = 10;
  const framesPerFetch = fetchEverySeconds * 30; // 60fps, 10 second intervals

  const deckLayerProps = useMemo(() => {
    if (simpleDataContext.data) {
      //      console.log(
      //        "New Data loaded. Number of planes: " + simpleDataContext.data.length
      //      );
    }
    return {
      id: layerName,
      type: IconLayer,
      data: simpleDataContext.data,
      pickable: false,
      iconAtlas: Airplane,
      iconMapping: {
        airplane: {
          x: 0,
          y: 0,
          width: 512,
          height: 512,
        },
      },
      sizeScale: 20,
      getPosition: (d) => [d.longitude, d.latitude],
      getIcon: (d) => "airplane",
      getAngle: (d) => 45 + (d.true_track * 180) / Math.PI,
    };
  }, [simpleDataContext.data]);

  const startAnimation = () => {
    if (timer.current) {
      timer.current.stop();
    }
    currentFrame.current = 0;
    timer.current = d3.timer(animationFrame);
  };

  const animationFrame = () => {
    //console.log("asd");
    let airplanes_tmp = simpleDataContext.data;
    airplanes_tmp = airplanes_tmp.map((d) => {
      //console.log("cal new ll");
      const [longitude, latitude] = d.interpolatePos(
        currentFrame.current / framesPerFetch
      );
      return {
        ...d,
        longitude,
        latitude,
      };
    });
    currentFrame.current += 1;
    simpleDataContext.setData(airplanes_tmp);
  };
  const cleanup = () => {
    // This is the cleanup function, it is called when this react component is removed from react-dom
    // try to remove anything this component has added to the MapLibre-gl instance
    // e.g.: remove the layer
    // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
    if (timer.current) {
      timer.current.stop();
    }
  };

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return cleanup;

    return cleanup;
  }, []);

  useEffect(() => {
    if (!deckGlContext.deckGl) return;

    //console.log("update props");
    deckGlContext.deckGl.setProps({
      layers: [
        new IconLayer({
          ...deckLayerProps,
        }),
      ],
    });
  }, [deckLayerProps]);

  useEffect(() => {
    if (
      !simpleDataContext.data ||
      !mapContext.mapExists() ||
      !deckGlContext.deckGl ||
      (deckGlContext.deckGl &&
        mapContext.mapExists() &&
        simpleDataContext.data &&
        initializedRef.current)
    )
      return;

    initializedRef.current = true;

    // for debugging
    window.DeckGlMapLibreLayer = deckGlContext.maplibreLayer;

    deckGlContext.deckGl.setProps({
      layers: [
        new IconLayer({
          ...deckLayerProps,
        }),
      ],
    });

    startAnimation();

    if (typeof props.onDone === "function") {
      props.onDone();
    }
  }, [mapContext.mapIds, mapContext, simpleDataContext.data]);

  return <></>;
};

export default MlIconLayer;
