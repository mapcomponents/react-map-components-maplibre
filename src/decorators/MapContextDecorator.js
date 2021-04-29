import React from "react";

import { MapComponentsProvider } from "react-map-components-core";
import MapLibreMap from "../components/MapLibreMap/MapLibreMap";
import { LoadingOverlayProvider } from "../ui_components/LoadingOverlayContext";
import LoadingOverlay from "../ui_components/LoadingOverlay";

const decorators = [
  (Story) => (
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
        />
      </LoadingOverlayProvider>
    </MapComponentsProvider>
  ),
];

export default decorators;
