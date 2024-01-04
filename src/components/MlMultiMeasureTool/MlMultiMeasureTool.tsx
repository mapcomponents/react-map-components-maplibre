import React, { Fragment, useEffect, useState } from 'react';
import { Button, SxProps, Tooltip } from '@mui/material';
import * as turf from '@turf/turf';
import PolylineIcon from '@mui/icons-material/Polyline';
import PentagonIcon from '@mui/icons-material/Pentagon';
import { Feature, GeoJSONObject, Geometry, GeometryCollection, Properties } from '@turf/turf';
import MlMeasureTool from '../MlMeasureTool/MlMeasureTool';
import LayerList from '../../ui_components/LayerList/LayerList';
import LayerListItem from '../../ui_components/LayerList/LayerListItem';
import Sidebar from '../../ui_components/Sidebar';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import useMap from '../../hooks/useMap';
import DeleteIcon from '@mui/icons-material/Delete';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { LngLatLike } from 'maplibre-gl';

export interface MlMultiMeasureToolProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
	/**
	 * Style attribute for the button-style
	 * https://mui.com/system/getting-started/the-sx-prop/
	 */
	buttonStyleOverride?: SxProps;
	/**
	 * String that specify if the Tool measures an area ("polygon") or length ("line")
	 */
	measureType?: 'polygon' | 'line';
	/**
	 * Boolean which decides if the user can switch between measure modes
	 */
	multiType?: boolean;
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

type MeasureStateType = {
	measure: number | undefined;
	unit: string | undefined;
	selectedGeoJson?: Feature;
	activeGeometryIndex?: number;
	geometries?: Feature[];
	geojson: GeoJSONObject | undefined;
	drawMode?: keyof MapboxDraw.Modes;
};

function getUnitSquareMultiplier(measureType: string | undefined) {
	return measureType === 'miles' ? 1 / 2.58998811 : 1;
}

// function getUnitLabel(measureType: string | undefined) {
//	return measureType === 'miles' ? 'mi' : 'km'; }

const MlMultiMeasureTool = (props: MlMultiMeasureToolProps) => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [selectedMode, setSelectedMode] = useState(props.measureType);
	const [currentFeatures, setCurrentFeatures] = useState<GeoJSONObject[]>([]);
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const buttonStyle = {
		...props.buttonStyleOverride,
	};

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
		}
	}, [props.unit, currentFeatures]);

	const [measureState, setMeasureState] = useState<MeasureStateType | undefined>();

	const [measureList, setMeasureList] = useState<any>([]);
	console.log(measureList);

	const [reload, setReload] = useState(false);

	const handleDelete = (Index: number) => {
		setMeasureList((current: any) => {
			const newList = [...current];
			newList.splice(Index, 1);
			return newList;
		});
	};

	const handleMeasureChange = (options: {
		value: number;
		unit: string | undefined;
		geojson: GeoJSONObject | undefined;
	}) => {
		setMeasureState({
			measure: options.value,
			unit: options.unit,
			geojson: options.geojson,
		});
	};

	useEffect(() => {
		reload && setReload(false);
		reload &&
			measureState &&
			setMeasureList((current: any) => {
				const newList = [...current];
				newList.push(measureState);
				return newList;
			});
	}, [reload]);

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Multi Measure Tool'}>
				<Tooltip title="Measure Area">
					<Button
						variant="outlined"
						sx={{ ...buttonStyle }}
						onClick={() => {
							setSelectedMode('polygon');
							setMeasureState(undefined);
							setReload(true);
						}}
					>
						<PentagonIcon />
					</Button>
				</Tooltip>
				<Tooltip title="Measure Distance">
					<Button
						variant="outlined"
						sx={{ ...buttonStyle }}
						onClick={() => {
							setSelectedMode('line');
							setMeasureState(undefined);
							setReload(true);
						}}
					>
						<PolylineIcon />
					</Button>
				</Tooltip>
				{!reload && (
					<MlMeasureTool
						measureType={selectedMode}
						onChange={handleMeasureChange}
						onFinish={() => {
							setReload(true);
						}}
					/>
				)}
				<LayerList>
					{measureList?.map(
						(measure: { measure: number; unit?: string; geojson: Feature }, Index: number) => (
							<Fragment key={measure.measure + '-' + Index}>
								<LayerListItem
									key={measure.measure}
									layerComponent={
										<MlGeoJsonLayer
											mapId={props.mapId}
											geojson={
												measure.geojson as Feature<Geometry | GeometryCollection, Properties>
											}
										/>
									}
									visible={true}
									configurable={true}
									type="layer"
									name={
										measure.geojson.geometry?.type === 'LineString'
											? measure.measure.toFixed(3).toString() + ' ' + measure.unit
											: measure.measure.toFixed(3).toString() + ' ' + measure.unit + '²'
									}
								/>
								<Tooltip title="Delete">
									<Button onClick={() => handleDelete(Index)}>
										{' '}
										<DeleteIcon />{' '}
									</Button>
								</Tooltip>
								<Tooltip title="Center Location">
									<Button
										onClick={() => {
											mapHook?.map?.map.setCenter(
												measure.geojson.geometry.type === 'Point'
													? (measure.geojson.geometry.coordinates as LngLatLike)
													: (turf.centerOfMass(measure.geojson).geometry.coordinates as LngLatLike)
											);
										}}
									>
										<GpsFixedIcon />
									</Button>
								</Tooltip>
							</Fragment>
						)
					)}
				</LayerList>
			</Sidebar>
		</>
	);
};

MlMultiMeasureTool.defaultProps = {
	mapId: undefined,
	measureType: 'polygon',
	buttonStyleOverride: {},
};

export default MlMultiMeasureTool;
