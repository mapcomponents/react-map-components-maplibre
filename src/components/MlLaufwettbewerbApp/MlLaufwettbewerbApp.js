import React, { useState, useEffect, useContext } from "react";

import MapLibreMap from "../MapLibreMap/MapLibreMap";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import DailyProgressChart from "./assets/DailyProgressChart";
import { MapContext } from "react-map-components-core";
import { Grid, Paper } from "@material-ui/core";
import route from "./assets/route.json";
import * as turf from "@turf/turf";

const MlLaufwettbewerbApp = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const [routeProgressFeature, setRouteProgressFeature] = useState();
  const [routeProgressInKm, setRouteProgressInKm] = useState(0);
  const [rawProgressData, setRawProgressData] = useState([]);
  const [progressDataByDate, setProgressDataByDate] = useState({});
  const [progressDataByUser, setProgressDataByUser] = useState({});
  const [displayDate, setDisplayDate] = useState("2021-06-07");

  const fetchProgressData = () => {
    fetch("/assets/laufwettbewerb_mock_data.json")
      .then((response) => response.json())
      .then((progressData) => setRawProgressData(progressData));
  };

  useEffect(() => {
    if (progressDataByDate) {
      let displayDateDateObj = new Date(displayDate);
      let totalKm = 0;
      for (var key in progressDataByDate) {
        if (displayDateDateObj - new Date(key) > 0) {
          console.log(key + " added");
          totalKm += progressDataByDate[key];
        }
      }
      console.log(totalKm);

      setRouteProgressInKm(totalKm);
    }
  }, [displayDate]);

  useEffect(() => {
    if (rawProgressData.length) {
      let byDate = {};
      let byUser = {};
      let totalKm = 0;
      for (var i = 0, len = rawProgressData.length; i < len; i++) {
        let distance = Math.round(rawProgressData[i].distance * 100) / 100;

        totalKm += distance;

        if (typeof byDate[rawProgressData[i].date] === "undefined") {
          byDate[rawProgressData[i].date] = 0;
        }
        byDate[rawProgressData[i].date] += distance;

        if (typeof byUser[rawProgressData[i].user_id] === "undefined") {
          byUser[rawProgressData[i].user_id] = 0;
        }
        byUser[rawProgressData[i].user_id] += distance;
      }

      for (let key in byUser) {
        byUser[key] = Math.round(byUser[key] * 100) / 100;
      }
      for (let key in byDate) {
        byDate[key] = Math.round(byDate[key] * 100) / 100;
      }

      setRouteProgressInKm(totalKm);
      setProgressDataByDate(byDate);
      setProgressDataByUser(byUser);
    }
  }, [rawProgressData]);

  useEffect(() => {
    if (routeProgressInKm > 0) {
      let tmpRouteProgess = turf.lineChunk(route, routeProgressInKm);
      if (typeof tmpRouteProgess.features[0] !== "undefined") {
        setRouteProgressFeature(tmpRouteProgess.features[0]);
      }
    }
  }, [routeProgressInKm]);

  useEffect(() => {
    // console.log(turf.length(route, { units: "kilometers" }));
    // let tmpRouteProgess = turf.lineChunk(route, 245);
    // if (typeof tmpRouteProgess.features[0] !== "undefined") {
    //   setRouteProgress(tmpRouteProgess.features[0]);
    // }
    fetchProgressData();
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    mapContext.getMap(props.mapId).setZoom(6.1);
    mapContext.getMap(props.mapId).setPitch(45);
    mapContext.getMap(props.mapId).setBearing(-42);
    mapContext
      .getMap(props.mapId)
      .setCenter({ lng: 9.830202291394698, lat: 50.55342033900138 });
  }, [mapContext.mapIds, mapContext]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper elevation={3}>
            <h2>{displayDate}</h2>
            <h3>{routeProgressInKm}</h3>
          </Paper>
        </Grid>
        <Grid item xs={6} className="mlMap">
          <MapLibreMap
            options={{
              zoom: 14.5,
              style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
              center: [7.0851268, 50.73884],
            }}
          />
          <MlGeoJsonLayer
            geojson={route}
            paint={{
              "line-color": "rgb(100,200,100)",
              "line-width": 10,
            }}
            type="line"
          />
          {routeProgressFeature && (
            <MlGeoJsonLayer
              geojson={routeProgressFeature}
              paint={{
                "line-color": "rgb(100,100,200)",
                "line-width": 10,
              }}
              type="line"
            />
          )}
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={3}></Paper>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            minHeight: "33vh",
            display: "flex",
            alignItems: "stretch",
            alignContent: "stretch",
          }}
        >
          <DailyProgressChart
            data={progressDataByDate}
            onClick={(date) => setDisplayDate(date.x)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MlLaufwettbewerbApp;
