import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { ReactComponent as RotateRightIcon } from "./assets/rotate_right.svg";
import { ReactComponent as RotateLeftIcon } from "./assets/rotate_left.svg";
import { ReactComponent as NeedleIcon } from "./assets/needle.svg";

import styled from "@emotion/styled";
import { css } from "@emotion/css";
import useMap from "../../hooks/useMap";

const NeedleButton = styled.div`
  width: 40%;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
  path {
    filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2));
  }
  &:hover path {
    filter: drop-shadow(0px 0px 13px rgba(255, 255, 255, 0.1));
  }
  path:nth-of-type(2) {
    fill: #343434;
  }
  &:hover path:nth-of-type(2) {
    fill: #434343;
  }
  path:nth-of-type(1) {
    fill: #e90318;
  }
  &:hover path:nth-of-type(1) {
    fill: #fb4052;
  }
`;
const NeedleContainer = styled.div`
  pointer-events: none;
  display: flex;
  z-index: 1002;
  position: absolute;
  align-items: center;

  margin-left: -30%;
  path:nth-of-type(2) {
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
    fill: #ececec;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
  }
  path {
    fill: #bbb;
  }
  svg {
    transform: scale(0.6);
    z-index: 9990;
    height: 172px;
  }
`;

interface MlNavigationCompassProps {
  mapId?: string;
  insertBeforeLayer?: string;
  style?: any;
  backgroundStyle?: any;
  needleStyle?: any;
  rotateRightStyle?: any;
  rotateLeftStyle?: any;
}
/**
 * Navigation component that displays a compass component which indicates the current oriantation of the map it is registered for and offers controls to turn the bearing 90° left/right or reset north to point up.
 *
 * All style props are applied using @emotion/css to allow more complex css selectors.
 *
 * @component
 */
const MlNavigationCompass = (props: MlNavigationCompassProps) => {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });
  const [bearing, setBearing] = useState(0);

  useEffect(() => {
    if (!mapHook.map) return;

    let _updateBearing = () => {
      if (!mapHook.map?.map?.getBearing) return;
      setBearing(Math.round(mapHook.map.map.getBearing()));
    };

    mapHook.map.on("rotate", _updateBearing, mapHook.componentId);
    _updateBearing();

    return () => {
      mapHook.map?.map.off("rotate", _updateBearing);
    };
  }, [mapHook.map, props.mapId]);

  return (
    <>
      <div
        className={css({
          zIndex: 1000,
          top: 0,
          position: "absolute",
          ...props.style,
        })}
      >
        <div
          className={css({
            position: "absolute",
            border: "10px solid #bcbcbc",
            backgroundColor: "#717171",
            background: "radial-gradient(#717171, #414141)",
            height: "200px",
            width: "200px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            transform: "scale(0.2) translateX(-448px) translateY(-448px)",
            ...props.backgroundStyle,
          })}
        >
          <RotateButton className={css({ ...props.rotateRightStyle })}>
            <RotateRightIcon
              onClick={() => {
                if(!mapHook.map)return;

                let bearing = Math.round(mapHook.map.map.getBearing());
                let rest = Math.round(bearing % 90);
                if (bearing > 0) {
                  rest = 90 - rest;
                }
                if (rest === 0) {
                  rest = 90;
                }
                mapHook.map.map.setBearing(Math.round(bearing + Math.abs(rest)));
              }}
            ></RotateRightIcon>
          </RotateButton>
          <NeedleButton
            className={css({ ...props.needleStyle })}
            onClick={() => {
              mapHook.map?.map.setBearing(0);
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
          <RotateButton className={css({ ...props.rotateLeftStyle })}>
            <RotateLeftIcon
              onClick={() => {
                if(!mapHook.map)return;

                let bearing = Math.round(mapHook.map.map.getBearing());
                let rest = Math.round(bearing % 90);
                if (bearing < 0) {
                  rest = 90 + rest;
                }
                if (rest === 0) {
                  rest = 90;
                }
                mapHook.map.map.setBearing(Math.round(bearing - Math.abs(rest)));
              }}
            ></RotateLeftIcon>
          </RotateButton>
        </div>
      </div>
    </>
  );
};

MlNavigationCompass.propTypes = {
  /**
   * Component id prefix
   */
  idPrefix: PropTypes.string,
  /**
   * Style object to adjust css definitions of the component.
   */
  style: PropTypes.object,
  /**
   * Style object to adjust css definitions of the background.
   */
  backgroundStyle: PropTypes.object,
  /**
   * Style object to adjust css definitions of the compass needle.
   */
  needleStyle: PropTypes.object,
  /**
   * Style object to adjust css definitions of the rotate right button.
   */
  rotateRightStyle: PropTypes.object,
  /**
   * Style object to adjust css definitions of the rotate left button.
   */
  rotateLeftStyle: PropTypes.object,
};

export default MlNavigationCompass;
