import React, { useContext, useEffect } from "react";
import { MapContext } from "react-map-components-core";

/**
 * MlComponentTemplate
 */
const MlComponentTemplate = (props) => {
  const mapContext = useContext(MapContext);

  const cleanup = () => {};

  useEffect(() => {
    if (!mapContext.map) return;

    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (!mapContext.map) return;
  }, [mapContext.map]);

  return <></>;
};

export default MlComponentTemplate;
