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
  const mapRef = useRef(null);

  const [showLayer, setShowLayer] = useState(true);
  const layerName = "building-3d";

  const componentCleanup = () => {
    if (mapRef.current) {
      if (mapRef.current.style && mapRef.current.getLayer(layerName)) {
        mapRef.current.removeLayer(layerName);
      }
      if (mapRef.current.style && mapRef.current.getSource(layerName)) {
        mapRef.current.removeSource(layerName);
      }

      mapRef.current = null;
    }
  };

  useEffect(() => {
    return componentCleanup;
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
    };

    addCompositeLayer();
  }, [mapContext.map, minZoom, paint, sourceId, sourceLayer]);

  useEffect(() => {
    if (!mapContext.map) return;

    mapRef.current = mapContext.map;
    if (mapRef.current.getLayer(layerName)) {
      // toggle layer visibility by changing the layout object's visibility property
      if (showLayer) {
        mapRef.current.setLayoutProperty(layerName, "visibility", "visible");
      } else {
        mapRef.current.setLayoutProperty(layerName, "visibility", "none");
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
