import { useEffect } from "react";
import useMap from "./useMap";
interface useSourceProps {
  mapId?: string;
  geojson?: object;
  sourceId: string;
  type: string;
  data: string;
}

function useSource(props: useSourceProps) {
  const mapHook = useMap({
    mapId: props.mapId,
  });

  useEffect(() => {
    if (!mapHook.map) return;
    mapHook.map?.addSource(props.sourceId, {
      type: "geojson",
      data: props.geojson,
    });
    mapHook.map?.addLayer({
      id: props.sourceId,
      type: "circle",
      source: props.sourceId,
      paint: {
        "circle-radius": 6,
        "circle-color": "#B42222",
      },
    });
  }, [props, mapHook.map]);
}

export default useSource;
