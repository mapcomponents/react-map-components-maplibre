import React, { useRef, useCallback, useEffect, useContext } from "react";

import { v4 as uuidv4 } from "uuid";
import { MapContext } from "@mapcomponents/react-core";

const MlImageMarkerLayer = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapRef = useRef(null);
  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlOsmLayer-") + uuidv4()
  );
  const mapContext = useContext(MapContext);
  const layerInitializedRef = useRef(false);
  const idSuffixRef = useRef(props.idSuffix || new Date().getTime());
  const imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
  const layerId = useRef((props.layerId || "MlImageMarkerLayer-") + idSuffixRef.current);

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
    if (
      !mapRef.current ||
      (mapRef.current && !mapContext.getMap(props.mapId).getLayer(layerId.current)) ||
      !props.options
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    var key;

    if (props.options.layout) {
      for (key in props.options.layout) {
        mapContext
          .getMap(props.mapId)
          .setLayoutProperty(layerId.current, key, props.options.layout[key]);
      }
    }
    if (props.options.paint) {
      for (key in props.options.paint) {
        mapContext
          .getMap(props.mapId)
          .setPaintProperty(layerId.current, key, props.options.paint[key]);
      }
    }
  }, [props.options, layerId.current, mapContext, props.mapId]);

  const addLayer = useCallback(() => {
    let tmpOptions = {
      id: layerId.current,
      layout: {},
      ...props.options,
    };
    tmpOptions.layout["icon-image"] = imageIdRef.current;
    mapRef.current.addLayer(
      tmpOptions,
      props.insertBeforeLayer,
      componentId.current
    );
  }, [props]);

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
        mapRef.current.addImage(imageIdRef.current, image, componentId.current);
      });
    }
    addLayer();
  }, [mapContext.mapIds, mapContext, props, addLayer]);

  useEffect(() => {
    if (
      !mapRef.current ||
      (mapRef.current && !mapContext.getMap(props.mapId).getLayer(layerId.current)) ||
      !props.options
    ) {
      return;
    }
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    mapRef.current.getSource(layerId.current).setData(props.options.source.data);
  }, [props.options.source.data, mapContext, props]);

  return <></>;
};

export default MlImageMarkerLayer;
