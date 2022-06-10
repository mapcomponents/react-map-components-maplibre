import useMap from "./useMap";
interface useSourceProps {
  mapId?: string;
  sourceId: string;
  type: string;
  data: string;
}

function useSource(props: useSourceProps) {
  const mapHook = useMap({
    mapId: props.mapId,
  });

  mapHook.map?.addSource("my-data", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [7.0847929969609424, 50.73855193187643],
      },
      properties: {
        title: "Bonn",
        "marker-symbol": "monument",
      },
    },
  });
}

export default useSource;
