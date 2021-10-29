import { useContext, useCallback, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { MapContext } from "react-map-components-core";

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
      setCenter(mapRef.current.wrapper.viewportState?.center);

      mapRef.current.wrapper.on(
        "viewportchange",
        () => {
          //console.log(mapRef.current?.wrapper.layerState);
          if (viewportRef.current !== mapRef.current?.wrapper.viewportStateString) {
            setViewport(mapRef.current?.wrapper.viewportState);
            setCenter(mapRef.current?.wrapper.viewportState?.center);
          }
        },
        componentId.current
      );
    }

    if (props?.watch?.layers) {
      layersRef.current = mapRef.current.wrapper.layerStateString;
      setLayers(mapRef.current.wrapper.layerState);
      console.log("watch layer change");

      mapRef.current.wrapper.on(
        "layerchange",
        () => {
          //console.log("Layers changed");
          //console.log(mapRef.current?.wrapper.layerState);
          if (layersRef.current !== mapRef.current?.wrapper.layerStateString) {
            setLayers(mapRef.current?.wrapper.layerState);
          }
        },
        componentId.current
      );
    }
  }, [mapContext.mapIds, mapContext, props.mapId]);

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
  }
};

useMapState.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Defines map Resources to watch
   */
  watch:  PropTypes.shape({
    layers: PropTypes.bool,
    sources: PropTypes.bool,
    viewport: PropTypes.bool,
  }),
  /**
   * Filter function to reduce the number of
   */
  filter:  PropTypes.shape({
    matchLayerIds: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ]),
    matchSourceIds: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ]),
  }),
};

export default useMapState;
