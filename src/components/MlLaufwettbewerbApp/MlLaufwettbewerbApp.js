import React, { useMemo, useState, useEffect, useContext } from "react";

import MapLibreMap from "../MapLibreMap/MapLibreMap";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import DailyProgressChart from "./assets/DailyProgressChart";
import Header from "./assets/Header";
import Leaderboard from "./assets/Leaderboard";
import { MapContext } from "react-map-components-core";
import { Grid, Paper } from "@material-ui/core";
import route from "./assets/route.json";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";

// https://repo.wheregroup.com/api/v4/users?per_page=100&page=2&exclude_external=true&exclude_internal=true
// https://docs.gitlab.com/ee/api/users.html
// https://docs.gitlab.com/ce/api/#pagination
import user_data from "./assets/users.json";
import * as turf from "@turf/turf";

import colorTheme_default from "./assets/themes/default";
import colorTheme_dark from "./assets/themes/dark";
import layoutTheme_default from "./assets/themes/layoutTheme_default";

const MlLaufwettbewerbApp = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const [routeProgressFeature, setRouteProgressFeature] = useState();
  const [routeProgressInKm, setRouteProgressInKm] = useState(0);
  const [rawProgressData, setRawProgressData] = useState([]);
  const [progressDataByDate, setProgressDataByDate] = useState({});
  const [progressDataByUser, setProgressDataByUser] = useState({});
  const [users, setUsers] = useState([]);
  const [displayDate, setDisplayDate] = useState("2021-06-07");
  const [darkMode, setDarkMode] = useState(false);

  const colorTheme = useMemo(() => {
    return createMuiTheme(darkMode ? colorTheme_dark : colorTheme_default);
  }, [darkMode]);
  const layoutTheme = createMuiTheme({});

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
          totalKm += progressDataByDate[key];
        }
      }

      setRouteProgressInKm(Math.round(totalKm * 100) / 100);

      let byUser = {};
      for (var i = 0, len = rawProgressData.length; i < len; i++) {
        if (displayDateDateObj - new Date(rawProgressData[i].date) > 0) {
          let distance = Math.round(rawProgressData[i].distance * 100) / 100;

          if (typeof byUser[rawProgressData[i].user_id] === "undefined") {
            byUser[rawProgressData[i].user_id] = 0;
          }
          byUser[rawProgressData[i].user_id] += distance;
        }
      }

      for (let key in byUser) {
        byUser[key] = Math.round(byUser[key] * 100) / 100;
      }
      setProgressDataByUser(byUser);
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

      setRouteProgressInKm(Math.round(totalKm * 100) / 100);
      setProgressDataByDate(byDate);
      setProgressDataByUser(byUser);

      // map mock_user_ids to users
      let user_ids = Object.keys(byUser);
      for (var i = 0, len = user_data.length; i < len; i++) {
        user_data[i].id = user_ids.pop();
      }
      setUsers(user_data);
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

  const routePaint = useMemo(() => {
    return {
      "line-color": colorTheme.palette.primary.main,
      "line-width": 10,
    };
  }, [colorTheme]);
  const progressPaint = useMemo(() => {
    return {
      "line-color": colorTheme.palette.secondary.main,
      "line-width": 6,
    };
  }, [colorTheme]);

  return (
    <>
      <ThemeProvider theme={layoutTheme}>
        <ThemeProvider theme={colorTheme}>
          <CssBaseline />
          <Grid
            container
            spacing={3}
            style={{ flexDirection: "column", flexWrap: "no-wrap" }}
          >
            <Grid item xs={12}>
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3} style={{ flexDirection: "row" }}>
                <Grid item xs={12} md={3}>
                  <p>Anzeigedatum:</p>
                  <h2>
                    {new Date(displayDate).toLocaleDateString("de-DE", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </h2>
                  <p>Gelaufene Kilometer:</p>
                  <h3>{routeProgressInKm} Km</h3>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className="mlMap"
                  style={{ minHeight: "400px" }}
                >
                  <MapLibreMap
                    options={{
                      zoom: 14.5,
                      style: "mapbox://styles/mapbox/dark-v9",
                      center: [7.0851268, 50.73884],
                    }}
                  />
                  <MlGeoJsonLayer geojson={route} paint={routePaint} type="line" />
                  {routeProgressFeature && (
                    <MlGeoJsonLayer
                      geojson={routeProgressFeature}
                      paint={progressPaint}
                      type="line"
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={3}>
                  <Leaderboard
                    route={route}
                    users={users}
                    progressDataByUser={progressDataByUser}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "stretch",
                alignContent: "stretch",
                overflow: "hidden",
                minHeight: "200px",
              }}
            >
              <DailyProgressChart
                data={progressDataByDate}
                onClick={(date) => setDisplayDate(date)}
                displayDate={displayDate}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
      </ThemeProvider>
    </>
  );
};

export default MlLaufwettbewerbApp;
