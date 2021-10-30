import React from "react";

import { MapComponentsProvider } from "react-map-components-core";
import MapLibreMap from "../components/MapLibreMap/MapLibreMap";
import MlUseMapDebugger from "../components/MlUseMapDebugger/MlUseMapDebugger";
import { LoadingOverlayProvider } from "../ui_components/LoadingOverlayContext";
import LoadingOverlay from "../ui_components/LoadingOverlay";
import "./style.css";
import { flexbox } from "@mui/system";

const decorators = [
  (Story) => (
    <div className="fullscreen_map">
      <MapComponentsProvider>
        <LoadingOverlayProvider>
          <LoadingOverlay></LoadingOverlay>

          <Story />

{/*
          <div
            style={{
              position: "relative",
              zIndex: 10000,
              display: "flex",
              flexWrap: "wrap",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents:'none',
            }}
          >
            <MlUseMapDebugger
              mapId="map_1"
              key={"mapDebugger_asdasd"}
              filter={{ matchLayerIds: "Order-" }}
            />
            <MlUseMapDebugger mapId="map_1" key="sdasd1000" watch={{ viewport: true }} />
            <MlUseMapDebugger mapId="map_1" key="asdasd1000" filter={{ includeBaseLayers: true }} />
            {[...Array(200).keys()].map((id) => (
              <MlUseMapDebugger
                mapId="map_1"
                key={"mapDebugger_" + id}
                filter={{ matchLayerIds: "MlWmsLayer" }}
              />
            ))}
          </div>
            */}
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
