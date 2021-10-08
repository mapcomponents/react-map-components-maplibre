import React, { useState, useRef, useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as RotateRightIcon } from "./assets/rotate_right.svg";
import { ReactComponent as RotateLeftIcon } from "./assets/rotate_left.svg";

import "./assets/style.scss";

import styled from "@emotion/styled";
import { css } from "@emotion/css";

const Compassborder = styled.div`
  display: block;
`;

const Compass = styled.div`
  display: block;
  &:hover ${Compassborder}: {
    background-color: white;
    background: radial-gradient(#fff, #fff);
  }
`;

const RotateButtonContainer = styled.div`
  position: absolute;
  top: 0;
  margin-top: -9px;
  width: 40%;
  z-index: 10001;

  &:hover {
    cursor: pointer;
  }
  &:hover path {
    fill: #fff !important;
  }
  path {
    fill: #7a7a7a !important;
  }
  svg {
    transform: scale(0.45);
    z-index: 9990;
    position: absolute;
  }
`;

const MlNavigationCompass = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  const mapContext = useContext(MapContext);

  const initializedRef = useRef(false);
  const mapRef = useRef(undefined);
  const componentId = useRef(
    (props.idPrefix ? props.idPrefix : "MlNavigationCompass-") + uuidv4()
  );

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
      // check for the existence of map.style before calling getLayer or getSource

      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    console.log("INITIALISIEREN");
    console.log(mapContext.mapExists(props.mapId));
    console.log(initializedRef.current);
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    mapRef.current.on(
      "rotate",
      function () {
        console.log("A rotate event occurred.");
        console.log(mapRef.current.getBearing());
        setRotation(Math.round(mapRef.current.getBearing()));
      },
      componentId.current
    );
    mapRef.current.setCenter([7.132122000552613, 50.716405378037706]);
    console.log(componentId.current);
  }, [mapContext.mapIds, mapContext, props.mapId]);

  return (
    <>
      <div className="MlNavigationCompass__container">
        <Compassborder
          className={
            "MlNavigationCompass__border " +
            css({
              border: "15px solid #a1a1a1",
              backgroundColor: "#717171",
              background: "radial-gradient(#353535, #717171)",
              height: "254px",
              width: "254px",
              "&:before": {
                backgroundColor: "#1a1a1a",
              },
              "&:hover": {
                background: "radial-gradient(#585858, #717171)",
              },
            })
          }
        >
          <RotateButtonContainer
            onClick={() => {
              let bearing = Math.round(mapRef.current?.getBearing());
              let rest = Math.round(bearing % 90);
              console.log(bearing + " " + rest);
              if (bearing > 0) {
                rest = 90 - rest;
              }
              if (rest === 0) {
                rest = 90;
              }
              mapRef.current?.setBearing(Math.round(bearing + Math.abs(rest)));
            }}
            style={{ cursor: "pointer", marginLeft: "-10px", left: 0 }}
          >
            <RotateRightIcon></RotateRightIcon>
          </RotateButtonContainer>
          <RotateButtonContainer
            onClick={() => {
              let bearing = Math.round(mapRef.current?.getBearing());
              let rest = Math.round(bearing % 90);
              console.log(bearing + " " + rest);
              if (bearing < 0) {
                rest = 90 + rest;
              }
              if (rest === 0) {
                rest = 90;
              }
              mapRef.current?.setBearing(Math.round(bearing - Math.abs(rest)));
            }}
            style={{ cursor: "pointer", marginRight: "-10px", right: 0 }}
          >
            <RotateLeftIcon></RotateLeftIcon>
          </RotateButtonContainer>
          <Compass
            onClick={() => {
              mapRef.current?.setBearing(0);
            }}
            className={
              "MlNavigationCompass__compass " +
              css({
                transform: "rotate(" + rotation + "deg)",
                zIndex: 10000,
                "&:hover": {
                  cursor: "pointer",
                },
                "&:hover:after": {
                  opacity: 1,
                },
                "&:hover:before": {
                  opacity: 1,
                },
                "&:after": {
                  borderLeft: "40px solid transparent",
                  borderTop: "127px solid #131313",
                  borderRight: "40px solid transparent",
                  opacity: 0.9,
                },
                "&:before": {
                  borderLeft: "40px solid transparent",
                  borderBottom: "127px solid #ff0000",
                  borderRight: "40px solid transparent",
                  opacity: 0.9,
                },
              })
            }
          >
            <div className="MlNavigationCompass__compass-center"></div>
          </Compass>
        </Compassborder>
      </div>
    </>
  );
};

export default MlNavigationCompass;
