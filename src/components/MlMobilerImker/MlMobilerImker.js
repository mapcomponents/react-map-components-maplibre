import React, { useContext, useEffect, useState, useCallback, useRef } from "react";
import "./Imker.css";

import { MapContext } from "react-map-components-core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import beeImg from "./bee.png";
import * as turf from "@turf/turf";
import { FormControl, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const MlMobilerImker = () => {

  const layer_ids = ["beeZone", "bees", "search-radius", "streetData", "waterData", "buildingData", "greenData", "joinedDataLayer", "points"];
  let [coveredFieldData, setCoveredFieldData] = useState({
    circleArea: 0,
    greenArea: 0,
    waterArea: 0,
    buildingArea: 0,
    restArea: 0
  });

  let [fieldDataList, setFieldDataList] = useState([]);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  const metersToPixelsAtMaxZoom = (meters, latitude) => meters / 0.075 / Math.cos(latitude * Math.PI / 180);

  const mapContext = useContext(MapContext);
  const flightRadiusList = [1, 1.5, 2, 2.5, 3];
  const [selectedMainFlightRadius, setSelectedMainFlightRadius] = useState(1.5);
  const selectedMainFlightRadiusRef = useRef(1.5);
  let searchRadius;

  function createBeeZone() {
    if (mapContext.map.getLayer("beeZone")) {
      mapContext.map.removeLayer("beeZone");
    }

    if (mapContext.map.getLayer("joinedDataLayer")) {
      mapContext.map.removeLayer("joinedDataLayer");
      mapContext.map.removeSource("joinedDataLayer");
    }

    mapContext.map.addLayer({
      id: "joinedDataLayer",
      source: {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": []
        }
      },
      type: "fill",
      paint: {
        "fill-color": "rgb(0,0,0)",
        "fill-opacity": .2
      }
    });

    mapContext.map.addLayer({
      id: "beeZone",
      type: "circle",
      "source": "point",
      "paint": {
        "circle-radius": {
          stops: [[0, 0], [20, metersToPixelsAtMaxZoom(selectedMainFlightRadius * 1000, mapContext.map.getSource("point")._data.features[0].geometry.coordinates[1])]],
          base: 2
        },
        "circle-color": "rgb(56,135,190)",
        "circle-opacity": 0.3
      }

    });
  }

  useEffect(() => {
    if (!mapContext.map) return;

    mapContext.map.setZoom(13.05);

    mapContext.map.on("mouseenter", "point", function() {
      mapContext.map.setPaintProperty("point", "circle-color", "rgb(59,178,208)");
      mapContext.canvas.style.cursor = "move";
    });

    mapContext.map.on("mouseleave", "point", function() {
      mapContext.map.setPaintProperty("point", "circle-color", "rgb(56,135,190)");
      mapContext.canvas.style.cursor = "";
    });

    mapContext.map.on("mousedown", "point", function(e) {
// Prevent the default map drag behavior
      e.preventDefault();

      mapContext.canvas.style.cursor = "grab";

      mapContext.map.on("mousemove", onMove);
      mapContext.map.once("mouseup", onUp);
      console.log("point");
    });

    mapContext.map.on("touchstart", "point", function(e) {
      if (e.points.length !== 1) return;

// Prevent the default map drag behavior.
      e.preventDefault();

      mapContext.map.on("touchmove", onMove);
      mapContext.map.once("touchend", onUp);
    });


    let center = mapContext.map.getCenter();
    let startLngLat = [center.lng, center.lat];
    searchRadius = makeRadius(startLngLat, selectedMainFlightRadius * 1000);

    mapContext.map.addLayer({
      id: "waterData",
      source: "openmaptiles",
      type: "fill",
      "source-layer": "water",
      paint: {
        "fill-color": "rgb(0,170,255)",
        "fill-opacity": 0.5
      }
    });


    mapContext.map.addLayer({
      id: "greenData",
      source: "openmaptiles",
      type: "fill",
      "source-layer": "landcover",
      paint: {
        "fill-color": "rgb(0,197,0)",
        "fill-opacity": 0.5
      }
    });

    mapContext.map.addLayer({
      id: "buildingData",
      source: "openmaptiles",
      type: "fill",
      "source-layer": "building",
      paint: {
        "fill-color": "rgb(128,42,0)",
        "fill-opacity": 0.5
      }
    });

    mapContext.map.addLayer({
      id: "streetData",
      source: "openmaptiles",
      type: "line",
      "source-layer": "transportation",
      paint: {
        "line-color": "rgb(204,170,0)",
        "line-opacity": 0.5,
        "line-width": 4
      }
    });


    mapContext.map.addLayer({
      id: "search-radius",
      source: {
        type: "geojson",
        data: {
          "type": "FeatureCollection",
          "features": []
        }
      },
      type: "fill",
      paint: {
        "fill-color": "rgb(241,207,101)",
        "fill-opacity": 0.1
      }
    });
    mapContext.map.addSource("bees", {
      type: "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": []
      }

    });

    buildFeatures();

    mapContext.map.loadImage(beeImg,
      function(error, image) {
        if (error) throw error;
        mapContext.map.addImage("bee", image);
        mapContext.map.addSource("point", {
          "type": "geojson", "data": {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": startLngLat
                }
              }
            ]
          }
        });
        mapContext.map.addLayer({
          "id": "points",
          "type": "symbol",
          "source": "point",
          "layout": {
            "icon-image": "bee",
            "icon-size": 0.3
          }
        });
        createBeeZone();
        onUp()
      }
    );
      mapContext.map.on("mouseenter", "beeZone", function() {
        mapContext.map.setPaintProperty("beeZone", "circle-color", "rgba(59,178,208,0.4)");
        mapContext.map._canvas.style.cursor = "move";
      });

      mapContext.map.on("mouseleave", "beeZone", function() {
        mapContext.map.setPaintProperty("beeZone", "circle-color", "rgba(56,135,190,0.4)");
        mapContext.map._canvas.style.cursor = "";
      });

      mapContext.map.on("mousedown", "beeZone", function(e) {
// Prevent the default map drag behavior
        e.preventDefault();

        mapContext.map._canvas.style.cursor = "grab";

        mapContext.map.on("mousemove", onMove);
        mapContext.map.once("mouseup", onUp);
        console.log("beeZone");
      });

      mapContext.map.on("touchstart", "beeZone", function(e) {
        if (e.points.length !== 1) return;

// Prevent the default map drag behavior.
        e.preventDefault();

        mapContext.map.on("touchmove", onMove);
        mapContext.map.once("touchend", onUp);
      });
  }, [mapContext.map]);

  useEffect(() => {
    if (!mapContext.map) return;

    mapContext.map.querySourceFeatures("openmaptiles", { sourceLayer: "water" }).map((row) => {
      if (row.properties.class !== "lake") {
        console.log(row);
      }
    });
    createBeeZone();
    mapContext.map._render();
  }, [selectedMainFlightRadius]);


  function onMove(e) {
    if (!mapContext.map.getSource("point")._data) return;
    var coords = e.lngLat;

// Set a UI indicator for dragging.
    mapContext.map._canvas.style.cursor = "grabbing";

    mapContext.map.getSource("point")._data.features[0].geometry.coordinates = [coords.lng, coords.lat];
    mapContext.map.getSource("point").setData(mapContext.map.getSource("point")._data);
  }

  const onUp = useCallback(() => {

    let area = 0.0;
    console.log("onUp");
    mapContext.map._canvas.style.cursor = "";

// Unbind mouse/touch events
    mapContext.map.off("mousemove", onMove);
    mapContext.map.off("touchmove", onMove);

    console.log(selectedMainFlightRadius)
    searchRadius = makeRadius(mapContext.map.getSource("point")._data.features[0].geometry.coordinates, selectedMainFlightRadiusRef.current * 1000);
    mapContext.map.getSource("search-radius").setData(searchRadius);
    buildFeatures();
    let featuresInBuffer = spatialJoin(mapContext.map.getSource("bees"), searchRadius);

    calcAreas(featuresInBuffer.features);
  }, [selectedMainFlightRadius, mapContext])

  function makeRadius(lngLatArray, radiusInMeter) {
    let point = turf.point(lngLatArray);
    return turf.buffer(point, radiusInMeter, { units: "meters" });
  }

  function spatialJoin(sourceGeoJSON, filterFeature) {
    console.log(filterFeature)
    // Loop through all the features in the source geojson and return the ones that
    // are inside the filter feature (buffered radius) and are confirmed landing sites
    let joined = sourceGeoJSON._data.features.filter(function(feature) {
      let points = [];
      let tempPoints = [];

      if (feature._geometry.type === "MultiPolygon") {
        for (let i = 0; feature._geometry.coordinates[0].length < i; i++) {
          feature._geometry.coordinates[0][i].map((row) => {
            row.properties = { class: feature.properties.class };
            tempPoints.push(row);
          });

          points = [...points, ...tempPoints];
        }
      } else {
        points = feature._geometry.coordinates[0];
      }
      for (let i = 0; i < points.length; i++) {
        if (turf.booleanPointInPolygon(points[i], filterFeature.geometry)) {
          return true;
        }

      }
      return false;
    });

    let coveredFeatures = [];
    let partialFeatures = joined.filter(function(feature) {
      for (let i = 0; i < feature._geometry.coordinates[0].length; i++) {
        if (!turf.booleanPointInPolygon(feature._geometry.coordinates[0][i], filterFeature.geometry)) {
          return true;
        }

      }
      coveredFeatures.push(feature);
      return false;
    });

    let intersectFeatures = [];

    // eslint-disable-next-line array-callback-return
    partialFeatures.map((row) => {
      intersectFeatures.push(turf.intersect(row, filterFeature));
    });

    mapContext.map.getSource("joinedDataLayer").setData({
      type: "FeatureCollection",
      features: [...coveredFeatures, ...intersectFeatures]
    });

    return mapContext.map.getSource("joinedDataLayer")._data;
  }

  function areaOfGeoData(geoData, identifier) {
    let area = 0;

    geoData.map((row) => {
      if (row.properties.class === identifier) {
        area += turf.area(row);
      }
    });
    return area;
  }

  function calcAreas(joinedData) {
    let tempCircleData = selectedMainFlightRadius * 1000 * selectedMainFlightRadius * 1000 * Math.PI;
    let tempCoveredData = {
      circleArea: tempCircleData,
      greenArea: (areaOfGeoData(joinedData, "grass") / tempCircleData * 100).toFixed(2),
      waterArea: ((areaOfGeoData(joinedData, "lake") + areaOfGeoData(joinedData, "river")) / tempCircleData * 100).toFixed(2),
      buildingArea: (areaOfGeoData(joinedData, "building") / tempCircleData * 100).toFixed(2),
      restArea: 0
    };
    tempCoveredData.restArea = (100 - tempCoveredData.greenArea - tempCoveredData.waterArea - tempCoveredData.buildingArea).toFixed(2);
    setCoveredFieldData(tempCoveredData);
    console.log(coveredFieldData)
    console.log(tempCoveredData)
    setFieldDataList([
      {
        id: "Grünfläche",
        data: tempCoveredData.greenArea
      },
      {
        id: "Wasserfläche",
        data: tempCoveredData.waterArea
      },
      {
        id: "Gebäude",
        data: tempCoveredData.buildingArea
      },
      {
        id: "Rest",
        data: tempCoveredData.restArea
      }
    ]);
  }

  function buildFeatures() {
    if (!mapContext.map) return;

    let waterData = mapContext.map.querySourceFeatures("openmaptiles", { sourceLayer: "water" });
    let greenData = mapContext.map.querySourceFeatures("openmaptiles", { sourceLayer: "landcover" });
    let buildingData = mapContext.map.querySourceFeatures("openmaptiles", { sourceLayer: "building" });
    buildingData = buildingData.map((row) => {
      row.properties.class = "building";
      return row;
    });
    console.log(buildingData);

    mapContext.map.getSource("bees").setData({
      type: "FeatureCollection",
      features: [...greenData, ...waterData, ...buildingData]
    });
  }

  return (
    <>
      <Avatar style={{marginLeft: "auto", marginRight: "auto"}} src="./bee.png" />
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="flightradiusSelect">Flugradius</InputLabel>
          <Select
            value={selectedMainFlightRadius}
            onChange={(ev) => {
              setSelectedMainFlightRadius(ev.target.value);
              selectedMainFlightRadiusRef.current = ev.target.value;
              console.log(ev.target.value)
              console.log(selectedMainFlightRadius);
            }}
            inputProps={{
              id: "flightradiusSelect"
            }}
          >
            {flightRadiusList.map((el) => (
              <MenuItem key={el} value={el}>
                {el} Km
              </MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>
      <hr style={{width: "100%", color: "black", padding: "none", height: "3px"}}/>
      <div id="Data">
        <ul style={{"paddingLeft": 0}}>
          {fieldDataList.map((item) => (
            <li key={item.id} style={{ listStyle: "none" }}>
              {item.id + ": " + item.data + "%"}
            </li>
          ))}
        </ul>

      </div>
    </>
  );

};
/*
<TextField value={coveredFieldData.greenArea} />
        <InputLabel>Grünfläche</InputLabel>

        <TextField value={coveredFieldData.waterArea} />
        <InputLabel>Wasserfläche</InputLabel>

        <TextField value={coveredFieldData.buildingArea} />
        <InputLabel>Gebäude</InputLabel>

        <TextField value={coveredFieldData.restArea} />
        <InputLabel>Straßen und sonstiege Flächen</InputLabel>
 */

export default MlMobilerImker;