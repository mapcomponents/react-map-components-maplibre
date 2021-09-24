import React, { useContext, useRef, useEffect, useState } from "react";
import syncMove from "@mapbox/mapbox-gl-sync-move";
import "./style.css";
import { MapContext } from "react-map-components-core";

/**
 * MlLayerSwipe returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlLayerSwipe = (props) => {
  const mapContext = useContext(MapContext);

  const [swipeX, setSwipeX] = useState(50);
  const swipeXRef = useRef(50);

  const syncCleanupFunctionRef = useRef(null);

  const mapExists = () => {
    if (!props.map1Id || !props.map2Id) {
      return false;
    }
    if (
      mapContext.mapIds.indexOf(props.map1Id) === -1 ||
      mapContext.mapIds.indexOf(props.map2Id) === -1
    ) {
      return false;
    }

    return true;
  };

  const cleanup = () => {
    if (syncCleanupFunctionRef.current) {
      syncCleanupFunctionRef.current();
    }
  };

  useEffect(() => {
    return cleanup;
  }, []);

  useEffect(() => {
    if (!mapExists()) return;

    syncCleanupFunctionRef.current = syncMove(
      mapContext.maps[props.map1Id],
      mapContext.maps[props.map2Id]
    );
    onMove({ clientX: mapContext.maps[props.map1Id].getCanvas().clientWidth / 2 });
  }, [mapContext.mapIds]);

  const onMove = (e) => {
    if (!mapExists()) return;

    let bounds = mapContext.map.getCanvas().getBoundingClientRect();
    let clientX =
      e.clientX ||
      (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined"
        ? e.touches[0].clientX
        : 0);

    clientX -= bounds.x;
    let swipeX_tmp = ((clientX / bounds.width) * 100).toFixed(2);

    if (swipeXRef.current !== swipeX_tmp) {
      setSwipeX(swipeX_tmp);
      swipeXRef.current = swipeX_tmp;

      var clipA =
        "rect(0, " + (swipeXRef.current * bounds.width) / 100 + "px, 999em, 0)";

      mapContext.maps[props.map2Id].getContainer().style.clip = clipA;
    }
  };

  const onDown = (e) => {
    if (e.touches) {
      document.addEventListener("touchmove", onMove);
      document.addEventListener("touchend", onTouchEnd);
    } else {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  };

  const onTouchEnd = () => {
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onTouchEnd);
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: swipeX + "%",
        top: "50%",
        borderRadius: "50%",
        width: "100px",
        height: "100px",
        background: "#0066ff",
        border: "3px solid #eaebf1",
        cursor: "pointer",
        zIndex: "110",
        marginLeft: "-50px",
        marginTop: "-50px",
        textAlign: "center",
        lineHeight: "91px",
        fontSize: "2em",
        color: "#fafafa",
        userSelect: "none",
      }}
      onTouchStart={onDown}
      onMouseDown={onDown}
    ></div>
  );
};

export default MlLayerSwipe;
