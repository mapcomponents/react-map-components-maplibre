import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlOsmLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlOsmLayer = (props) => {
  const mapContext = useContext(MapContext);
  const mapRef = useRef(null);
  const layerInitializedRef = useRef(false);

  const [showLayer, setShowLayer] = useState(true);
  const idPostfixRef = useRef(new Date().getTime());

  useEffect(() => {

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        if (mapRef.current.style && mapRef.current.getLayer("raster-tile-layer-" + idPostfixRef.current)) {
          mapRef.current.removeLayer("raster-tile-layer-" + idPostfixRef.current);
        }
        if (mapRef.current.style && mapRef.current.getSource("raster-tile-source-" + idPostfixRef.current)) {
          mapRef.current.removeSource("raster-tile-source-" + idPostfixRef.current);
        }

        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || layerInitializedRef.current) return;

    layerInitializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    mapRef.current.addSource("raster-tile-source-" + idPostfixRef.current, {
      type: "raster",
      tileSize: 256,
      ...props.sourceOptions
    });
    mapRef.current.addLayer({
      id: "raster-tile-layer-" + idPostfixRef.current,
      type: "raster",
      source: "raster-tile-source-" + idPostfixRef.current,
      minzoom: 0,
      maxzoom: 22,
      ...props.layerOptions
    });
  }, [mapContext.mapIds]);

  useEffect(() => {
    if (!mapRef.current) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapRef.current.setLayoutProperty(
        "raster-tile-layer-" + idPostfixRef.current,
        "visibility",
        "visible"
      );
    } else {
      mapRef.current.setLayoutProperty(
        "raster-tile-layer-" + idPostfixRef.current,
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
      OSM
    </Button>
  );
};

export default MlOsmLayer;
