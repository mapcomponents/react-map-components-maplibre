import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { MapContext } from "react-map-components-core";

const LoadingOverlayContext = React.createContext({});
const LoadingOverlayContextProvider = LoadingOverlayContext.Provider;

const LoadingOverlayProvider = ({ children }) => {
  const mapContext = useContext(MapContext);

  const [controlled, setControlled] = useState(false);
  const [loadingDone, setLoadingDone] = useState(true);
  const [visible, setVisible] = useState(true);
  const [fadeoutAnimation, setFadeoutAnimation] = useState(false);
  const mapJobsRef = useRef({});
  const [mapJobs, setMapJobs] = useState({});

  const fadeOut = () => {
    setTimeout(() => {
      setFadeoutAnimation(true);
      setTimeout(() => {
        setVisible(false);
      }, 1700);
    }, 2700);
  };

  useEffect(() => {
    if (!mapContext.map || controlled) return;

    for (var key in mapJobs) {
      if (!mapJobs[key]) return;
    }

    //fadeOut();
  }, [mapJobs, controlled]);

  useEffect(() => {
    console.log("MAPLIBRE INSTANCE SPOTTED");

    for (var i = 0, len = mapContext.mapIds.length; i < len; i++) {
      if (Object.keys(mapJobsRef.current).indexOf(mapContext.mapIds[i]) !== -1) {
        setControlled(true);

        let mapId = mapContext.mapIds[i] + "";
        mapJobsRef.current[mapId] = false;
        mapContext.getMap(mapId).on("idle", () => {
          console.log("IDLE " + mapId);
          mapJobsRef.current[mapId] = true;
          setMapJobs(mapJobsRef.current);
        });
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
