import {MapContext} from "react-map-components-core";
import {useContext, useState} from "react";
import Button from "@mui/material/Button"

const MlNavigationTools = () => {

  const mapContext = useContext(MapContext);
  const [locationAccessDenied, setLocationAccessDenied] = useState(false)

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
      <div className={"container"}>
        <Button className={"container-button"} onClick={moveToCurrentLocation} disabled={locationAccessDenied}> O </Button>
        <Button className={"container-button"} onClick={zoomIn}> + </Button>
        <Button className={"container-button"} onClick={zoomOut}> - </Button>
      </div>
  )
}

export default MlNavigationTools;