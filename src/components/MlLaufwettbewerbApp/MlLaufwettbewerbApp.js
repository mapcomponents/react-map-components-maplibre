import React, { useEffect, useContext } from "react";

import MapLibreMap from "../MapLibreMap/MapLibreMap";
import { MapContext } from "react-map-components-core";
import { Grid } from "@material-ui/core";
import route from "./assets/route.json";

const MlLaufwettbewerbApp = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  useEffect(() => {
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    mapContext.getMap(props.mapId).setZoom(6.1);
    mapContext.getMap(props.mapId).setPitch(45);
    mapContext.getMap(props.mapId).setBearing(-42);
    mapContext
      .getMap(props.mapId)
      .setCenter({ lng: 9.704506831580716, lat: 50.32884252053037 });

    mapContext.getMap(props.mapId).addLayer({
      id: "route-layer",
      source: {
        type: "geojson",
        data: route,
      },
      type: "line",
      paint: {
        "line-color": "rgb(100,100,200)",
        "line-width": 10,
      },
    });
  }, [mapContext.mapIds, mapContext]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={8} className="mlMap">
          <MapLibreMap
            options={{
              zoom: 14.5,
              style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
              center: [7.0851268, 50.73884],
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
};

export default MlLaufwettbewerbApp;
