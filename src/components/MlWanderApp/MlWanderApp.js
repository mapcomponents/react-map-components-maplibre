import React, { useRef, useState, useEffect, useContext } from "react";
import { MapContext } from "react-map-components-core";
import maplibregl from "maplibre-gl";
import TopToolbar from "../../ui_components/TopToolbar";
import MlHillshadeLayer from "../MlHillshadeLayer/MlHillshadeLayer";
import MlLayerMagnify from "../MlLayerMagnify/MlLayerMagnify";
import MlWmsLayerMulti from "../MlWmsLayerMulti/MlWmsLayerMulti";
import MlGPXViewer from "../MlGPXViewer/MlGPXViewer";
import GeoJsonProvider from "../MlGPXViewer/util/GeoJsonProvider";
import MlSpatialElevationProfile from "../MlSpatialElevationProfile/MlSpatialElevationProfile";

const MlWanderApp = (props) => {
  const wmsLayerMapId = props.wmsLayerMapId;

  return (
    <>
      <TopToolbar>
        <MlWmsLayerMulti
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
      <MlLayerMagnify map1Id="map_1" map2Id="map_2" magnifierRadius={20} />
      <MlHillshadeLayer />
    </>
  );
};

export default MlWanderApp;
