import React, { useState } from "react";
import MlFeatureEditor from "../MlFeatureEditor/MlFeatureEditor";
import * as turf from "@turf/turf";

interface MlMeasureToolProps {
  /**
   * String that specify if the Tool measures an area ("polygon") or length ("line")
   */
  measureType: string;
}

const MlMeasureTool = (props: MlMeasureToolProps) => {
  const [length, setLength] = useState(0)

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
