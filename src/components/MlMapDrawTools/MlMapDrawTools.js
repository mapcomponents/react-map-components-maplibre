import React, { useState, useEffect, useContext, useRef } from "react";
import "./MlMapDrawTools.css";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import CustomPolygonMode from "./custom-polygon-mode";
import CustomSelectMode from "./custom-select-mode";
import CustomDirectSelectMode from "./custom-direct-select-mode";

import { MapContext } from "react-map-components-core";

import DeleteIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function MlMapDrawTools() {
  const draw = useRef(null);
  const mapContext = useContext(MapContext);

  const [firstLoad, setFirstLoad] = useState(true);
  const [mouseUpTrigger, setMouseUpTrigger] = useState(false);

  //const [groupCloseVertices, setGroupCloseVertices] = useState(false);

  const [storedMapFeatures, setStoredMapFeatures] = useState(null);

  const [drawnFeatures, setDrawnFeatures] = useState([]);
  const [drawModeActive, setDrawModeActive] = useState(true);
  const [currentDrawMode, setCurrentDrawMode] = useState("custom_select");
  const [selectedFeatureId, setSelectedFeatureId] = useState("");

  useEffect(() => {
    // retrieve stored features from localstorage
    let storedMapFeaturesStr = localStorage.getItem("storedMapFeatures");

    if (storedMapFeaturesStr) {
      let storedMapFeaturesObj = JSON.parse(storedMapFeaturesStr);
      setStoredMapFeatures(storedMapFeaturesObj);
      setDrawnFeatures(storedMapFeaturesObj.features);
    }
  }, []);

  useEffect(() => {
    if (mapContext.map && firstLoad) {
      setFirstLoad(false);
      if (
        mapContext.map.getSource("mapbox-gl-draw-cold") &&
        window.MapboxDraw &&
        typeof window.MapboxDraw.remove !== "undefined"
      ) {
        // remove old Mapbox-gl-Draw from Mapbox instance when hot-reloading this component during development
        window.MapboxDraw.remove();
      }
      window.MapLibreObj = mapContext.map;

      draw.current = new MapboxDraw({
        displayControlsDefault: false,
        defaultMode: "custom_select",
        modes: Object.assign(
          {
            custom_polygon: CustomPolygonMode,
            custom_select: CustomSelectMode,
            custom_direct_select: CustomDirectSelectMode,
          },
          MapboxDraw.modes
        ),
      });

      mapContext.map.on("draw.modechange", (e) => {
        console.log("modechange");
        setCurrentDrawMode(e.mode);
      });

      window.MapboxDraw = draw.current;

      // sadly there is no featureAdd event available in MapLibre
      mapContext.map.addControl(draw.current, "top-left");

      mapContext.map.on("mouseup", () => {
        setMouseUpTrigger(Math.random());
      });

      if (storedMapFeatures) {
        draw.current.set(storedMapFeatures);
      }
    }
  }, [mapContext.map, drawnFeatures, firstLoad]);

  useEffect(() => {
    if (draw.current) {
      // update drawnFeatures state object
      let currentFeatureCollection = draw.current.getAll();
      if (
        currentDrawMode === "custom_polygon" ||
        currentDrawMode === "custom_select"
      ) {
        setDrawnFeatures([...currentFeatureCollection.features]);

        localStorage.setItem(
          "storedMapFeatures",
          JSON.stringify(currentFeatureCollection)
        );
      }

      // update selected feature
      let selectedFeature = draw.current.getSelected();
      for (var i = 0; i < drawnFeatures.length; i++) {
        if (
          typeof selectedFeature.features[0] !== "undefined" &&
          selectedFeature.features[0].id === drawnFeatures[i].id
        ) {
          setSelectedFeatureId(selectedFeature.features[0].id);
        }
      }
    }
  }, [mouseUpTrigger]);

  useEffect(() => {
    if (draw.current) {
      switch (currentDrawMode) {
        case "custom_polygon":
          draw.current.changeMode("custom_polygon");
          break;
        case "custom_select":
        default:
          draw.current.changeMode("custom_select");
          break;
      }
    }
  }, [currentDrawMode]);

  return (
    <>
      <Button
        color="primary"
        variant={drawModeActive ? "contained" : "outlined"}
        onClick={() => setDrawModeActive(!drawModeActive)}
        style={{}}
      >
        Draw
      </Button>
      {drawModeActive && (
        <>
          <Button
            variant={
              currentDrawMode === "custom_select" ||
              currentDrawMode === "custom_direct_select"
                ? "contained"
                : "outlined"
            }
            onClick={() => setCurrentDrawMode("custom_select")}
            style={{}}
          >
            Select
          </Button>
          <Button
            variant={
              currentDrawMode === "custom_polygon" ? "contained" : "outlined"
            }
            onClick={() =>
              setCurrentDrawMode(
                currentDrawMode !== "custom_polygon"
                  ? "custom_polygon"
                  : "custom_select"
              )
            }
            style={{}}
          >
            Polygon
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("storedMapFeatures", "");
              setStoredMapFeatures(null);
              setDrawnFeatures([]);
              draw.current.deleteAll();
            }}
            style={{}}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
          <div
            style={{
              position: "absolute",
              left: "34px",
              top: "96px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              width: "150px",
              height: "200px",
            }}
          >
            <List dense={false}>
              {drawnFeatures.map((feature, id) => (
                <ListItem
                  key={id}
                  style={{
                    color: "#000",
                    backgroundColor:
                      selectedFeatureId === feature.id ? "#00ffff" : "#fff",
                  }}
                >
                  <ListItemText primary={feature.type} secondary={id} />
                </ListItem>
              ))}
            </List>
          </div>
        </>
      )}
    </>
  );
}

export default MlMapDrawTools;
