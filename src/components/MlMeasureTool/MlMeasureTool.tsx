import React, { useEffect, useState } from "react";
import MlFeatureEditor from "../MlFeatureEditor/MlFeatureEditor";
import * as turf from "@turf/turf";

interface MlMeasureToolProps {
	/**
	 * String that specify if the Tool measures an area ("polygon") or length ("line")
	 */
	measureType?: string;
	/**
	 * String that dictates which unit of measurement is used
	 */
	unit?: turf.Units;
}

//const unitSquareConvert = {
//	kilometers: 1,
//	miles: 1 / 2.58998811,
//};
function getUnitSquareMultiplier(measureType:string | undefined) {
	return measureType === "miles" ? 1 / 2.58998811 : 1;
}
function getUnitLabel(measureType:string | undefined) {
	return measureType === "miles" ? 'mi' : 'km';
}

const MlMeasureTool = (props: MlMeasureToolProps) => {
	const [length, setLength] = useState(0);
	const [currentFeatures, setCurrentFeatures] = useState([undefined]);

	useEffect(() => {
		if (currentFeatures[0]) {
			setLength(
				props.measureType === "polygon"
					? (turf.area(currentFeatures[0]) / 1000000) * getUnitSquareMultiplier(props.unit)
					: turf.length(currentFeatures[0], { units: props.unit })
			);
		}
	}, [props.unit, currentFeatures]);

	return (
		<>
			<MlFeatureEditor
				onChange={(features:any) => {
					setCurrentFeatures(features);
				}}
				mode={props.measureType === "polygon" ? "custom_polygon" : "draw_line_string"}
			/>
			{length.toFixed(2)} {getUnitLabel(props.unit)}
			{props.measureType === "polygon" ? "²" : ""}
		</>
	);
};

MlMeasureTool.defaultProps = {
	mapId: undefined,
	measureType: "line",
	unit: "kilometers",
};
export default MlMeasureTool;
