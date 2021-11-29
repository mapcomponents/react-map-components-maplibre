import React from "react";

import { MapComponentsProvider } from "@mapcomponents/react-core";

import MapLibreMap from "../components/MapLibreMap/MapLibreMap";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./style.css";

const theme = createTheme({});

const decorators = [
  (Story) => (
    <div className="fullscreen_map">
      <ThemeProvider theme={theme}>
        <MapComponentsProvider>
            <div
              style={{
                overflow: "hidden",
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
              }}
            >
              <Story />
              <div className="maps">
                <MapLibreMap
                  mapId="map_1"
                  options={{
                    //style: "mapbox://styles/mapbox/light-v10",
                    //center: [-87.62712, 41.89033],
                    zoom: 14.5,
                    //pitch: 45,
                    //style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
                    style: "https://wms.wheregroup.com/tileserver/style/osm-liberty.json",
                    //center: [8.607, 53.1409349],
                    //zoom: 13,
                    center: [7.0851268, 50.73884],
                    //maxBounds: [
                    //  [1.40625, 43.452919],
                    //  [17.797852, 55.973798],
                    //],
                  }}
                />
                <MapLibreMap
                  mapId="map_2"
                  options={{
                    //style: "mapbox://styles/mapbox/light-v10",
                    //center: [-87.62712, 41.89033],
                    zoom: 14.5,
                    //pitch: 45,
                    style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
                    //style: "https://wms.wheregroup.com/tileserver/style/osm-liberty.json",
                    //center: [8.607, 53.1409349],
                    //zoom: 13,
                    center: [7.0851268, 50.73884],
                    //maxBounds: [
                    //  [1.40625, 43.452919],
                    //  [17.797852, 55.973798],
                    //],
                  }}
                />
              </div>
            </div>
        </MapComponentsProvider>
      </ThemeProvider>
    </div>
  ),
];

export default decorators;
