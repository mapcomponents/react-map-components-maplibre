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
            //style: "mapbox://styles/mapbox/light-v10",
            //center: [-87.62712, 41.89033],
            zoom: 14.5,
            //pitch: 45,
            //style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
            style: "https://wms.wheregroup.com/tileserver/style/osm-liberty.json",
            //center: [8.607, 53.1409349],
            //          zoom: 13,
            center: [7.0851268, 50.73884],
            //          maxBounds: [
            //            [1.40625, 43.452919],
            //            [17.797852, 55.973798],
            //          ],
          }}
        />
      </MapComponentsProvider>
    </div>
  ),
];

export default decorators;
