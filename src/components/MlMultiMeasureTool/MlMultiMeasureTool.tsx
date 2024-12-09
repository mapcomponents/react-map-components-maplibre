import React, { Fragment, useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SxProps, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as turf from '@turf/turf';
import PolylineIcon from '@mui/icons-material/Polyline';
import PentagonIcon from '@mui/icons-material/Pentagon';
import { Feature } from 'geojson';
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
		unit?: string;
		geojson: Feature;
		geometries?: [];
	}) => void;

	/**
	 * Callback function that is called by the end of drawing geometries.
	 */
	onFinish?: () => void;
}

type MeasureStateType = {
	measure: number;
	unit?: string ;
	selectedGeoJson?: Feature;
	activeGeometryIndex?: number;
	geometries?: Feature[];
	geojson?: Feature;
	drawMode?: keyof MapboxDraw.Modes;
};

const MlMultiMeasureTool = (props: MlMultiMeasureToolProps) => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [selectedMode, setSelectedMode] = useState(props.measureType);
	const [hoveredGeometry, setHoveredGeometry] = useState<Feature>();

	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [measureState, setMeasureState] = useState<MeasureStateType | undefined>();
	const [selectedUnit, setSelectedUnit] = useState<turf.Units>('kilometers');

	const [measureList, setMeasureList] = useState<any>([]);

	const [reload, setReload] = useState(false);

	const unitSwitch = () => {
		if (selectedUnit === 'kilometers') {
			setSelectedUnit('miles');
		}
		if (selectedUnit === 'miles') {
			setSelectedUnit('kilometers');
		}
	};

	const handleDelete = (Index: number) => {
		setMeasureList((current: any) => {
			const newList = [...current];
			newList.splice(Index, 1);
			setHoveredGeometry(undefined);
			return newList;
		});
	};

	const handleMeasureChange = (options: {
		value: number;
		unit?: string;
		geojson?: Feature;
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

	useEffect(() => {
		setMeasureState(undefined);
	}, [selectedUnit]);

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Multi Measure Tool'}>
				<Box sx={{ flexGrow: 1 }}>
					<br />
					<Grid container spacing={4} justifyContent="flex-start">
						<Grid item xs={3}>
							<Tooltip title="Measure Area">
								<Button
									variant="outlined"
									sx={{
										backgroundColor:
											selectedMode === 'polygon'
												? (theme) => theme.palette.GPS.GPSActiveColor
												: (theme) => theme.palette.GPS.GPSActiveBackgroundColor,
										color:
											selectedMode === 'polygon'
												? (theme) => theme.palette.GPS.GPSActiveBackgroundColor
												: (theme) => theme.palette.GPS.GPSActiveColor,
									}}
									onClick={() => {
										setSelectedMode('polygon');
										setMeasureState(undefined);
										setReload(true);
									}}
								>
									<PentagonIcon />
								</Button>
							</Tooltip>
						</Grid>
						<Grid item xs={3}>
							<Tooltip title="Measure Distance">
								<Button
									variant="outlined"
									sx={{
										backgroundColor:
											selectedMode === 'line'
												? (theme) => theme.palette.GPS.GPSActiveColor
												: (theme) => theme.palette.GPS.GPSActiveBackgroundColor,
										color:
											selectedMode === 'line'
												? (theme) => theme.palette.GPS.GPSActiveBackgroundColor
												: (theme) => theme.palette.GPS.GPSActiveColor,
									}}
									onClick={() => {
										setSelectedMode('line');
										setMeasureState(undefined);
										setReload(true);
									}}
								>
									<PolylineIcon />
								</Button>
							</Tooltip>
						</Grid>
					</Grid>
				</Box>

				<br />

				<Grid item xs={4}>
					<FormControl>
						<InputLabel id="unit-select-label">Unit</InputLabel>
						<Select
							labelId="unit-select-label"
							id="unit-select"
							value={selectedUnit}
							label="Unit"
							onChange={(e) => {
								setSelectedUnit(e.target.value as turf.Units);
								setMeasureState(undefined);
								setReload(true);
							}}
						>
							<MenuItem value="kilometers">Kilometers</MenuItem>
							<MenuItem value="miles">Miles</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<br />

				{!reload && (
					<MlMeasureTool
						measureType={selectedMode}
						unit={selectedUnit}
						onChange={handleMeasureChange}
						{...unitSwitch}
						onFinish={() => {
							setReload(true);
						}}
					/>
				)}
				<LayerList>
					{measureList?.map(
						(measure: { measure: number; unit?: string; geojson: Feature }, Index: number) => (
							<>
								<Box key={measure.measure} sx={{ display: 'flex', flexDirection: 'column' }}>
									<br />
									<Box
										flexDirection={'row'}
										sx={{
											'&:hover': {
												backgroundColor: 'rgb(177, 177, 177, 0.2)',
											},
											marginTop: '25px',
										}}
										onMouseOver={() => {
											setHoveredGeometry(measure.geojson);
										}}
										onMouseLeave={() => {
											setHoveredGeometry(undefined);
										}}
									>
										<Fragment key={measure.measure + '-' + Index}>
											<LayerListItem
												key={measure.measure}
												layerComponent={
													<MlGeoJsonLayer
														mapId={props.mapId}
														geojson={measure.geojson as Feature}
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
																: (turf.centerOfMass(measure.geojson).geometry
																		.coordinates as LngLatLike)
														);
													}}
												>
													<GpsFixedIcon />
												</Button>
											</Tooltip>
										</Fragment>
									</Box>
								</Box>
							</>
						)
					)}
					{hoveredGeometry && (
						<MlGeoJsonLayer
							mapId={props.mapId}
							geojson={{ type: 'FeatureCollection', features: [hoveredGeometry] }}
							layerId={'highlightBorder'}
							defaultPaintOverrides={{
								circle: {
									'circle-color': '#dd9900',
									'circle-opacity': 0.4,
									'circle-radius': 10,
								},
								line: {
									'line-color': '#dd9900',
									'line-opacity': 0.4,
									'line-width': 10,
								},
								fill: {
									'fill-color': '#dd9900',
									'fill-opacity': 0.4,
								},
							}}
						/>
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
