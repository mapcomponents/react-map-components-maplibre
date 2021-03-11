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
  const layerName = "building-3d";

  const componentCleanup = () => {
    if (mapContext.map.getLayer(layerName)) {
      mapContext.map.removeLayer(layerName);
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

    let addCompositeLayer = () => {
      if (!mapContext.map.getLayer(layerName)) {
        console.log("style loaded");
        console.log(mapContext.map.style.stylesheet.name);
        mapContext.map.addLayer({
          id: layerName,
          type: "fill-extrusion",
          source: "openmaptiles",
          "source-layer": "building",
          minzoom: 14,
          paint: {
            "fill-extrusion-color": "hsl(35, 8%, 85%)",
            "fill-extrusion-height": {
              property: "render_height",
              type: "identity",
            },
            "fill-extrusion-base": {
              property: "render_min_height",
              type: "identity",
            },
            "fill-extrusion-opacity": 0.8,
          },
          //    id: "3d-buildings",
          //    source: "openmaptiles",
          //    "source-layer": "building",
          //    //filter: ["==", "extrude", "true"],
          //    type: "fill-extrusion",
          //    minzoom: 15,
          //    paint: {
          //      "fill-extrusion-color": "hsl(35, 8%, 85%)",
          //      "fill-extrusion-height": {
          //        property: "render_height",
          //        type: "identity",
          //      },
          //      "fill-extrusion-base": {
          //        property: "render_min_height",
          //        type: "identity",
          //      },
          //      "fill-extrusion-opacity": 0.8,
          //    },
        });
      }

      //setTimeout(() => {
      //  mapContext.map.setStyle(
      //    "https://wms.wheregroup.com/tileserver/style/osm-bright.json"
      //  );
      //}, 5000);
    };

    //mapContext.map.once("styledata", addCompositeLayer);
    //mapContext.map.setStyle("mapbox://styles/mapbox/light-v10");
    addCompositeLayer();
    mapContext.map.setZoom(16.5);
    mapContext.map.setPitch(45);
  }, [mapContext.map]);

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
