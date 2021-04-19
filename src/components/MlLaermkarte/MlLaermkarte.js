import React, { useRef, useState, useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";
import maplibregl from "maplibre-gl";

import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import * as d3 from "d3";
import * as turf from "@turf/turf";

const DATA_URL = "/assets/laerm.json"; // eslint-disable-line

function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

const route = [
  [7.1579, 50.681],
  [7.0577, 50.7621],
];
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
  ambientLight,
});

const material = {
  ambient: 0.8,
  //diffuse: 0.5,
  //shininess: 20,
  specularColor: [51, 51, 51],
};

const colorRange = [
  [1, 152, 189, 80],
  [73, 227, 206, 90],
  [216, 254, 181, 100],
  [254, 237, 177, 110],
  [254, 173, 84, 120],
  [209, 55, 78, 150],
];
//const colorRange = [
//  [1, 152, 189],
//  [73, 227, 206],
//  [216, 254, 181],
//  [254, 237, 177],
//  [254, 173, 84],
//  [209, 55, 78],
//];

const MlLaermkarte = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  const initializedRef = useRef(false);
  const mapContext = useContext(MapContext);
  const layerName = "deckgl-layer";

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    return () => {
      if (mapContext.map.getLayer(layerName)) {
        mapContext.map.removeLayer(layerName);
        initializedRef.current = false;
      }
    };
  });

  useEffect(() => {
    if (
      !mapContext.mapExists() ||
      (mapContext.mapExists() && initializedRef.current)
    )
      return;

    initializedRef.current = true;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it

    //    mapContext
    //      .getMap(props.mapId)
    //      .setCenter([7.132122000552613, 50.716405378037706]);

    d3.json(DATA_URL).then((response) => {
      console.log("Add deckgl Layer");
      console.log(response);
      let data = response.features.map((f) => {
        let bb = turf.bbox(f);
        let points = turf.randomPoint(30, { bbox: bb });
        turf.featureEach(points, function (point) {
          point.properties.dba = f.properties.dba;
        });
        var options = { gridType: "points", property: "dba" };
        let pointGrid = turf.interpolate(points, 0.05, options);

        return turf.pointsWithinPolygon(pointGrid, f).features;
      });

      data = turf.featureCollection([].concat.apply([], data));
      //downloadObjectAsJson(data);
      mapContext.map.addLayer(
        new MapboxLayer({
          effects: [lightingEffect],
          id: layerName,
          //type: ScatterplotLayer,
          //data: [
          //  { position: [7.0851268, 50.73884], color: [255, 0, 0], radius: 1000 },
          //],
          //getPosition: (d) => d.position,
          //getRadius: (d) => d.radius,
          //opacity: 0.3,
          type: HexagonLayer,
          colorRange: colorRange,
          coverage: 1,
          data: data.features,
          elevationRange: [30, 75],
          elevationScale: 1,
          extruded: true,
          getPosition: (d) => {
            return d.geometry.coordinates;
          },
          pickable: true,
          radius: 30,
          upperPercentile: 100,
          material,
          getColorValue: (points) => {
            let elVal = points.reduce((acc, point) => {
              return acc < point.properties.dba ? point.properties.dba : acc;
            }, -Infinity);
            return Math.round(elVal);
          },
          getElevationValue: (points) => {
            let elVal = points.reduce((acc, point) => {
              return acc < point.properties.dba ? point.properties.dba : acc;
            }, -Infinity);
            return Math.round(elVal);
          },
        }),
        "water_name_line"
      );

      // move camera along line
      var animationDuration = 80000;
      var cameraAltitude = 4000;
      var kmPerStep = 0.01;
      var routeDistance = turf.lineDistance(turf.lineString(route));

      var step = 1;
      var zoom = 18;
      var zoomSteps = 0.1;

      var timer = window.setInterval(function () {
        var alongRoute = turf.along(turf.lineString(route), step * kmPerStep)
          .geometry.coordinates;

        if (step * kmPerStep < routeDistance) {
          //data.features[0].geometry.coordinates.push(coordinates[i]);
          //map.getSource("trace").setData(data);
          mapContext.map.panTo(alongRoute);
          step++;
        } else if (zoom > 11) {
          zoom = zoom - zoomSteps;
          mapContext.map.setZoom(zoom);
        } else {
          window.clearInterval(timer);
        }
      }, 70);
    });
    mapContext.map.setCenter(route[0]);
    mapContext.map.setZoom(18);
    mapContext.map.setPitch(75);
  }, [mapContext.mapIds, mapContext]);

  return <></>;
};

export default MlLaermkarte;
