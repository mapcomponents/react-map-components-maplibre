import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import useMap from "../../hooks/useMap";

import Button from "@mui/material/Button";
import RoomIcon from "@mui/icons-material/Room";
import { point, circle } from "@turf/turf";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";

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
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);

  const [accuracyGeoJson, setAccuracyGeoJson] = useState();

  const getLocationSuccess = useCallback(
    (pos) => {
      if (!mapHook.map) return;

      mapHook.map.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 18,
        speed: 1,
        curve: 1,
      });
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
      let _watchId = navigator.geolocation.watchPosition(getLocationSuccess, getLocationError);

      return () => {
        navigator.geolocation.clearWatch(_watchId);
      };
    }
  }, [mapHook.map, isFollowed, getLocationSuccess]);

  return (
    <>
      {isFollowed && geoJson && (
        <MlGeoJsonLayer
          geojson={accuracyGeoJson}
          type={"fill"}
          paint={{
            "fill-color": "#cbd300",
            "fill-opacity": 0.3,
            ...props.accuracyPaint,
          }}
          insertBeforeLayer={props.insertBeforeLayer}
        />
      )}

      {isFollowed && geoJson && (
        <MlGeoJsonLayer
          geojson={geoJson}
          type={"circle"}
          paint={{
            "circle-color": "#009ee0",
            "circle-radius": 5,
            "circle-stroke-color": "#fafaff",
            "circle-stroke-width": 1,
            ...props.circlePaint,
          }}
          insertBeforeLayer={props.insertBeforeLayer}
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
   * position circle paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the accuracy circle.
   * Use any available paint prop from layer type "fill".
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
   */
  circlePaint: PropTypes.object,
};
export default MlFollowGps;
