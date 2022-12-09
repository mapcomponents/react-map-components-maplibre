import React, { useRef, useEffect, useState } from 'react';
import useMap from '../../hooks/useMap';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';

import { FeatureCollection, bbox } from '@turf/turf';
import { Slider, AppBar, Box, Typography, Drawer, Button, Grid } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';

import {
	LineLayerSpecification,
	CircleLayerSpecification,
	FillLayerSpecification,
	SymbolLayerSpecification,
	SymbolLayoutProps,
	SymbolPaintProps,
	MapLayerMouseEvent,
	LngLatBoundsLike,
} from 'maplibre-gl';

import usePaintPicker from './utils/paintPicker';
import MlTemporalControllerLabels from './utils/MlTemporalControllerLabels';

interface MlTemporalControllerProps {
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
	 * Boolean value that toogles the controlls drawer visibility.
	 */
	open?: boolean;
	/**
	 * Boolean value that toogles the current value display visibility.
	 */
	display?: boolean;
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
	callback?: any;
}

/**
 * Select a GeoJSON object to be displayed in a temporal line.
 *@component
 */

function getMinVal(geojson: FeatureCollection, timeField: string) {
	if (geojson.features) {
		let tempFeatures = [...(geojson.features ? geojson.features : [])];
		tempFeatures.sort((a, b) => (a[timeField] < b[timeField] ? 1 : -1));
		return tempFeatures[tempFeatures.length - 1]?.properties?.[timeField] || 0;
	}
}

function getMaxVal(geojson: FeatureCollection, timeField: string) {
	let tempFeatures = [...(geojson?.features ? geojson.features : [])];
	tempFeatures.sort((a, b) => (a[timeField] < b[timeField] ? -1 : 1));
	return tempFeatures[tempFeatures.length - 1]?.properties?.[timeField] || 0;
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

	const range = maxVal - minVal;

	const [step, setStep] = useState(props.step || 1);
	const [fadeIn, setFadeIn] = useState(props.fadeIn || 5);
	const [fadeOut, setFedeOut] = useState(props.fadeOut || 5);

	const [featuresColor, setFeatureColor] = useState(props.featuresColor || '#eb4034');
	//const [labels, setLabels] = useState(true);
	const [labelColor, setlabelColor] = useState(props.labelColor || '#000');
	const [labelFadeIn, setLabelFadein] = useState(props.labelFadeIn || 5);
	const [labelFadeOut, setLabelFadeOut] = useState(props.labelFadeOut || 5);

	const [currentVal, setCurrentVal] = useState(props.initialVal || minVal);
	const [isPlaying, setIsPlaying] = useState(false);
	const [accumulate, setAccumulate] = useState(props.accumulate || false);
	const [filteredData, setFilteredData] = useState<FeatureCollection>();

	const intervalRef: any = useRef();

	const paint = usePaintPicker(
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
		// the MapLibre-gl instance (mapHook.map) is accessible here
		// initialize the layer and add it to the MapLibre-gl instance or do something else with it
		initializedRef.current = true;
	}, [mapHook.map, props.mapId]);

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	//use callback function from props, if it exists
	useEffect(() => {
		if (props.callback) {
			props.callback(currentVal);
		}
	}, [props.callback, currentVal]);

	//get minimun und maximal time value
	useEffect(() => {
		const neuMin = getMinVal(props.geojson, props.timeField);
		setCurrentVal(neuMin > minVal ? neuMin : minVal);
	}, [minVal, props.geojson, props.timeField]);

	// Data filter
	useEffect(() => {
		if (props.geojson !== undefined && mapHook.map && minVal && maxVal) {
			props.geojson.features = props.geojson.features.filter((e) => {
				return (
					e.properties?.[props.timeField] >= minVal && e.properties?.[props.timeField] <= maxVal
				);
			});
			setFilteredData(props.geojson);
		}
	}, [props.geojson, mapHook.map, minVal, maxVal]);

	// Fit map to bbox
	useEffect(() => {
		if (props.fitBounds && filteredData !== undefined) {
			let geojsonBbox = bbox(filteredData);
			mapHook.map?.map.fitBounds(geojsonBbox as LngLatBoundsLike);
		}
	}, [filteredData]);

	// Player

	const play = React.useCallback(() => {
		let counter = currentVal - minVal;
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(function () {
			if (counter >= maxVal - minVal) {
				clearInterval(intervalRef.current);
				setIsPlaying(false);
			} else {
				setCurrentVal((val: number) => val + step);
			}
			counter = counter + step;
		}, 200);
	}, [step, maxVal, currentVal]);

	const handlePlay = () => {
		setIsPlaying(true);
		play();
	};
	const handlePause = () => {
		setIsPlaying(!isPlaying);
		if (isPlaying) {
			clearInterval(intervalRef.current);
		} else if (!isPlaying) {
			play();
		}
	};

	const handleStop = () => {
		clearInterval(intervalRef.current);
		setCurrentVal(minVal);
		setIsPlaying(false);
	};

	const handleFastRewind = () => {
		if (isPlaying) {
			clearInterval(intervalRef.current);
			setCurrentVal(currentVal - range / 10);
			play();
		} else {
			setCurrentVal(currentVal - range / 10);
		}
	};
	const handleFastForward = () => {
		if (isPlaying) {
			clearInterval(intervalRef.current);
			setCurrentVal(currentVal + range / 10);
			play();
		} else {
			setCurrentVal(currentVal + range / 10);
		}
	};

	//Slider

	const handleChange = (e: any) => {
		//var element = e.target as HTMLInputElement;
		if (!isPlaying) {
			setCurrentVal(e.target.value);
		} else {
			clearInterval(intervalRef.current);
			setCurrentVal(e.target.value);
			play();
		}
	};

	return (
		<>
			<AppBar position="fixed" sx={{ backgroundColor: 'white', width: '90%' }}></AppBar>

			{filteredData && (
				<MlGeoJsonLayer
					type="circle"
					mapId={props.mapId}
					layerId="timeController"
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

			{props.label && (
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

			{props.display && (
				<Box
					sx={{
						position: 'absolute',
						zIndex: 500,
						top: '15%',
						left: '5%',
						width: 140,
						height: 60,
					}}
				>
					<Typography variant="h3">{Math.floor(currentVal)}</Typography>
				</Box>
			)}

			<Drawer
				anchor="bottom"
				open={props.open || true}
				variant="persistent"
				sx={{
					flexShrink: 0,

					'& .MuiDrawer-paper': {
						width: 'auto',
						height: 90,
						alignItems: 'center',
					},
				}}
			>
				<Grid>
					<Button onClick={handleFastRewind}>
						<FastRewindIcon />
					</Button>
					<Button onClick={handleStop}>
						<StopIcon />
					</Button>
					<Button onClick={handlePlay} disabled={isPlaying}>
						<PlayArrowIcon />
					</Button>
					<Button onClick={handlePause}>
						<PauseIcon />
					</Button>
					<Button onClick={handleFastForward}>
						<FastForwardIcon />
					</Button>
				</Grid>

				<Slider
					sx={{
						position: 'flex',
						width: '95%',
						paddingTop: '10px',
						alignSelf: 'center',
					}}
					aria-label="Custom marks"
					defaultValue={props.initialVal || minVal}
					value={currentVal}
					step={step}
					onChange={handleChange}
					min={minVal}
					max={maxVal}
				/>
			</Drawer>
		</>
	);
};

MlTemporalController.defaultProps = {
	mapId: undefined,
};
export default MlTemporalController;
