import React, { useRef, useEffect } from "react";
import useMap from "../../hooks/useMap";

interface MlComponentTemplateProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId?: string;
  /**
   * Id of an existing layer in the mapLibre instance to help specify the layer order
   * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
   */
  insertBeforeLayer?: string;
}

/**
 * Component template
 *
 */
const MlComponentTemplate = (props: MlComponentTemplateProps) => {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    // the MapLibre-gl instance (mapHook.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;

    mapHook.map.map.setCenter([7.132122000552613, 50.716405378037706]);
  }, [mapHook.map, props.mapId]);

  return <></>;
};

MlComponentTemplate.defaultProps = {
  mapId: undefined,
};
export default MlComponentTemplate;
