import React from "react";

import { MapComponentsProvider } from "react-map-components-core";
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
          {Story()}
          <MapLibreMap
            options={{
              //style: "mapbox://styles/mapbox/light-v10",
              //center: [-87.62712, 41.89033],
              zoom: 14.5,
              //pitch: 45,
              style:
                "https://wms.wheregroup.com/tileserver/style/klokantech-basic.json",
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
        </LoadingOverlayProvider>
      </MapComponentsProvider>
    </div>
  ),
];

export default decorators;
