import React, { useMemo, useState, useEffect, useContext } from "react";

import MapLibreMap from "../MapLibreMap/MapLibreMap";
import MlLayer from "../MlLayer/MlLayer";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import MlImageMarkerLayer from "../MlImageMarkerLayer/MlImageMarkerLayer";
import DailyProgressChart from "./assets/DailyProgressChart";
import StatsSidebar from "./assets/StatsSidebar";
import Header from "./assets/Header";
import Leaderboard from "./assets/Leaderboard";
import { MapContext } from "react-map-components-core";
import { AppContext } from "./assets/AppContext";
import { Grid, Paper } from "@material-ui/core";
import germanyGeoJson from "./assets/json/germany.geo.json";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  responsiveFontSizes,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import * as turf from "@turf/turf";

import colorTheme_default from "./assets/themes/default";
import colorTheme_dark from "./assets/themes/dark";
import layoutTheme_default from "./assets/themes/layoutTheme_default";
const layoutTheme = createMuiTheme(layoutTheme_default);

const MlLaufwettbewerbApp = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);
  const appContext = useContext(AppContext);

  const colorTheme = useMemo(() => {
    return responsiveFontSizes(
      createMuiTheme({
        ...layoutTheme_default,
        ...(appContext.darkMode ? colorTheme_dark : colorTheme_default),
      })
    );
  }, [appContext.darkMode]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    var bbox = turf.bbox(appContext.route);
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
            spacing={2}
            style={{ flexFlow: "column", flex: 1, flexWrap: "no-wrap" }}
          >
            <Grid item xs={12} style={{ flex: 0 }}>
              <Header />
            </Grid>
            <Grid item xs={12} style={{ flex: 1, display: "flex" }}>
              <Grid container spacing={2} style={{ flexDirection: "row", flex: 1 }}>
                <Grid item xs={12} md={3}>
                  <StatsSidebar />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className="mlMap"
                  style={{ minHeight: "400px", display: "flex" }}
                >
                  <Paper elevation={1} style={{ flex: 1, padding: 0 }}>
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
                        "line-color": colorTheme.palette.warning.light,
                        "line-width": 4,
                      }}
                      type="line"
                    />
                    <MlGeoJsonLayer
                      geojson={appContext.route}
                      idSuffix="routeGeoJson"
                      paint={{
                        "line-color": colorTheme.palette.primary.dark,
                        "line-width": 10,
                      }}
                      type="line"
                    />
                    {appContext.routeProgressFeature && (
                      <MlGeoJsonLayer
                        geojson={appContext.routeProgressFeature}
                        idSuffix="progressGeoJson"
                        paint={{
                          "line-color": colorTheme.palette.secondary.main,
                          "line-width": 6,
                        }}
                        type="line"
                      />
                    )}
                    {appContext.routeProgressPosition && (
                      <MlImageMarkerLayer
                        geojson={appContext.routeProgressPosition}
                        idSuffix="progressPositionGeoJson"
                        imgSrc="/assets/marker.png"
                        options={{
                          type: "symbol",
                          source: {
                            type: "geojson",
                            data: {
                              ...appContext.routeProgressPosition,
                            },
                          },
                          layout: {
                            "icon-size": 0.05,
                            "icon-offset": [0, -350],
                          },
                        }}
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
                                  coordinates: [
                                    7.085006973885085,
                                    50.738673903252966,
                                  ],
                                },
                              },
                              {
                                type: "Feature",
                                properties: {
                                  description: "Berlin",
                                },
                                geometry: {
                                  type: "Point",
                                  coordinates: [
                                    13.330454571384802,
                                    52.4928702653268,
                                  ],
                                },
                              },
                              {
                                type: "Feature",
                                properties: {
                                  description: "Freiburg",
                                },
                                geometry: {
                                  type: "Point",
                                  coordinates: [
                                    7.842812454054702,
                                    47.989065548092675,
                                  ],
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
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3} style={{ flex: "1", display: "flex" }}>
                  <Paper elevation={1} style={{ flex: 1 }}>
                    <Leaderboard />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                minHeight: "200px",
                flex: 0,
                display: "flex",
              }}
            >
              <Paper elevation={1} style={{ flex: 1 }}>
                <DailyProgressChart
                  data={appContext.progressDataByDate}
                  onClick={(date) => appContext.setDisplayDate(date)}
                  displayDate={appContext.displayDate}
                />
              </Paper>
            </Grid>
          </Grid>
        </ThemeProvider>
      </ThemeProvider>
    </>
  );
};

export default MlLaufwettbewerbApp;
