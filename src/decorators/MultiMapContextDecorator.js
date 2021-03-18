import React from "react";

import { MapComponentsProvider } from "react-map-components-core";
import MapLibreMap from "../components/MapLibreMap/MapLibreMap";

const decorators = [
  (Story) => (
    <MapComponentsProvider>
      <Story />
      <div className="maps">
        <MapLibreMap
          mapId="map_1"
          options={{
            //style: "mapbox://styles/mapbox/light-v10",
            //center: [-87.62712, 41.89033],
            zoom: 14.5,
            //pitch: 45,
            style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
            //style:"https://wms.wheregroup.com/tileserver/style/osm-liberty.json",
            //center: [8.607, 53.1409349],
            //          zoom: 13,
            center: [7.0851268, 50.73884],
            //          maxBounds: [
            //            [1.40625, 43.452919],
            //            [17.797852, 55.973798],
            //          ],
          }}
        />
        <MapLibreMap
          mapId="map_2"
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
      </div>
    </MapComponentsProvider>
  ),
];

export default decorators;
