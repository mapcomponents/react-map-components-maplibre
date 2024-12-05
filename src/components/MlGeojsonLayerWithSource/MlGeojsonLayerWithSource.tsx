import React, { useRef, useEffect } from "react";
import useMap from "../../hooks/useMap";
import useLayer from "../../hooks/useLayer";
import useSource from "../../hooks/useSource";
import {Feature} from 'geojson';

export interface MlGeojsonLayerWithSourceProps {
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
  const Spiekeroog:Feature = {
    type: "Feature",
		properties:{},
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [7.678070068359375, 53.77276133960687],
          [7.665367126464845, 53.76190478322587],
          [7.66794204711914, 53.75439486837337],
          [7.682018280029297, 53.75104541932613],
          [7.683563232421874, 53.752567929273795],
          [7.6895713806152335, 53.75784553654847],
          [7.694721221923828, 53.765253366367],
          [7.697296142578124, 53.76555776977467],
          [7.696952819824219, 53.76190478322587],
          [7.702102661132812, 53.7634268995759],
          [7.74038314819336, 53.760179651329416],
          [7.7458763122558585, 53.7626151110553],
          [7.76956558227539, 53.76413720165758],
          [7.796001434326172, 53.77002209954434],
          [7.801666259765624, 53.77113810781356],
          [7.801666259765624, 53.77235553754314],
          [7.806129455566406, 53.77306568858016],
          [7.815742492675781, 53.775703287246394],
          [7.819690704345703, 53.77752921999979],
          [7.81951904296875, 53.77955794100295],
          [7.8172874450683585, 53.78026797018521],
          [7.785530090332031, 53.780166538180396],
          [7.756175994873047, 53.78067369575275],
          [7.754802703857421, 53.7819922767562],
          [7.7398681640625, 53.78189084891923],
          [7.725791931152345, 53.78168799250984],
          [7.71686553955078, 53.77986224069494],
          [7.709827423095702, 53.78087655706549],
          [7.695751190185547, 53.78036940194483],
          [7.687854766845703, 53.778340720169446],
          [7.678070068359375, 53.77276133960687],
        ],
      ],
    },
  };

  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });

  const initializedRef = useRef(false);

  const sourceId = "geojson-source-island";
  useSource({
    mapId: props.mapId,
    sourceId: sourceId,
    source: {
      type: "geojson",
      data: Spiekeroog,
    },
  });

  useLayer({
    mapId: props.mapId,
    layerId: "Spiekeroog-area",
    options: {
      id: "layer1",
      source: sourceId,
      type: "fill",
      paint: {
        "fill-color": "green",
        "fill-opacity": 0.5,
      },
    },
  });

  useLayer({
    mapId: props.mapId,
    layerId: "Spiekeroog-points",
    options: {
      id: "Spiekeroog-points",
      source: sourceId,
      type: "circle",
      paint: {
        "circle-radius": 4,
        "circle-color": "green",
      },
    },
  });

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    // the MapLibre-gl instance (mapHook.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;

    mapHook.map.map.setCenter([7.7388381958, 53.7732685866]);
    mapHook.map.map.setZoom(11);
  }, [mapHook.map, props.mapId]);

  return <></>;
};

MlGeojsonLayerWithSource.defaultProps = {
  mapId: "map_1",
};
export default MlGeojsonLayerWithSource;
