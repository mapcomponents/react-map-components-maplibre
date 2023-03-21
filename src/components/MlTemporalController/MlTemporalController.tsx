import React, { useRef, useEffect, useState } from 'react';
import useMap from '../../hooks/useMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { FeatureCollection, bbox } from '@turf/turf';
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
import useTemporalController from './utils/useTemporalController';
import { useTheme } from '@mui/material/styles';


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
	 * MapLibre attribution shown in the bottom right of the map, if this layer is visible
	 */
	attribution?: string;
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
	/**
	 * Click event handler that is executed whenever a geometry rendered by this component is clicked.
	 */
	onClick?: MapLayerMouseEvent;
	/**
	 * Click event handler that is executed whenever a geometry rendered by this component is hovered.
	 */
	onHover?: MapLayerMouseEvent;	
	/**
	 * Leave event handler that is executed whenever a geometry rendered by this component is
	 * left/unhovered.
	 */
	onLeave?: MapLayerMouseEvent;
	/**
	 * Callback function defined by the user to recive the current value in the parent component.
	 */
	onStateChange?: React.Dispatch<React.SetStateAction<TemporalControllerValues | undefined>>;
}

/**
 * Select a GeoJSON object to be displayed in a temporal line.
 *@component
 */

 export interface TemporalControllerValues{
	current: number;
	paint: CircleLayerSpecification['paint']
	| FillLayerSpecification['paint']
	| LineLayerSpecification['paint'] ;
}

const MlTemporalController = (props: MlTemporalControllerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const initializedRef = useRef(false);

	const labelField = props.labelField || props.geojson?.features[0]?.properties?.[0] || '';

	const { filteredData, minVal, maxVal } = useTemporalController({
		geojson: props.geojson,
		timeField: props.timeField,
		minVal: props.minVal,
		maxVal: props.maxVal,
		initialVal: props.initialVal,
		mapId: props.mapId,
	});

	const theme = useTheme();

	const [currentVal, setCurrentVal] = useState<number>(props.initialVal || minVal);
	const [type, setType] = useState(props.type);
	const [step, setStep] = useState(props.step);
	const [fadeIn, setFadeIn] = useState(props.fadeIn);
	const [fadeOut, setFedeOut] = useState(props.fadeOut);

	const [featuresColor, setFeatureColor] = useState(props.featuresColor || theme.palette.primary.main );

	const [labels, setLabels] = useState(props.label || true);
	const [labelColor, setlabelColor] = useState(props.labelColor || theme.palette.text.primary);
	const [labelFadeIn, setLabelFadein] = useState(props.labelFadeIn);
	const [labelFadeOut, setLabelFadeOut] = useState(props.labelFadeOut);

	const [isPlaying, setIsPlaying] = useState(false);
	const [accumulate, setAccumulate] = useState(props.accumulate);
	const attribution = props.attribution || '';

	const intervalRef: any = useRef();

	const paint = usePaintPicker({
		type: type,
		timeField: props.timeField,
		currentVal: currentVal,
		minVal: minVal,
		isPlaying: isPlaying,
		fadeIn: (fadeIn as number),
		fadeOut: (fadeOut as number),
		step:(step as number),
		featuresColor: featuresColor,
		accumulate: (accumulate as boolean),
		userPaint: props.paint,
	});

	//Set Initial values and clear references
	useEffect(() => {
		if (!props.initialVal && minVal) {
			setCurrentVal(minVal);
		} else if (props.initialVal) {
			setCurrentVal(props.initialVal);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
	}, [mapHook.map, props.mapId]);

	//use callback function from props, if exists
	useEffect(() => {
		if (typeof props.onStateChange === 'function') {
			props.onStateChange({current: currentVal, paint: paint});
		}
	}, [props.onStateChange, currentVal]);

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
					//options={{source: {attribution: attribution}}}
				/>
			)}

			{labels && (
				<MlTemporalControllerLabels
					data={filteredData}
					currentVal={currentVal}
					fadeIn={(labelFadeIn as number)}
					fadeOut={(labelFadeOut as number)}
					step={(step as number)}
					labelField={labelField}
					labelColor={labelColor}
					timeField={props.timeField}
					minVal={minVal}
					accumulate={(accumulate as boolean)}
					isPlaying={isPlaying}
				/>
			)}

			<TemporalControllerPlayer
				currentVal={currentVal}
				isPlaying={isPlaying}
				step={(step as number)}
				minVal={minVal}
				maxVal={maxVal}
				returnCurrent={setCurrentVal}
				returnPlaying={setIsPlaying}
				open={false}
				fadeIn={(fadeIn as number)}
				setFadeIn={setFadeIn}
				fadeOut={(fadeOut as number)}
				setFadeOut={setFedeOut}
				setStep={setStep}
				featuresColor={featuresColor}
				setFeatureColor={setFeatureColor}
				labels={labels}
				setLabels={setLabels}
				labelColor={labelColor}
				setlabelColor={setlabelColor}
				labelFadeIn={(labelFadeIn as number)}
				setLabelFadein={setLabelFadein}
				labelFadeOut={(labelFadeOut as number)}
				setLabelFadeOut={setLabelFadeOut}
				accumulate={(accumulate as boolean)}
				setAccumulate={setAccumulate}
			/>
		</>
	);
};

MlTemporalController.defaultProps = {
	mapId: undefined,
	type: 'circle',
	step: 1,
	fadeIn: 5,
	fadeOut: 5,
	labelFadeIn: 5,
	labelFadeOut: 5,
	accumulate: false,
	fitBounds: true
};

export default MlTemporalController;
