import React, { useRef, useCallback, useEffect } from "react";

import { GeoJSONSource } from "maplibre-gl";
import useMap, { useMapType } from "../../hooks/useMap";

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

  const initializedRef = useRef(false);
  const recreationInProgress = useRef(false);
  const imageIdRef = useRef(props.imageId || "img_" + new Date().getTime());
  const layerId = useRef(props.layerId || "MlImageMarkerLayer-" + mapHook.componentId);

  // effect to sync Layer paint & layout properties
  useEffect(() => {
    if (
      !mapHook.map ||
      (mapHook.map && !mapHook.map.map.getLayer(layerId.current)) ||
      !props.options
    )
      return;

    var key;

    if (props.options.layout) {
      for (key in props.options.layout) {
        mapHook.map.map.setLayoutProperty(layerId.current, key, props.options.layout[key]);
      }
    }
    if (props.options.paint) {
      for (key in props.options.paint) {
        mapHook.map.map.setPaintProperty(layerId.current, key, props.options.paint[key]);
      }
    }
  }, [props.options, layerId.current, props.mapId]);

  const createImage = (mapHook: useMapType, props: MlImageMarkerLayerProps, callback: Function) => {
    if (!mapHook.map) {
      initializedRef.current = false;

      return;
    }

    if (props.imgSrc && !mapHook.map.map.hasImage(imageIdRef.current)) {
      mapHook.map.map.loadImage(props.imgSrc, function (error, image) {
        if (error) throw error;

        if (!mapHook.map || mapHook.map.map.hasImage(imageIdRef.current)) return;

        mapHook.map.addImage(imageIdRef.current, image, mapHook.componentId);

        if (typeof callback === "function") {
          callback();
        }
      });
    } else {
      if (typeof callback === "function") {
        callback();
      }
    }
  };

  const createLayer = (
    mapHook: useMapType,
    props: MlImageMarkerLayerProps,
    createMapLibreElements: Function
  ) => {
    if (!props.options || !mapHook.map || mapHook.map?.map.getLayer(layerId.current)) return;

    let tmpOptions = {
      id: layerId.current,
      layout: {},
      ...props.options,
    };
    tmpOptions.layout["icon-image"] = imageIdRef.current;
    mapHook.map.addLayer(tmpOptions, props.insertBeforeLayer, mapHook.componentId);

    // recreate layer if map style.json has changed
    mapHook.map.on(
      "styledata",
      () => {
        if (
          initializedRef.current &&
          !mapHook.map?.map.getLayer(layerId.current) &&
          !recreationInProgress.current
        ) {
          initializedRef.current = false;
          recreationInProgress.current = true;
          console.log("Recreate Layer " + layerId.current);
          createMapLibreElements();
        }
      },
      mapHook.componentId
    );

    if (recreationInProgress.current) {
      recreationInProgress.current = false;
    }
  };

  const createMapLibreElements = useCallback(() => {
    // @ts-ignore
    if (!mapHook.map && !initializedRef.current && mapHook.map?.map.getLayer(layerId.current))
      return;

    initializedRef.current = true;

    if (recreationInProgress.current) {
      mapHook.cleanup();
    }

    if (props.imgSrc) {
      createImage(mapHook, props, () => {
        createLayer(mapHook, props, createMapLibreElements);
      });
    } else {
      createLayer(mapHook, props, createMapLibreElements);
    }
  }, [props, mapHook.map]);

  useEffect(() => {
    if (initializedRef.current) return;

    createMapLibreElements();
  }, [createMapLibreElements]);

  useEffect(() => {
    if (
      !mapHook.map ||
      (mapHook.map && !mapHook.map.map.getLayer(layerId.current)) ||
      !props.options
    ) {
      return;
    }

    (mapHook.map.map.getSource(layerId.current) as GeoJSONSource).setData(
      props.options.source.data
    );
  }, [props.options.source.data, props]);

  return <></>;
};

export default MlImageMarkerLayer;
