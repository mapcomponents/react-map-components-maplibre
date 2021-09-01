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

  const cleanup = () => {
    for (let key in layerIdsRef.current) {
      if (
        mapContext.map.style &&
        mapContext.map.getLayer(layerIdsRef.current[key])
      ) {
        mapContext.map.removeLayer(layerIdsRef.current[key]);
      }
    }
    if (
      mapContext.map.style &&
      mapContext.map.getSource(sourceName + idPostfixRef.current)
    ) {
      mapContext.map.removeSource(sourceName + idPostfixRef.current);
    }
  };

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;

    cleanup();

    // Add the new layer to the openlayers instance once it is available
    mapContext.map.addSource(sourceName + idPostfixRef.current, {
      type: "vector",
      tiles: [props.url],
      tileSize: 512,
      attribution: "",
      //...props.sourceOptions,
    });

    for (let key in props.layers) {
      let layerId = layerName + "_" + key + "_" + idPostfixRef.current;
      layerIdsRef.current[key] = layerId;

      mapContext.map.addLayer({
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
  }, [mapContext.map]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    for (var key in props.layers) {
      if (mapContext.map.getLayer(layerIdsRef.current[key])) {
        for (let paintKey in props.layers[key].paint) {
          console.log(props.layers[key].paint[paintKey]);
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
    if (!mapContext.map) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapContext.map.setLayoutProperty(
        layerName + idPostfixRef.current,
        "visibility",
        "visible"
      );
    } else {
      mapContext.map.setLayoutProperty(
        layerName + idPostfixRef.current,
        "visibility",
        "none"
      );
    }
  }, [showLayer]);

  return <></>;
};

export default MlVectorTileLayer;
