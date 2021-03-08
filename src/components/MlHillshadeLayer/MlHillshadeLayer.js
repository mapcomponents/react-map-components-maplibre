import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlHillshadeLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlHillshadeLayer = () => {
  const mapContext = useContext(MapContext);

  const layerRef = useRef(null);
  const [showLayer, setShowLayer] = useState(true);
  const idPostfixRef = useRef(new Date().getTime());

  const componentCleanup = () => {
    if (mapContext.map.getLayer("hillshading")) {
      mapContext.map.removeLayer("hillshading");
    }
    if (mapContext.map.getSource("hillshading-source")) {
      mapContext.map.removeSource("hillshading-source");
    }
  };

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {
      console.log("cleanup");
      componentCleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;

    //
    //
    console.log("create hillshade");
    // cleanup fragments left in MapLibre-gl from previous component uses
    componentCleanup();

    mapContext.map.addSource("hillshading-source", {
      type: "raster-dem",
      url: "mapbox://mapbox.terrain-rgb",
    });
    mapContext.map.addLayer({
      id: "hillshading",
      source: "hillshading-source",
      type: "hillshade",
    });
    mapContext.map.setLayoutProperty("hillshading", "visibility", "visible");
  }, [mapContext.map]);

  useEffect(() => {
    if (!mapContext.map) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapContext.map.setLayoutProperty("hillshading", "visibility", "visible");
    } else {
      mapContext.map.setLayoutProperty("hillshading", "visibility", "none");
    }
    //
  }, [showLayer, mapContext]);

  return (
    <Button
      color="primary"
      variant={showLayer ? "contained" : "outlined"}
      onClick={() => setShowLayer(!showLayer)}
    >
      Hillshade
    </Button>
  );
};

export default MlHillshadeLayer;
