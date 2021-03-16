import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlWmsLayerMulti returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlWmsLayerMulti = (props) => {
  const mapContext = useContext(MapContext);

  const [showLayer, setShowLayer] = useState(true);
  const idPostfixRef = useRef(new Date().getTime());

  const mapExists = () => {
    if (!props.mapId) {
      return false;
    }
    if (mapContext.mapIds.indexOf(props.mapId) === -1) {
      return false;
    }

    return true;
  };

  const cleanup = () => {
    if (mapExists()) {
      if (
        mapContext.maps[props.mapId].getLayer(
          "raster-tile-layer-" + idPostfixRef.current
        )
      ) {
        mapContext.maps[props.mapId].removeLayer(
          "raster-tile-layer-" + idPostfixRef.current
        );
      }
      if (
        mapContext.maps[props.mapId].getSource(
          "raster-tile-source-" + idPostfixRef.current
        )
      ) {
        mapContext.maps[props.mapId].removeSource(
          "raster-tile-source-" + idPostfixRef.current
        );
      }
    }
  };

  useEffect(() => {
    if (!mapExists()) return;

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    console.log(mapContext);
    if (!mapExists()) return;

    cleanup();

    console.log("HALLO");
    // Add the new layer to the openlayers instance once it is available
    mapContext.maps[props.mapId].addSource(
      "raster-tile-source-" + idPostfixRef.current,
      {
        type: "raster",
        tiles: [
          props.url +
            "?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&layers=" +
            props.layer,
        ],
        tileSize: 256,
        attribution: "",
        //...props.sourceOptions,
      }
    );

    mapContext.maps[props.mapId].addLayer({
      id: "raster-tile-layer-" + idPostfixRef.current,
      type: "raster",
      source: "raster-tile-source-" + idPostfixRef.current,
      minzoom: 0,
      maxzoom: 10,
      ...props.sourceOptions,
    });
  }, [mapContext.mapIds]);

  useEffect(() => {
    if (!mapExists()) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapContext.maps[props.mapId].setLayoutProperty(
        "raster-tile-layer-" + idPostfixRef.current,
        "visibility",
        "visible"
      );
    } else {
      mapContext.maps[props.mapId].setLayoutProperty(
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

export default MlWmsLayerMulti;
