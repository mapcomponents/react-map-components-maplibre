import React, { useRef, useEffect, useState, useMemo } from 'react';
import useMap from '../../hooks/useMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';

import { featureCollection, FeatureCollection, bbox } from '@turf/turf';
import {
	LineLayerSpecification,
	CircleLayerSpecification,
	FillLayerSpecification,
	SymbolLayoutProps,
	SymbolPaintProps,
	MapLayerMouseEvent,
	LngLatBoundsLike,
} from 'maplibre-gl';

import usePaintPicker from './utils/paintPicker';
import MlTemporalControllerLabels from './utils/MlTemporalControllerLabels';
import TemporalControllerPlayer from './utils/TemporalControllerPlayer';



export interface MlTemporalControllerProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order.
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
	/**
	 * GeoJSON data that is supposed to be rendered by this component.
	 */
	geojson: FeatureCollection;
	/**
	 * Type of the layer that will be added to the MapLibre instance.
	 * Possible values: "line", "circle", "fill"
	 */
	type?: 'fill' | 'line' | 'circle';
	/**
	 * Property field where the time informations is available.
	 */
	timeField: string;
	/**
	 * Lowest time value to be shown in the time line.
	 * By default, it is set to the lowest value in the time field.
	 */
	minVal?: number;
	/**
	 *When true, a label layer will be added by the component. In that case, the "labelField" propertie is mandatory.
	 */
	label?: boolean;
	/**
	 * Property field where the label information is available.
	 */
	labelField?: string;
	/**
	 * Highest time value to be shown in the time line.
	 * By default, it is set to the highest value in the time field.
	 */
	maxVal?: number;
	/**
	 * the value at which the component is to be loaded.
	 * If not specified, the component starts at the minimum value.
	 */
	initialVal?: number;
	/**
	 * When true, the features will be accumulated in the map.
	 * This option ist by default false.
	 */
	accumulate?: boolean;
	/**
	 * When true, the component will fit the map bounds to the shown features.
	 * This option ist by default true.
	 */
	fitBounds?: boolean;
	/**
	 * Boolean value that disables and enables the controls drawer.
	 */
	showControls?: boolean;
	/**
	 * Paint property object for the features layer.
	 * Possible props depend on the layer type.
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
	 */
	paint?:
		| CircleLayerSpecification['paint']
		| FillLayerSpecification['paint']
		| LineLayerSpecification['paint'];
	/**
	 * Sets the color of the features rendered by this component.
	 */
	featuresColor?: string;
	/**
	 * How many units the timeline runs through at each step.
	 * By default it is set to 1.
	 */
	step?: number;
	/**
	 * A numeric value that sets how many steps before the feature starts to appear.
	 * By default it is set to 5 steps.
	 */
	fadeIn?: number;
	/**
	 * A numeric value that sets how many steps the feature fades out after it proper time value.
	 * By default it is set to 5 steps.
	 */
	fadeOut?: number;
	/**
	 * Sets the color of the features rendered by this component.
	 */
	labelColor?: string;
	/**
	 * Layout property object, that is passed to the labels layer.
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#symbol
	 */
	labelLayout?: SymbolLayoutProps;
	//  | SymbolLayoutArray;

	/**
	 * Paint property object for the features layer.
	 * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#symbol
	 */
	labelPaint?: SymbolPaintProps;
	/**
	 * Hover event handler that is executed whenever a geometry rendered by this component is hovered.
	 */
	/**
	 * A numeric value that sets how many steps before the labels start to appear.
	 * By default it is set to 5 steps.
	 */
	labelFadeIn?: number;
	/**
	 * A numeric value that sets how many steps the labels fade out after their proper time value.
	 * By default it is set to 5 steps.
	 */
	labelFadeOut?: number;
	onHover?: MapLayerMouseEvent;
	/**
	 * Click event handler that is executed whenever a geometry rendered by this component is clicked.
	 */
	onClick?: MapLayerMouseEvent;
	/**
	 * Leave event handler that is executed whenever a geometry rendered by this component is
	 * left/unhovered.
	 */
	onLeave?: MapLayerMouseEvent;
	/**
	 * Callback function defined by the user to recive the current value in the parent component.
	 */
	onStateChange?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

/**
 * Select a GeoJSON object to be displayed in a temporal line.
 *@component
 */

function getMinVal(geojson: FeatureCollection | undefined, timeField: string) {
	if (geojson?.features) {
		let tempFeatures = [...(geojson.features ? geojson.features : [])];
		tempFeatures.sort((a, b) => (a.properties?.[timeField] < b.properties?.[timeField] ? 1 : -1));
		return tempFeatures[tempFeatures.length - 1]?.properties?.[timeField] || 0;
	}
	return 0;
}

function getMaxVal(geojson: FeatureCollection | undefined, timeField: string) {
	if (geojson?.features) {
		let tempFeatures = [...(geojson?.features ? geojson.features : [])];
		tempFeatures.sort((a, b) => (a.properties?.[timeField] < b.properties?.[timeField] ? -1 : 1));
		return tempFeatures[tempFeatures.length - 1]?.properties?.[timeField] || 0;
	}
	return 0;
}

const MlTemporalController = (props: MlTemporalControllerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const initializedRef = useRef(false);

	const labelField = props.labelField || props.geojson?.features[0]?.properties?.[0] || '';
	const minVal = React.useMemo(() => {
		if (props.minVal) {
			return props.minVal;
		}
		return getMinVal(props.geojson, props.timeField);
	}, [props.minVal, props.geojson, props.timeField]);

	const maxVal = React.useMemo(() => {
		if (props.maxVal) {
			return props.maxVal;
		}
		return getMaxVal(props.geojson, props.timeField);
	}, [props.maxVal, props.geojson, props.timeField]);

	
	const [type, setType] = useState(props.type || 'circle');
	const [step, setStep] = useState(props.step || 1);
	const [fadeIn, setFadeIn] = useState(props.fadeIn || 5);
	const [fadeOut, setFedeOut] = useState(props.fadeOut || 5);

	const [featuresColor, setFeatureColor] = useState(props.featuresColor || '#1976D2');
	const [labels, setLabels] = useState(props.label || true);
	const [labelColor, setlabelColor] = useState(props.labelColor || '#000');
	const [labelFadeIn, setLabelFadein] = useState(props.labelFadeIn || 5);
	const [labelFadeOut, setLabelFadeOut] = useState(props.labelFadeOut || 5);

	const [currentVal, setCurrentVal] = useState<number>(props.initialVal || minVal);
	const [isPlaying, setIsPlaying] = useState(false);
	const [accumulate, setAccumulate] = useState(props.accumulate || false);

	const intervalRef: any = useRef();

	const paint = usePaintPicker(
		type,
		props.timeField,
		currentVal,
		minVal,
		isPlaying,
		fadeIn,
		fadeOut,
		step,
		featuresColor,
		accumulate,
		props.paint
	);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
	}, [mapHook.map, props.mapId]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	
	//use callback function from props, if exists
	useEffect(() => {
		if (typeof props.onStateChange === 'function') {
			props.onStateChange(currentVal);
		}
	}, [props.onStateChange, currentVal]);

	//get min and max time value
	useEffect(() => {
		if (!props.initialVal){
			const neuMin = getMinVal(props.geojson, props.timeField);
		setCurrentVal(neuMin > minVal ? neuMin : minVal);
		} else {
			setCurrentVal(props.initialVal)
		}
		
	}, [minVal, props.geojson, props.timeField, props.initialVal]);

	// filter geojson
	const filteredData = useMemo<FeatureCollection | undefined>(() => {
		if (props.geojson !== undefined && mapHook.map && minVal && maxVal) {
			return featureCollection(
				props.geojson.features.filter((e) => {
					return (
						e.properties?.[props.timeField] >= minVal && e.properties?.[props.timeField] <= maxVal
					);
				})
			);
		}
		return;
	}, [props.geojson, mapHook.map, minVal, maxVal]);

	// Fit map to bbox
	useEffect(() => {
		if (props.fitBounds && typeof filteredData !== 'undefined') {
			let geojsonBbox = bbox(filteredData);
			mapHook.map?.map.fitBounds(geojsonBbox as LngLatBoundsLike);
		}
	}, [filteredData]);

	
	return (
		<>
			{filteredData && (
				<MlGeoJsonLayer
					type={props.type}
					mapId={props.mapId}
					layerId="timeController"
					insertBeforeLayer={props.insertBeforeLayer || 'timeControllerLabels'}
					geojson={filteredData}
					paint={
						props.paint ||
						(paint as
							| CircleLayerSpecification['paint']
							| FillLayerSpecification['paint']
							| LineLayerSpecification['paint'])
					}
				/>
			)}

			{labels && (
				<MlTemporalControllerLabels
					data={filteredData}
					currentVal={currentVal}
					fadeIn={labelFadeIn}
					fadeOut={labelFadeOut}
					step={step}
					labelField={labelField}
					labelColor={labelColor}
					timeField={props.timeField}
					minVal={minVal}
					accumulate={accumulate}
					isPlaying={isPlaying}
				/>
			)}

			<TemporalControllerPlayer
				currentVal={currentVal}
				isPlaying={isPlaying}
				step={step}
				minVal={minVal}
				maxVal={maxVal}
				returnCurrent={setCurrentVal}
				returnPlaying={setIsPlaying}
				showControls={props.showControls ? props.showControls : false}
				open={false}
				fadeIn={fadeIn}
				setFadeIn={setFadeIn}
				fadeOut={fadeOut}
				setFadeOut={setFedeOut}
				setStep={setStep}
				featuresColor={featuresColor}
				setFeatureColor={setFeatureColor}
				labels={labels}
				setLabels={setLabels}
				labelColor={labelColor}
				setlabelColor={setlabelColor}
				labelFadeIn={labelFadeIn}
				setLabelFadein={setLabelFadein}
				labelFadeOut={labelFadeOut}
				setLabelFadeOut={setLabelFadeOut}
				accumulate={accumulate}
				setAccumulate={setAccumulate}

			/>

			
		</>
	);
};

MlTemporalController.defaultProps = {
	mapId: undefined,
};
export default MlTemporalController;
