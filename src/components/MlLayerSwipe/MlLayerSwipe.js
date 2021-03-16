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

  const [showLayer, setShowLayer] = useState(true);
  const idPostfixRef = useRef(new Date().getTime());

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
    if (mapExists()) {
    }
  };

  useEffect(() => {
    if (!mapExists()) return;

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    console.log("COMPARE 1");
    console.log(mapContext.newMapTrigger);
    console.log(JSON.stringify(mapContext.mapIds));
    if (!mapExists()) return;

    console.log("COMPARE 2");

    window.compare = new compare(
      mapContext.maps[props.map1Id],
      mapContext.maps[props.map2Id],
      ".maps",
      {
        // Set this to enable comparing two maps by mouse movement:
        // mousemove: true
      }
    );
  }, [mapContext.mapIds]);

  return (
    <Button
      color="primary"
      variant={showLayer ? "contained" : "outlined"}
      onClick={() => setShowLayer(!showLayer)}
    >
      Layer Swipe
    </Button>
  );
};

export default MlLayerSwipe;
