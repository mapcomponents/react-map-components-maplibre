import { useContext, useCallback, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MapContext } from "@mapcomponents/react-core";

/**
 * React hook that allows subscribing to map state changes
 *
 * @component
 */
function useMapState(props) {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);

  const [center, setCenter] = useState(undefined);

  const [viewport, setViewport] = useState(undefined);
  const viewportRef = useRef(undefined);

  const [layers, setLayers] = useState(undefined);
  const layersRef = useRef(undefined);
  //const mapRef = useRef(props.map);
  const componentId = useRef(uuidv4());


  /**
   * returns the element if it matches the defined filter criteria
   * to be used as filter function on the layers array
   *
   * @param {object} layer
   */
  const layerIdFilter = useCallback(
    (layer) => {
      if (!props.filter.includeBaseLayers && layer.baseLayer) {
        return false;
      }

      if (typeof props.filter.matchLayerIds !== "undefined") {
        if (props.filter.matchLayerIds instanceof RegExp) {
          return props.filter.matchLayerIds.test(layer.id);
        } else {
          return layer.id.includes(props.filter.matchLayerIds);
        }
      }

      return true;
    },
    [props.filter]
  );

  const refreshLayerState = useCallback(() => {
    let _layerState = mapRef.current.wrapper.layerState.filter(layerIdFilter);
    let _layerStateString = JSON.stringify(_layerState);
    if (layersRef.current !== _layerStateString) {
      layersRef.current = _layerStateString;
      setLayers(_layerState);
    }
  },[layerIdFilter]);

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    /*
    mapRef.current.on(
      "move",
      () => {
        setCenter(mapRef.current.getCenter());
      },
      componentId.current
    );
    */

    if (props?.watch?.viewport) {
      setViewport(mapRef.current.wrapper.viewportState);

      mapRef.current.wrapper.on(
        "viewportchange",
        () => {
          if (viewportRef.current !== mapRef.current?.wrapper.viewportStateString) {
            setViewport(mapRef.current?.wrapper.viewportState);
            setCenter(mapRef.current?.wrapper.viewportState?.center);
          }
        },
        componentId.current
      );
    }

    if (props?.watch?.layers) {
      refreshLayerState();

      mapRef.current.wrapper.on(
        "layerchange",
        refreshLayerState,
        {
          includeBaseLayers: props?.filter?.includeBaseLayers,
          matchLayerIds: props?.filter?.matchLayerIds,
        },
        componentId.current
      );
    }
  }, [mapContext.mapIds, mapContext, props.mapId, refreshLayerState]);

  return {
    layers,
    viewport,
  };
}

useMapState.defaultProps = {
  mapId: undefined,
  watch: {
    layers: true,
    sources: false,
    viewport: false,
  },
  filter: {
    includeBaseLayers: false,
  },
};

useMapState.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Defines map Resources to watch
   */
  watch: PropTypes.shape({
    layers: PropTypes.bool,
    sources: PropTypes.bool,
    viewport: PropTypes.bool,
  }),
  /**
   * Filter string or RegExp to more explicitly define the elements watched and increase performance
   * strings will be matched using layerId.includes(matchString)
   * RegExps will be matched using matchRegExp.test(layerId)
   */
  filter: PropTypes.shape({
    includeBaseLayers: PropTypes.bool,
    matchLayerIds: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)]),
    matchSourceIds: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(RegExp)]),
  }),
};

export default useMapState;
