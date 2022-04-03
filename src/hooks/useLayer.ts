import { useState, useEffect, useCallback, useRef } from "react";

import useMap, { useMapType } from "./useMap";

import { LayerSpecification } from "maplibre-gl";

import MapLibreGlWrapper from "../components/MapLibreMap/lib/MapLibreGlWrapper";

type useLayerType = {
  map: MapLibreGlWrapper | undefined;
  layer: LayerSpecification;
  layerId: string;
  componentId: string;
  mapHook: useMapType;
};

interface useLayerProps {
  mapId?: string;
  layerId?: string;
  idPrefix?: string;
  insertBeforeLayer?: string;
  insertBeforeFirstSymbolLayer?: boolean;
  geojson?: object;
  options: LayerSpecification;
  onHover?: Function;
  onClick?: Function;
  onLeave?: Function;
}

const legalLayerTypes = [
  "fill",
  "line",
  "symbol",
  "circle",
  "heatmap",
  "fill-extrusion",
  "raster",
  "hillshade",
  "background",
];

function useLayer(props: useLayerProps): useLayerType {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });

  const layerTypeRef = useRef<string>("");
  const layerPaintConfRef = useRef<string>("");
  const layerLayoutConfRef = useRef<string>("");

  const [layer, setLayer] = useState<any>();

  const initializedRef = useRef<boolean>(false);
  const layerId = useRef(
    props.layerId ||
      (props.idPrefix ? props.idPrefix : "Layer-") + mapHook.componentId
  );

  const createLayer = useCallback(() => {
    if (initializedRef.current || !mapHook.map) return;
    initializedRef.current = true;

    mapHook.map.addLayer(
      {
        ...props.options,
        ...(props.geojson
          ? {
              source: {
                type: "geojson",
                data: props.geojson,
              },
            }
          : {}),
        id: layerId.current,
      },
      props.insertBeforeLayer
        ? props.insertBeforeLayer
        : props.insertBeforeFirstSymbolLayer
        ? mapHook.map.firstSymbolLayer
        : undefined,
      mapHook.componentId
    );

    setLayer(mapHook.map.map.getLayer(layerId.current));

    if (typeof props.onHover !== "undefined") {
      mapHook.map.on(
        "mousemove",
        layerId.current,
        props.onHover,
        mapHook.componentId
      );
    }

    if (typeof props.onClick !== "undefined") {
      mapHook.map.on(
        "click",
        layerId.current,
        props.onClick,
        mapHook.componentId
      );
    }

    if (typeof props.onLeave !== "undefined") {
      mapHook.map.on(
        "mouseleave",
        layerId.current,
        props.onLeave,
        mapHook.componentId
      );
    }

    layerPaintConfRef.current = JSON.stringify(props.options?.paint);
    layerLayoutConfRef.current = JSON.stringify(props.options?.layout);
    layerTypeRef.current = props.options.type;
  }, [props, mapHook.map]);

  useEffect(() => {
    if (!mapHook.map) return;

    console.log("create layer");
    if (
      initializedRef.current &&
      legalLayerTypes.indexOf(props.options.type) !== -1 &&
      layerTypeRef.current &&
      props.options.type !== layerTypeRef.current
    ) {
      // remove (cleanup) & reinitialize the layer if type has changed
      console.log("create layer 1");
      cleanup();
    } else if (
      initializedRef.current &&
      (legalLayerTypes.indexOf(props.options.type) === -1 ||
        (legalLayerTypes.indexOf(props.options.type) !== -1 &&
          props.options.type === layerTypeRef.current))
    ) {
      console.log("create layer 2");
      return;
    }

    createLayer();
  }, [mapHook.map, props.options, createLayer]);

  useEffect(() => {
    if (
      !initializedRef.current ||
      !mapHook?.map?.map.getSource(layerId.current)
    )
      return;

    // @ts-ignore
    mapHook.map.map.getSource(layerId.current).setData(props.geojson);
  }, [props.geojson, mapHook.map, props.options.type]);

  useEffect(() => {
    if (
      !mapHook.map ||
      !mapHook.map?.map?.getLayer?.(layerId.current) ||
      !initializedRef.current
    )
      return;

    var key;

    let layoutString = JSON.stringify(props.options.layout);
    if (props.options.layout && layoutString !== layerLayoutConfRef.current) {
      let oldLayout = JSON.parse(layerLayoutConfRef.current);

      for (key in props.options.layout) {
        if (
          props.options.layout?.[key] &&
          props.options.layout[key] !== oldLayout[key]
        ) {
          mapHook.map.map.setLayoutProperty(
            layerId.current,
            key,
            props.options.layout[key]
          );
        }
      }
      layerLayoutConfRef.current = layoutString;
    }

    let paintString = JSON.stringify(props.options.paint);
    if (paintString !== layerPaintConfRef.current) {
      let oldPaint = JSON.parse(layerPaintConfRef.current);
      console.log("update paint props");
      console.log(oldPaint);
      console.log(props.options.paint);
      for (key in props.options.paint) {
        if (
          props.options.paint?.[key] &&
          props.options.paint[key] !== oldPaint[key]
        ) {
          mapHook.map.map.setPaintProperty(
            layerId.current,
            key,
            props.options.paint[key]
          );
        }
      }
      layerPaintConfRef.current = paintString;
    }
  }, [props.options, mapHook.map]);

  const cleanup = () => {
    initializedRef.current = false;
    mapHook.cleanup();
  };

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return {
    map: mapHook.map,
    layer: layer,
    layerId: layerId.current,
    componentId: mapHook.componentId,
    mapHook: mapHook,
  };
}

export default useLayer;
