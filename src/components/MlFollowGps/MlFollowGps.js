import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import useMap from "../../hooks/useMap";

import Button from "@mui/material/Button";
import RoomIcon from "@mui/icons-material/Room";
import { point, circle } from "@turf/turf";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import MlImageMarkerLayer from "../MlImageMarkerLayer/MlImageMarkerLayer";

import marker from "./assets/marker.png";

/**
 * Adds a button that makes the map follow the users GPS position using
 * navigator.geolocation.watchPosition if activated
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
const MlFollowGps = (props) => {
  const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });

  const [isFollowed, setIsFollowed] = useState(false);
  const [geoJson, setGeoJson] = useState(undefined);
  const watchIdRef = useRef(undefined);
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);

  const [accuracyGeoJson, setAccuracyGeoJson] = useState();

  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = undefined;
      }
    };
  }, []);

  const getLocationSuccess = useCallback(
    (pos) => {
      if (!mapHook.map) return;

      mapHook.map.setCenter([pos.coords.longitude, pos.coords.latitude]);
      const geoJsonPoint = point([pos.coords.longitude, pos.coords.latitude]);
      setGeoJson(geoJsonPoint);
      setAccuracyGeoJson(circle(geoJsonPoint, pos.coords.accuracy / 1000));
    },
    [mapHook.map]
  );

  const getLocationError = (err) => {
    console.log("Access of user location denied");
    setLocationAccessDenied(true);
  };

  useEffect(() => {
    if (!mapHook.map) return;

    if (isFollowed) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        getLocationSuccess,
        getLocationError
      );
    } else {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
  }, [isFollowed, getLocationSuccess]);

  return (
    <>
      {isFollowed && geoJson && (
        <MlGeoJsonLayer
          geojson={accuracyGeoJson}
          type={"fill"}
          paint={{
            "fill-color": "#ee7700",
            "fill-opacity": 0.5,
            ...props.accuracyPaint,
          }}
          insertBeforeLayer={"MlFollowGpsMarker"}
        />
      )}

      {isFollowed && geoJson && (
        <MlImageMarkerLayer
          layerId={"MlFollowGpsMarker"}
          options={{
            type: "symbol",
            source: {
              type: "geojson",
              data: geoJson,
            },
            layout: {
              "icon-size": 0.1,
              "icon-offset": [0, -340],
              ...props.markerLayout,
            },
          }}
          imgSrc={props.markerImage || marker}
        />
      )}

      <Button
        sx={{ zIndex: 1002, color: isFollowed ? props.onColor : props.offColor, ...props.style }}
        disabled={locationAccessDenied}
        onClick={() => {
          setIsFollowed(!isFollowed);
        }}
      >
        {" "}
        <RoomIcon sx={{ fontSize: props.style.fontSize }} />{" "}
      </Button>
    </>
  );
};

MlFollowGps.defaultProps = {
  mapId: undefined,
  style: {
    minWidth: "30px",
    minHeight: "30px",
    width: "30px",
    height: "30px",
    backgroundColor: "#414141",
    borderRadius: "23%",
    margin: 0.15,
    fontSize: "1.3em",
    ":hover": {
      backgroundColor: "#515151",
      color: "#ececec",
    },
  },
  onColor: "#ececec",
  offColor: "#666",
};

MlFollowGps.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * CSS style object that is applied to the button component
   */
  style: PropTypes.object,
  /**
   * Active button font color
   */
  onColor: PropTypes.string,
  /**
   * Inactive button font color
   */
  offColor: PropTypes.string,
  /**
   * Accuracy paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the accuracy circle.
   * Use any available paint prop from layer type "fill".
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
   */
  accuracyPaint: PropTypes.object,
  /**
   * Marker layout property object, that is passed to the MlImageMarkerLayer responsible for drawing the position marker.
   * Use any available layout property from layer type "symbol".
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#symbol
   */
  markerLayout: PropTypes.object,
  /**
   * Replace the default marker image with a custom one.
   */
  markerImage: PropTypes.string,
};
export default MlFollowGps;
