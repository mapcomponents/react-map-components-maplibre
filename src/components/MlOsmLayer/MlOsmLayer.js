import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";

/**
 * MlOsmLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlOsmLayer = () => {
  const mapContext = useContext(MapContext);

  const layerRef = useRef(null);
  const [showLayer, setShowLayer] = useState(true);

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {};
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;

    // Add the new layer to the openlayers instance once it is available
    mapContext.map.addSource("raster-tiles", {
      type: "raster",
      tiles: [
        "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
      ],
      tileSize: 256,
      attribution:
        'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
    });
    mapContext.map.addLayer({
      id: "simple-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 22,
    });
    //mapContext.map.addLayer({
    //     style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
    // /     center: [8.607, 53.1409349],
    // /     maxBounds: [
    // /       [1.40625, 43.452919],
    // /       [17.797852, 55.973798],
    // /     ],
    // /   });
  }, [mapContext.map]);

  useEffect(() => {
    if (!layerRef.current) return;

    // Control layer visibility using the state variable "showLayer"
    layerRef.current.setVisible(showLayer);
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
