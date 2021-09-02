import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlOsmLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlOsmLayer = () => {
  const mapContext = useContext(MapContext);

  const [showLayer, setShowLayer] = useState(true);
  const idPostfixRef = useRef(new Date().getTime());

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {
      if (
        mapContext.map &&
        mapContext.map.style &&
        mapContext.map.getLayer("raster-tile-layer-" + idPostfixRef.current)
      ) {
        mapContext.map.removeLayer("raster-tile-layer-" + idPostfixRef.current);
      }
      if (
        mapContext.map &&
        mapContext.map.style &&
        mapContext.map.getSource("raster-tile-source-" + idPostfixRef.current)
      ) {
        mapContext.map.removeSource("raster-tile-source-" + idPostfixRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;

    // Add the new layer to the openlayers instance once it is available
    //mapContext.map.addSource("vector-tile-source-" + idPostfixRef.current, {
    //  type: "vector",
    //  style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
    //  tileSize: 512,
    //  attribution: "",
    //});

    mapContext.map.addSource("raster-tile-source-" + idPostfixRef.current, {
      type: "raster",
      tiles: ["https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"],
      tileSize: 256,
      attribution:
        'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
    });
    mapContext.map.addLayer({
      id: "raster-tile-layer-" + idPostfixRef.current,
      type: "raster",
      source: "raster-tile-source-" + idPostfixRef.current,
      minzoom: 0,
      maxzoom: 22,
    });
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
      OSM
    </Button>
  );
};

export default MlOsmLayer;
