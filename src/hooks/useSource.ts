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
    initializedRef.current = true;

    if (mapHook.map.map.getSource(sourceId.current)) {
      mapHook.cleanup();
    }

    mapHook.map?.addSource(sourceId.current, {
      ...props.source,
    });

    setSource(mapHook.map.map.getSource(sourceId.current));
  }, [props, mapHook.map]);

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    createSource();
  }, [mapHook.map, props, createSource]);

  useEffect(() => {
    if (!initializedRef.current || !mapHook.map?.map?.getSource(props.sourceId)) return;

    //@ts-ignore setData only exists on GeoJsonSource
    mapHook.map.map.getSource(props.sourceId)?.setData?.(props.source.data);
    //@ts-ignore setData only exists on GeoJsonSource
  }, [props.source?.data]);

  //cleanup
  useEffect(() => {
    return () => {
      initializedRef.current = false;
      if (mapHook.map) {
        for (const [_, layer] of Object.entries(mapHook.map.map.style._layers)) {
          if (layer.source === sourceId.current) {
            mapHook.map.map.removeLayer(layer?.id);
          }
        }

        mapHook.map.map.removeSource(sourceId.current);
      }
    };
  }, [mapHook.map]);

  return {
    map: mapHook.map,
    source: source,
    componentId: mapHook.componentId,
    mapHook: mapHook,
  };
}

export default useSource;
