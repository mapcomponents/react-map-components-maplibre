import React, { useEffect, useContext } from "react";

import { MapContext } from "react-map-components-core";

const MlComponentTemplate = (props) => {
  // Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
  // without the requirement of adding it to the dependency list (ignore the false eslint exhaustive deps warning)
  const mapContext = useContext(MapContext);

  useEffect(() => {
    if (!mapContext.mapExists(props.mapId)) return;
    return () => {
      // This is the cleanup function, it is called when this react component is removed from react-dom
      // try to remove anything this component has added to the MapLibre-gl instance
      // e.g.: remove the layer
      // mapContext.getMap(props.mapId).removeLayer(layerRef.current);
    };
  });

  useEffect(() => {
    if (!mapContext.mapExists()) return;
    // the MapLibre-gl instance (mapContext.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    mapContext
      .getMap(props.mapId)
      .setCenter([7.132122000552613, 50.716405378037706]);
  }, [mapContext.mapIds, mapContext]);

  return <></>;
};

export default MlComponentTemplate;
