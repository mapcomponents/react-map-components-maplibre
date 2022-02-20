import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

import MlNavigationCompass from "../MlNavigationCompass/MlNavigationCompass";
import MlFollowGps from "../MlFollowGps/MlFollowGps";
import useMediaQuery from "@mui/material/useMediaQuery";
import useMap from "../../hooks/useMap";

const MlNavigationTools = (props) => {
  const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });

  const [pitch, setPitch] = useState(0);
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const buttonStyle = {
    minWidth: "20px",
    minHeight: "20px",
    width: mediaIsMobile ? "50px" : "30px",
    height: mediaIsMobile ? "50px" : "30px",
    backgroundColor: "#414141",
    borderRadius: "23%",
    //border: "1px solid #bbb",
    //boxShadow: "0px 0px 4px rgba(0,0,0,.5)",
    margin: 0.15,
    fontSize: mediaIsMobile ? "1.5em" : "1.2em",
    ":hover": {
      backgroundColor: "#515151",
    },
    color: "#ececec",
  };

  useEffect(() => {
    if (!mapHook.map) return;

    mapHook.map.on("pitchend", () => {
      setPitch(mapHook.map.getPitch());
    });
    setPitch(mapHook.map.getPitch());
  }, [mapHook.map, props.mapId]);

  const zoomIn = () => {
    if (!mapHook.map) return;

    if (mapHook.map.transform._zoom + 0.5 <= mapHook.map.transform._maxZoom) {
      mapHook.map.easeTo({ zoom: mapHook.map.transform._zoom + 0.5 });
    }
  };

  const zoomOut = () => {
    if (!mapHook.map) return;

    if (mapHook.map.transform._zoom - 0.5 >= mapHook.map.transform._minZoom) {
      mapHook.map.easeTo({ zoom: mapHook.map.transform._zoom - 0.5 });
    }
  };

  const adjustPitch = () => {
    if (!mapHook.map) return;

    let targetPitch = 60;
    if (mapHook.map.getPitch() !== 0) {
      targetPitch = 0;
    }
    mapHook.map.easeTo({ pitch: targetPitch });
  };

  const moveToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
  };

  const getLocationSuccess = (location) => {
    mapHook.map.setCenter([location.coords.longitude, location.coords.latitude]);
  };

  const getLocationError = () => {
    console.log("Access of user location denied");
    setLocationAccessDenied(true);
  };

  return (
    <div
      style={{
        zIndex: 501,
        position: "absolute",
        right: mediaIsMobile ? "15px" : "5px",
        bottom: mediaIsMobile ? "40px" : "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MlNavigationCompass
        style={{
          width: "31px",
          position: "relative",
          height: mediaIsMobile ? "55px" : "45px",
          marginLeft: mediaIsMobile ? "3px" : "-5px",
          transform: mediaIsMobile ? "scale(1.6)" : "scale(1)",
        }}
        backgroundStyle={{
          boxShadow: "0px 0px 18px rgba(0,0,0,.5)",
        }}
      />
      <Button sx={{ ...buttonStyle, fontWeight: 600 }} onClick={adjustPitch}>
        {pitch ? "2D" : "3D"}
      </Button>
      <Button sx={buttonStyle} onClick={moveToCurrentLocation} disabled={locationAccessDenied}>
        <GpsFixedIcon sx={{ fontSize: mediaIsMobile ? "1.5em" : "1.2em" }} />
      </Button>
      <MlFollowGps style={{ ...(({ color, ...rest }) => rest)(buttonStyle) }} />
      <ButtonGroup
        orientation="vertical"
        sx={{
          width: "50px",
          border: "none",
          Button: { minWidth: "20px !important", border: "none", padding: 0 },
          "Button:hover": { border: "none" },
        }}
      >
        <Button sx={{ ...buttonStyle, color: "#ececec" }} onClick={zoomIn}>
          <ControlPointIcon sx={{ fontSize: mediaIsMobile ? "1.5em" : "1.2em" }} />
        </Button>
        <Button sx={{ ...buttonStyle, color: "#ececec" }} onClick={zoomOut}>
          <RemoveCircleOutlineIcon sx={{ fontSize: mediaIsMobile ? "1.5em" : "1.2em" }} />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MlNavigationTools;
