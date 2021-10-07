import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";
import { v4 as uuidv4 } from "uuid";

import Button from "@mui/material/Button";

/**
 * MlWmsLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlWmsLayer = (props) => {
  const mapContext = useContext(MapContext);

  const [showLayer, setShowLayer] = useState(true);
  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlWmsLayer-") + uuidv4()
  );
  const mapRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    let _componentId = componentId.current;
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);

        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;

    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
    // Add the new layer to the openlayers instance once it is available
    mapRef.current.addSource(
      componentId.current,
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
      },
      componentId.current
    );

    mapRef.current.addLayer(
      {
        id: componentId.current,
        type: "raster",
        source: componentId.current,
        minzoom: 0,
        maxzoom: 10,
        ...props.sourceOptions,
      },
      props.insertBeforeLayer,
      componentId.current
    );
  }, [mapContext.mapIds, mapContext, props]);

  useEffect(() => {
    if (!mapRef.current) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapRef.current.setLayoutProperty(componentId.current, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty(componentId.current, "visibility", "none");
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
