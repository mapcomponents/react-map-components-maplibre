import { useContext, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { MapContext } from "@mapcomponents/react-core";

function useMap(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);

  const [center, setCenter] = useState(undefined);
  const [layerIds, setLayerIds] = useState(undefined);
  const layerIdsRef = useRef(undefined);

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

  const buildLayerObjects = (layers) => {
    let res = {};
    Object.keys(layers).forEach((layerId) => {
      if (mapRef.current.baseLayers.indexOf(layerId) === -1) {
        res[layerId] = {
          //filter: layers[layerId].filter,
          id: layers[layerId].id,
          //layout: layers[layerId].layout,
          //maxzoom: layers[layerId].maxzoom,
          //metadata: layers[layerId].metadata,
          //minzoom: layers[layerId].minzoom,
          paint: layers[layerId].paint,
          //source: layers[layerId].source,
          //sourceLayer: layers[layerId].sourceLayer,
          type: layers[layerId].type,
          visibility: layers[layerId].visibility,
        };
      }
    });
    return res;
  };

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    setLayerIds([...mapRef.current.style._order]);
    mapRef.current.on(
      "idle",
      () => {
        if (JSON.stringify(mapRef.current.style._order) !== layerIdsRef.current) {
          let layerIds = [...mapRef.current.style._order];
          layerIdsRef.current = JSON.stringify(layerIds);
          setLayerIds(layerIds);
        }

        let layerStates = buildLayerObjects(mapRef.current.style._layers);
        let layerStatesString = JSON.stringify(layerStates);
        if (layerStatesString !== layersRef.current) {
          layersRef.current = layerStatesString;
          setLayers(layerStates);
        }
      },
      componentId.current
    );

    setCenter(mapRef.current.getCenter());
    mapRef.current.on(
      "move",
      () => {
        setCenter(mapRef.current.getCenter());
      },
      componentId.current
    );
  }, [mapContext.mapIds, mapContext, props.mapId]);

  return {
    layers,
    layerIds,
    center,
  };
}

export default useMap;
