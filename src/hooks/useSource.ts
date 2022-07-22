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
  data?: object;
  url?: string;
  tilesize?: number;
  sourceId: string;
  type: string;
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

    mapHook.map?.addSource(
      sourceId.current,
      {
        ...(props.type === "geojson" ? { type: props.type, data: props.data } : {}),
        ...(props.type === "vector"
          ? { type: props.type, tiles: [props.url], tilesize: props.tilesize }
          : {}),
      },
      mapHook.componentId
    );
    // example addLayer
    //mapHook.map?.addLayer(
    //  {
    //    id: props.sourceId,
    //    type: "circle",
    //    source: props.sourceId,
    //    paint: {
    //      "circle-radius": 6,
    //      "circle-color": "#B42222",
    //    },
    //  },
    //  false,
    //  mapHook.componentId
    //);
    // example addVector
    //mapHook.map.addLayer(
    //  {
    //    id: props.sourceId,
    //    type: "line",
    //    source: props.sourceId,
    //    minzoom: 0,
    //    maxzoom: 22,
    //    "source-layer": "landuse",
    //    layout: {
    //      "line-cap": "round",
    //      "line-join": "round",
    //    },
    //    paint: { "line-width": 2, "line-color": "#ff0000" },
    //  },
    //  false,
    //  mapHook.componentId
    //);

    setSource(mapHook.map.map.getSource(sourceId.current));
  }, [props, mapHook.map]);

  // cleanup
  useEffect(() => {
    return () => {
      initializedRef.current = false;
      mapHook.cleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;

    createSource();
  }, [mapHook.map, createSource]);

  return {
    map: mapHook.map,
    source: source,
    sourceId: sourceId.current,
    componentId: mapHook.componentId,
    mapHook: mapHook,
  };
}

export default useSource;
