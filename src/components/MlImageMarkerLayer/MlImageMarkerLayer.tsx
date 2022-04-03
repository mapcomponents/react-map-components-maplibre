import React, { useRef, useCallback, useEffect } from "react";

import { GeoJSONSource } from "maplibre-gl";
import useMap from "../../hooks/useMap";

interface MlImageMarkerLayerProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId?: string;
  /**
   * The layerId of an existing layer this layer should be rendered visually beneath
   * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
   */
  insertBeforeLayer?: string;
  /**
   * Id of the layer that will be added by this component to the maplibre-gl instance
   */
  layerId?: string;
  /**
   * Id of the image that will be added by this component to the maplibre-gl instance
   */
  imageId?: string;
  /**
   * Path or URL to a supported raster image
   */
  imgSrc?: string;
  /**
   * Javascript object that is passed the addLayer command as first parameter.
   */
  options?: any;
}

const MlImageMarkerLayer = (props: MlImageMarkerLayerProps) => {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });

  const layerInitializedRef = useRef(false);
  const imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
  const layerId = useRef(
    props.layerId || "MlImageMarkerLayer-" + mapHook.componentId
  );

  useEffect(() => {
    if (
      !mapHook.map ||
      (mapHook.map && !mapHook.map.map.getLayer(layerId.current)) ||
      !props.options
    )
      return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    var key;

    if (props.options.layout) {
      for (key in props.options.layout) {
        mapHook.map.map.setLayoutProperty(
          layerId.current,
          key,
          props.options.layout[key]
        );
      }
    }
    if (props.options.paint) {
      for (key in props.options.paint) {
        mapHook.map.map.setPaintProperty(
          layerId.current,
          key,
          props.options.paint[key]
        );
      }
    }
  }, [props.options, layerId.current, props.mapId]);

  const addLayer = useCallback(() => {
    if(!mapHook.map)return;

    let tmpOptions = {
      id: layerId.current,
      layout: {},
      ...props.options,
    };
    tmpOptions.layout["icon-image"] = imageIdRef.current;
    mapHook.map.addLayer(
      tmpOptions,
      props.insertBeforeLayer,
      mapHook.componentId
    );
  }, [props, mapHook.map]);

  useEffect(() => {
    if (!props.options || !mapHook.map || layerInitializedRef.current)
      return;

    layerInitializedRef.current = true;

    if (props.imgSrc) {
      mapHook.map.map.loadImage(props.imgSrc, function (error, image) {
        if (error) throw error;
        
        if(!mapHook.map)return;

        mapHook.map.addImage(imageIdRef.current, image, mapHook.componentId);
      });
    }

    addLayer();
  }, [mapHook.map, addLayer, props]);

  useEffect(() => {
    if (
      !mapHook.map ||
      (mapHook.map && !mapHook.map.map.getLayer(layerId.current)) ||
      !props.options
    ) {
      return;
    }

    (mapHook.map.map
      .getSource(layerId.current) as GeoJSONSource)
      .setData(props.options.source.data);
  }, [props.options.source.data, props]);

  return <></>;
};

export default MlImageMarkerLayer;
