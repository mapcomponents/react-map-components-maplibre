import { useEffect } from "react";
import useMap, { useMapType } from "./useMap";
import MapLibreGlWrapper from "../components/MapLibreMap/lib/MapLibreGlWrapper";

type useSourceType = {
  map: MapLibreGlWrapper | undefined;
  componentId: string;
  mapHook: useMapType;
};
interface useSourceProps {
  mapId?: string;
  geojson?: object;
  sourceId: string;
  type: string;
  data: string;
}

function useSource(props: useSourceProps): useSourceType {
  const mapHook = useMap({
    mapId: props.mapId,
  });

  useEffect(() => {
    if (!mapHook.map) return;

    if (mapHook.map.map.getSource(props.sourceId)) {
      //mapHook.map.map.removeSource(props.sourceId);
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
    return () => {
      mapHook.cleanup();
    };
  }, [props, mapHook.map]);

  return {
    map: mapHook.map,
    componentId: mapHook.componentId,
    mapHook: mapHook,
  };
}

export default useSource;
