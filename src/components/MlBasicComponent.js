import React, { useEffect, useContext } from "react";

import { MapContext } from "@mapcomponents/react-core";

const MlBasicComponent = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  // const layerRef = useRef(null);
  const mapContext = useContext(MapContext);

  useEffect(() => {
    if (!mapContext.mapExists()) return;
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.map.removeLayer(layerRef.current);
      if (typeof props.cleanup === "function") {
        props.cleanup(mapContext.getMap(props.mapId));
      }
    };
  });

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance
    if (typeof props.mapIsReady === "function") {
      props.mapIsReady(mapContext.getMap(props.mapId));
    }
  }, [mapContext.mapIds, mapContext, props]);

  return <></>;
};

export default MlBasicComponent;
