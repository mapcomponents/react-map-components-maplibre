import React, { useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";

const MlBasicComponent = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  // const layerRef = useRef(null);
  const mapContext = useContext(MapContext);

  const getMap = () => {
    if (props.mapId && mapContext.mapIds.indexOf(props.mapId) === -1) {
      return mapContext.maps[props.mapId];
    } else if (!props.mapId && mapContext.map) {
      return mapContext.map;
    }

    return null;
  };

  const mapExists = () => {
    if (props.mapId && mapContext.mapIds.indexOf(props.mapId) === -1) {
      return false;
    } else if (!props.mapId && !mapContext.map) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!mapExists()) return;
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.map.removeLayer(layerRef.current);
    };
  });

  useEffect(() => {
    if (!mapExists()) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance
  }, [mapContext.mapIds]);

  return <></>;
};

export default MlBasicComponent;
