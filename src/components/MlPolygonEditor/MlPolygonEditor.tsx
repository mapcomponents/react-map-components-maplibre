import React, { useState } from 'react';
import useMap from '../../hooks/useMap';
import * as turf from '@turf/turf';
import { Feature } from '@turf/turf';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ExpandOutlinedIcon from '@mui/icons-material/ExpandOutlined';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Button, ButtonGroup, List, SxProps, Theme, Tooltip } from '@mui/material';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import LayerListItem from '../../ui_components/LayerList/LayerListItem';
import { LngLatLike } from 'maplibre-gl';

const EditorModes = [
	{ name: 'Clone', mode: 'clone_polygon', icon: <ContentCopyOutlinedIcon /> },
	{ name: 'Resize', mode: 'resize_polygon', icon: <ExpandOutlinedIcon /> },
	{ name: 'Rotate', mode: 'rotate_polygon', icon: <RotateRightOutlinedIcon /> },
	{ name: 'Split', mode: 'split_polygon', icon: <ContentCutOutlinedIcon /> },
	{ name: 'Cut out', mode: 'cut_polygon', icon: <ContentCutOutlinedIcon /> },
];

export interface MlPolygonEditorProps {
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

	inputPolygon?: Feature;

	getResult?: () => void;
}

type EditType = {
	selectedGeoJson?: Feature;
	activeGeometryIndex?: number;
	geometries: Feature[];
	mode?: string;
};

/**
 * Component template
 *
 */
const MlPolygonEditor = (props: MlPolygonEditorProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [hoveredGeometry, setHoveredGeometry] = useState<Feature>();

	const [editState, setEditState] = useState<EditType>({
		activeGeometryIndex: undefined,
		selectedGeoJson: undefined,
		geometries: [],
		mode: undefined,
	});

	const buttonStyle = {
		...props.buttonStyleOverride,
	};

	const removeGeoJson = (geoJson: Feature): void => {
		setEditState((editState) => {
			const _geometries = [...editState.geometries];
			_geometries.splice(_geometries.indexOf(geoJson), 1);

			return {
				...editState,
				geometries: _geometries,
				activeGeometryIndex: editState.activeGeometryIndex
					? editState.activeGeometryIndex - 1
					: undefined,
			};
		});
	};

	const EditButtons = () => {
		return (
			<>
				{EditorModes.map((el) => {
					const stateColor = (theme: Theme) => {
						if (EditorModes[0].mode === el.mode) {
							return theme.palette.primary.main;
						} else {
							return theme.palette.navigation.navColor;
						}
					};

					const stateIconColor = (theme: Theme) => {
						if (EditorModes[0].mode !== el.mode) {
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
					<EditButtons />
				</ButtonGroup>
			</Box>

			<List sx={{ zIndex: 105, marginBottom: '-10px' }}>
				{editState.geometries.map((el) => (
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
												removeGeoJson(el);
												setHoveredGeometry(undefined);
											}}
										>
											<DeleteOutlineOutlinedIcon />
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
			</List>
		</>
	);
};

MlPolygonEditor.defaultProps = {
	mapId: undefined,
};
export default MlPolygonEditor;
