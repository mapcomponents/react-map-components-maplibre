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

  const cleanup = () => {
    if (mapContext.map.getLayer("raster-tile-layer-" + idPostfixRef.current)) {
      mapContext.map.removeLayer("raster-tile-layer-" + idPostfixRef.current);
    }
    if (mapContext.map.getSource("raster-tile-source-" + idPostfixRef.current)) {
      mapContext.map.removeSource("raster-tile-source-" + idPostfixRef.current);
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
    mapContext.map.addSource("raster-tile-source-" + idPostfixRef.current, {
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

    mapContext.map.addLayer(
      {
        id: "raster-tile-layer-" + idPostfixRef.current,
        type: "raster",
        source: "raster-tile-source-" + idPostfixRef.current,
        minzoom: 0,
        maxzoom: 10,
        ...props.sourceOptions,
      },
      props.belowLayerId
    );
  }, [mapContext.map]);

  useEffect(() => {
    if (!mapContext.map) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapContext.map.setLayoutProperty(
        "raster-tile-layer-" + idPostfixRef.current,
        "visibility",
        "visible"
      );
    } else {
      mapContext.map.setLayoutProperty(
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
