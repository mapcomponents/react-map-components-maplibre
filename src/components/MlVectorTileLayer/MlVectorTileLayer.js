import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlVectorTileLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlVectorTileLayer = (props) => {
  const mapContext = useContext(MapContext);

  const [showLayer, setShowLayer] = useState(true);
  const layerName = "vector-tile-layer-";
  const sourceName = "vector-tile-source-";
  const idPostfixRef = useRef(new Date().getTime());

  const cleanup = () => {
    if (mapContext.map.getLayer(layerName + idPostfixRef.current)) {
      mapContext.map.removeLayer(layerName + idPostfixRef.current);
    }
    if (mapContext.map.getSource(sourceName + idPostfixRef.current)) {
      mapContext.map.removeSource(sourceName + idPostfixRef.current);
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
    mapContext.map.addSource(sourceName + idPostfixRef.current, {
      type: "vector",
      tiles: [props.url],
      tileSize: 512,
      attribution: "",
      //...props.sourceOptions,
    });
    mapContext.map.addLayer({
      id: layerName + idPostfixRef.current,
      source: sourceName + idPostfixRef.current,
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
        layerName + idPostfixRef.current,
        "visibility",
        "visible"
      );
    } else {
      mapContext.map.setLayoutProperty(
        layerName + idPostfixRef.current,
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
