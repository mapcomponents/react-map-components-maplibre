import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import Paper from "@mui/material/Paper";

import { MapContext } from "react-map-components-core";
import { v4 as uuidv4 } from "uuid";

/**
 * Adds a marker to the map and displays a marker description next to it
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 * @param {number} props.lng
 * @param {number} props.lat
 * @param {string} props.content
 *
 * @component
 */
const MlMarker = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);
  const componentId = useRef((props.idPrefix ? props.idPrefix : "MlMarker-") + uuidv4());

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
  }, [mapContext.mapIds, mapContext, props.mapId]);

  return (
    <>
      <MlGeoJsonLayer
        geojson={{
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [props.lng, props.lat],
          },
          properties: {},
        }}
        paint={{
          "circle-radius": 14,
          "circle-color": "rgba(40,200,20,0.5)",
        }}
        type="circle"
      ></MlGeoJsonLayer>
      <Paper
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        blub
      </Paper>
    </>
  );
};

MlMarker.defaultProps = {
  mapId: undefined,
};

MlMarker.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Longitude of the marker position
   */
  lng: PropTypes.number,
  /**
   * Latitude of the marker position
   */
  lat: PropTypes.number,
  /**
   * Content of the description popup
   */
  content: PropTypes.string,
};
export default MlMarker;
