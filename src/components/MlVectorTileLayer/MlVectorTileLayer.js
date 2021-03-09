import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlVectorTileLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlVectorTileLayer = (props) => {
  const mapContext = useContext(MapContext);

  const [showLayer, setShowLayer] = useState(true);
  const idPostfixRef = useRef(new Date().getTime());

  const cleanup = () => {
    if (mapContext.map.getLayer("vector-tile-layer-" + idPostfixRef.current)) {
      mapContext.map.removeLayer("vector-tile-layer-" + idPostfixRef.current);
    }
    if (
      mapContext.map.getSource("vector-tile-source-" + idPostfixRef.current)
    ) {
      mapContext.map.removeSource("vector-tile-source-" + idPostfixRef.current);
    }
  };

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;

    cleanup();

    // Add the new layer to the openlayers instance once it is available
    mapContext.map.addSource("vector-tile-source-" + idPostfixRef.current, {
      type: "vector",
      tiles: [props.url],
      tileSize: 512,
      attribution: "",
      //...props.sourceOptions,
    });
    mapContext.map.addLayer({
      id: "vector-tile-layer-" + idPostfixRef.current,
      source: "vector-tile-source-" + idPostfixRef.current,
      type: "line",
      "source-layer": props.sourceLayer,
      minzoom: 0,
      maxzoom: 10,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-opacity": 0.5,
        "line-color": "rgb(80, 80, 80)",
        "line-width": 2,
      },
      ...props.sourceOptions,
    });
  }, [mapContext.map]);

  useEffect(() => {
    if (!mapContext.map) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapContext.map.setLayoutProperty(
        "vector-tile-layer-" + idPostfixRef.current,
        "visibility",
        "visible"
      );
    } else {
      mapContext.map.setLayoutProperty(
        "vector-tile-layer-" + idPostfixRef.current,
        "visibility",
        "none"
      );
    }
  }, [showLayer]);

  return (
    <Button
      color="primary"
      variant={showLayer ? "contained" : "outlined"}
      onClick={() => setShowLayer(!showLayer)}
    >
      Vector Tile Layer
    </Button>
  );
};

export default MlVectorTileLayer;
