import React, { useState, useCallback } from "react";
import useMap from "../../hooks/useMap";
import { Button } from "@mui/material";
import  GpsFixedIcon  from "@mui/icons-material/GpsFixed";

interface MlCenterPositionProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId?: string;
  /**
   * Id of an existing layer in the mapLibre instance to help specify the layer order
   * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
   */
  insertBeforeLayer?: string;
  /**
   * Active button font color
   */
  onColor?: string;
  /**
   * Inactive button font color
   */
  offColor?: string;
  /**
   * CSS style object that is applied to the button component
   */
  style?: any;
}

/**
 * Component template
 *
 */
const MlCenterPosition = (props: MlCenterPositionProps) => {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);

  const centerCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
  };

  const getLocationSuccess = useCallback((location) => {
    mapHook.map?.map.setCenter?.([location.coords.longitude, location.coords.latitude]);
  }, [mapHook.map]);

  const getLocationError = () => {
    console.log("Access of user location denied");
    setLocationAccessDenied(true);
  };
  return <>
      <Button 
        sx={{
          zIndex: 1002,
          color: !locationAccessDenied ? props.onColor : props.offColor,
          ...props.style,
        }}
       onClick={centerCurrentLocation} disabled={locationAccessDenied}>
        <GpsFixedIcon sx={{ ...(props.style?.fontSize?{fontSize: props.style?.fontSize}:{}) }} />{" "}
      </Button>
  </>;

};

MlCenterPosition.defaultProps = {
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
export default MlCenterPosition;
