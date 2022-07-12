import React, { useState, useRef, useEffect, useCallback } from "react";

import * as turf from "@turf/turf";

import useMap from "../../hooks/useMap";

import { _transitionToGeojson } from "./util/transitionFunctions";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import { Feature, FeatureCollection } from "@turf/turf";
import { CircleLayerSpecification, FillLayerSpecification, LineLayerSpecification, MapLayerMouseEvent } from "maplibre-gl";

const msPerStep = 50;

interface MlTransitionGeoJsonLayerProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: string;
  /**
   * GeoJSON data that is supposed to be rendered by this component.
   */
  geojson: Feature | FeatureCollection | undefined;
  /**
   * Type of the layer that will be added to the MapLibre instance.
   * Possible values: "line", "circle", "fill"
   */
  type?: "fill" | "line" | "circle";
  /**
   * Paint property object, that is passed to the addLayer call.
   * Possible props depend on the layer type.
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
   */
  paint?: CircleLayerSpecification['paint'] | FillLayerSpecification['paint'] | LineLayerSpecification['layout'];
  /**
   * Layout property object, that is passed to the addLayer call.
   * Possible props depend on the layer type.
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
   */
  layout?: CircleLayerSpecification['layout'] | FillLayerSpecification['layout'] | LineLayerSpecification['layout'];
  /**
   * Javascript object that is spread into the addLayer commands first parameter.
   */
  options?: CircleLayerSpecification | FillLayerSpecification | LineLayerSpecification;
  /**
   * Javascript object with optional properties "fill", "line", "circle" to override implicit layer type default paint properties.
   */
  defaultPaintOverrides?: { circle?: CircleLayerSpecification['paint'], fill?: FillLayerSpecification['paint'], line?: LineLayerSpecification['paint'] };
  /**
   * Id of an existing layer in the mapLibre instance to help specify the layer order
   * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
   */
  insertBeforeLayer: string;
  /**
   * Hover event handler that is executed whenever a geometry rendered by this component is hovered.
   */
  onHover?: MapLayerMouseEvent;
  /**
   * Click event handler that is executed whenever a geometry rendered by this component is clicked.
   */
  onClick?: MapLayerMouseEvent;
  /**
   * Leave event handler that is executed whenever a geometry rendered by this component is
   * left/unhovered.
   */
  onLeave?: MapLayerMouseEvent;
  /**
   * Creates transition animation whenever the geojson prop changes.
   * Only works with layer type "line" and LineString GeoJSON data.
   */
  transitionTime: number;
}

/**
 * Adds source and layer of types "line", "fill" or "circle" to display GeoJSON data on the map.
 */
const MlTransitionGeoJsonLayer = (props: MlTransitionGeoJsonLayerProps) => {
  const { geojson, ...restProps } = props;

  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });
  const initializedRef = useRef(false);

  // transition effect variables
  const oldGeojsonRef = useRef<Feature | FeatureCollection>();
  const transitionInProgressRef = useRef(false);
  const transitionTimeoutRef = useRef(undefined);
  const currentTransitionStepRef = useRef(false);
  const transitionGeojsonDataRef = useRef([]);
  const transitionGeojsonCommonDataRef = useRef([]);
  const [displayGeojson, setDisplayGeojson] = useState(
    turf.featureCollection([])
  );

  useEffect(() => {
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const transitionToGeojson = useCallback(() => {
    _transitionToGeojson(
      props,
      transitionGeojsonCommonDataRef,
      transitionGeojsonDataRef,
      transitionInProgressRef,
      oldGeojsonRef,
      msPerStep,
      currentTransitionStepRef,
      mapHook.map,
      transitionTimeoutRef,
      setDisplayGeojson
    );
  }, [props, mapHook.map]);

  useEffect(() => {
    if (!mapHook.map || !initializedRef.current) return;

    if (
      typeof props.transitionTime !== "undefined" &&
      props.type === "line" &&
      oldGeojsonRef.current
    ) {
      transitionInProgressRef.current = false;
      currentTransitionStepRef.current = false;
      transitionGeojsonDataRef.current = [];
      transitionGeojsonCommonDataRef.current = [];
      transitionToGeojson();
    }
    oldGeojsonRef.current = props.geojson;
  }, [mapHook.map, transitionToGeojson, props]);

  const startTransition = useCallback(() => {
    if (
      props.type === "line" &&
      typeof props.transitionTime !== "undefined" &&
      props.transitionTime &&
      typeof props.geojson !== "undefined" &&
      JSON.stringify(oldGeojsonRef.current) !== JSON.stringify(props.geojson)
    ) {
      transitionToGeojson();
      oldGeojsonRef.current = props.geojson;
    }
  }, [props, transitionToGeojson]);

  useEffect(() => {
    if (!mapHook.mapIsReady || !props.geojson) return;

    initializedRef.current = true;

    startTransition();
  }, [mapHook.mapIsReady, startTransition, props]);

  return (
    <>
      <MlGeoJsonLayer {...restProps} geojson={displayGeojson} />
    </>
  );
};

export default MlTransitionGeoJsonLayer;
