import {
  useContext,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import { v4 as uuidv4 } from "uuid";
// @ts-ignore
import { MapContext } from "@mapcomponents/react-core";
import useMapState from "./useMapState";
import MapLibreGlWrapper, {
  LayerState,
} from "../components/MapLibreMap/lib/MapLibreGlWrapper";

type useMapType = {
  map: MapLibreGlWrapper | undefined;
  mapIsReady: boolean;
  componentId: string;
  layers: (LayerState | undefined)[];
  cleanup: Function
};

function useMap(props: { mapId?: string; waitForLayer?: string }): useMapType {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext: MapContextType = useContext(MapContext);
  const [map, setMap] = useState();

  const mapState = useMapState({
    mapId: props.mapId,
    watch: {
      viewport: false,
      layers: props.waitForLayer ? true : false,
      sources: false,
    },
    filter: {
      includeBaseLayers: true,
    },
  });

  const initializedRef = useRef(false);
  const mapRef: MutableRefObject<MapLibreGlWrapper | undefined> =
    useRef(undefined);

  const componentId = useRef(uuidv4());

  const [mapIsReady, setMapIsReady] = useState(false);

  const cleanup = () => {
    if (mapRef.current) {
      mapRef.current.cleanup(componentId.current);
      mapRef.current = undefined;
    }
    initializedRef.current = false;
    setMapIsReady(false);
  };

  useEffect(() => {
    return cleanup;
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;

    // check if waitForLayer (string, layer id of the layer this hook is supposed to wait for)
    // exists as layer in the MapLibre instance
    if (props.waitForLayer) {
      let layerFound = false;

      mapState?.layers?.forEach((layer: any) => {
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
    // @ts-ignore
    setMap(mapRef.current);
    setMapIsReady(true);
  }, [
    mapContext.mapIds,
    mapState.layers,
    mapContext,
    props.waitForLayer,
    props.mapId,
  ]);

  return {
    map: map,
    mapIsReady,
    componentId: componentId.current,
    layers: mapState.layers,
    cleanup
  };
}

export default useMap;

export type {useMapType};