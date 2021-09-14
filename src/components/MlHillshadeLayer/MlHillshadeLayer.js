import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlHillshadeLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlHillshadeLayer = (props) => {
  const mapContext = useContext(MapContext);
  const mapRef = useRef(null);

  const layerRef = useRef(null);
  const [showLayer, setShowLayer] = useState(true);
  const idPostfixRef = useRef(new Date().getTime());

  const componentCleanup = () => {
    if (mapRef.current) {
      if (
        mapRef.current &&
        mapRef.current.style &&
        mapRef.current.getLayer("hillshading")
      ) {
        mapRef.current.removeLayer("hillshading");
      }
      if (
        mapRef.current &&
        mapRef.current.style &&
        mapRef.current.getSource("hillshading-source")
      ) {
        mapRef.current.removeSource("hillshading-source");
      }
      mapRef.current = null;
    }
  };

  useEffect(() => {
    return componentCleanup;
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;

    mapRef.current = mapContext.getMap(props.mapId);

    mapRef.current.addSource("hillshading-source", {
      type: "raster-dem",
      url: "mapbox://mapbox.terrain-rgb",
    });
    mapRef.current.addLayer({
      id: "hillshading",
      source: "hillshading-source",
      type: "hillshade",
    });
    mapRef.current.setLayoutProperty("hillshading", "visibility", "visible");
    mapRef.current.setZoom(10);
    //mapRef.current.setPitch(45);
  }, [mapContext.mapIds]);

  useEffect(() => {
    if (!mapRef.current) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapRef.current.setLayoutProperty("hillshading", "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty("hillshading", "visibility", "none");
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
