import React, { useRef, useCallback, useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";

const MlImageMarkerLayer = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const layerInitializedRef = useRef(false);
  const idPostfixRef = useRef(props.idSuffix || new Date().getTime());
  const imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
  const layerId = (props.layerId || "MlImageMarkerLayer-") + idPostfixRef.current;

  useEffect(() => {
    return () => {
      if (mapContext.getMap(props.mapId)) {
        // This is the cleanup function, it is called when this react component is removed from react-dom
        if (mapContext.getMap(props.mapId).getLayer(layerId)) {
          mapContext.getMap(props.mapId).removeLayer(layerId);
        }
        if (mapContext.getMap(props.mapId).getSource(layerId)) {
          mapContext.getMap(props.mapId).removeSource(layerId);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (
      !mapContext.mapExists(props.mapId) ||
      !mapContext.getMap(props.mapId).getLayer(layerId) ||
      !props.options
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (props.options.layout) {
      for (var key in props.options.layout) {
        mapContext
          .getMap(props.mapId)
          .setLayoutProperty(layerId, key, props.options.layout[key]);
      }
    }
    if (props.options.paint) {
      for (var key in props.options.paint) {
        mapContext
          .getMap(props.mapId)
          .setPaintProperty(layerId, key, props.options.paint[key]);
      }
    }
  }, [props.options, layerId, mapContext, props.mapId]);

  const addLayer = useCallback(() => {
    let tmpOptions = {
      id: layerId,
      ...props.options,
    };
    tmpOptions.layout["icon-image"] = imageIdRef.current;
    mapContext.getMap(props.mapId).addLayer(tmpOptions);
  }, [mapContext, props.options, props, imageIdRef, layerId]);

  useEffect(() => {
    if (
      !mapContext.mapExists(props.mapId) ||
      !mapContext.getMap(props.mapId).getSource(layerId)
    ) {
      return;
    }
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    mapContext.getMap(props.mapId).getSource(layerId).setData(props.geojson);
  }, [props.geojson, layerId, mapContext, props]);

  useEffect(() => {
    if (
      !props.options ||
      !mapContext.mapExists(props.mapId) ||
      layerInitializedRef.current
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    if (!mapContext.getMap(props.mapId).getLayer(layerId)) {
      layerInitializedRef.current = true;
      if (!mapContext.getMap(props.mapId).hasImage(imageIdRef.current)) {
        mapContext
          .getMap(props.mapId)
          .loadImage(props.imgSrc, function (error, image) {
            if (error) throw error;
            mapContext.getMap(props.mapId).addImage(imageIdRef.current, image);
            addLayer();
          });
      } else {
        addLayer();
      }
    }
  }, [mapContext.mapIds, mapContext, props, layerId, addLayer]);

  return <></>;
};

export default MlImageMarkerLayer;
