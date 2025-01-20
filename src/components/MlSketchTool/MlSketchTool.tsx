import React, { useEffect, useState } from 'react';
import PentagonIcon from '@mui/icons-material/Pentagon';
import { Box } from '@mui/system';
import MlFeatureEditor from '../MlFeatureEditor/MlFeatureEditor';
import List from '@mui/material/List';
import EditIcon from '@mui/icons-material/Edit';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import useMap from '../../hooks/useMap';
import DeleteIcon from '@mui/icons-material/Delete';
import * as turf from '@turf/turf';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import LayerListItem from '../../ui_components/LayerList/LayerListItem';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Feature } from 'geojson';
import { LngLatLike } from 'maplibre-gl';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Button, Theme, Typography } from '@mui/material';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PolylineIcon from '@mui/icons-material/Polyline';

const sketchTools = [
	{ name: 'Point', mode: 'draw_point', icon: <ScatterPlotIcon /> },
	{ name: 'LineString', mode: 'draw_line_string', icon: <PolylineIcon /> },
	{ name: 'Polygon', mode: 'draw_polygon', icon: <PentagonIcon /> },
];

export interface MlSketchToolProps {
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
	 * Callback function that is called each time GeoJson data has changed within MlSketchTool.
	 * First parameter contains all geometries in the `geometries` prop.
	 */
	onChange?: (para: SketchStateType) => void;
}

type SketchStateType = {
	selectedGeoJson?: Feature;
	activeGeometryIndex?: number;
	geometries: Feature[];
	drawMode?: keyof MapboxDraw.Modes;
};

/**
 * Component template
 *
 */

const MlSketchTool = (props: MlSketchToolProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const [hoveredGeometry, setHoveredGeometry] = useState<Feature>();
	const [sketchState, setSketchState] = useState<SketchStateType>({
		activeGeometryIndex: undefined,
		selectedGeoJson: undefined,
		geometries: [],
		drawMode: undefined,
	});

	useEffect(() => {
		if(!(typeof props.onChange === 'function'))return;

		props.onChange(sketchState)
	}, [sketchState, props.onChange])

	const buttonStyle = {
		...props.buttonStyleOverride,
	};

	const buttonClickHandler = (buttonDrawMode: keyof MapboxDraw.Modes) => {
		setSketchState((_state) => ({
			drawMode: _state.drawMode !== buttonDrawMode ? buttonDrawMode : undefined,
			geometries: _state.geometries,
			activeGeometryIndex: undefined,
			selectedGeoJson: undefined,
		}));
	};

	const removeGeoJson = (geoJson: Feature): void => {
		setSketchState((_sketchState) => {
			const _geometries = [..._sketchState.geometries];
			_geometries.splice(_geometries.indexOf(geoJson), 1);

			return {
				..._sketchState,
				geometries: _geometries,
				activeGeometryIndex: _sketchState.activeGeometryIndex
					? _sketchState.activeGeometryIndex - 1
					: undefined,
			};
		});
	};

	const SketchToolButtons = () => {
		return (
			<>
				{sketchTools.map((el) => {
					const stateColor = (theme: Theme) => {
						if (sketchState.drawMode === el.mode) {
							return theme.palette.primary.main;
						} else {
							return theme.palette.navigation.navColor;
						}
					};

					const stateIconColor = (theme: Theme) => {
						if (sketchState.drawMode !== el.mode) {
							return theme.palette.primary.main;
						} else {
							return theme.palette.navigation.navColor;
						}
					};

					return (
						<>
							<Tooltip title={el.name}>
								<Button
									sx={{
										color: stateIconColor,
										backgroundColor: stateColor,

										'&:hover': {
											backgroundColor: stateColor,
										},
										...buttonStyle,
									}}
									onClick={() => buttonClickHandler(el.mode as keyof MapboxDraw.Modes)}
								>
									{el.icon}
								</Button>
							</Tooltip>
						</>
					);
				})}
			</>
		);
	};

	return (
		<>
			<Box
				sx={{
					zIndex: 104,
				}}
			>
				<ButtonGroup>
					<SketchToolButtons />
				</ButtonGroup>
			</Box>

			{sketchState.drawMode && (
				<MlFeatureEditor
					mode={sketchState.drawMode}
					geojson={sketchState.selectedGeoJson}
					onChange={(feature: object) => {
						if (!feature?.[0]) return;

						setSketchState((_sketchState) => {
							const _geometries = [...sketchState.geometries];
							if (typeof _sketchState.activeGeometryIndex === 'undefined') {
								const tempFeature = feature[0];
								tempFeature.properties.id = tempFeature.id;

								_sketchState.activeGeometryIndex = _geometries.length;
								_geometries.push(tempFeature);
							} else {
								_geometries[_sketchState.activeGeometryIndex] = feature[0];
							}
							return {
								..._sketchState,
								geometries: _geometries,
							};
						});
					}}
					onFinish={() => {
						setSketchState((_sketchState) => ({
							..._sketchState,
							drawMode: undefined,
							activeGeometryIndex: undefined,
							selectedGeoJson: undefined,
						}));
					}}
				/>
			)}

			<List sx={{ zIndex: 105, marginBottom: '-10px' }}>
				{sketchState.geometries.map((el) => (
					<>
						<Box key={el.id} sx={{ display: 'flex', flexDirection: 'column' }}>
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
									setHoveredGeometry(el);
								}}
								onMouseLeave={() => {
									setHoveredGeometry(undefined);
								}}
							>
								{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
								{/* @ts-ignore-next-line */}
								<LayerListItem
									listItemSx={buttonStyle}
									configurable={true}
									layerComponent={
										<MlGeoJsonLayer mapId={props.mapId} geojson={el} layerId={String(el.id)} />
									}
									type={'layer'}
									name={String(el.id)}
									description={el.geometry.type}
								></LayerListItem>
								<Box
									sx={{
										padding: '3px 30px',
									}}
								>
									<ButtonGroup size="small">
										<Button
											onClick={() => {
												mapHook?.map?.map.setCenter(
													el.geometry.type === 'Point'
														? (el.geometry.coordinates as LngLatLike)
														: (turf.centerOfMass(el).geometry.coordinates as LngLatLike)
												);
											}}
										>
											<GpsFixedIcon />
										</Button>
										<Button
											sx={buttonStyle}
											onClick={() => {
												setSketchState((_sketchState) => ({
													..._sketchState,
													selectedGeoJson: el,
													activeGeometryIndex: _sketchState.geometries.indexOf(el),
													drawMode: 'simple_select',
												}));
											}}
										>
											<EditIcon />
										</Button>
										<Button
											sx={buttonStyle}
											onClick={() => {
												removeGeoJson(el);
												setHoveredGeometry(undefined);
											}}
										>
											<DeleteIcon />
										</Button>
									</ButtonGroup>
								</Box>
							</Box>
						</Box>
					</>
				))}
				{hoveredGeometry && (
					<MlGeoJsonLayer
						mapId={props.mapId}
						geojson={{ type: 'FeatureCollection', features: [hoveredGeometry] }}
						layerId={'highlightBorder'}
						defaultPaintOverrides={{
							circle:{
							'circle-color': '#dd9900',
							'circle-opacity': 0.4,
							'circle-radius': 10,
						},
							line:{
							'line-color': '#dd9900',
							'line-opacity': 0.4,
							'line-width': 10,
						},
							fill:{
							'fill-color': '#dd9900',
							'fill-opacity': 0.4
						},
						}}
					/>
				)}
			</List>
			{sketchState.drawMode === 'simple_select' && (
				<Typography sx={{ fontSize: '0.6em' }}>
					Edit {sketchState.selectedGeoJson?.geometry?.type}
				</Typography>
			)}
		</>
	);
};

MlSketchTool.defaultProps = {
	mapId: undefined,
	buttonStyleOverride: {},
};
export default MlSketchTool;
