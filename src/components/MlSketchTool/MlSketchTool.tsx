import React, { useState, useCallback } from 'react';
import PentagonIcon from '@mui/icons-material/Pentagon';
import { Box } from '@mui/system';
import MlFeatureEditor from '../MlFeatureEditor/MlFeatureEditor';
import List from '@mui/material/List';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import useMap from '../../hooks/useMap';
import DeleteIcon from '@mui/icons-material/Delete';
import * as turf from '@turf/turf';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LayerListItem from '../../ui_components/LayerList/LayerListItem';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Feature } from '@turf/turf';
import { LngLatLike } from 'maplibre-gl';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Button, Typography } from '@mui/material';

import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PolylineIcon from '@mui/icons-material/Polyline';


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
	//const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [hoveredGeometry, setHoveredGeometry] = useState<Feature>();
	const [sketchState, setSketchState] = useState<SketchStateType>({
		activeGeometryIndex: undefined,
		selectedGeoJson: undefined,
		geometries: [],
		drawMode: undefined,
	});

	const buttonStyle = {
		...props.buttonStyleOverride,
	};

	const buttonClickHandler = (buttonDrawMode: keyof MapboxDraw.Modes) => {
		setSketchState((_state) => ({
			drawMode: _state.drawMode !== buttonDrawMode ? buttonDrawMode : undefined,
			geometries: _state.geometries,
			activeGeometryIndex: undefined,
			selectedGeoJson: undefined,
		}))
	};

	const removeGeoJson = (geoJson: Feature): void => {
		setSketchState((_sketchState) => {
			const _geometries = [..._sketchState.geometries];
			_geometries.splice(_geometries.indexOf(geoJson), 1);

			return {
				..._sketchState,
				geometries: _geometries,
				activeGeometryIndex: _sketchState.activeGeometryIndex ? _sketchState.activeGeometryIndex - 1 : undefined,
			};
		});
	};

	return (
		<>
			<Box
				sx={{
					zIndex: 104,
				}}
			>
				<ButtonGroup>
					<Tooltip title={'Point'}>
						<Button sx={buttonStyle} onClick={() => buttonClickHandler('draw_point')}>
							<ScatterPlotIcon />
						</Button>
					</Tooltip>
					<Tooltip title={'LineString'}>
						<Button sx={buttonStyle} onClick={() => buttonClickHandler('draw_line_string')}>
							<PolylineIcon />
						</Button>
					</Tooltip>
					<Tooltip title={'Polygon'}>
						<Button sx={buttonStyle} onClick={() => buttonClickHandler('draw_polygon')}>
							<PentagonIcon />
						</Button>
					</Tooltip>
				</ButtonGroup>
			</Box>

			{sketchState.drawMode && (
				<MlFeatureEditor
					mode={
						sketchState.drawMode
					}
					geojson={sketchState.selectedGeoJson}
					onChange={(feature: object) => {
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

			<List sx={{ zIndex: 105 }}>
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
									sx={buttonStyle}
									configurable={true}
									layerComponent={
										<MlGeoJsonLayer mapId={props.mapId} geojson={el} layerId={String(el.id)} />
									}
									type={'layer'}
									name={String(el.id)}
									description={el.geometry.type}
								>
								</LayerListItem>
								<Box sx={{
									padding: '3px'
								}} >
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
						type={'line'}
						layerId={'highlightBorder'}
						paint={{
							'line-color': '#dd9900',
							'line-opacity': 0.4,
							'line-width': 10,
						}}
					/>
				)}
			</List >
			{
				sketchState.drawMode === 'simple_select' && (
					<Typography sx={{ fontSize: '0.6em' }}>Edit {sketchState.selectedGeoJson?.geometry?.type}</Typography>
				)
			}
		</>
	);
};

MlSketchTool.defaultProps = {
	mapId: undefined,
	buttonStyleOverride: {},
};
export default MlSketchTool;
