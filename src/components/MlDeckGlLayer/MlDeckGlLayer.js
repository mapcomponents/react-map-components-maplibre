import React, { useRef, useContext, useEffect, useState } from "react";
import { MapContext } from "react-map-components-core";

import Button from "@material-ui/core/Button";
import * as d3 from "d3";

import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { MapboxLayer } from "@deck.gl/mapbox";

// Source data CSV
const DATA_URL = "/assets/verspaetungen_gueterverkehr_2016.csv"; // eslint-disable-line
//"https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"; // eslint-disable-line

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
  pointLight1,
  pointLight2,
});

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

/**
 * MlDeckGlLayer adds deck.gl hexagonlayer to the maplibre-gl instance.
 */
const MlDeckGlLayer = ({ init, onDone, mapId }) => {
  const mapContext = useContext(MapContext);
  const [showLayer, setShowLayer] = useState(true);
  const layerName = "deckgl-layer";
  const initializedRef = useRef(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof init === "function") {
      init();
    }

    return () => {
      if (mapRef.current) {
        if (mapRef.current.style && mapRef.current.getLayer(layerName)) {
          mapRef.current.removeLayer(layerName);
        }
        if (mapRef.current.style && mapRef.current.getSource(layerName)) {
          mapRef.current.removeSource(layerName);
        }

        mapRef.current = null;
      }
    };
  }, []);

  const mapIsReady = () => {};

  useEffect(() => {
    if (!mapRef.current) return;

    // toggle layer visibility by changing the layout object's visibility property
    if (showLayer) {
      mapRef.current.setLayoutProperty(layerName, "visibility", "visible");
    } else {
      mapRef.current.setLayoutProperty(layerName, "visibility", "none");
    }
  }, [showLayer]);

  useEffect(() => {
    if (mapContext.getMap(mapId)) {
      if (initializedRef.current) return;

      initializedRef.current = true;
      mapRef.current = mapContext.getMap(mapId);

      d3.csv(DATA_URL).then((response) => {
        const data = response.map((d) => {
          return {
            coordinates: [Number(d.LON), Number(d.LAT)],
            minutes: d.Verspätungsminuten,
          };
        });

        let mapBoxLayer = new MapboxLayer({
          effects: [lightingEffect],
          id: layerName,
          //type: ScatterplotLayer,
          //data: [
          //  { position: [7.0851268, 50.73884], color: [255, 0, 0], radius: 1000 },
          //],
          //getPosition: (d) => d.position,
          //getColor: (d) => d.color,
          //getRadius: (d) => d.radius,
          //opacity: 0.3,
          type: HexagonLayer,
          colorRange: colorRange,
          coverage: 1,
          data: data,
          elevationRange: [0, 3000],
          elevationScale: data && data.length ? 50 : 0,
          extruded: true,
          getPosition: (d) => d.coordinates,
          pickable: true,
          radius: 10000,
          upperPercentile: 100,
          material,
          autoHighlight: true,
          transitions: {
            elevationScale: 3000,
          },
        });
        window.mapBoxLayer = mapBoxLayer;

        mapRef.current.addLayer(mapBoxLayer, "water-name-lakeline");
        if (typeof onDone === "function") {
          onDone();
        }
      });
      mapRef.current.setZoom(6);
      mapRef.current.setPitch(45);
      mapRef.current.setCenter({ lng: 10.388616936080325, lat: 50.98176525739561 });
    }
  }, [mapContext.map]);

  return (
    <>
      <Button
        color="primary"
        variant={showLayer ? "contained" : "outlined"}
        onClick={() => setShowLayer(!showLayer)}
      >
        DB Verspätungen im Güterverkehr 2016 (deck.gl)
      </Button>
    </>
  );
};

export default MlDeckGlLayer;
