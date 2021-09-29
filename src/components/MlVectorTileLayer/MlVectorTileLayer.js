import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

/**
 * MlVectorTileLayer returns a Button that will add a standard OSM tile layer to the maplibre-gl instance.
 */
const MlVectorTileLayer = (props) => {
  const mapContext = useContext(MapContext);

  const [showLayer, setShowLayer] = useState(true);
  const layerName = "vector-tile-layer-";
  const sourceName = "vector-tile-source-";
  const idPostfixRef = useRef(new Date().getTime());
  const layerIdsRef = useRef({});
  const initializedRef = useRef(false);
  const mapRef = useRef(null);

  const cleanup = () => {
    if (mapRef.current && mapRef.current.style) {
      for (let key in layerIdsRef.current) {
        if (mapRef.current.getLayer(layerIdsRef.current[key])) {
          mapRef.current.removeLayer(layerIdsRef.current[key]);
        }
      }
      if (mapRef.current.getSource(sourceName + idPostfixRef.current)) {
        mapRef.current.removeSource(sourceName + idPostfixRef.current);
      }
    }
  };

  useEffect(() => {
    return cleanup;
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;

    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    // Add the new layer to the openlayers instance once it is available
    mapRef.current.addSource(sourceName + idPostfixRef.current, {
      type: "vector",
      tiles: [props.url],
      tileSize: 512,
      attribution: "",
      //...props.sourceOptions,
    });

    for (let key in props.layers) {
      let layerId = layerName + "_" + key + "_" + idPostfixRef.current;
      layerIdsRef.current[key] = layerId;

      mapRef.current.addLayer({
        id: layerId,
        source: sourceName + idPostfixRef.current,
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
      });
    }
  }, [mapContext.mapIds]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || !initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.layers) {
      if (mapRef.current.getLayer(layerIdsRef.current[key])) {
        for (let paintKey in props.layers[key].paint) {
          mapContext
            .getMap(props.mapId)
            .setPaintProperty(
              layerIdsRef.current[key],
              paintKey,
              props.layers[key].paint[paintKey]
            );
        }
      }
    }
  }, [props.layers]);

  useEffect(() => {
    if (!mapRef.current) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapRef.current.setLayoutProperty(
        layerName + idPostfixRef.current,
        "visibility",
        "visible"
      );
    } else {
      mapRef.current.setLayoutProperty(
        layerName + idPostfixRef.current,
        "visibility",
        "none"
      );
    }
  }, [showLayer]);

  return <></>;
};

export default MlVectorTileLayer;
