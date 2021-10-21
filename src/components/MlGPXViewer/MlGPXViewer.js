import React, { useContext, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContext } from "react-map-components-core";
import { bbox } from "@turf/turf";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import FileCopy from "@mui/icons-material/FileCopy";
import { Popup } from "maplibre-gl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import GeoJsonContext from "./util/GeoJsonContext";
import toGeoJSON from "./gpxConverter";

import { v4 as uuidv4 } from "uuid";

/**
 * MlGPXViewer returns a dropzone and a button to load a GPX Track into the map.
 *
 * @component
 */
const MlGPXViewer = (props) => {
  const dataSource = useContext(GeoJsonContext);
  const componentId = useRef((props.idPrefix ? props.idPrefix : "MlGpxViewer-") + uuidv4());
  const mapContext = useContext(MapContext);
  const mapId = props.mapId;
  const initializedRef = useRef(false);
  const mapRef = useRef(null);
  const sourceName = "import-source";
  const layerNameLines = "importer-layer-lines";
  const layerNamePoints = "importer-layer-points";

  const [open, setIsOpen] = useState(false);
  const dropZone = useRef(null);
  const [zIndex, setZIndex] = useState(0);
  const [metaData, setMetaData] = useState([]);
  const fileupload = useRef(null);

  const popup = useRef(
    new Popup({
      closeButton: false,
      closeOnClick: true,
    })
  );

  useEffect(() => {
    let _componentId = componentId.current;
    let _popup = popup.current;
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);

        mapRef.current.getCanvas().style.cursor = "";

        mapRef.current = null;
      }
      _popup.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(mapId) || initializedRef.current) return;

    initializedRef.current = true;
    mapRef.current = mapContext.getMap(mapId);

    mapRef.current.addSource(
      sourceName,
      {
        type: "geojson",
        data: dataSource.data,
      },
      componentId.current
    );
    mapRef.current.addLayer(
      {
        id: layerNameLines,
        source: sourceName,
        type: "line",
        paint: {
          "line-width": 4,
          "line-color": "rgba(212, 55, 23,0.5)",
        },
      },
      props.insertBeforeLayer,
      componentId.current
    );
    mapRef.current.addLayer(
      {
        id: layerNamePoints,
        source: sourceName,
        type: "circle",
        paint: {
          "circle-color": "rgba(72, 77, 99,0.5)",
          "circle-radius": 7,
        },
        filter: ["==", "$type", "Point"],
      },
      props.insertBeforeLayer,
      componentId.current
    );

    [layerNameLines, layerNamePoints].forEach((layerName) => {
      mapRef.current.setLayoutProperty(layerName, "visibility", "visible");
    });
    mapRef.current.on("mouseenter", layerNamePoints, (e) => {
      // Change the cursor style as a UI indicator.
      mapContext.getMap(props.mapId).getCanvas().style.cursor = "pointer";

      const coordinates = e.features[0].geometry.coordinates.slice();
      //const description = e.features[0].properties.desc;
      const name = e.features[0].properties.name;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates

      // based on the feature found.
      popup.current.setLngLat(coordinates).setHTML(name).addTo(mapRef.current);
    });

    mapRef.current.on("mouseleave", "places", function () {
      mapRef.current.getCanvas().style.cursor = "";
      popup.current.remove();
    });

    mapRef.current.setZoom(10);
  }, [mapContext.mapIds, mapContext, dataSource.data, mapId, props]);

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
    if (!mapRef.current) return;

    const visibility = props.visible ? "visible" : "none";

    [layerNameLines, layerNamePoints].forEach((layerName) => {
      mapRef.current.setLayoutProperty(layerName, "visibility", visibility);
    });
  }, [props.visible]);

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
    if (!mapRef.current) return;
    try {
      setMetaData([]);
      console.log(gpxAsString);
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
      mapRef.current.getSource(sourceName).setData(data);
      const bounds = bbox(data);
      mapRef.current.fitBounds(bounds);
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
        size="large"
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
        size="large"
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

MlGPXViewer.defaultProps = {
  visible: true,
};

MlGPXViewer.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
  /**
   * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
   */
  idPrefix: PropTypes.string,
  /**
   * Sets the layers layout-property "visibility" to "none" if false or "visible" if true
   */
  visible: PropTypes.bool,
  /**
   * The layerId of an existing layer this layer should be rendered visually beneath
   * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
   */
  insertBeforeLayer: PropTypes.string,
};

export default MlGPXViewer;
