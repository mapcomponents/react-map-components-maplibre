import React from "react";

import { MapComponentsProvider } from "react-map-components-core";
import MapLibreMap from "../components/MapLibreMap/MapLibreMap";
import MlUseMapDebugger from "../components/MlUseMapDebugger/MlUseMapDebugger";
import { LoadingOverlayProvider } from "../ui_components/LoadingOverlayContext";
import LoadingOverlay from "../ui_components/LoadingOverlay";
import "./style.css";

const decorators = [
  (Story) => (
    <div className="fullscreen_map">
      <MapComponentsProvider>
        <LoadingOverlayProvider>
          <LoadingOverlay></LoadingOverlay>

          <Story />

          {/*[...Array(70).keys()].map((id) => (
            <MlUseMapDebugger mapId="map_1" key={"mapDebugger_" + id} />
          ))*/}
          <MlUseMapDebugger mapId="map_1" />
          <MapLibreMap
            options={{
              zoom: 14.5,
              style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
              center: [7.0851268, 50.73884],
            }}
            mapId="map_1"
          />
        </LoadingOverlayProvider>
      </MapComponentsProvider>
    </div>
  ),
];

export default decorators;
