import React, { useRef, useEffect, useState, useContext } from "react";

import { MapContext } from "@mapcomponents/react-core";
import { v4 as uuidv4 } from "uuid";

const MlScaleReference = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const mapRef = useRef(undefined);
  const initializedRef = useRef(false);
  const zoomRef = useRef(0);

  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlScaleReference-") + uuidv4()
  );

  const [pxWidth, setPxWidth] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
      // check for the existence of map.style before calling getLayer or getSource
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
    mapRef.current.on("move", updateScale.current, componentId.current);
    updateScale.current();
  }, [mapContext.mapIds, mapContext, props.mapId]);

  const updateScale = useRef(() => {
    if (mapRef.current.map.getZoom() === zoomRef.current) {
      return;
    }

    zoomRef.current = mapRef.current.map.getZoom();
    // Calculation from MapLibre
    // A horizontal scale is imagined to be present at center of the map
    // Using spherical law of cosines approximation, the real distance is
    // found between the two coordinates.
    const maxWidth = props.maxWidth || 100;

    const y = mapRef.current._container.clientHeight / 2;
    const left = mapRef.current.unproject([0, y]);
    const right = mapRef.current.unproject([maxWidth, y]);
    const maxMeters = left.distanceTo(right);
    // The real distance corresponding to 100px scale length is rounded off to
    // near pretty number and the scale length for the same is found out.
    // Default unit of the scale is based on User's locale.
    if (props.unit === "imperial") {
      const maxFeet = 3.2808 * maxMeters;
      if (maxFeet > 5280) {
        const maxMiles = maxFeet / 5280;
        setScale(
          maxWidth,
          maxMiles,
          mapRef.current._getUIString("ScaleControl.Miles")
        );
      } else {
        setScale(
          maxWidth,
          maxFeet,
          mapRef.current._getUIString("ScaleControl.Feet")
        );
      }
    } else if (props.unit === "nautical") {
      const maxNauticals = maxMeters / 1852;
      setScale(
        maxWidth,
        maxNauticals,
        mapRef.current._getUIString("ScaleControl.NauticalMiles")
      );
    } else if (maxMeters >= 1000) {
      setScale(
        maxWidth,
        maxMeters / 1000,
        mapRef.current._getUIString("ScaleControl.Kilometers")
      );
    } else {
      setScale(
        maxWidth,
        maxMeters,
        mapRef.current._getUIString("ScaleControl.Meters")
      );
    }
  });

  const setScale = (maxWidth, maxDistance, unit) => {
    const distance = getRoundNum(maxDistance);
    const ratio = distance / maxDistance;
    setPxWidth(maxWidth * ratio);
    setText(distance + "&nbsp;" + unit);
  };

  const getDecimalRoundNum = (d) => {
    const multiplier = Math.pow(10, Math.ceil(-Math.log(d) / Math.LN10));
    return Math.round(d * multiplier) / multiplier;
  };

  const getRoundNum = (num) => {
    const pow10 = Math.pow(10, `${Math.floor(num)}`.length - 1);
    let d = num / pow10;

    d =
      d >= 10
        ? 10
        : d >= 5
        ? 5
        : d >= 3
        ? 3
        : d >= 2
        ? 2
        : d >= 1
        ? 1
        : getDecimalRoundNum(d);

    return pow10 * d;
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "hsla(0,0%,100%,.75)",
          fontSize: "10px",
          border: "2px solid #333",
          borderTop: "#333",
          padding: "0 5px",
          color: "#333",
          boxSizing: "border-box",
          width: pxWidth + "px",
          fontFamily: "sans-serif",
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></div>
    </>
  );
};

export default MlScaleReference;
