import React, { useRef, useEffect } from "react";
import useMap from "../../hooks/useMap";
import useSource from "../../hooks/useSource";
import wg_geojson from "./assets/pointWG.json";

interface MlGeojsonLayerWithSourceProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId?: string;
  /**
   * Id of an existing layer in the mapLibre instance to help specify the layer order
   * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
   */
  insertBeforeLayer?: string;
}

/**
 * MlGeojsonLayerWithSource
 *
 */
const MlGeojsonLayerWithSource = (props: MlGeojsonLayerWithSourceProps) => {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });
  const initializedRef = useRef(false);

  const { source } = useSource({
    mapId: "map_1",
    sourceId: "geojson-source",
    source: {
      type: "geojson",
      data: wg_geojson,
    },
  });

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    // the MapLibre-gl instance (mapHook.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;

    mapHook.map.map.setCenter([7.132122000552613, 50.716405378037706]);
  }, [mapHook.map, props.mapId]);

  return <></>;
};

MlGeojsonLayerWithSource.defaultProps = {
  mapId: "map_1",
};
export default MlGeojsonLayerWithSource;
