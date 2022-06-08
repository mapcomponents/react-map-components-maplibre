import React, {useEffect, useState} from "react";
import MlFeatureEditor from "../MlFeatureEditor/MlFeatureEditor";
import * as turf from "@turf/turf";

interface MlMeasureToolProps {
  /**
   * String that specify if the Tool measures an area ("polygon") or length ("line")
   */
  measureType: string;
  /**
   * String that dictates which unit of measurement is used
   */
  unit: string;
}

const MlMeasureTool = (props: MlMeasureToolProps) => {
  const [length, setLength] = useState(0)
  const [currentFeatures, setCurrentFeatures] = useState([undefined])
  const unitShortcuts = {
    kilometers: "km",
    miles: "mi"
  }
  const unitSquareConvert = {
    kilometers: 1,
    miles: 1/2.58998811
  }

  useEffect(() => {
    if(currentFeatures[0]) {
      setLength(props.measureType === "polygon" ? turf.area(currentFeatures[0]) / 1000000 * unitSquareConvert[props.unit] : turf.length(currentFeatures[0], {units: props.unit}));
    }
  }, [props.unit, currentFeatures])


  return (
    <>
      <MlFeatureEditor
        onChange={(features) => {
          setCurrentFeatures(features)
          }}
        mode = {props.measureType === "polygon" ? "custom_polygon" : "draw_line_string"}
      />
      {length.toFixed(2)} {unitShortcuts[props.unit]}{props.measureType === "polygon" ? "²" : ""}
  </>);
};

MlMeasureTool.defaultProps = {
  mapId: undefined,
  measureType: "line",
  unit: "kilometers"
};
export default MlMeasureTool;
