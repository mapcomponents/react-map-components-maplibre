import React, { useEffect, useState } from 'react';
import useMap from '../../hooks/useMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { bbox } from '@turf/turf';
import { FeatureCollection } from 'geojson';
import {
	LineLayerSpecification,
	CircleLayerSpecification,
	FillLayerSpecification,
	SymbolLayoutProps,
	SymbolPaintProps,
	LngLatBoundsLike,
	MapEventType,
} from 'maplibre-gl';
import usePaintPicker from './utils/paintPicker';
import MlTemporalControllerLabels from './utils/MlTemporalControllerLabels';
import TemporalControllerPlayer from './utils/TemporalControllerPlayer';
import useFilterData from './utils/useFilterData';
import { useTheme } from '@mui/material/styles';
import { useLayerProps } from 'src/hooks/useLayer';

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
	 * If true,the component creates and loads a MlGeoJsonLayer to show the data.
	 */
	ownLayer?: boolean;
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
	 *  The time between each addition to the counter, expressed in milliseconds. 
	 *  By default, 200 ms.
	 */
    interval?: number;
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
	 * If true, the current time value will be displayed in the controlls panel.
	 */
	displayCurrentValue?: boolean;
	/**
	 * Click event handler that is executed whenever a geometry rendered by this component is clicked.
	 */
	onClick?: useLayerProps['onClick'];
	/**
	 * Click event handler that is executed whenever a geometry rendered by this component is hovered.
	 */
	onHover?: useLayerProps['onHover'];
	/**
	 * Leave event handler that is executed whenever a geometry rendered by this component is
	 * left/unhovered.
	 */
	onLeave?: useLayerProps['onLeave'];
	/**
	 * Callback function defined by the user to recive the current time value and paint property in the parent component.
	 */
	onStateChange?: React.Dispatch<React.SetStateAction<TemporalControllerValues | undefined>>;
}

/**
 * Select a GeoJSON object to be displayed in a temporal line.
 *@component
 */

export interface TemporalControllerValues {
	current: number;
	paint:
		| CircleLayerSpecification['paint']
		| FillLayerSpecification['paint']
		| LineLayerSpecification['paint'];
}

const MlTemporalController = (props: MlTemporalControllerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const labelField = props.labelField || props.geojson?.features[0]?.properties?.[0] || '';

	const { filteredData, minVal, maxVal } = useFilterData({
		geojson: props.geojson,
		timeField: props.timeField,
		minVal: props.minVal,
		maxVal: props.maxVal,
		initialVal: props.initialVal,
		mapId: props.mapId,
	});
	const theme = useTheme();
	const [currentVal, setCurrentVal] = useState<number>(props.initialVal || minVal);
	const featuresColor = props.featuresColor || theme.palette.primary.main;
	const labelColor = props.labelColor || theme.palette.text.primary;
	const [isPlaying, setIsPlaying] = useState(false);

	const paint = usePaintPicker({
		type: props.type,
		timeField: props.timeField,
		currentVal: currentVal,
		minVal: minVal,
		isPlaying: isPlaying,
		fadeIn: props.fadeIn as number,
		fadeOut: props.fadeOut as number,
		step: props.step as number,
		featuresColor: featuresColor,
		accumulate: props.accumulate as boolean,
		userPaint: props.paint,
	});

	//Set Initial values and clear references
	useEffect(() => {
		if (!props.initialVal && minVal) {
			setCurrentVal(minVal);
		} else if (props.initialVal) {
			setCurrentVal(props.initialVal);
		}
	}, []);

	if (typeof props.onStateChange === 'function') {
		// this is not in a useEffect hook because currentVal and paint are changing on almost every render
		props.onStateChange({
			current: currentVal,
			paint: paint as
				| CircleLayerSpecification['paint']
				| FillLayerSpecification['paint']
				| LineLayerSpecification['paint'],
		});
	}

	// Fit map to bbox
	useEffect(() => {
		if (props.fitBounds && typeof filteredData !== 'undefined') {
			const geojsonBbox = bbox(filteredData);
			mapHook.map?.map.fitBounds(geojsonBbox as LngLatBoundsLike);
		}
	}, [filteredData]);

	useEffect(() => {
		if (!mapHook.map) return;

		let _onClick: ((ev: MapEventType) => void) | undefined,
			_onHover: ((ev: MapEventType) => void) | undefined,
			_onLeave: ((ev: MapEventType) => void) | undefined;
		if (props.onClick) {
			_onClick = props.onClick;
			mapHook.map?.on('click', 'timeController', _onClick);
		}
		if (props.onHover) {
			_onHover = props.onHover;
			mapHook.map?.on('mouseenter', 'timeController', _onHover);
		}
		if (props.onLeave) {
			_onLeave = props.onLeave;
			mapHook.map?.on('mouseleave', 'timeController', _onLeave);
		}
		return () => {
			if (_onClick) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore ignore supposedly incompatible function definition
				mapHook.map?.off('click', 'timeController', _onClick);
			}
			if (_onHover) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore ignore supposedly incompatible function definition
				mapHook.map?.off('mouseenter', 'timeController', _onHover);
			}
			if (_onLeave) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore ignore supposedly incompatible function definition
				mapHook.map?.off('mouseleave', 'timeController', _onLeave);
			}
		};
	}, [mapHook.map, props.onClick, props.onHover, props.onLeave]);

	return (
		<>
			{filteredData && props.ownLayer && (
				<MlGeoJsonLayer
					type={props.type}
					mapId={props.mapId}
					//layerId="timeController"
					//insertBeforeLayer={props.insertBeforeLayer || 'timeControllerLabels'}
					paint={
						props.paint ||
						(paint as
							| CircleLayerSpecification['paint']
							| FillLayerSpecification['paint']
							| LineLayerSpecification['paint'])
					}
					options={{
						source: {
							type: 'geojson',
							attribution: props.attribution as string,
							data: filteredData
						} as useLayerProps['options']['source'],
					}}
				/>
			)}

			{filteredData && props.label && (
				<MlTemporalControllerLabels
					data={(filteredData as FeatureCollection)}
					currentVal={currentVal}
					fadeIn={props.labelFadeIn as number}
					fadeOut={props.labelFadeOut as number}
					step={props.step as number}
					labelField={labelField}
					labelColor={labelColor}
					timeField={props.timeField}
					minVal={minVal}
					accumulate={props.accumulate as boolean}
					isPlaying={isPlaying}
				/>
			)}

			<TemporalControllerPlayer
				currentVal={currentVal}
				isPlaying={isPlaying}
				step={props.step as number}
				interval={props.interval as number}
				minVal={minVal}
				maxVal={maxVal}
				returnCurrent={setCurrentVal}
				returnPlaying={setIsPlaying}
				open={false}
				fadeIn={props.fadeIn as number}
				fadeOut={props.fadeOut as number}
				featuresColor={featuresColor}
				labels={props.label as boolean}
				labelColor={labelColor}
				labelFadeIn={props.labelFadeIn as number}
				labelFadeOut={props.labelFadeOut as number}
				accumulate={props.accumulate as boolean}
				display={(props.displayCurrentValue as boolean)}
			/>
		</>
	);
};

MlTemporalController.defaultProps = {
	mapId: undefined,
	ownLayer: true,
	type: 'circle',
	step: 1,
	interval: 200,
	fadeIn: 5,
	fadeOut: 5,
	labelFadeIn: 5,
	labelFadeOut: 5,
	accumulate: false,
	fitBounds: true,
	label: true,
	attribution: '',
	displayCurrentValue: false
};

export default MlTemporalController;
