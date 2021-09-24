import React from "react";
import TopToolbar from "../../ui_components/TopToolbar";
import MlHillshadeLayer from "../../lab/MlHillshadeLayer/MlHillshadeLayer";
import MlLayerMagnify from "../MlLayerMagnify/MlLayerMagnify";
import MlWmsLayer from "../MlWmsLayer/MlWmsLayer";
import MlGPXViewer from "../MlGPXViewer/MlGPXViewer";
import GeoJsonProvider from "../MlGPXViewer/util/GeoJsonProvider";

const MlWanderApp = (props) => {
  return (
    <>
      <TopToolbar>
        <MlWmsLayer
          url="https://www.wms.nrw.de/geobasis/wms_nw_dop?language=ger&bbox={bbox-epsg-3857}"
          layer="nw_dop_rgb"
          sourceOptions={{
            maxzoom: 24,
          }}
          mapId="map_2"
        />
      </TopToolbar>

      <GeoJsonProvider>
        <MlGPXViewer mapId="map_1" />
      </GeoJsonProvider>
      <MlLayerMagnify map1Id="map_1" map2Id="map_2" magnifierRadius={60} />
      <MlHillshadeLayer />
    </>
  );
};

export default MlWanderApp;
