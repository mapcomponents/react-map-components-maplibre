import React, { useRef, useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";

import { MapContext } from "@mapcomponents/react-core";
import { v4 as uuidv4 } from "uuid";

/**
 * TODO: Add short & useful description
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
const MlShareMapState = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);
  const [map, setMap] = useState(undefined);
  const componentId = useRef((props.idPrefix ? props.idPrefix : "MlShareMapState-") + uuidv4());

  const mapStateRef = useRef({});

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
      // check for the existence of map.style before calling getLayer or getSource

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
    setMap(mapRef.current);

    let currentUrlParams = getCurrentUrlParameters();
    if (currentUrlParams.lat && currentUrlParams.lng) {
      mapStateRef.current.lat = currentUrlParams.lat;
      mapStateRef.current.lng = currentUrlParams.lng;
      mapStateRef.current.zoom = currentUrlParams.zoom;
      mapRef.current.setCenter([mapStateRef.current.lng, mapStateRef.current.lat]);
      mapRef.current.setZoom(mapStateRef.current.zoom);
    }
  }, [mapContext.mapIds, mapContext, props.mapId, props.active]);

  useEffect(() => {
    if (!map) return;

    if (props.active) {
      map.on(
        "moveend",
        () => {
          refreshMapState();
          let urlParams = new URLSearchParams({
            ...getCurrentUrlParameters(),
            ...mapStateRef.current,
          });
          let currentParams = new URLSearchParams(window.location.search);
          if (urlParams.toString() !== currentParams.toString()) {
            window.history.pushState(
              { ...mapStateRef.current },
              document.title,
              "?" + urlParams.toString()
            );
          }
        },
        componentId.current
      );
    } else {
      map.cleanup(componentId.current);
    }
  }, [props.active, map]);

  const getCurrentUrlParameters = () => {
    return Object.fromEntries(new URLSearchParams(window.location.search));
  };

  const refreshMapState = () => {
    mapStateRef.current.lat = mapRef.current.getCenter().lat;
    mapStateRef.current.lng = mapRef.current.getCenter().lng;
    mapStateRef.current.zoom = mapRef.current.getZoom();
  };

  window.onpopstate = (event) => {
    if (event.state && event.state.lng && event.state.lat && event.state.zoom) {
      mapRef.current.easeTo({ zoom: event.state.zoom, center: [event.state.lng, event.state.lat] });
    }
  };

  return <></>;
};

MlShareMapState.defaultProps = {
  mapId: undefined,
};

MlShareMapState.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
};
export default MlShareMapState;
