import React from "react";

import { MapComponentsProvider } from "@mapcomponents/react-core";
import MapLibreMap from "../components/MapLibreMap/MapLibreMap";
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
