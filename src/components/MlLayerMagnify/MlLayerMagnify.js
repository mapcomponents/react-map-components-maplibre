import React, { useContext, useRef, useEffect, useState } from "react";
import syncMove from "@mapbox/mapbox-gl-sync-move";
import "./style.css";
import { MapContext } from "react-map-components-core";

/**
 *
 * MlLayerMagnify returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlLayerMagnify = (props) => {
  const mapContext = useContext(MapContext);

  const [swipeX, setSwipeX] = useState(50);
  const swipeXRef = useRef(50);
  const [swipeY, setSwipeY] = useState(50);
  const swipeYRef = useRef(50);

  const magnifierRadiusProp = props.magnifierRadius || 200;

  const [magnifierRadius, setMagnifierRadius] = useState(magnifierRadiusProp);

  const compareRef = useRef(null);

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
    if (compareRef.current) {
      compareRef.current.remove();
      compareRef.current = null;
    }
  };

  useEffect(() => {
    if (!mapExists()) return;

    window.addEventListener("resize", onResize);
    return cleanup;
  }, []);

  useEffect(() => {
    if (!mapExists()) return;

    syncMove(mapContext.maps[props.map1Id], mapContext.maps[props.map2Id]);
    onMove({
      clientX: mapContext.maps[props.map1Id].getCanvas().clientWidth / 2,
      clientY: mapContext.maps[props.map1Id].getCanvas().clientHeight / 2,
    });
  }, [mapContext.mapIds]);

  const onMove = (e) => {
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

      mapContext.maps[props.map2Id].getContainer().style.clipPath =
        `circle(${magnifierRadius}px at ` +
        (swipeXRef.current * bounds.width) / 100 +
        "px " +
        (swipeYRef.current * bounds.height) / 100 +
        "px)";
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
