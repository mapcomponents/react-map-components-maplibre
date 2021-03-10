import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlCompositeLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlCompositeLayer = () => {
  const mapContext = useContext(MapContext);

  const layerRef = useRef(null);
  const [showLayer, setShowLayer] = useState(true);
  const idPostfixRef = useRef(new Date().getTime());

  const componentCleanup = () => {
    if (mapContext.map.getLayer("3d-buildings")) {
      mapContext.map.removeLayer("3d-buildings");
    }
  };

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {
      componentCleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;

    // cleanup fragments left in MapLibre-gl from previous component uses
    componentCleanup();

    mapContext.map.setStyle("mapbox://styles/mapbox/light-v10");
    mapContext.map.addLayer({
      id: "3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",

        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    });
  }, [mapContext.map]);

  useEffect(() => {
    if (!mapContext.map) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapContext.map.setLayoutProperty("3d-buildings", "visibility", "visible");
    } else {
      mapContext.map.setLayoutProperty("3d-buildings", "visibility", "none");
    }
    //
  }, [showLayer, mapContext]);

  return (
    <Button
      color="primary"
      variant={showLayer ? "contained" : "outlined"}
      onClick={() => setShowLayer(!showLayer)}
    >
      Composite
    </Button>
  );
};

export default MlCompositeLayer;
