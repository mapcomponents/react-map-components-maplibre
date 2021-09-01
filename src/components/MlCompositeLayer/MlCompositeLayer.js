import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

const paintDefaults = {
  "fill-extrusion-color": "hsl(196, 61%, 83%)",
  "fill-extrusion-height": {
    property: "render_height",
    type: "identity",
  },
  "fill-extrusion-base": {
    property: "render_min_height",
    type: "identity",
  },
  "fill-extrusion-opacity": 1,
};
/**
 * MlCompositeLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlCompositeLayer = ({ paint, sourceId, sourceLayer, minZoom }) => {
  const mapContext = useContext(MapContext);

  const [showLayer, setShowLayer] = useState(true);
  const layerName = "building-3d";

  const componentCleanup = () => {
    if (mapContext.map.style && mapContext.map.getLayer(layerName)) {
      mapContext.map.removeLayer(layerName);
    }
  };

  useEffect(() => {
    return () => {
      componentCleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;

    // cleanup fragments left in MapLibre-gl from previous component uses
    componentCleanup();

    let addCompositeLayer = () => {
      if (!mapContext.map.getLayer(layerName)) {
        let lastLabelLayerId = false;
        if (mapContext.map.getLayer("waterway-name")) {
          lastLabelLayerId = "waterway-name";
        }

        if (mapContext.map.getLayer("poi_label")) {
          lastLabelLayerId = "poi_label";
        }

        if (lastLabelLayerId) {
          console.log({
            ...paint,
          });
          mapContext.map.addLayer(
            {
              id: layerName,
              type: "fill-extrusion",
              source: sourceId || "openmaptiles",
              "source-layer": sourceLayer || "building",
              minzoom: minZoom || 14,
              paint: {
                ...paintDefaults,
                ...paint,
              },
            },
            lastLabelLayerId
          );
        }
      }
    };

    addCompositeLayer();
    //mapContext.map.setZoom(16.5);
    //mapContext.map.setPitch(45);
  }, [mapContext.map, componentCleanup, minZoom, paint, sourceId, sourceLayer]);

  useEffect(() => {
    if (!mapContext.map) return;

    if (mapContext.map.getLayer(layerName)) {
      // toggle layer visibility by changing the layout object's visibility property
      if (showLayer) {
        mapContext.map.setLayoutProperty(layerName, "visibility", "visible");
      } else {
        mapContext.map.setLayoutProperty(layerName, "visibility", "none");
      }
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
