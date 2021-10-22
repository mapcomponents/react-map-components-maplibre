import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";
import { v4 as uuidv4 } from "uuid";

import Button from "@mui/material/Button";
import PropTypes from "prop-types";

/**
 * Adds a standard OSM tile layer to the maplibre-gl instancereference by
 * props.mapId
 *
 * @component
 */
const MlOsmLayer = (props) => {
  const mapContext = useContext(MapContext);
  const mapRef = useRef(undefined);

  const [showLayer, setShowLayer] = useState(true);
  const componentId = useRef((props.idPrefix ? props.idPrefix : "MlOsmLayer-") + uuidv4());
  const initializedRef = useRef(false);
  const sourceIdRef = useRef((props.idPrefix ? props.idPrefix : "MlOsmLayer-source-") + uuidv4());
  const layerIdRef = useRef((props.idPrefix ? props.idPrefix : "MlOsmLayer-layer-") + uuidv4());

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

    mapRef.current.addSource(
      sourceIdRef.current,
      {
        type: "raster",
        tileSize: 256,
        ...props.sourceOptions,
      },
      componentId.current
    );
    mapRef.current.addLayer(
      {
        id: layerIdRef.current,
        type: "raster",
        source: sourceIdRef.current,
        minzoom: 0,
        maxzoom: 22,
        ...props.layerOptions,
      },
      props.insertBeforeLayer,
      componentId.current
    );
  }, [mapContext.mapIds, props, mapContext]);

  useEffect(() => {
    if (!mapRef.current) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapRef.current.setLayoutProperty(layerIdRef.current, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty(layerIdRef.current, "visibility", "none");
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

MlOsmLayer.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
   */
  idPrefix: PropTypes.string,
  /**
   * Options object that will be used as first parameter on the MapLibreGl.addSource call see MapLibre source options documentation.
   */
  sourceOptions: PropTypes.object,
  /**
   * Options object that will be used as first parameter on the MapLibreGl.addLayer call see MapLibre layer options documentation.
   *
   */
  layerOptions: PropTypes.object,
  /**
   * The layerId of an existing layer this layer should be rendered visually beneath
   * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
   */
  insertBeforeLayer: PropTypes.string,
};

export default MlOsmLayer;
