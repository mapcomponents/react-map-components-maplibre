import React, { useRef, useCallback, useEffect } from "react";

import useMap from "../../hooks/useMap";

const MlImageMarkerLayer = (props) => {
  const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });

  const layerInitializedRef = useRef(false);
  const imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
  const layerId = useRef(props.layerId || "MlImageMarkerLayer-" + mapHook.componentId);

  useEffect(() => {
    if (
      !mapHook.mapIsReady ||
      (mapHook.map && !mapHook.map.getLayer(layerId.current)) ||
      !props.options
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    var key;

    if (props.options.layout) {
      for (key in props.options.layout) {
        mapHook.map.setLayoutProperty(layerId.current, key, props.options.layout[key]);
      }
    }
    if (props.options.paint) {
      for (key in props.options.paint) {
        mapHook.map.setPaintProperty(layerId.current, key, props.options.paint[key]);
      }
    }
  }, [props.options, layerId.current, props.mapId]);

  const addLayer = useCallback(() => {
    let tmpOptions = {
      id: layerId.current,
      layout: {},
      ...props.options,
    };
    tmpOptions.layout["icon-image"] = imageIdRef.current;
    mapHook.map.addLayer(tmpOptions, props.insertBeforeLayer, mapHook.componentId);
  }, [props, mapHook.mapIsReady, mapHook.map]);

  useEffect(() => {
    if (!props.options || !mapHook.mapIsReady || layerInitializedRef.current) return;

    layerInitializedRef.current = true;

    if (props.imgSrc) {
      mapHook.map.loadImage(props.imgSrc, function (error, image) {
        if (error) throw error;
        mapHook.map.addImage(imageIdRef.current, image, mapHook.componentId);
      });
    }

    addLayer();
  }, [mapHook.mapIsReady, mapHook.map, addLayer, props]);

  useEffect(() => {
    if (
      !mapHook.mapIsReady ||
      (mapHook.map && !mapHook.map.getLayer(layerId.current)) ||
      !props.options
    ) {
      return;
    }

    mapHook.map.getSource(layerId.current).setData(props.options.source.data);
  }, [props.options.source.data, props]);

  return <></>;
};

export default MlImageMarkerLayer;
