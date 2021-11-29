import React from "react";

import { MapComponentsProvider } from "@mapcomponents/react-core";
import MapLibreMap from "../components/MapLibreMap/MapLibreMap";
import "./style.css";

const decorators = [
  (Story) => (
    <div className="fullscreen_map">
      <MapComponentsProvider>

          <Story />
          <MapLibreMap
            options={{
              zoom: 14.5,
              style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
              center: [7.0851268, 50.73884],
            }}
            mapId="map_1"
          />
      </MapComponentsProvider>
    </div>
  ),
];

export default decorators;
