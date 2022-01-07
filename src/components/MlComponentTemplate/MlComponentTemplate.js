import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import useMap from "../../hooks/useMap";

/**
 * TODO: Add short & useful description
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */
const MlComponentTemplate = (props) => {
  const mapHook = useMap({ mapId: props.mapId, waitForLayer: props.insertBeforeLayer });
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!mapHook.mapIsReady || initializedRef.current) return;
    // the MapLibre-gl instance (mapHook.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;

    mapHook.map.setCenter([7.132122000552613, 50.716405378037706]);
  }, [mapHook.map, mapHook.mapIsReady, props.mapId]);

  return <></>;
};

MlComponentTemplate.defaultProps = {
  mapId: undefined,
};

MlComponentTemplate.propTypes = {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId: PropTypes.string,
};
export default MlComponentTemplate;
