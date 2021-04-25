import React, { useRef, useState, useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";
import maplibregl from "maplibre-gl";

import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { Deck } from "@deck.gl/core";
import { ScatterplotLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import TopToolbar from "../../ui_components/TopToolbar";

import Tooltip from "@material-ui/core/Tooltip";

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

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
  [7.09222, 50.725055],
  //[7.1579, 50.681],
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
  const layerRef = useRef(null);
  const mapContext = useContext(MapContext);
  const layerName = "deckgl-layer";
  const [layerOpacity, setLayerOpacity] = useState(50);
  const [radius, setRadius] = useState(30);
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    if (!layerRef.current) return;

    layerRef.current.setProps({
      radius: radius,
    });
  }, [radius]);

  useEffect(() => {
    if (!layerRef.current) return;

    //console.log(layerRef.current);
    //layerRef.current.setProps({
    //  colorRange: [
    //    [1, 152, 189, 80],
    //    [73, 227, 206, 90],
    //    [216, 254, 181, 100],
    //    [254, 237, 177, 110],
    //    [254, 173, 84, 120],
    //    [50, 55, 78, 150],
    //  ],
    //});

    layerRef.current.setProps({
      colorRange: [
        [1, 152, 189, Math.round(80 * layerOpacity)],
        [73, 227, 206, Math.round(90 * layerOpacity)],
        [216, 254, 181, Math.round(100 * layerOpacity)],
        [254, 237, 177, Math.round(110 * layerOpacity)],
        [254, 173, 84, Math.round(120 * layerOpacity)],
        [209, 55, 78, Math.round(150 * layerOpacity)],
      ],
    });
  }, [layerOpacity]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    return () => {
      if (mapContext.map.getLayer(layerName)) {
        console.log("REMOVE LAYER");
        mapContext.map.removeLayer(layerName);
        initializedRef.current = false;
      }
    };
  }, []);

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
      let data = response.features.map((f, idx) => {
        //if (idx > 10) return;

        let bb = turf.bbox(f);
        let points = turf.pointGrid(bb, 0.01, { units: "kilometers", mask: f });
        //console.log(points);
        console.log("loop");

        turf.featureEach(points, function (point) {
          point.properties.dba = f.properties.dba;
        });

        return points.features;
      });

      data = turf.featureCollection(
        [].concat.apply(
          [],
          data.filter((el) => (el ? el : 0))
        )
      );
      console.log(data);
      downloadObjectAsJson(data);
      layerRef.current = new MapboxLayer({
        effects: [lightingEffect],
        id: layerName,
        type: HexagonLayer,
        //type: ScatterplotLayer,
        //data: [
        //  { position: [7.0851268, 50.73884], color: [255, 0, 0], radius: 1000 },
        //],
        //getPosition: (d) => d.position,
        //getRadius: (d) => d.radius,
        //opacity: 0.3,
        //onHover: (obj) => console.log(obj),
        onClick: (obj) => {
          console.log(obj);
          //mapContext.map.zoomIn();
          //mapContext.map.panTo(obj.coordinate);
          setRadius(radius - 5);
        },
        bearing: 10,
        colorRange: colorRange,
        coverage: 0.9,
        data: data.features,
        elevationRange: [30, 75],
        elevationScale: 0.5,
        extruded: true,
        autoHighlight: true,
        getPosition: (d) => {
          return d.geometry.coordinates;
        },
        pickable: true,
        radius: radius,
        upperPercentile: 100,
        material,
        transitions: {
          elevationScale: 3000,
          getElevationValue: 3000,
        },
        getColorValue: (points) => {
          let elVal = points.reduce((acc, point) => {
            if (!point.properties && point.source.properties)
              return acc < point.source.properties.dba
                ? point.source.properties.dba
                : acc;
            return acc < point.properties.dba ? point.properties.dba : acc;
          }, -Infinity);
          return Math.round(elVal);
        },
        getElevationValue: (points) => {
          let elVal = points.reduce((acc, point) => {
            if (!point.properties && point.source.properties)
              return acc < point.source.properties.dba
                ? point.source.properties.dba
                : acc;
            return acc < point.properties.dba ? point.properties.dba : acc;
          }, -Infinity);
          return Math.round(elVal);
        },
      });

      window.hexLayer = layerRef.current;
      //downloadObjectAsJson(data);
      mapContext.map.addLayer(layerRef.current, "poi_label");

      // move camera along line
      var animationDuration = 80000;
      var cameraAltitude = 4000;
      var kmPerStep = 0.05;
      var routeDistance = turf.lineDistance(turf.lineString(route));

      var step = 1;
      var zoom = 18;
      var zoomSteps = 0.04;

      //var timer = window.setInterval(function () {
      //  var alongRoute = turf.along(turf.lineString(route), step * kmPerStep)
      //    .geometry.coordinates;

      //  if (step * kmPerStep < routeDistance) {
      //    //data.features[0].geometry.coordinates.push(coordinates[i]);
      //    //map.getSource("trace").setData(data);
      //    mapContext.map.panTo(alongRoute);
      //    step++;
      //  } else if (zoom > 11) {
      //    zoom = zoom - zoomSteps;
      //    mapContext.map.setZoom(zoom);
      //  } else {
      //    window.clearInterval(timer);
      //  }
      //}, 70);
    });
    mapContext.map.setCenter(route[0]);
    mapContext.map.setZoom(15);
    mapContext.map.setPitch(75);
  }, [mapContext.mapIds, mapContext, radius, setRadius]);

  return (
    <>
      <TopToolbar
        style={{
          alignItems: "flex-end",
        }}
      >
        <Typography
          id="discrete-slider"
          style={{ color: "#121212", marginRight: "5px" }}
        >
          Radius
        </Typography>
        <Slider
          value={radius}
          onChange={(ev, value) => {
            //console.log(value);
            setRadius(value);
          }}
          getAriaValueText={(value) => value}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          ValueLabelComponent={ValueLabelComponent}
          step={2}
          marks
          min={5}
          max={70}
          style={{ marginRight: "10px", maxWidth: "200px" }}
        />
        <Typography
          id="discrete-slider"
          style={{ color: "#121212", marginRight: "5px" }}
        >
          Deckkraft
        </Typography>
        <Slider
          value={layerOpacity}
          onChange={(ev, value) => {
            //console.log(value);
            setLayerOpacity(value);
          }}
          getAriaValueText={(value) => value}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          ValueLabelComponent={ValueLabelComponent}
          step={0.02}
          marks
          min={0.01}
          max={1.0}
          style={{ maxWidth: "200px" }}
        />
      </TopToolbar>
      {tooltipContent}
    </>
  );
};

export default MlLaermkarte;
