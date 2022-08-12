import { useEffect, useRef, useCallback, useState } from "react";
import useMap, { useMapType } from "./useMap";
import MapLibreGlWrapper from "../components/MapLibreMap/lib/MapLibreGlWrapper";
import { SourceSpecification } from "maplibre-gl";

type useSourceType = {
  map: MapLibreGlWrapper | undefined;
  source: SourceSpecification;
  componentId: string;
  mapHook: useMapType;
};
interface useSourceProps {
  mapId?: string;
  idPrefix?: string;
  source: SourceSpecification;
  sourceId: string;
}

function useSource(props: useSourceProps): useSourceType {
  const mapHook = useMap({
    mapId: props.mapId,
  });

  const initializedRef = useRef<boolean>(false);
  const [source, setSource] = useState<any>();
  const sourceId = useRef(
    props.sourceId || (props.idPrefix ? props.idPrefix : "Source-") + mapHook.componentId
  );

  const createSource = useCallback(() => {
    if (!mapHook.map) return;

    if (mapHook.map.map.getSource(sourceId.current)) {
      mapHook.cleanup();
    }

    initializedRef.current = true;
    mapHook.map?.addSource(sourceId.current, {
      ...props.source,
    });

    setSource(mapHook.map.map.getSource(sourceId.current));
  }, [props, mapHook.map]);

  // cleanup
  useEffect(() => {
    return () => {
      initializedRef.current = false;
      function _cleanupEventually() {
        if (mapHook.mapRef) {
          const used = mapHook.mapRef.map.style.sourceCaches[sourceId.current].used;
          if (!used) {
            mapHook.mapRef.map.removeSource(sourceId.current);
          } else {
            setTimeout(_cleanupEventually, 1000);
          }
        }
      }
      _cleanupEventually();
    };
  }, []);

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    createSource();
  }, [mapHook.map, createSource]);

  return {
    map: mapHook.map,
    source: source,
    componentId: mapHook.componentId,
    mapHook: mapHook,
  };
}

export default useSource;
