import React, { useEffect, useState } from 'react';
import useMap from '../../hooks/useMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { bbox } from '@turf/turf';
import { FeatureCollection } from 'geojson';
import {
	CircleLayerSpecification,
	FillLayerSpecification,
	LineLayerSpecification,
	LngLatBoundsLike,
	MapEventType,
	SymbolLayoutProps,
	SymbolPaintProps,
} from 'maplibre-gl';
import usePaintPicker from './utils/paintPicker';
import MlTemporalControllerLabels from './utils/MlTemporalControllerLabels';
import TemporalControllerPlayer from './utils/TemporalControllerPlayer';
import useFilterData from './utils/useFilterData';
import { useTheme } from '@mui/material/styles';
import { useLayerProps } from '../../hooks/useLayer';

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

const MlTemporalController = ({
	mapId = undefined,
	insertBeforeLayer,
	geojson,
	ownLayer = true,
	attribution = '',
	type = 'circle',
	timeField,
	minVal,
	maxVal,
	initialVal,
	accumulate = false,
	fitBounds = true,
	paint,
	featuresColor,
	step = 1,
	interval = 200,
	fadeIn = 5,
	fadeOut = 5,
	label = true,
	labelColor,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	labelField = [],
	labelFadeIn = 5,
	labelFadeOut = 5,
	displayCurrentValue = false,
	onClick,
	onHover,
	onLeave,
	onStateChange,
}: MlTemporalControllerProps) => {
	const mapHook = useMap({
		mapId: mapId,
		waitForLayer: insertBeforeLayer,
	});

	const {
		filteredData,
		minVal: filterMinVal,
		maxVal: filterMaxVal,
	} = useFilterData({
		geojson: geojson,
		timeField: timeField,
		minVal: minVal,
		maxVal: maxVal,
		initialVal: initialVal,
		mapId: mapId,
	});
	const theme = useTheme();
	const [currentVal, setCurrentVal] = useState<number>(initialVal || filterMinVal);
	const featuresColorValue = featuresColor || theme.palette.primary.main;
	const labelColorValue = labelColor || theme.palette.text.primary;
	const [isPlaying, setIsPlaying] = useState(false);

	const paintValue = usePaintPicker({
		type: type,
		timeField: timeField,
		currentVal: currentVal,
		minVal: filterMinVal,
		isPlaying: isPlaying,
		fadeIn: fadeIn as number,
		fadeOut: fadeOut as number,
		step: step as number,
		featuresColor: featuresColorValue,
		accumulate: accumulate as boolean,
		userPaint: paint,
	});

	//Set Initial values and clear references
	useEffect(() => {
		if (!initialVal && filterMinVal) {
			setCurrentVal(filterMinVal);
		} else if (initialVal) {
			setCurrentVal(initialVal);
		}
	}, []);

	useEffect(() => {
		if (typeof onStateChange === 'function') {
			onStateChange({
				current: currentVal,
				paint: paintValue as
					| CircleLayerSpecification['paint']
					| FillLayerSpecification['paint']
					| LineLayerSpecification['paint'],
			});
		}
	}, [onStateChange]);

	// Fit map to bbox
	useEffect(() => {
		if (fitBounds && typeof filteredData !== 'undefined') {
			const geojsonBbox = bbox(filteredData);
			mapHook.map?.map.fitBounds(geojsonBbox as LngLatBoundsLike);
		}
	}, [filteredData]);

	useEffect(() => {
		if (!mapHook.map) return;

		let _onClick: ((ev: MapEventType) => void) | undefined,
			_onHover: ((ev: MapEventType) => void) | undefined,
			_onLeave: ((ev: MapEventType) => void) | undefined;
		if (onClick) {
			_onClick = onClick;
			mapHook.map?.on('click', 'timeController', _onClick);
		}
		if (onHover) {
			_onHover = onHover;
			mapHook.map?.on('mouseenter', 'timeController', _onHover);
		}
		if (onLeave) {
			_onLeave = onLeave;
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
	}, [mapHook.map, onClick, onHover, onLeave]);

	return (
		<>
			{filteredData && ownLayer && (
				<MlGeoJsonLayer
					type={type}
					mapId={mapId}
					//layerId="timeController"
					//insertBeforeLayer={props.insertBeforeLayer || 'timeControllerLabels'}

					options={{
						source: {
							type: 'geojson',
							attribution: attribution as string,
							data: filteredData,
						} as useLayerProps['options']['source'],
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						paint: {
							...(paint ||
								(paintValue as
									| CircleLayerSpecification['paint']
									| FillLayerSpecification['paint']
									| LineLayerSpecification['paint'])),
						},
						layout: {
							visibility: 'visible',
						},
					}}
				/>
			)}

			{filteredData && label && (
				<MlTemporalControllerLabels
					data={filteredData as FeatureCollection}
					currentVal={currentVal}
					fadeIn={labelFadeIn as number}
					fadeOut={labelFadeOut as number}
					step={step as number}
					labelField={labelField}
					labelColor={labelColorValue}
					timeField={timeField}
					minVal={filterMinVal}
					accumulate={accumulate as boolean}
					isPlaying={isPlaying}
				/>
			)}

			<TemporalControllerPlayer
				currentVal={currentVal}
				isPlaying={isPlaying}
				step={step as number}
				interval={interval as number}
				minVal={filterMinVal}
				maxVal={filterMaxVal}
				returnCurrent={setCurrentVal}
				returnPlaying={setIsPlaying}
				open={false}
				fadeIn={fadeIn as number}
				fadeOut={fadeOut as number}
				featuresColor={featuresColorValue}
				labels={label as boolean}
				labelColor={labelColorValue}
				labelFadeIn={labelFadeIn as number}
				labelFadeOut={labelFadeOut as number}
				accumulate={accumulate as boolean}
				display={displayCurrentValue as boolean}
			/>
		</>
	);
};

export default MlTemporalController;
