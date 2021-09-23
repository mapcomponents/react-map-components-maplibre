import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlWmsLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlWmsLayer = (props) => {
  const mapContext = useContext(MapContext);

  const [showLayer, setShowLayer] = useState(true);
  const idPostfixRef = useRef(new Date().getTime());
  const mapRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        if (
          mapRef.current.style &&
          mapRef.current.getLayer("raster-tile-layer-" + idPostfixRef.current)
        ) {
          mapRef.current.removeLayer("raster-tile-layer-" + idPostfixRef.current);
        }
        if (
          mapRef.current.style &&
          mapRef.current.getSource("raster-tile-source-" + idPostfixRef.current)
        ) {
          mapRef.current.removeSource("raster-tile-source-" + idPostfixRef.current);
        }

        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;

    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
    // Add the new layer to the openlayers instance once it is available
    mapRef.current.addSource("raster-tile-source-" + idPostfixRef.current, {
      type: "raster",
      tiles: [
        props.url +
          "?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=" +
          props.layer,
      ],
      tileSize: 256,
      attribution: "",
      //...props.sourceOptions,
    });

    mapRef.current.addLayer({
      id: "raster-tile-layer-" + idPostfixRef.current,
      type: "raster",
      source: "raster-tile-source-" + idPostfixRef.current,
      minzoom: 0,
      maxzoom: 10,
      ...props.sourceOptions,
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
      WMS
    </Button>
  );
};

export default MlWmsLayer;
