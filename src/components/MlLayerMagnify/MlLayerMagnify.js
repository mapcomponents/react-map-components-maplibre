import React, { useContext, useRef, useEffect, useState } from "react";
import compare from "./utils/compareMagnify";
import "./style.css";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 *
 * MlLayerMagnify returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlLayerMagnify = (props) => {
  const mapContext = useContext(MapContext);

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
    console.log(compareRef.current);
    if (compareRef.current) {
      console.log("remove");
      compareRef.current.remove();
      compareRef.current = null;
    }
  };

  useEffect(() => {
    if (!mapExists()) return;

    return cleanup;
  }, []);

  useEffect(() => {
    if (!mapExists()) return;

    if (!compareRef.current) {
      //clip-path: circle(60px at 50% 50%);
      compareRef.current = new compare(
        mapContext.maps[props.map1Id],
        mapContext.maps[props.map2Id],
        ".maps",
        {
          // Set this to enable comparing two maps by mouse movement:
          // mousemove: true
        }
      );

      window.compare = compareRef.current;
    }
  }, [mapContext.mapIds]);

  return <></>;
};

export default MlLayerMagnify;
