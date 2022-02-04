import React, { useContext, useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { MapContext } from "@mapcomponents/react-core";
import useMapState from "./useMapState";

function useMap(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const mapState = useMapState({
    mapId: props.mapId,
    watch: {
      viewport: false,
      layers: true,
      sources: false,
    },
    filter: {
      includeBaseLayers: true,
    },
  });

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);

  const componentId = useRef(uuidv4());

  const [mapIsReady, setMapIsReady] = useState(false);

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
      initializedRef.current = false;
      setMapIsReady(false);
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;

    //check if insertBeforeLayer exists
    if (props.waitForLayer) {
      let layerFound = false;

      mapState?.layers?.forEach((layer) => {
        if (layer.id === props.waitForLayer) {
          layerFound = true;
        }
      });
      if (!layerFound) {
        return;
      }
    }
    // the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);
    setMapIsReady(true);
  }, [mapContext.mapIds, mapState.layers, mapContext, props.mapId]);

  return {
    map: mapRef.current,
    mapIsReady,
    componentId: componentId.current,
    layers: mapState.layers,
  };
}

export default useMap;
