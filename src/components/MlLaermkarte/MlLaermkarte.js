import React, { useRef, useState, useEffect, useContext } from "react";

import { MapContext, SimpleDataContext } from "react-map-components-core";
import DeckGlContext from "../../deckgl_components/DeckGlContext";

import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { ScatterplotLayer } from "@deck.gl/layers";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

import TopToolbar from "../../ui_components/TopToolbar";

//import Tooltip from "@material-ui/core/Tooltip";
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

const MlLaermkarte = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  const initializedRef = useRef(false);
  const layerRef = useRef(null);
  const mapContext = useContext(MapContext);
  const deckGlContext = useContext(DeckGlContext);
  const simpleDataContext = useContext(SimpleDataContext);
  const layerName = "deckgl-layer";
  const [layerOpacity, setLayerOpacity] = useState(50);
  const [radius, setRadius] = useState(16);

  const deckLayerProps = {
    id: layerName,
    onClick: (obj) => {
      console.log(obj);
      //mapContext.map.zoomIn();
      //mapContext.map.panTo(obj.coordinate);
      //setRadius(radius - 5);
    },
    type: HexagonLayer,
    colorRange: [
      [1, 152, 189, 80],
      [73, 227, 206, 90],
      [216, 254, 181, 100],
      [254, 237, 177, 110],
      [254, 173, 84, 120],
      [209, 55, 78, 150],
    ],
    coverage: 0.9,
    elevationRange: [30, 75],
    elevationScale: 0.3,
    extruded: true,
    autoHighlight: true,
    getPosition: (d) => {
      return d.geometry.coordinates;
    },
    pickable: true,
    radius: 20,
    upperPercentile: 100,
    material: {
      ambient: 0.8,
      diffuse: 0.5,
      shininess: 20,
      specularColor: [51, 51, 51],
    },
    transitions: {
      //elevationScale: 3000,
      //getElevationValue: 3000,
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
  };

  useEffect(() => {
    if (!deckGlContext.deckGl) return;

    console.log("update props");
    deckGlContext.deckGl.setProps({
      layers: [
        new HexagonLayer({
          ...deckLayerProps,
          data: simpleDataContext.data.features,
          radius: radius,
        }),
      ],
    });
  }, [radius]);

  useEffect(() => {
    if (!deckGlContext.deckGl) return;

    deckGlContext.deckGl.setProps({
      layers: [
        new HexagonLayer({
          ...deckLayerProps,
          data: simpleDataContext.data.features,
          colorRange: [
            [1, 152, 189, Math.round(80 * layerOpacity)],
            [73, 227, 206, Math.round(90 * layerOpacity)],
            [216, 254, 181, Math.round(100 * layerOpacity)],
            [254, 237, 177, Math.round(110 * layerOpacity)],
            [254, 173, 84, Math.round(120 * layerOpacity)],
            [209, 55, 78, Math.round(150 * layerOpacity)],
          ],
        }),
      ],
    });
  }, [layerOpacity]);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    return () => {
      if (deckGlContext.deckGl) {
        deckGlContext.deckGl.setProps({
          layers: [],
        });
        initializedRef.current = false;
      }
    };
  }, []);

  useEffect(() => {
    if (
      !simpleDataContext.data ||
      !mapContext.mapExists() ||
      !deckGlContext.deckGl ||
      (deckGlContext.deckGl &&
        mapContext.mapExists() &&
        simpleDataContext.data &&
        initializedRef.current)
    )
      return;

    initializedRef.current = true;
    console.log(simpleDataContext.data);
    console.log(mapContext.getMap());
    console.log("deckGlLayer am Start");

    window.hexLayer = deckGlContext.maplibreLayer;

    deckGlContext.deckGl.setProps({
      layers: [
        new HexagonLayer({
          ...deckLayerProps,
          data: simpleDataContext.data.features,
          radius: radius,
        }),
      ],
    });
  }, [
    mapContext.mapIds,
    mapContext,
    deckGlContext.deckGl,
    radius,
    setRadius,
    simpleDataContext.data,
  ]);

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
          step={3}
          marks
          min={10}
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
    </>
  );
};

export default MlLaermkarte;
