import React, { useRef, useEffect, useCallback } from "react";
import useMap from "../../hooks/useMap";
import useLayer from "../../hooks/useLayer";
import useSource from "../../hooks/useSource";

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
  const wg_geojson = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [7.0851268, 50.73884],
      properties: {
        title: "WhereGroup GmbH",
      },
    },
  };

  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });

  const initializedRef = useRef(false);

  const sourceId = "geojson-source";
  useSource({
    mapId: props.mapId,
    sourceId: sourceId,
    source: {
      type: "geojson",
      data: wg_geojson,
    },
  });

  useLayer({
    mapId: props.mapId,
    layerId: "layer1",
    source: sourceId,
    options: {
      id: "layer1",
      source: sourceId,
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "red",
      },
    },
    insertBeforeLayer: false,
  });

  useLayer({
    mapId: props.mapId,
    layerId: "layer2",
    source: sourceId,
    options: {
      id: "layer2",
      source: sourceId,
      type: "circle",
      paint: {
        "circle-radius": 4,
        "circle-color": "green",
      },
    },
    insertBeforeLayer: false,
  });

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    // the MapLibre-gl instance (mapHook.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;

    mapHook.map.map.setCenter([7.0851268, 50.73884]);
  }, [mapHook.map, props.mapId]);

  return <></>;
};

MlGeojsonLayerWithSource.defaultProps = {
  mapId: "map_1",
};
export default MlGeojsonLayerWithSource;
