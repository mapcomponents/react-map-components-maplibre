import React, { useRef, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import Paper from "@mui/material/Paper";
import useMapState from "../../hooks/useMapState";

import { MapContext } from "@mapcomponents/react-core";
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
  const mapContext = useContext(MapContext);
  const mapState = useMapState({ mapId: props.mapId, watch:{viewport: true}});

  const iframe = useRef(undefined);
  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);
  const componentId = useRef((props.idPrefix ? props.idPrefix : "MlMarker-") + uuidv4());
  const [iframeDimensions, setIframeDimensions] = useState({ width: "400px", height: "500px" });

  const [markerPixelPos, setMarkerPixelPos] = useState(undefined);

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

  useEffect(() => {
    if (!mapRef.current?.project) return;

    const _pixelPos = mapRef.current.project([props.lng, props.lat]);

    setMarkerPixelPos(_pixelPos);
  }, [props.lng, props.lat, mapState.viewport]);

  useEffect(() => {
    if (mapRef.current && iframe.current?.contentWindow?.document?.body?.scrollHeight) {
      setTimeout(() => {
        let mapWidth = mapRef.current._container.clientWidth;
        let mapHeight = mapRef.current._container.clientHeight;

        const _pixelPos = mapRef.current.project([props.lng, props.lat]);
        let pixelToBottom = mapHeight - _pixelPos.y;
        let iframeHeight = iframe.current?.contentWindow?.document?.body?.scrollHeight;
        let iframeWidth = iframe.current?.contentWindow?.document?.body?.scrollWidth;

        setIframeDimensions({
          width: iframeWidth,
          height: pixelToBottom < iframeHeight ? pixelToBottom : iframeHeight,
        });
      }, 100);
    }
  }, [props.lng, props.lat, props.content]);

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
        mapId={props.mapId}
      ></MlGeoJsonLayer>
      {markerPixelPos && (
        <Paper
          sx={{
            opacity: 0.7,
            position: "fixed",
            display: "flex",
            /** TODO: fix positioning delay when moving the map */
            left: markerPixelPos.x,
            top: markerPixelPos.y,
            width: iframeDimensions.width,
            height: iframeDimensions.height,
            "&:hover": {
              opacity: 1,
            },
            zIndex: 1000,
          }}
        >
          <iframe
            style={{ width: "100%" }}
            srcDoc={props.content}
            ref={iframe}
            sandbox="allow-same-origin allow-popups-to-escape-sandbox"
            frameBorder="0"
          ></iframe>
        </Paper>
      )}
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
