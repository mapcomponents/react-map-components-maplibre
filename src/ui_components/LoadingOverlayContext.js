import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { MapContext } from "@mapcomponents/react-core";

const LoadingOverlayContext = React.createContext({});
const LoadingOverlayContextProvider = LoadingOverlayContext.Provider;

const LoadingOverlayProvider = ({ children }) => {
  const mapContext = useContext(MapContext);

  const [controlled, setControlled] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fadeoutAnimation, setFadeoutAnimation] = useState(false);
  const mapJobsRef = useRef({});
  const [checkIdleTrigger, setCheckIdleTrigger] = useState(0);

  const createOnMapIdleFunction = (mapId) => () => {
    mapJobsRef.current[mapId] = true;
    setCheckIdleTrigger(Math.random());
  };

  const fadeOut = () => {
    // add another setTimeout as MapLibre appear to fire idle before all tiles have rendered
    setTimeout(() => {
      setFadeoutAnimation(true);
      setTimeout(() => {
        setVisible(false);
      }, 1700);
    }, 900);
  };

  useEffect(() => {
    if (!mapContext.map || controlled) return;

    for (var key in mapJobsRef.current) {
      if (!mapJobsRef.current[key]) return;
    }

    fadeOut();
  }, [checkIdleTrigger, controlled, mapContext]);

  useEffect(() => {
    for (var i = 0, len = mapContext.mapIds.length; i < len; i++) {
      if (Object.keys(mapJobsRef.current).indexOf(mapContext.mapIds[i]) === -1) {
        let mapId = mapContext.mapIds[i] + "";

        if (mapContext.getMap(mapId)) {
          mapJobsRef.current[mapId] = false;

          mapContext.getMap(mapId).on("idle", createOnMapIdleFunction(mapId));
        }
      }
    }
  }, [mapContext, mapContext.mapIds]);

  useEffect(() => {
    if (loadingDone) {
      fadeOut();
    }
  }, [loadingDone]);

  const value = {
    setControlled,
    controlled,
    visible,
    fadeoutAnimation,
    setLoadingDone,
  };

  return (
    <LoadingOverlayContextProvider value={value}>
      {children}
    </LoadingOverlayContextProvider>
  );
};

LoadingOverlayProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LoadingOverlayContext, LoadingOverlayProvider };
