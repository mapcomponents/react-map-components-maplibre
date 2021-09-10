import React, { useRef, useCallback, useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";

const MlImageMarkerLayer = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapRef = useRef(null);
  const mapContext = useContext(MapContext);
  const layerInitializedRef = useRef(false);
  const idPostfixRef = useRef(props.idSuffix || new Date().getTime());
  const imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
  const layerId = (props.layerId || "MlImageMarkerLayer-") + idPostfixRef.current;

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        // This is the cleanup function, it is called when this react component is removed from react-dom
        if (mapRef.current.style && mapRef.current.getLayer(layerId)) {
          mapRef.current.removeLayer(layerId);
        }
        if (mapRef.current.style && mapRef.current.getSource(layerId)) {
          mapRef.current.removeSource(layerId);
        }
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (
      !mapRef.current ||
      (mapRef.current && !mapContext.getMap(props.mapId).getLayer(layerId)) ||
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
      layout: {},
      ...props.options,
    };
    tmpOptions.layout["icon-image"] = imageIdRef.current;
    mapRef.current.addLayer(tmpOptions);
  }, [mapContext, props.options, props, imageIdRef, layerId]);

  useEffect(() => {
    if (
      !mapRef.current ||
      (mapRef.current && !mapContext.getMap(props.mapId).getLayer(layerId)) ||
      !props.options
    ) {
      return;
    }
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    mapRef.current.getSource(layerId).setData(props.geojson);
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
    mapRef.current = mapContext.getMap(props.mapId);

    layerInitializedRef.current = true;

    if (props.imgSrc) {
      mapRef.current.loadImage(props.imgSrc, function (error, image) {
        if (error) throw error;
        mapRef.current.addImage(imageIdRef.current, image);
      });
    }
    addLayer();
  }, [mapContext.mapIds, mapContext, props, layerId, addLayer]);

  return <></>;
};

export default MlImageMarkerLayer;
