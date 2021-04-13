import React, { useContext, useRef, useEffect, useState } from "react";
import compare from "mapbox-gl-compare";
import "./style.css";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlLayerSwipe returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlLayerSwipe = (props) => {
  const mapContext = useContext(MapContext);

  const [swipeX, setSwipeX] = useState(50);
  const swipeXRef = useRef(50);

  const [showLayer, setShowLayer] = useState(true);
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

  const cleanup = () => {
    if (compareRef.current) {
      compareRef.current.remove();
      compareRef.current = null;
    }
  };

  useEffect(() => {
    if (!mapExists()) return;

    return cleanup;
  }, []);

  useEffect(() => {
    console.log("COMPARE 1");
    console.log(mapContext.newMapTrigger);
    console.log(JSON.stringify(mapContext.mapIds));
    if (!mapExists()) return;

    console.log("COMPARE 2");

    //  compareRef.current = new compare(
    //    mapContext.maps[props.map1Id],
    //    mapContext.maps[props.map2Id],
    //    ".maps",
    //    {
    //      // Set this to enable comparing two maps by mouse movement:
    //      // mousemove: true
    //    }
    //  );
  }, [mapContext.mapIds]);

  const onMove = (e) => {
    //let bounds = mapContext.map.getTarget().getBoundingClientRect();
    let clientX =
      e.clientX ||
      (typeof e.touches !== "undefined" && typeof e.touches[0] !== "undefined"
        ? e.touches[0].clientX
        : 0);

    //clientX -= bounds.x;
    //let swipeX_tmp = ((clientX / bounds.width) * 100).toFixed(2);

    //if (swipeXRef.current !== swipeX_tmp) {
    //  setSwipeX(swipeX_tmp);
    //  swipeXRef.current = swipeX_tmp;
    //  mapContext.map.render();
    //}
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
        zIndex: "20",
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
