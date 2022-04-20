import React, { useEffect, useState, useCallback, useMemo } from "react";
import useMap from "../../hooks/useMap";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";

import { Button } from "@mui/material";
import  GpsFixedIcon  from "@mui/icons-material/GpsFixed";

import { point, circle, lineArc, Feature, Point } from "@turf/turf";

interface MlFollowGpsProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId?: string;
  /**
   * The layerId of an existing layer this layer should be rendered visually beneath
   * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
   */
  insertBeforeLayer?: string;
  /**
   * By default a dot will be shown on the map at the user's location. Set to false to disable.
   */
  showUserLocation?: boolean;
  /**
   * By default a cone will be shown on the map at the user's location to indicate the device's orientation.
   * Set to false to disable.
   */
  showOrientation?: boolean;
  /**
   * By default, if showUserLocation is true, a transparent circle will be drawn around the user location
   * indicating the accuracy (95% confidence level) of the user's location. Set to false to disable.
   */
  showAccuracyCircle?: boolean,
  /**
   * position circle paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the accuracy circle.
   * Use any available paint prop from layer type "fill".
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
   */
  circlePaint?: any;
  /**
   * Active button font color
   */
  onColor?: string;
  /**
   * Inactive button font color
   */
  offColor?: string;
  /**
   * Accuracy paint property object, that is passed to the MlGeoJsonLayer responsible for drawing the accuracy circle.
   * Use any available paint prop from layer type "fill".
   * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
   */
  accuracyPaint?: any;
  /**
   * CSS style object that is applied to the button component
   */
  style?: any;
}

/**
 * Adds a button that makes the map follow the users GPS position using
 * navigator.geolocation.watchPosition if activated
 *
 */
const MlFollowGps = (props: MlFollowGpsProps) => {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });

  const [isFollowed, setIsFollowed] = useState(false);
  const [userLocationGeoJson, setUserLocationGeoJson] =
    useState<Feature<Point>>();
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);
  const [accuracyGeoJson, setAccuracyGeoJson] = useState<Feature>();
  const [deviceOrientation, setDeviceOrientation] = useState(0);

  const getLocationSuccess = useCallback(
    (pos) => {
      if (!mapHook.map) return;

      mapHook.map.map.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 18,
        speed: 1,
        curve: 1,
      });
      if (!props.showUserLocation) return;
      const geoJsonPoint = point([pos.coords.longitude, pos.coords.latitude]);
      setUserLocationGeoJson(geoJsonPoint);
      setAccuracyGeoJson(circle(geoJsonPoint, pos.coords.accuracy / 1000));
    },
    [mapHook.map, props]
  );

  const getLocationError = () => {
    console.log("Access of user location denied");
    setLocationAccessDenied(true);
  };

  const orientationCone = useMemo(() => {
    if (!userLocationGeoJson) {
      return undefined;
    }
    let radius = 0.02;
    let bearing1 = deviceOrientation - 15;
    let bearing2 = deviceOrientation + 15;
    const options = { steps: 65 };
    let arc = lineArc(userLocationGeoJson, radius, bearing1, bearing2, options);
    let copy = arc;
    copy.geometry.coordinates.push(userLocationGeoJson.geometry.coordinates);
    copy.geometry.coordinates.slice(0, 0);
    return copy;
  }, [deviceOrientation, userLocationGeoJson]);

  const handleOrientation = (event: any) => {
    setDeviceOrientation(-event.alpha);
  };

  useEffect(() => {
    if (isFollowed) {
      let _handleOrientation = handleOrientation;
      window.addEventListener("deviceorientation", _handleOrientation);
      return () => {
        window.removeEventListener("deviceorientation", _handleOrientation);
      };
    }
    return;
  }, [isFollowed]);

  useEffect(() => {
    if (!mapHook.map) return;

    if (isFollowed) {
      let _watchId = navigator.geolocation.watchPosition(
        getLocationSuccess,
        getLocationError
      );

      return () => {
        navigator.geolocation.clearWatch(_watchId);
      };
    }
    return;
  }, [mapHook.map, isFollowed, getLocationSuccess]);

  return (
    <>
      {isFollowed && userLocationGeoJson && (
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

      {isFollowed && orientationCone && (
        <MlGeoJsonLayer
          geojson={orientationCone}
          type={"fill"}
          paint={{
            "fill-color": "#0000ff",
            "fill-antialias": false,
            "fill-opacity": 0.3,
          }}
          insertBeforeLayer={props.insertBeforeLayer}
        />
      )}

      {isFollowed && userLocationGeoJson && (
        <MlGeoJsonLayer
          geojson={userLocationGeoJson}
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
        sx={{
          zIndex: 1002,
          color: isFollowed ? props.onColor : props.offColor,
          ...props.style,
        }}
        disabled={locationAccessDenied}
        onClick={() => {
          setIsFollowed(!isFollowed);
        }}
      >
        {" "}
        <GpsFixedIcon sx={{ ...(props.style?.fontSize?{fontSize: props.style?.fontSize}:{}) }} />{" "}
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
  showAccuracyCircle: true,
  showUserLocation: true,
  showOrientation: true,
};

export default MlFollowGps;
