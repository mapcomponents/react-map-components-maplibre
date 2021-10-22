import { MapContext } from "react-map-components-core";
import { useEffect, useRef, useContext, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
//import ZoomOutIcon from "@mui/icons-material/ZoomOut";
//import ZoomInIcon from "@mui/icons-material/ZoomIn";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { v4 as uuidv4 } from "uuid";

import MlNavigationCompass from "../MlNavigationCompass/MlNavigationCompass";

const MlNavigationTools = (props) => {
  const mapContext = useContext(MapContext);
  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);
  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlComponentTemplate-") + uuidv4()
  );

  const [pitch, setPitch] = useState(0);
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);
  const buttonStyle = {
    minWidth: "30px",
    minHeight: "30px",
    width: "30px",
    height: "30px",
    color: "#bbb",
    backgroundColor: "#414141",
    borderRadius: "23%",
    //border: "1px solid #bbb",
    //boxShadow: "0px 0px 4px rgba(0,0,0,.5)",
    margin: 0.15,
    ":hover": {
      backgroundColor: "#515151",
      color: "#ececec",
    },
  };

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
    mapRef.current.on(
      "pitchend",
      () => {
        setPitch(mapRef.current.getPitch());
      },
      componentId.current
    );
    setPitch(mapRef.current.getPitch());
  }, [mapContext.mapIds, mapContext, props.mapId]);

  const zoomIn = () => {
    if (!mapRef.current) return;

    if (mapRef.current.transform._zoom + 0.5 <= mapRef.current.transform._maxZoom) {
      mapRef.current.easeTo({zoom: (mapRef.current.transform._zoom + 0.5)});
    }
  };

  const zoomOut = () => {
    if (!mapRef.current) return;

    if (mapRef.current.transform._zoom - 0.5 >= mapRef.current.transform._minZoom) {
      mapRef.current.easeTo({zoom: (mapRef.current.transform._zoom - 0.5)});
    }
  };

  const adjustPitch = () => {
    if (!mapRef.current) return;

    let targetPitch = 60;
    if (mapRef.current.getPitch() !== 0) {
      targetPitch = 0;
    }
    mapRef.current.easeTo({ pitch: targetPitch });
  };

  const moveToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
  };

  const getLocationSuccess = (location) => {
    mapRef.current.setCenter([location.coords.longitude, location.coords.latitude]);
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
        right: "20px",
        bottom: "20px",
        display: "flex",
        "flex-direction": "column",
      }}
    >
      <MlNavigationCompass
        style={{
          width: "31px",
          position: "relative",
          height: "50px",
          marginLeft: "-5px",
        }}
        backgroundStyle={{
          boxShadow: "0px 0px 18px rgba(0,0,0,.5)",
        }}
      />
      <Button
        sx={{ ...buttonStyle, fontSize: ".9em", fontWeight: 600 }}
        onClick={adjustPitch}
      >
        {pitch ? "2D" : "3D"}
      </Button>
      <Button
        sx={buttonStyle}
        onClick={moveToCurrentLocation}
        disabled={locationAccessDenied}
      >
        <GpsFixedIcon sx={{ width: ".9em" }} />
      </Button>
      <ButtonGroup
        orientation="vertical"
        sx={{
          width: "30px",
          border: "none",
          Button: { minWidth: "30px !important", border: "none", padding: 0 },
          "Button:hover": { border: "none" },
        }}
      >
        <Button sx={buttonStyle} onClick={zoomIn}>
          <ControlPointIcon />
        </Button>
        <Button sx={buttonStyle} onClick={zoomOut}>
          <RemoveCircleOutlineIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MlNavigationTools;
