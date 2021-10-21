import { useContext, useCallback, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { MapContext } from "react-map-components-core";

function useMapState(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);

  const [center, setCenter] = useState(undefined);

  const [layers, setLayers] = useState(undefined);
  const layersRef = useRef(undefined);
  //const mapRef = useRef(props.map);
  const componentId = useRef(uuidv4());

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
      initializedRef.current = false;
    };
  }, []);

  const buildLayerObject = useCallback(
    (layer) => {
      if (mapRef.current.baseLayers.indexOf(layer.id) === -1) {
        let paint = {};
        let values = layer.paint?._values;
        Object.keys(values || {}).map((propName) => {
          paint[propName] =
            typeof values[propName].value !== "undefined"
              ? values[propName].value.value
              : values[propName];
        });
        let layout = {};
        values = layer.layout?._values;
        Object.keys(values || {}).map((propName) => {
          layout[propName] =
            typeof values[propName].value !== "undefined"
              ? values[propName].value.value
              : values[propName];
        });
        return {
          id: layer.id,
          type: layer.type,
          visible: layer.visibility === "none" ? false : true,
          baseLayer: mapRef.current.baseLayers.indexOf(layer.id) === -1,
          paint,
          layout,
          //filter: layers[layerId].filter,
          //layout: layers[layerId].layout,
          //maxzoom: layers[layerId].maxzoom,
          //metadata: layers[layerId].metadata,
          //minzoom: layers[layerId].minzoom,
          //paint: layers[layerId].paint.get(),
          //source: layers[layerId].source,
          //sourceLayer: layers[layerId].sourceLayer,
        };
      }
    },
    [mapRef]
  );

  const buildLayerObjects = useCallback(
    (layerIds, layers) => {
      return layerIds
        .map((layerId) => {
          return buildLayerObject(layers[layerId]);
        })
        .filter((n) => n);
    },
    [buildLayerObject]
  );

  const updateLayers = useCallback(() => {
    let layerIds = mapRef.current.style._order;

    let layerStates = buildLayerObjects(layerIds, mapRef.current.style._layers);
    let layerStatesString = JSON.stringify(layerStates);
    if (layerStatesString !== layersRef.current) {
      layersRef.current = layerStatesString;
      setLayers(layerStates);
    }
  }, [mapRef, layersRef]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    let layerIds = mapRef.current.style._order;
    let layerStates = buildLayerObjects(layerIds, mapRef.current.style._layers);
    let layerStatesString = JSON.stringify(layerStates);
    layersRef.current = layerStatesString;
    setLayers(layerStates);

    mapRef.current.on("idle", updateLayers, componentId.current);

    setCenter(mapRef.current.getCenter());
    mapRef.current.on(
      "move",
      () => {
        setCenter(mapRef.current.getCenter());
      },
      componentId.current
    );
  }, [buildLayerObjects, mapContext.mapIds, mapContext, props.mapId]);

  return {
    layers,
    center,
  };
}

export default useMapState;
