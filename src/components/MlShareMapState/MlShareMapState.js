import React, {useRef, useEffect, useContext, useState} from "react";
import PropTypes from "prop-types";

import {MapContext} from "react-map-components-core";
import {v4 as uuidv4} from "uuid";

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
  const componentId = useRef((props.idPrefix ? props.idPrefix : "MlShareMapState-") + uuidv4());

  const mapStateRef = useRef({lng: 7.132122000552613, lat: 50.716405378037706, zoom: 14.5})
  const initialUrl = new URLSearchParams(window.location.search)
  const initialUrlFragment = Object.fromEntries(initialUrl)

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

    mapRef.current.on("moveend", () => {
      getMapState();
      window.history.pushState({}, document.title, "?id=mapcomponents-mlsharemapstate--example-config&args=&viewMode=story&" + (new URLSearchParams(mapStateRef.current)).toString())
    }, componentId.current)

    if (initialUrlFragment.lat && initialUrlFragment.lng) {
      mapStateRef.current.lat = initialUrlFragment.lat
      mapStateRef.current.lng = initialUrlFragment.lng
      mapStateRef.current.zoom = initialUrlFragment.zoom
    }
    mapRef.current.setCenter([mapStateRef.current.lng, mapStateRef.current.lat]);
    mapRef.current.setZoom(mapStateRef.current.zoom);
    console.log(componentId.current);
  }, [mapContext.mapIds, mapContext, props.mapId]);

  const getMapState = () => {
    mapStateRef.current.lat = mapRef.current.getCenter().lat
    mapStateRef.current.lng = mapRef.current.getCenter().lng
    mapStateRef.current.zoom = mapRef.current.getZoom()
  }

  window.onpopstate = (event) => {
    console.log(JSON.stringify(event))
  }

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
