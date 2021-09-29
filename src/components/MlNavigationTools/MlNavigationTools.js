import {MapContext} from "react-map-components-core";
import {useContext, useState} from "react";
import Button from "@mui/material/Button"
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const MlNavigationTools = () => {

  const mapContext = useContext(MapContext);
  const [locationAccessDenied, setLocationAccessDenied] = useState(false)
  const buttonStyle = {
    minWidth: 30,
    minHeight: 30,
    width: 30,
    height: 30,
    "background-color": "#eeeeee",
    border: 1,
    margin: 0.15,
  }

  const zoomIn = () => {
    if(!mapContext.map) return;

    if(mapContext.map.transform._zoom +0.5 <= mapContext.map.transform._maxZoom) {
      mapContext.map.setZoom(mapContext.map.transform._zoom + 0.5)
    }
  }

  const zoomOut = () => {
    if(!mapContext.map) return;

    if(mapContext.map.transform._zoom - 0.5 >= mapContext.map.transform._minZoom) {
      mapContext.map.setZoom(mapContext.map.transform._zoom - 0.5)
    }
  }

  const moveToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
  }

  const getLocationSuccess = (location) => {
    console.log(location)
    mapContext.map.setCenter([location.coords.longitude, location.coords.latitude])

  }

  const getLocationError = () => {
    console.log("Access of user location denied")
    setLocationAccessDenied(true);
  }

  return (
      <div style={{zIndex : 501, position: "absolute", right: "20px", bottom: "20px", display: "flex", "flex-direction": "column"}}>
        <Button sx={buttonStyle} onClick={moveToCurrentLocation} disabled={locationAccessDenied}> <GpsFixedIcon /> </Button>
        <Button sx={buttonStyle} onClick={zoomIn}> <ZoomInIcon /> </Button>
        <Button sx={buttonStyle} onClick={zoomOut}> <ZoomOutIcon /> </Button>
      </div>
  )
}

export default MlNavigationTools;