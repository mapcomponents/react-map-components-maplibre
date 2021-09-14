import React, { useContext, useEffect, useState, useRef } from "react";
import "./Imker.css";
import { MapContext } from "react-map-components-core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import * as turf from "@turf/turf";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MlDraggableFeatureLayer from "../MlDraggableFeatureLayer";

const MlMobilerImker = () => {

  const [lngLat, setLngLat] = useState([7.082493545532227, 50.739057911219774]);
  const layer_ids = ["DraggableZone", "bees", "search-radius", "streetData", "waterData", "buildingData", "greenData", "joinedDataLayer", "points"];
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

  const mapContext = useContext(MapContext);
  const flightRadiusList = [0.3, 1, 1.5, 2, 2.5, 3];
  const [selectedMainFlightRadius, setSelectedMainFlightRadius] = useState(1.5);
  const selectedMainFlightRadiusRef = useRef(0.3);
  let searchRadius;

  // removes the current and add a new "joinedDataLayer" which is for the joinedData inside the selectedMainFlightRadius
  function createJoinedLayer() {
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
  }

  // adds Layers from the openmaptiles source
  useEffect(() => {
    if (!mapContext.map) return;

    mapContext.map.setZoom(13.05);

    let center = mapContext.map.getCenter();
    let startLngLat = [center.lng, center.lat];
    searchRadius = makeCircle(startLngLat, selectedMainFlightRadius * 1000);

    mapContext.map.addLayer({
      id: "waterData",
      source: "openmaptiles",
      type: "fill",
      "source-layer": "water",
      paint: {
        "fill-color": "rgb(0,170,255)",
        "fill-opacity": 0.5
      }
    }, "waterway-name");


    mapContext.map.addLayer({
      id: "greenData",
      source: "openmaptiles",
      type: "fill",
      "source-layer": "landcover",
      paint: {
        "fill-color": "rgb(0,197,0)",
        "fill-opacity": 0.5
      }
    }, "waterway-name");

    mapContext.map.addLayer({
      id: "buildingData",
      source: "openmaptiles",
      type: "fill",
      "source-layer": "building",
      paint: {
        "fill-color": "rgb(128,42,0)",
        "fill-opacity": 0.5
      }
    }, "waterway-name");

    mapContext.map.addLayer({
      id: "streetData",
      source: "openmaptiles",
      type: "line",
      "source-layer": "transportation",
      paint: {
        "line-color": "rgb(204,170,0)",
        "line-opacity": 0.3,
        "line-width": 4
      }
    }, "waterway-name");


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

    createJoinedLayer();

  }, [mapContext.map]);

  // event that happens after mouseclick on the DraggableZone
  function onUpEvent() {
    if (!mapContext.map) return;
    searchRadius = makeCircle(mapContext.map.getSource("point")._data.features[0].geometry.coordinates, selectedMainFlightRadiusRef.current * 1000);
    mapContext.map.getSource("search-radius").setData(searchRadius);
    buildFeatures();
    let featuresInBuffer = spatialJoin(mapContext.map.getSource("bees"), searchRadius);

    calcAreas(featuresInBuffer.features);
  }

  // creates a Circle from a point and a Radius
  function makeCircle(lngLatArray, radiusInMeter) {
    let point = turf.point(lngLatArray);
    return turf.buffer(point, radiusInMeter, { units: "meters" });
  }


  // Loop through all the features in the source geojson and return the ones that
  // are inside the filter feature (buffered radius) and are confirmed landing sites
  function spatialJoin(sourceGeoJSON, filterFeature) {
    let joined = sourceGeoJSON._data.features.filter(function(feature) {
      let points = [];

      if (feature._geometry.type === "MultiPolygon") {
        feature._geometry.coordinates.map((row) => {
          points.push(row[0]);
        });
        for (let i = 0; i < points.length; i++) {
          for (let z = 0; z < points[i].length; z++) {
            if (turf.booleanPointInPolygon(points[i][z], filterFeature.geometry)) {
              return true;
            }
          }
        }
      } else {
        points = feature._geometry.coordinates[0];

        for (let i = 0; i < points.length; i++) {
          if (turf.booleanPointInPolygon(points[i], filterFeature.geometry)) {
            return true;
          }
        }
      }
      return false;
    });

    joined = unionOfPolygonArray(joined)

    let coveredFeatures = [];
    let partialFeatures = joined.filter(function(feature) {
      if (!feature._geometry) {
        console.log(feature);
      }
      if (feature._geometry.type === "MultiPolygon") {
        for (let i = 0; i < feature._geometry.coordinates.length; i++) {
          for (let z = 0; z < feature._geometry.coordinates[i].length; z++) {
            for (let k = 0; k < feature._geometry.coordinates[i][z].length; k++) {
              if (!turf.booleanPointInPolygon(feature._geometry.coordinates[i][z][k], filterFeature.geometry)) {
                return true;
              }
            }
          }
        }

      } else {
        for (let i = 0; i < feature._geometry.coordinates[0].length; i++) {
          if (!turf.booleanPointInPolygon(feature._geometry.coordinates[0][i], filterFeature.geometry)) {
            return true;
          }
        }
      }
      coveredFeatures.push(feature);
      return false;
    });

    let intersectFeatures = [];

    // eslint-disable-next-line array-callback-return
    partialFeatures.map((row) => {
      if (!turf.intersect(row, filterFeature)) console.log(row);
      let tempIntersect = turf.intersect(row, filterFeature);
      if (tempIntersect) {
        tempIntersect.properties.class = row.properties.class;
        intersectFeatures.push(tempIntersect);
      }
    });

    mapContext.map.getSource("joinedDataLayer").setData({
      type: "FeatureCollection",
      features: [...coveredFeatures, ...intersectFeatures]
    });

    return mapContext.map.getSource("joinedDataLayer")._data;
  }


  //calculates the area of all polygons from a specific class
  function areaOfGeoData(geoData, identifier) {
    let area = 0;

    geoData.map((row) => {

      if (row.properties.class === identifier) {
        area += turf.area(row);
      }
    });
    return area;
  }

  // calculates the area of the polygons inside the FlightRadius Circle and create an Array of Objects with the percent value of distribution
  function calcAreas(joinedData) {
    let tempCircleData = selectedMainFlightRadiusRef.current * 1000 * selectedMainFlightRadiusRef.current * 1000 * Math.PI;
    let tempCoveredData = {
      greenArea: ((areaOfGeoData(joinedData, "grass") + areaOfGeoData(joinedData, "wood") + areaOfGeoData(joinedData,
        "farmland")) / tempCircleData * 100).toFixed(2),
      waterArea: ((areaOfGeoData(joinedData, "lake") + areaOfGeoData(joinedData, "river")) / tempCircleData * 100).toFixed(2),
      buildingArea: (areaOfGeoData(joinedData, "building") / tempCircleData * 100).toFixed(2),
      restArea: 0
    };

    tempCoveredData.restArea = (100 - tempCoveredData.greenArea - tempCoveredData.waterArea - tempCoveredData.buildingArea).toFixed(2);
    setCoveredFieldData(tempCoveredData);
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

  // Collects data from the map
  function buildFeatures() {
    if (!mapContext.map) return;

    let waterData = mapContext.map.querySourceFeatures("openmaptiles", { sourceLayer: "water" });
    let greenData = mapContext.map.querySourceFeatures("openmaptiles", { sourceLayer: "landcover" });
    let buildingDataTemp = mapContext.map.querySourceFeatures("openmaptiles", { sourceLayer: "building" });

    let buildingData = buildingDataTemp.map((row) => {
      row.properties.class = "building";
      return row;
    });

    mapContext.map.getSource("bees").setData({
      type: "FeatureCollection",
      features: [...greenData, ...waterData, ...buildingData]
    });

  }

  function unionOfPolygonArray(polyArray) {
    let filteredJoined = [];
    let tempPolArray = polyArray;
    let filterBoolean = true;
    let foundOverlapBoolean = false;
    let makeUnionArray = [];

    while (filterBoolean) {

      for (let i = 0; i < tempPolArray.length; i++) {
        makeUnionArray = [tempPolArray[i]];
        for (let k = i; k < tempPolArray.length; k++) {
          if (tempPolArray[i] !== tempPolArray[k]) {
            if (turf.booleanOverlap(tempPolArray[i], tempPolArray[k])) {
              if (tempPolArray[i].properties.class === tempPolArray[k].properties.class) {
                //delete tempUnion.geometry
                makeUnionArray = [...makeUnionArray, tempPolArray[k]];
                foundOverlapBoolean = true;
                //console.log(filteredJoined[filteredJoined.length-1])
              }
            }
          }
        }

        if (foundOverlapBoolean){break;}else {
          //filteredJoined.push(tempPolArray[i])
        }
        if (i === tempPolArray.length - 1) {
          filterBoolean = false;
        }
      }

      if (foundOverlapBoolean) {
        let tempUnion = makeUnionArray[0];
        makeUnionArray.splice(0, 1);

        for (let i in makeUnionArray) {
          tempUnion = turf.union(tempUnion, makeUnionArray[i]);
          tempUnion.properties.class = makeUnionArray[i].properties.class
          tempUnion._geometry = makeUnionArray[i].geometry
        }

        for (let i in makeUnionArray) {
          tempPolArray.splice(tempPolArray.indexOf(makeUnionArray[i]), 1);
        }

        console.log(polyArray)
        console.log(makeUnionArray)
        console.log(tempPolArray)

        filteredJoined.push(tempUnion)
        foundOverlapBoolean = false;
      }

    }

    console.log(tempPolArray)
    if(tempPolArray.includes(makeUnionArray[0])) console.log("NOOOOO");
    filteredJoined = [...filteredJoined, ...tempPolArray]

    return filteredJoined;
  }


  return (
    <>
      <MlDraggableFeatureLayer
        maps={mapContext}
        radius={selectedMainFlightRadiusRef}
        iconSrc="./bee.png"
        onUpEvent={onUpEvent}
        lnglat={lngLat}
        paint={{
          "circle-radius": {
            stops: [[0, 0], [20, selectedMainFlightRadiusRef.current * 1000 / 0.075 / Math.cos(lngLat[1] * Math.PI / 180)]],
            base: 2
          },
          "circle-color": "rgb(56,135,190)",
          "circle-opacity": 0.3
        }}
      />
      <Avatar style={{ marginLeft: "auto", marginRight: "auto" }} src="./bee.png" />
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="flightradiusSelect">Flugradius</InputLabel>
          <Select
            value={selectedMainFlightRadius}
            onChange={(ev) => {
              setSelectedMainFlightRadius(ev.target.value);
              selectedMainFlightRadiusRef.current = ev.target.value;
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
      <hr style={{ width: "100%", color: "black", padding: "none", height: "3px" }} />
      <div id="Data">
        <ul style={{ "paddingLeft": 0 }}>
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

export default MlMobilerImker;