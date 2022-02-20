import React, { useRef, useEffect, useState } from "react";

import PropTypes from "prop-types";
import useMap from "../../hooks/useMap";

/**
 * Adds a standard OSM tile layer to the maplibre-gl instancereference by
 * props.mapId
 *
 * @component
 */
const MlOsmLayer = (props) => {
  const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });

  const layerId = useRef(props.layerId || "MlOsmLayer-" + mapHook.componentId);

  useEffect(() => {
    if (!mapHook.map) return;

    mapHook.map.addSource(
      layerId.current,
      {
        type: "raster",
        tileSize: 256,
        ...props.sourceOptions,
      },
      mapHook.componentId
    );
    mapHook.map.addLayer(
      {
        id: layerId.current,
        type: "raster",
        source: layerId.current,
        minzoom: 0,
        maxzoom: 22,
        ...props.layerOptions,
      },
      props.insertBeforeLayer,
      mapHook.componentId
    );
  }, [props, mapHook.map]);

  return <></>;
};

MlOsmLayer.propTypes = {
  /**
   * Id of the target MapLibre instance in mapHook
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
