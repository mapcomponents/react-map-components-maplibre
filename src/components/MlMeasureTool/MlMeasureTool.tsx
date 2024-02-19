import React, { useEffect, useState } from 'react';
import MlFeatureEditor from '../MlFeatureEditor/MlFeatureEditor';
import * as turf from '@turf/turf';
import { Feature, GeoJSONObject } from '@turf/turf';
import { Typography } from '@mui/material';

export interface MlMeasureToolProps {
	/**
	 * String that specify if the Tool measures an area ("polygon") or length ("line")
	 */
	measureType?: 'polygon' | 'line';
	/**
	 * String that dictates which unit of measurement is used
	 */
	unit?: turf.Units;
	/**
	 * Callback function that is called each time measurment geometry within has changed within MlMeasureTool.
	 * First parameter is the new GeoJson feature.
	 */
	onChange?: (options: {
		value: number;
		unit: string | undefined;
		geojson: GeoJSONObject;
		geometries?: [];
	}) => void;
	/**
	 * Callback function that is called by the end of drawing geometries.
	 */
	onFinish?: () => void;
}

//const unitSquareConvert = {
//	kilometers: 1,
//	miles: 1 / 2.58998811,
//};
function getUnitSquareMultiplier(measureType: string | undefined) {
	return measureType === 'miles' ? 1 / 2.58998811 : 1;
}
function getUnitLabel(measureType: string | undefined) {
	return measureType === 'miles' ? 'mi' : 'km';
}

const MlMeasureTool = (props: MlMeasureToolProps) => {
	const [displayValue, setDisplayValue] = useState({ value: 0, label: 'km' });
	const [currentFeatures, setCurrentFeatures] = useState<GeoJSONObject[]>([]);

	useEffect(() => {
		if (currentFeatures[0]) {
			const result =
				props.measureType === 'polygon'
					? // for "polyong" mode calculate km²
					  (turf.area(currentFeatures[0] as Feature) / 1000000) *
					  getUnitSquareMultiplier(props.unit)
					: turf.length(currentFeatures[0] as Feature, { units: props.unit });

			if (typeof props.onChange === 'function') {
				props.onChange({ value: result, unit: props.unit, geojson: currentFeatures[0] });
			}

			if (result >= 0.1) {
				setDisplayValue({ value: result, label: getUnitLabel(props.unit) });
			} else {
				let label = 'm';
				let value = result * 1000;
				if (props.measureType === 'polygon') {
					value = result * 1000000;
				}
				if (getUnitLabel(props.unit) === 'mi') {
					label = 'Yard';
					value = result * 1760;
					if (props.measureType === 'polygon') {
						value = result * 3097600;
					}
				}
				setDisplayValue({ value: value, label: label });
			}
		}
	}, [props.unit, currentFeatures]);

	return (
		<>
			<MlFeatureEditor
				onChange={(features) => {
					features && setCurrentFeatures(features);
				}}
				mode={props.measureType === 'polygon' ? 'draw_polygon' : 'draw_line_string'}
				onFinish={props.onFinish}
			/>
			{displayValue.value.toFixed(2)} {''}
			<Typography>
				{displayValue.label}
				{props.measureType === 'polygon' ? ' ²' : ''}
			</Typography>
		</>
	);
};

MlMeasureTool.defaultProps = {
	mapId: undefined,
	measureType: 'line',
	unit: 'kilometers',
};
export default MlMeasureTool;
