import { useEffect, useRef, useCallback, useState } from "react";
import useMap, { useMapType } from "./useMap";
import MapLibreGlWrapper from "../components/MapLibreMap/lib/MapLibreGlWrapper";
import { SourceSpecification } from "maplibre-gl";

type useSourceType = {
  map: MapLibreGlWrapper | undefined;
  source: SourceSpecification;
  sourceId: string;
  componentId: string;
  mapHook: useMapType;
};
interface useSourceProps {
  mapId?: string;
  idPrefix?: string;
  geojson?: object;
  sourceId: string;
  type: string;
  data: string;
}

function useSource(props: useSourceProps): useSourceType {
  const mapHook = useMap({
    mapId: props.mapId,
  });

  const source = useRef<any>();
  const sourceId = useRef(
    props.sourceId || (props.idPrefix ? props.idPrefix : "Source-") + mapHook.componentId
  );

  const createSource = useCallback(() => {
    if (!mapHook.map) return;

    if (mapHook.map.map.getSource(sourceId.current)) {
      mapHook.cleanup();
    }

    mapHook.map?.addSource(
      props.sourceId,
      {
        type: "geojson",
        data: props.geojson,
      },
      mapHook.componentId
    );
    mapHook.map?.addLayer(
      {
        id: props.sourceId,
        type: "circle",
        source: props.sourceId,
        paint: {
          "circle-radius": 6,
          "circle-color": "#B42222",
        },
      },
      false,
      mapHook.componentId
    );
    source.current = mapHook.map.map.getSource(sourceId.current);
    console.log(source.current);
  }, [props, mapHook.map]);

  // cleanup
  useEffect(() => {
    return () => {
      mapHook.cleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapHook.map) return;
    createSource();
  }, [mapHook.map, createSource]);

  return {
    map: mapHook.map,
    source: source.current,
    sourceId: sourceId.current,
    componentId: mapHook.componentId,
    mapHook: mapHook,
  };
}

export default useSource;
