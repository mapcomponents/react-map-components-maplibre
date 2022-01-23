import React, { useRef, useEffect } from "react";
import useMap from "../../hooks/useMap";
import PropTypes from "prop-types";

/**
 * Adds a vector-tile source and 0...n vector-tile-layers to the MapLibre instance referenced by
 * props.mapId
 *
 * @component
 */
const MlVectorTileLayer = (props) => {
  const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });

  const layerIdsRef = useRef({});
  const layerId = useRef(props.layerId || "MlVectorTileLayer-" + mapHook.componentId);
  const layerPaintConfsRef = useRef({});
  const layerLayoutConfsRef = useRef({});
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;

    initializedRef.current = true;

    // Add the new layer to the openlayers instance once it is available
    mapHook.map.addSource(
      layerId.current,
      {
        type: "vector",
        tiles: [props.url],
        tileSize: 512,
        attribution: "",
        ...props.sourceOptions,
      },
      mapHook.componentId
    );

    for (let key in props.layers) {
      let _layerId = layerId.current + "_" + key;
      layerIdsRef.current[key] = _layerId;

      mapHook.map.addLayer(
        {
          id: _layerId,
          source: layerId.current,
          type: "line",
          minzoom: 0,
          maxzoom: 22,
          layout: {},
          paint: {
            "line-opacity": 0.5,
            "line-color": "rgb(80, 80, 80)",
            "line-width": 2,
          },
          ...props.layers[key],
        },
        props.insertBeforeLayer,
        mapHook.componentId
      );
      layerPaintConfsRef.current[key] = JSON.stringify(props.layers[key].paint);
      layerLayoutConfsRef.current[key] = JSON.stringify(props.layers[key].layout);
    }
  }, [mapHook.map, props]);

  useEffect(() => {
    if (!mapHook.map || !initializedRef.current) return;
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    for (var key in props.layers) {
      if (mapHook.map.getLayer(layerIdsRef.current[key])) {
        // update changed paint property
        let layerPaintConfString = JSON.stringify(props.layers[key].paint);

        if (layerPaintConfString !== layerPaintConfsRef.current[key]) {
          for (let paintKey in props.layers[key].paint) {
            mapHook.map.setPaintProperty(
              layerIdsRef.current[key],
              paintKey,
              props.layers[key].paint[paintKey]
            );
          }
        }
        layerPaintConfsRef.current[key] = layerPaintConfString;

        // update changed layout property
        let layerLayoutConfString = JSON.stringify(props.layers[key].layout);

        if (layerLayoutConfString !== layerLayoutConfsRef.current[key]) {
          for (let layoutKey in props.layers[key].layout) {
            mapHook.map.setLayoutProperty(
              layerIdsRef.current[key],
              layoutKey,
              props.layers[key].layout[layoutKey]
            );
          }
        }
        layerLayoutConfsRef.current[key] = layerLayoutConfString;
      }
    }
  }, [props.layers, mapHook.map]);

  return <></>;
};

MlVectorTileLayer.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Options object that will be used as first parameter on the MapLibreGl.addSource call see MapLibre source options documentation.
   */
  sourceOptions: PropTypes.object,
  /**
   * Object that hold layers
   */
  layers: PropTypes.object,
  /**
   * String of the URL of a wms layer
   */
  url: PropTypes.string,
};

export default MlVectorTileLayer;
