import React, { useRef, useEffect, useState, useCallback } from "react";
import useMap from "../../hooks/useMap";

const MlScaleReference = (props) => {
  const zoomRef = useRef(0);
  const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });

  const [pxWidth, setPxWidth] = useState(0);
  const [text, setText] = useState("");

  const updateScale = useCallback(() => {
    if (mapHook.map?.map.getZoom() === zoomRef.current) {
      return;
    }
    if (!mapHook.map) return;

    zoomRef.current = mapHook.map?.map.getZoom();
    // Calculation from MapLibre
    // A horizontal scale is imagined to be present at center of the map
    // Using spherical law of cosines approximation, the real distance is
    // found between the two coordinates.
    const maxWidth = props.maxWidth || 100;

    const y = mapHook.map._container.clientHeight / 2;
    const left = mapHook.map.unproject([0, y]);
    const right = mapHook.map.unproject([maxWidth, y]);
    const maxMeters = left.distanceTo(right);
    // The real distance corresponding to 100px scale length is rounded off to
    // near pretty number and the scale length for the same is found out.
    // Default unit of the scale is based on User's locale.
    if (props.unit === "imperial") {
      const maxFeet = 3.2808 * maxMeters;
      if (maxFeet > 5280) {
        const maxMiles = maxFeet / 5280;
        setScale(maxWidth, maxMiles, mapHook.map._getUIString("ScaleControl.Miles"));
      } else {
        setScale(maxWidth, maxFeet, mapHook.map._getUIString("ScaleControl.Feet"));
      }
    } else if (props.unit === "nautical") {
      const maxNauticals = maxMeters / 1852;
      setScale(maxWidth, maxNauticals, mapHook.map._getUIString("ScaleControl.NauticalMiles"));
    } else if (maxMeters >= 1000) {
      setScale(maxWidth, maxMeters / 1000, mapHook.map._getUIString("ScaleControl.Kilometers"));
    } else {
      setScale(maxWidth, maxMeters, mapHook.map._getUIString("ScaleControl.Meters"));
    }
  }, [mapHook.map, props.unit, props.maxWidth]);

  useEffect(() => {
    if (!mapHook.map) return;

    let _updateScale = updateScale;
    mapHook.map.on("move", _updateScale, mapHook.componentId);
    updateScale();

    return () => {
      mapHook.map.off("move", _updateScale);
    };
  }, [mapHook.map, updateScale]);

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

    d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : d >= 1 ? 1 : getDecimalRoundNum(d);

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
