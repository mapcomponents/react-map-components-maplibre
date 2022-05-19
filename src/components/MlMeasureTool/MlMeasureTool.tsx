import React, {useRef, useEffect, useState} from "react";
import useMap from "../../hooks/useMap";
import MlFeatureEditor from "../MlFeatureEditor/MlFeatureEditor";
import * as turf from "@turf/turf";

interface MlMeasureToolProps {
  /**
   * Id of the target MapLibre instance in mapContext
   */
  mapId?: string;
  /**
   * Id of an existing layer in the mapLibre instance to help specify the layer order
   * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
   */
  insertBeforeLayer?: string;
  /**
   * String that specify if the Tool measures an area ("polygon") or length ("line")
   */
  measureType: string;
}

/**
 * Tool that can measures either the length or area between dots created by mouse click events
 */
const MlMeasureTool = (props: MlMeasureToolProps) => {
  const mapHook = useMap({
    mapId: props.mapId,
    waitForLayer: props.insertBeforeLayer,
  });
  const initializedRef = useRef(false);
  const [length, setLength] = useState(0)

  useEffect(() => {
    if (!mapHook.map || initializedRef.current) return;
    // the MapLibre-gl instance (mapHook.map) is accessible here
    // initialize the layer and add it to the MapLibre-gl instance or do something else with it
    initializedRef.current = true;

    mapHook.map.map.setCenter([7.132122000552613, 50.716405378037706]);
  }, [mapHook.map]);

  return (
    <>
      <MlFeatureEditor
        onChange={(features) => {
          console.log(features);
          if(features[0]) {
            setLength(props.measureType === "polygon" ? turf.area(features[0]) / 1000000 : turf.length(features[0]));
          }}}
        mode = {props.measureType === "polygon" ? "custom_polygon" : "draw_line_string"}
      />
      {props.measureType === "polygon" ? "Area" : "Length"}: {length.toFixed(2)} {props.measureType === "polygon" ? "km²" : "km"}
  </>);
};

MlMeasureTool.defaultProps = {
  mapId: undefined,
  measureType: "line",
};
export default MlMeasureTool;
