import React, { useState, useRef, useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";
import { v4 as uuidv4 } from "uuid";

import { ReactComponent as RotateRightIcon } from "./assets/rotate_right.svg";
import { ReactComponent as RotateLeftIcon } from "./assets/rotate_left.svg";
import { ReactComponent as NeedleIcon } from "./assets/needle.svg";

import styled from "@emotion/styled";

const NeedleButton = styled.div`
  width: 40%;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
  path {
    filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2)) !important;
  }
  &:hover path {
    filter: drop-shadow(0px 0px 13px rgba(255, 255, 255, 0.1)) !important;
  }
  path:nth-child(2) {
    fill: #343434 !important;
  }
  &:hover path:nth-child(2) {
    fill: #434343 !important;
  }
  path:nth-child(1) {
    fill: #e90318 !important;
  }
  &:hover path:nth-child(1) {
    fill: #fb4052 !important;
  }
`;
const NeedleContainer = styled.div`
  pointer-events: none;
  display: flex;
  z-index: 1002;
  position: absolute;
  align-items: center;

  margin-left: -30%;
  path:nth-child(2) {
  }
  svg g {
    transform: translate(-76.7053, -29.7727) scale(2, 1);
  }
  svg {
    z-index: 9990;
    height: 150px;
    width: 200px;
  }
`;
const RotateButton = styled.div`
  width: 30%;
  margin-top: 14px;
  z-index: 999;
  display: flex;

  svg:hover {
    cursor: pointer;
  }
  svg:hover path {
    fill: #ececec !important;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1)) !important;
  }
  path {
    fill: #bbb !important;
  }
  svg {
    transform: scale(0.6);
    z-index: 9990;
    height: 172px;
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

  const [bearing, setBearing] = useState(0);

  useEffect(() => {
    let _componentId = componentId.current;

    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom

      if (mapRef.current) {
        mapRef.current.cleanup(_componentId);
        mapRef.current = undefined;
      }
      initializedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;
    initializedRef.current = true;
    mapRef.current = mapContext.getMap(props.mapId);

    mapRef.current.on(
      "rotate",
      function () {
        setBearing(Math.round(mapRef.current.getBearing()));
      },
      componentId.current
    );
    setBearing(Math.round(mapRef.current.getBearing()));
  }, [mapContext.mapIds, mapContext, props.mapId]);

  return (
    <>
      <div
        style={{
          zIndex: 1000,
          top: 0,
          position: "absolute",
        }}
      >
        <div
          style={{
            position: "absolute",
            border: "12px solid #bcbcbc",
            backgroundColor: "#717171",
            background: "radial-gradient(#717171, #414141)",
            height: "200px",
            width: "200px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            transform: "scale(0.2) translateX(-448px) translateY(-448px)",
          }}
        >
          <RotateButton
            onClick={() => {
              let bearing = Math.round(mapRef.current?.getBearing());
              let rest = Math.round(bearing % 90);
              if (bearing > 0) {
                rest = 90 - rest;
              }
              if (rest === 0) {
                rest = 90;
              }
              mapRef.current?.setBearing(Math.round(bearing + Math.abs(rest)));
            }}
          >
            <RotateRightIcon></RotateRightIcon>
          </RotateButton>
          <NeedleButton
            onClick={() => {
              mapRef.current?.setBearing(0);
            }}
          >
            <NeedleContainer
              style={{
                transform: "rotate(" + bearing + "deg)",
              }}
            >
              <NeedleIcon />
            </NeedleContainer>
          </NeedleButton>
          <RotateButton>
            <RotateLeftIcon
              onClick={() => {
                let bearing = Math.round(mapRef.current?.getBearing());
                let rest = Math.round(bearing % 90);
                if (bearing < 0) {
                  rest = 90 + rest;
                }
                if (rest === 0) {
                  rest = 90;
                }
                mapRef.current?.setBearing(Math.round(bearing - Math.abs(rest)));
              }}
            ></RotateLeftIcon>
          </RotateButton>
        </div>
      </div>
    </>
  );
};

export default MlNavigationCompass;
