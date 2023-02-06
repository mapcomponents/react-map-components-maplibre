import React, { useState, useCallback } from 'react';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PentagonIcon from '@mui/icons-material/Pentagon';
import { Box } from '@mui/system';
//import useMediaQuery from '@mui/material/useMediaQuery';
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
import LayerListItem from './LayerList/LayerListItem';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { Feature } from '@turf/turf';
import { LngLatLike } from 'maplibre-gl';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

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

/**
 * Component template
 *
 */

const MlSketchTool = (props: MlSketchToolProps) => {
	type SketchStateType = {
		selectedGeoJson: Feature | undefined;
		activeGeometryIndex: number;
		geometries: Feature[];
		drawMode: string;
	};
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	//const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [hoveredGeometry, setHoveredGeometry] = useState<Feature>();
	const [sketchState, setSketchState] = useState<SketchStateType>({
		activeGeometryIndex: 0,
		selectedGeoJson: undefined,
		geometries: [],
		drawMode: '',
	});

	const buttonStyle = {
		...props.buttonStyleOverride,
	};

	const buttonClickHandler = useCallback(
		(buttonDrawMode: string) => {
			console.log(buttonDrawMode);
			sketchState.drawMode !== buttonDrawMode
				? setSketchState((_sketchTool) => ({
						drawMode: buttonDrawMode,
						geometries: _sketchTool.geometries,
						activeGeometryIndex: 0,
						selectedGeoJson: undefined,
				  }))
				: setSketchState((_sketchTool) => ({
						drawMode: '',
						geometries: _sketchTool.geometries,
						activeGeometryIndex: 0,
						selectedGeoJson: undefined,
				  }));
		},
		[sketchState]
	);

	const removeGeoJson = (geoJson: Feature): void => {
		setSketchState((_sketchState) => {
			const tempGeometries = [..._sketchState.geometries];
			tempGeometries.splice(tempGeometries.indexOf(geoJson), 1);

			return {
				..._sketchState,
				geometries: tempGeometries,
				activeGeometryIndex: _sketchState.activeGeometryIndex - 1,
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
					<Tooltip title={'point'}>
						<IconButton sx={buttonStyle} onClick={() => buttonClickHandler('draw_point')}>
							<PanoramaFishEyeIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title={'Line'}>
						<IconButton sx={buttonStyle} onClick={() => buttonClickHandler('draw_line_string')}>
							<ShowChartIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title={'Polygon'}>
						<IconButton sx={buttonStyle} onClick={() => buttonClickHandler('custom_polygon')}>
							<PentagonIcon />
						</IconButton>
					</Tooltip>
				</ButtonGroup>
			</Box>

			{sketchState.drawMode && (
				<MlFeatureEditor
					mode={
						sketchState.drawMode === 'edit'
							? sketchState.selectedGeoJson?.geometry?.type === 'LineString'
								? 'simple_select'
								: 'custom_select'
							: sketchState.drawMode
					}
					geojson={sketchState.drawMode === 'edit' ? sketchState.selectedGeoJson : undefined}
					onChange={(feature: object) => {
						setSketchState((_sketchState) => {
							const _geometries = [...sketchState.geometries];
							if (sketchState.drawMode === 'edit' && sketchState.selectedGeoJson) {
								_geometries[_geometries.indexOf(sketchState.selectedGeoJson)] = feature[0];
							} else {
								if (!sketchState.activeGeometryIndex) {
									const tempFeature = feature[0];
									tempFeature.properties.id = tempFeature.id;

									_geometries.push(tempFeature);
								} else {
									_geometries[sketchState.activeGeometryIndex] = feature[0];
								}
							}
							return {
								..._sketchState,
								activeGeometryIndex:
									_sketchState.drawMode !== 'edit' && feature[0].geometry.type !== 'Point'
										? _geometries.length - 1
										: _sketchState.activeGeometryIndex,
								geometries: _geometries,
							};
						});
					}}
					onFinish={() => {
						setSketchState((_sketchState) => ({
							..._sketchState,
							drawMode: '',
							activeGeometryIndex:
								_sketchState.drawMode !== 'draw_point' ? 0 : _sketchState.activeGeometryIndex,
							selectedGeoJson:
								_sketchState.drawMode !== 'draw_point' ? undefined : _sketchState.selectedGeoJson,
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
									visible={true}
									configurable={true}
									layerComponent={
										<MlGeoJsonLayer mapId={props.mapId} geojson={el} layerId={String(el.id)} />
									}
									type={'layer'}
									name={String(el.id)}
									description={el.geometry.type}
								>
									<SettingsIcon />
								</LayerListItem>
								<IconButton
									onClick={() => {
										mapHook?.map?.map.setCenter(
											el.geometry.type === 'Point'
												? (el.geometry.coordinates as LngLatLike)
												: (turf.centerOfMass(el).geometry.coordinates as LngLatLike)
										);
									}}
								>
									<GpsFixedIcon />
								</IconButton>
								<IconButton
									sx={buttonStyle}
									onClick={() => {
										setSketchState((_sketchState) => ({
											..._sketchState,
											selectedGeoJson: el,
											drawMode: 'edit',
										}));
									}}
								>
									<EditIcon />
								</IconButton>
								<IconButton
									sx={buttonStyle}
									onClick={() => {
										removeGeoJson(el);
									}}
								>
									<DeleteIcon />
								</IconButton>
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
			</List>
			{sketchState.drawMode === 'edit' && (
				<Box>Edit {sketchState.selectedGeoJson?.geometry?.type}</Box>
			)}
		</>
	);
};

MlSketchTool.defaultProps = {
	mapId: undefined,
	buttonStyleOverride: {},
};
export default MlSketchTool;
