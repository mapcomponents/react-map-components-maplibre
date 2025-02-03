import React, { useEffect, useState } from 'react';
import MlFeatureEditor from '../MlFeatureEditor/MlFeatureEditor';
import * as turf from '@turf/turf';
import { Feature } from 'geojson';

export interface MlMeasureToolOnChangeOptions {
	value: number;
	unit: string | undefined;
	geojson: Feature;
	geometries?: [];
}
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
	onChange?: (options: MlMeasureToolOnChangeOptions) => void;
	/**
	 * Callback function that is called by the end of drawing geometries.
	 */
	onFinish?: () => void;
}

function unitMultiplier(unit: string | undefined) {
	switch (unit) {
		case 'meters':
			return 1;
		case 'millimeters':
			return 1000;
		case 'centimeters':
			return 100;
		case 'kilometers':
			return 0.001;
		case 'miles':
			return 1 / 1609.344; // Meters in Miles
		case 'nauticalmiles':
			return 1 / 1852; // Meters in Nautical Miles
		case 'inches':
			return 39.3701; // Meters in Inches
		case 'yards':
			return 1.09361; // Meters in Yards
		case 'feet':
			return 3.28084; // Meters in Feet
		// case 'acres':
		// 	return 1 / 4046.8564224; // Square meters in an acre
		// case 'hectares':
		// 	return 1 / 10000; // Square meters in a hectare
		default:
			return 1;
	}
}

function unitLabel(unit: string | undefined) {
	switch (unit) {
		case 'miles':
			return 'mi';
		case 'acres':
			return 'ac';
		case 'kilometers':
			return 'km';
		case 'meters':
			return 'm';
		case 'millimeters':
			return 'mm';
		case 'centimeters':
			return 'cm';
		case 'nauticalmiles':
			return 'nm';
		case 'inches':
			return 'in';
		case 'yards':
			return 'yd';
		case 'feet':
			return 'ft';
		case 'hectares':
			return 'ha';
		default:
			return 'm';
	}
}

const MlMeasureTool = (props: MlMeasureToolProps) => {
	const [displayValue, setDisplayValue] = useState({ value: 0, label: '' });
	const [currentFeatures, setCurrentFeatures] = useState<Feature[]>([]);

	useEffect(() => {
		if (currentFeatures[0]) {
			let result: number = 0;
			if (props.measureType === 'polygon') {
				// Calculate area in square meters
				result = turf.area(currentFeatures[0] as Feature);

				// Convert area depending on the unit (square meters -> selected area unit)
				if (props.unit) {
					const unit = props.unit as string;
					if (unit === 'acres') {
						result = result / 4046.8564224;
					} else if (unit === 'hectares') {
						result = result / 10000;
					} else {
						result = result * unitMultiplier(props.unit) ** 2;
					}
				}
			} else {
				result = turf.length(currentFeatures[0] as Feature, { units: props.unit });
			}

			if (typeof props.onChange === 'function') {
				props.onChange({ value: result, unit: props.unit, geojson: currentFeatures[0] });
			}

			if (result >= 0.1) {
				setDisplayValue({ value: result, label: unitLabel(props.unit) });
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
			{displayValue.value.toLocaleString('de-DE', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})}{' '}
			{unitLabel(props.unit)}
			{displayValue.label &&
			props.measureType === 'polygon' &&
			!['hectares', 'acres'].includes(props.unit || '')
				? ' ²'
				: ''}
		</>
	);
};

MlMeasureTool.defaultProps = {
	mapId: undefined,
	measureType: 'line',
	unit: 'meters',
};
export default MlMeasureTool;
