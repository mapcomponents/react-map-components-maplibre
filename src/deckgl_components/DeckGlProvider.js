import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { DeckGlContextProvider } from "./DeckGlContext";
import { Deck } from "@deck.gl/core";

import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { MapboxLayer } from "@deck.gl/mapbox";
import { MapContext } from "react-map-components-core";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

//const pointLight1 = new PointLight({
//  color: [255, 255, 255],
//  intensity: 0.8,
//  position: [-0.144528, 49.739968, 80000],
//});
//
//const pointLight2 = new PointLight({
//  color: [255, 255, 255],
//  intensity: 0.8,
//  position: [-3.807751, 54.104682, 8000],
//});

const lightingEffect = new LightingEffect({
  ambientLight,
});

const DeckGlProvider = ({ children }) => {
  const mapContext = useContext(MapContext);

  const [deckGl, setDeckGl] = useState(null);
  const layerRef = useState(null);

  useEffect(() => {
    if (!mapContext.map) return;

    console.log("init deckgl");
    let deck = new Deck({
      gl: mapContext.map.painter.context.gl,
      layers: [],
    });

    window.deck = deck;

    layerRef.current = new MapboxLayer({
      id: "deckgl-layer",
      deck: deck,
      effects: [lightingEffect],
    });

    mapContext.map.addLayer(layerRef.current, "poi_label");

    setDeckGl(deck);
  }, [mapContext.map]);

  const value = {
    deckGl: deckGl,
    setDeckGl: setDeckGl,
    maplibreLayer: layerRef.current,
  };

  return <DeckGlContextProvider value={value}>{children}</DeckGlContextProvider>;
};

DeckGlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeckGlProvider;
