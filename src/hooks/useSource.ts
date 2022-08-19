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


  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    createSource();
    //cleanup
    return () => {
      initializedRef.current = false;
      if (mapHook.mapRef) {
        for (const [_, layer] of Object.entries(mapHook.mapRef.map.style._layers)) {
          if (layer.source === sourceId.current) {
            mapHook.mapRef.map.removeLayer(layer?.id);
          }
        }

        mapHook.mapRef.map.removeSource(sourceId.current);
      }
    };
  }, [mapHook.map, createSource]);

  return {
    map: mapHook.map,
    source: source,
    componentId: mapHook.componentId,
    mapHook: mapHook,
  };
}

export default useSource;
