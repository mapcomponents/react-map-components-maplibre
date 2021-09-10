import React, { useContext, useCallback, useRef, useEffect, useState } from "react";
import syncMove from "@mapbox/mapbox-gl-sync-move";
import "./style.css";
import { MapContext } from "react-map-components-core";

/**
 *
 * MlLayerMagnify returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlLayerMagnify = (props) => {
  const mapContext = useContext(MapContext);
  const syncMoveInitializedRef = useRef(false);
  const syncCleanupFunctionRef = useRef(null);

  const [swipeX, setSwipeX] = useState(50);
  const swipeXRef = useRef(50);
  const [swipeY, setSwipeY] = useState(50);
  const swipeYRef = useRef(50);

  const magnifierRadiusRef = useRef(props.magnifierRadius || 200);

  const [magnifierRadius, setMagnifierRadius] = useState(magnifierRadiusRef.current);

  const mapExists = useCallback(() => {
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
  }, [props, mapContext]);

  const onResize = () => {
    if (!mapExists()) return;

    console.log("resize");
    onMove({
      clientX: swipeXRef.current,
      clientY: swipeYRef.current,
    });
  };

  const cleanup = () => {
    window.removeEventListener("resize", onResize);
    if (
      syncCleanupFunctionRef.current &&
      typeof syncCleanupFunctionRef.current === "function"
    ) {
      console.log("cleanup syncmove");
      console.log("cleanup syncmove");

      syncCleanupFunctionRef.current();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return cleanup;
  }, []);

  useEffect(() => {
    if (!mapExists() || syncMoveInitializedRef.current) return;
    syncMoveInitializedRef.current = true;
    syncCleanupFunctionRef.current = syncMove(
      mapContext.maps[props.map1Id],
      mapContext.maps[props.map2Id]
    );

    if (
      mapContext.maps[props.map1Id].getCanvas().clientWidth >
        mapContext.maps[props.map1Id].getCanvas().clientHeight &&
      magnifierRadiusRef.current * 2 >
        mapContext.maps[props.map1Id].getCanvas().clientHeight
    ) {
      magnifierRadiusRef.current = Math.floor(
        mapContext.maps[props.map1Id].getCanvas().clientHeight / 2
      );
      setMagnifierRadius(magnifierRadiusRef.current);
    }

    if (
      mapContext.maps[props.map1Id].getCanvas().clientHeight >
        mapContext.maps[props.map1Id].getCanvas().clientWidth &&
      magnifierRadiusRef.current * 2 >
        mapContext.maps[props.map1Id].getCanvas().clientWidth
    ) {
      magnifierRadiusRef.current = Math.floor(
        mapContext.maps[props.map1Id].getCanvas().clientWidth / 2
      );
      setMagnifierRadius(magnifierRadiusRef.current);
    }

    onMove({
      clientX: mapContext.maps[props.map1Id].getCanvas().clientWidth / 2,
      clientY: mapContext.maps[props.map1Id].getCanvas().clientHeight / 2,
    });
  }, [mapContext.mapIds]);

  const onMove = useCallback(
    (e) => {
      if (!mapExists()) return;

      let bounds = mapContext.map.getCanvas().getBoundingClientRect();
      let clientX =
        e.clientX ||
        (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined"
          ? e.touches[0].clientX
          : 0);
      let clientY =
        e.clientY ||
        (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined"
          ? e.touches[0].clientY
          : 0);

      clientX -= bounds.x;
      clientY -= bounds.y;
      let swipeX_tmp = ((clientX / bounds.width) * 100).toFixed(2);
      let swipeY_tmp = ((clientY / bounds.height) * 100).toFixed(2);

      if (swipeXRef.current !== swipeX_tmp || swipeYRef.current !== swipeY_tmp) {
        setSwipeX(swipeX_tmp);
        swipeXRef.current = swipeX_tmp;
        setSwipeY(swipeY_tmp);
        swipeYRef.current = swipeY_tmp;
        console.log(swipeXRef.current);
        console.log(swipeYRef.current);
        console.log(magnifierRadius);

        mapContext.maps[props.map2Id].getContainer().style.clipPath =
          `circle(${magnifierRadiusRef.current}px at ` +
          (swipeXRef.current * bounds.width) / 100 +
          "px " +
          (swipeYRef.current * bounds.height) / 100 +
          "px)";
      }
    },
    [magnifierRadius, mapContext, mapExists, props]
  );

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

  const onWheel = (e) => {
    let evCopy = new WheelEvent(e.type, e);
    mapContext.map.getCanvas().dispatchEvent(evCopy);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: swipeX + "%",
        top: swipeY + "%",
        borderRadius: "50%",
        width: magnifierRadius * 2 + 1 + "px",
        height: magnifierRadius * 2 + 1 + "px",
        background: "rgba(0,0,0,0)",
        border: "2px solid #fafafa",
        boxShadow:
          "1px 2px 2px rgba(19, 19, 19, .5), inset 1px 1px 1px rgba(19, 19, 19, .2)",
        cursor: "pointer",
        zIndex: "110",
        marginLeft: magnifierRadius * -1 - 1 + "px",
        marginTop: magnifierRadius * -1 - 1 + "px",
        textAlign: "center",
        lineHeight: "91px",
        fontSize: "2em",
        color: "#fafafa",
        userSelect: "none",
      }}
      onTouchStart={onDown}
      onMouseDown={onDown}
      onWheel={onWheel}
    ></div>
  );
};

export default MlLayerMagnify;
