import React, { useContext, useRef, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";
import { bbox } from "@turf/turf";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import FileCopy from "@material-ui/icons/FileCopy";
import { Popup } from "maplibre-gl";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GeoJsonContext from "./util/GeoJsonContext";
const toGeoJSON = require("./gpxConverter");
/**
 * MlGPXViewer returns a dropzone and a button to load a GPX Track into the map.
 */
const MlGPXViewer = (props) => {
  console.log(GeoJsonContext);
  const dataSource = useContext(GeoJsonContext);
  console.log(dataSource);
  const mapContext = useContext(MapContext);
  const mapId = props.mapId;
  const sourceName = "import-source";
  const layerNameLines = "importer-layer-lines";
  const layerNamePoints = "importer-layer-points";

  const [showLayer, setShowLayer] = useState(true);
  const [open, setIsOpen] = useState(false);
  const dropZone = useRef(null);
  const [zIndex, setZIndex] = useState(0);
  const [metaData, setMetaData] = useState([]);
  const fileupload = useRef(null);

  const popup = new Popup({
    closeButton: false,
    closeOnClick: true,
  });

  const componentCleanup = () => {
    let map = null;
    if (mapId) {
      map = mapContext.maps[mapId];
    } else {
      map = mapContext.map;
    }
    if (map) {
      [layerNameLines, layerNamePoints].forEach((layerName) => {
        if (map.style && map.getLayer(layerName)) {
          map.removeLayer(layerName);
        }
      });

      if (map.style && map.getSource(sourceName)) {
        map.removeSource(sourceName);
      }
      map.getCanvas().style.cursor = "";
    }
    popup.remove();
  };

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {
      componentCleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;
    let map = null;
    if (mapId) {
      map = mapContext.maps[mapId];
    } else {
      map = mapContext.map;
    }

    // cleanup fragments left in MapLibre-gl from previous component uses
    componentCleanup();

    map.addSource(sourceName, {
      type: "geojson",
      data: dataSource.data,
    });
    map.addLayer({
      id: layerNameLines,
      source: sourceName,
      type: "line",
      paint: {
        "line-width": 4,
        "line-color": "rgba(212, 55, 23,0.5)",
      },
    });
    map.addLayer({
      id: layerNamePoints,
      source: sourceName,
      type: "circle",
      paint: {
        "circle-color": "rgba(72, 77, 99,0.5)",
        "circle-radius": 7,
      },
      filter: ["==", "$type", "Point"],
    });

    [layerNameLines, layerNamePoints].forEach((layerName) => {
      map.setLayoutProperty(layerName, "visibility", "visible");
    });
    map.on("mouseenter", layerNamePoints, (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";

      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.desc;
      const name = e.features[0].properties.name;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates

      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(name).addTo(map);
    });

    map.on("mouseleave", "places", function () {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });

    map.setZoom(10);
  }, [mapContext.map]);

  useEffect(() => {
    const dropZoneCurrent = dropZone.current;
    const raiseDropZoneAndStopDefault = (event) => {
      setZIndex(1000);
      stopDefault(event);
    };
    const lowerDropZone = () => {
      setZIndex(0);
    };
    const lowerDropZoneAndStopDefault = (event) => {
      setZIndex(0);
      stopDefault(event);
    };

    window.addEventListener("dragenter", raiseDropZoneAndStopDefault);
    window.addEventListener("dragover", stopDefault);

    dropZoneCurrent.addEventListener("dragleave", lowerDropZone);

    window.addEventListener("drop", lowerDropZoneAndStopDefault);

    return () => {
      window.removeEventListener("dragenter", raiseDropZoneAndStopDefault);
      window.removeEventListener("dragover", stopDefault);
      window.removeEventListener("drop", stopDefault);
      dropZoneCurrent.removeEventListener("dragleave", lowerDropZone);
      window.removeEventListener("drop", (event) => lowerDropZoneAndStopDefault);
    };
  });

  const stopDefault = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    if (!mapContext.map) return;
    let map = null;
    if (mapId) {
      map = mapContext.maps[mapId];
    } else {
      map = mapContext.map;
    }
    const visibility = showLayer ? "visible" : "none";

    [layerNameLines, layerNamePoints].forEach((layerName) => {
      map.setLayoutProperty(layerName, "visibility", visibility);
    });
  }, [showLayer, mapContext]);

  const dropHandler = (event) => {
    event.preventDefault();

    if (event.dataTransfer.items) {
      if (event.dataTransfer.items.length > 1) {
        return false;
      }
      // If dropped items aren't files, reject them
      if (event.dataTransfer.items[0].kind === "file") {
        const reader = new FileReader();
        reader.onload = (payload) => {
          addGPXToMap(payload.currentTarget.result);
        };
        const file = event.dataTransfer.items[0].getAsFile();
        reader.readAsText(file);
      }
    } else {
      // Use DataTransfer interface to access the file(s)
    }
  };

  const addGPXToMap = (gpxAsString) => {
    let map = null;
    if (mapId) {
      map = mapContext.maps[mapId];
    } else {
      map = mapContext.map;
    }
    try {
      setMetaData([]);
      const domParser = new DOMParser();
      const gpxDoc = domParser.parseFromString(gpxAsString, "application/xml");
      const metadata = gpxDoc.querySelector("metadata");
      metadata.childNodes.forEach((node) => {
        let value = node.textContent;
        const title = node.nodeName;

        if (node.nodeName === "link") {
          value = node.getAttribute("href");
        }
        if (!!value.trim().length) {
          const metaDatEntry = {
            title: title,
            value: value,
            id: new Date().getTime(),
          };
          setMetaData((prevState) => [...prevState, metaDatEntry]);
        }
      });
      const data = toGeoJSON.gpx(gpxDoc);
      dataSource.setData(data);
      map.getSource(sourceName).setData(data);
      const bounds = bbox(data);
      map.fitBounds(bounds);
    } catch (e) {
      console.log(e);
    }
  };
  const toogleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const fileUploadOnChange = () => {
    const file = fileupload.current.files[0];
    if (!file) return false;
    const reader = new FileReader();
    reader.onload = (payload) => {
      addGPXToMap(payload.currentTarget.result);
    };

    reader.readAsText(file);
  };

  const manualUpload = () => {
    fileupload.current.click();
  };
  return (
    <>
      <IconButton
        onClick={manualUpload}
        style={{
          position: "absolute",
          right: "5px",
          bottom: "75px",
          backgroundColor: "rgba(255,255,255,1)",

          zIndex: 1000,
        }}
      >
        <input
          ref={fileupload}
          onChange={fileUploadOnChange}
          type="file"
          id="input"
          multiple
          style={{ display: "none" }}
        ></input>
        <FileCopy />
      </IconButton>
      <IconButton
        onClick={toogleDrawer}
        style={{
          position: "absolute",
          right: "5px",
          bottom: "25px",
          backgroundColor: "rgba(255,255,255,1)",

          zIndex: 1000,
        }}
      >
        <InfoIcon />
      </IconButton>
      <Drawer variant="persistent" anchor="left" open={open}>
        <Typography
          variant="h6"
          style={{
            textAlign: "center",
            padding: "1em",
          }}
          noWrap
        >
          Informationen zur Route
        </Typography>
        <Divider />
        <List>
          {metaData.map((item) => (
            <ListItem key={`item--${item.id}`}>
              <ListItemText primary={item.value} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div
        onDrop={dropHandler}
        ref={dropZone}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          backgroundColor: "rgba(255,255,255,0.5)",
          width: "100%",
          height: "100%",
          zIndex: zIndex,
        }}
      >
        <Typography
          variant="h6"
          style={{
            top: "50%",
            position: "absolute",
            left: "50%",
            msTransform: "translate(-50%, -50%)",
            transform: " translate(-50%, -50%)",
          }}
          noWrap
        >
          Gpx-Datei ablegen
        </Typography>
      </div>
    </>
  );
};

export default MlGPXViewer;
