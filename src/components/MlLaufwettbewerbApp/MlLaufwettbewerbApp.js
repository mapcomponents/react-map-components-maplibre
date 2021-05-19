import React, { useMemo, useState, useEffect, useContext } from "react";

import MapLibreMap from "../MapLibreMap/MapLibreMap";
import MlLayer from "../MlLayer/MlLayer";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import DailyProgressChart from "./assets/DailyProgressChart";
import Header from "./assets/Header";
import Leaderboard from "./assets/Leaderboard";
import { MapContext } from "react-map-components-core";
import { Grid, Paper } from "@material-ui/core";
import route from "./assets/route.json";
import germanyGeoJson from "./assets/json/germany.geo.json";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

// https://repo.wheregroup.com/api/v4/users?per_page=100&page=2&exclude_external=true&exclude_internal=true
// https://docs.gitlab.com/ee/api/users.html
// https://docs.gitlab.com/ce/api/#pagination
import user_data from "./assets/users.json";
import * as turf from "@turf/turf";

import colorTheme_default from "./assets/themes/default";
import colorTheme_dark from "./assets/themes/dark";
import layoutTheme_default from "./assets/themes/layoutTheme_default";
const layoutTheme = createMuiTheme(layoutTheme_default);

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
    return responsiveFontSizes(
      createMuiTheme(darkMode ? colorTheme_dark : colorTheme_default)
    );
  }, [darkMode]);

  const fetchProgressData = () => {
    fetch("/assets/laufwettbewerb_mock_data.json")
      .then((response) => response.json())
      .then((progressData) => setRawProgressData(progressData));
  };

  const calculateProgressDataByUser = (rawProgressData) => {
    let displayDateDateObj = new Date(displayDate);

    let byUser = {};
    for (var i = 0, len = rawProgressData.length; i < len; i++) {
      if (displayDateDateObj - new Date(rawProgressData[i].date) >= 0) {
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

    return byUser;
  };

  useEffect(() => {
    if (progressDataByDate) {
      let displayDateDateObj = new Date(displayDate);
      let totalKm = 0;
      for (var key in progressDataByDate) {
        if (displayDateDateObj - new Date(key) >= 0) {
          totalKm += progressDataByDate[key];
        }
      }

      setRouteProgressInKm(Math.round(totalKm * 100) / 100);

      setProgressDataByUser(calculateProgressDataByUser(rawProgressData));
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
        if (user_data[i].avatar_url) {
          user_data[i].id = user_ids.pop();
        } else {
          user_data[i].id = false;
        }
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
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1500);
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    var bbox = turf.bbox(route);
    console.log([
      [bbox[0], bbox[1]],
      [bbox[2], bbox[3]],
    ]);
    mapContext.getMap(props.mapId).fitBounds(
      [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ],
      { bearing: -42, pitch: 45 }
    );
    //mapContext.getMap(props.mapId).setZoom(6.1);
    //mapContext
    //  .getMap(props.mapId)
    //  .setCenter({ lng: 9.830202291394698, lat: 50.55342033900138 });
  }, [mapContext.mapIds, mapContext]);

  return (
    <>
      <ThemeProvider theme={layoutTheme}>
        <ThemeProvider theme={colorTheme}>
          <CssBaseline />
          <Grid
            container
            spacing={3}
            style={{ flexFlow: "column", flex: 1, flexWrap: "no-wrap" }}
          >
            <Grid item xs={12} style={{ flex: 0 }}>
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            </Grid>
            <Grid item xs={12} style={{ flex: 1, display: "flex" }}>
              <Grid container spacing={3} style={{ flexDirection: "row", flex: 1 }}>
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
                      //style: "https://demotiles.maplibre.org/style.json",
                      style: {
                        version: 8,
                        name: "Blank",
                        center: [0, 0],
                        zoom: 0,
                        sources: {},
                        sprite:
                          "https://raw.githubusercontent.com/openmaptiles/osm-liberty-gl-style/gh-pages/sprites/osm-liberty",
                        glyphs:
                          "mapbox://fonts/openmaptiles/{fontstack}/{range}.pbf",
                        layers: [
                          {
                            id: "background",
                            type: "background",
                            paint: {
                              "background-color": "rgba(0,0,0,0)",
                            },
                          },
                        ],
                        id: "blank",
                      },

                      center: [7.0851268, 50.73884],
                    }}
                  />
                  <MlGeoJsonLayer
                    geojson={germanyGeoJson}
                    idSuffix="germanyGeoJsonFill"
                    paint={{
                      "fill-color": colorTheme.palette.action.focus,
                    }}
                    type="fill"
                  />
                  <MlGeoJsonLayer
                    geojson={germanyGeoJson}
                    idSuffix="germanyGeoJsonLine"
                    paint={{
                      "line-color": colorTheme.palette.info.main,
                      "line-width": 4,
                    }}
                    type="line"
                  />
                  <MlGeoJsonLayer
                    geojson={route}
                    idSuffix="routeGeoJson"
                    paint={{
                      "line-color": colorTheme.palette.primary.main,
                      "line-width": 10,
                    }}
                    type="line"
                  />
                  {routeProgressFeature && (
                    <MlGeoJsonLayer
                      geojson={routeProgressFeature}
                      idSuffix="progressGeoJson"
                      paint={{
                        "line-color": colorTheme.palette.secondary.main,
                        "line-width": 6,
                      }}
                      type="line"
                    />
                  )}
                  <MlLayer
                    idSuffix="CityLabels"
                    options={{
                      type: "symbol",
                      source: {
                        type: "geojson",
                        data: {
                          type: "FeatureCollection",
                          features: [
                            {
                              type: "Feature",
                              properties: {
                                description: "Bonn",
                              },
                              geometry: {
                                type: "Point",
                                coordinates: [7.085006973885085, 50.738673903252966],
                              },
                            },
                            {
                              type: "Feature",
                              properties: {
                                description: "Berlin",
                              },
                              geometry: {
                                type: "Point",
                                coordinates: [13.330454571384802, 52.4928702653268],
                              },
                            },
                            {
                              type: "Feature",
                              properties: {
                                description: "Freiburg",
                              },
                              geometry: {
                                type: "Point",
                                coordinates: [7.842812454054702, 47.989065548092675],
                              },
                            },
                          ],
                        },
                      },
                      layout: {
                        "text-field": ["get", "description"],
                        "text-radial-offset": 0.5,
                        "text-anchor": "bottom",
                        "text-offset": [0, -300],
                      },
                      paint: {
                        "text-color": colorTheme.palette.text.primary,
                        "text-halo-color": colorTheme.palette.background.default,
                        "text-halo-width": 2,
                      },
                    }}
                  ></MlLayer>
                </Grid>
                <Grid item xs={12} md={3} style={{ maxHeight: "520px" }}>
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
                minHeight: "200px",
                flex: 0,
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
