import React, { useEffect, useState } from 'react';
import * as turf from '@turf/turf';
import { Feature, GeoJSONObject } from '@turf/turf';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ExpandOutlinedIcon from '@mui/icons-material/ExpandOutlined';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import { Box, Button, ButtonGroup, SxProps, Theme, Tooltip } from '@mui/material';
import MlFeatureEditor from '../MlFeatureEditor/MlFeatureEditor';

const EditorModes = [
	{ name: 'Clone', mode: 'clone_polygon', icon: <ContentCopyOutlinedIcon />, id: 1 },
	{ name: 'Resize', mode: 'resize_polygon', icon: <ExpandOutlinedIcon />, id: 2 },
	{ name: 'Rotate', mode: 'rotate_polygon', icon: <RotateRightOutlinedIcon />, id: 3 },
	{ name: 'Cut out', mode: 'cut_polygon', icon: <ContentCutOutlinedIcon />, id: 4 },
	{ name: 'Split', mode: 'split_polygon', icon: <ContentCutOutlinedIcon />, id: 5 },
];

export interface MlPolygonEditorProps {
	mapId?: string;
	insertBeforeLayer?: string;
	buttonStyleOverride?: SxProps;
	inputPolygon?: Feature;
	getResult?: (result: Feature) => void;
	modifyResult?: (result: Feature) => void;
}

const MlPolygonEditor = (props: MlPolygonEditorProps) => {
	const [editMode, setEditMode] = useState<string>();
	const [resizeFactor, setResizeFactor] = useState<number>(1);
	const [rotateFactor, setRotateFactor] = useState<number>(0);
	const [offset, setOffset] = useState<number>(0.01);
	const [cutArea, setCutArea] = useState<GeoJSONObject>();
	const [line, setLine] = useState<Feature>();
	const [splitPolygon, setSplitPolygon] = useState<boolean>(false);
	const [cutMode, setCutMode] = useState<boolean>(false);
	const [resizeWindow, showResizeWindow] = useState<boolean>(false);
	const [rotateWindow, showRotateWindow] = useState<boolean>(false);
	const [offsetWindow, showOffsetWindow] = useState<boolean>(false);

	// Type-checking functions

	const isPolygonOrMultiPolygon = (
		feature: Feature
	): feature is Feature<turf.Polygon | turf.MultiPolygon> => {
		return feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon';
	};

	/* const isLineOrMultiLine = (
		feature: Feature
	): feature is Feature<turf.LineString | turf.MultiLineString> => {
		return feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString';
	};
*/
	const isFeature = (geoJson: GeoJSONObject): geoJson is Feature => {
		return 'type' in geoJson && geoJson.type === 'Feature';
	};

	// Functions for polygon modification

	const handleCut = (el: Feature, cutArea: GeoJSONObject) => {
		if (!el || !cutArea) return;
		if (isPolygonOrMultiPolygon(el) && isPolygonOrMultiPolygon(cutArea as Feature)) {
			const newPolygon = turf.difference(el, cutArea as Feature<turf.Polygon | turf.MultiPolygon>);
			if (newPolygon) {
				props.modifyResult && props.modifyResult(newPolygon);
			} else {
				console.error('The polygons do not overlap or the difference operation failed.');
			}
		}
	};

	const handleClone = (el: Feature, offset: number) => {
		if (!el) return;
		const newEl = turf.clone(el);
		newEl.id = el.id + Math.random().toString();

		const newCoordinates = el.geometry.coordinates[0].map((coord: [number, number]) => [
			coord[0] + offset,
			coord[1],
		]);
		newEl.geometry.coordinates = [newCoordinates];

		props.getResult && props.getResult(newEl);
	};

	const handleRotate = (el: Feature, rotateFactor: number) => {
		const rotateEl = turf.transformRotate(el, rotateFactor);
		props.modifyResult && props.modifyResult(rotateEl);
	};

	const handleResize = (el: Feature, resizeFactor: number) => {
		const scaledEl = turf.transformScale(el, resizeFactor);
		props.modifyResult && props.modifyResult(scaledEl);
	};

	const handleSplit = () => {
		console.log(line);
		if (!props.inputPolygon || !line) return;
		if (isPolygonOrMultiPolygon(props.inputPolygon)) {
			const polyAsLine = turf.polygonToLine(props.inputPolygon);
			console.log(polyAsLine);
			const splittetLines = turf.lineSplit(polyAsLine, line);
			console.log(splittetLines);

			props.modifyResult && props.modifyResult(turf.polygonize(splittetLines.features[0]));
		}
		setSplitPolygon(false);
	};

	useEffect(() => {
		splitPolygon && handleSplit();
	}, [splitPolygon]);

	/*
	if (polyAsLine.type === 'FeatureCollection') {
				return }
				else {
					*/

	// exec Functions specifying conditions

	const clonePolygon = () => {
		if (props.inputPolygon && offset !== undefined) {
			handleClone(props.inputPolygon, offset);
		}
	};

	const resizePolygon = () => {
		if (props.inputPolygon && resizeFactor !== undefined) {
			handleResize(props.inputPolygon, resizeFactor);
		}
	};

	const rotatePolygon = () => {
		if (props.inputPolygon && rotateFactor !== undefined) {
			handleRotate(props.inputPolygon, rotateFactor);
		}
	};

	const cutPolygon = () => {
		if (props.inputPolygon && cutArea && isFeature(cutArea)) {
			handleCut(props.inputPolygon, cutArea as Feature);
		}
	};

	// behaviour for input-changes

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (editMode === 'resize_polygon') setResizeFactor(value);
		else if (editMode === 'rotate_polygon') setRotateFactor(value);
		else if (editMode === 'clone_polygon') setOffset(value);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && editMode === 'resize_polygon') {
			resizePolygon();
		} else if (e.key === 'Enter' && editMode === 'rotate_polygon') {
			rotatePolygon();
		}
	};

	//mode-handling

	useEffect(() => {
		if (props.inputPolygon?.geometry.type !== 'Polygon') {
			console.log('geometry not a polygon');
			return;
		}
		switch (editMode) {
			case 'split_polygon':
				props.inputPolygon;
				showResizeWindow(false);
				showRotateWindow(false);
				showOffsetWindow(false);
				setCutMode(false);
				break;
			case 'cut_polygon':
				props.inputPolygon;
				showResizeWindow(false);
				showRotateWindow(false);
				showOffsetWindow(false);
				setCutMode(true);
				break;
			case 'clone_polygon':
				props.inputPolygon && showOffsetWindow(!offsetWindow);
				showResizeWindow(false);
				showRotateWindow(false);
				setCutMode(false);
				break;
			case 'rotate_polygon':
				props.inputPolygon && showRotateWindow(!rotateWindow);
				showOffsetWindow(false);
				showResizeWindow(false);
				setCutMode(false);
				break;
			case 'resize_polygon':
				props.inputPolygon && showResizeWindow(!resizeWindow);
				showRotateWindow(false);
				showOffsetWindow(false);
				setCutMode(false);
				break;
			case undefined:
				showResizeWindow(false);
				showRotateWindow(false);
				showOffsetWindow(false);
				setCutMode(false);
		}
	}, [editMode, cutMode]);

	// UI Button Color handling

	const EditButtons = () => {
		return (
			<>
				{EditorModes.map((el) => {
					const stateColor = (theme: Theme) => {
						if (editMode === el.mode) {
							return theme.palette.primary.main;
						} else {
							return theme.palette.navigation.navColor;
						}
					};

					const stateIconColor = (theme: Theme) => {
						if (editMode !== el.mode) {
							return theme.palette.primary.main;
						} else {
							return theme.palette.navigation.navColor;
						}
					};

					return (
						<Tooltip title={el.name} key={el.id}>
							<Button
								sx={{
									color: stateIconColor,
									backgroundColor: stateColor,

									'&:hover': {
										backgroundColor: stateColor,
									},
									...props.buttonStyleOverride,
								}}
								onClick={() =>
									editMode === el.mode ? setEditMode(undefined) : setEditMode(el.mode)
								}
							>
								{el.icon}
							</Button>
						</Tooltip>
					);
				})}
			</>
		);
	};

	// JSX

	return (
		<>
			<Box
				sx={{
					zIndex: 104,
				}}
			>
				<ButtonGroup>{props.inputPolygon && <EditButtons />}</ButtonGroup>
				{rotateWindow && !cutMode && (
					<>
						<br></br>
						<label>
							Rotate Polygon by °<br></br>
							<input
								name="Rotate Factor"
								type="number"
								onChange={handleInputChange}
								onKeyDown={handleKeyPress}
							/>
						</label>
						<Button onClick={rotatePolygon}>Enter</Button>
					</>
				)}
				{resizeWindow && !cutMode && (
					<>
						<br></br>
						<label>
							<br></br>
							Resize Polygon by factor
							<input
								name="Resize Factor"
								type="number"
								onChange={handleInputChange}
								onKeyDown={handleKeyPress}
							/>
						</label>
						<Button onClick={resizePolygon}>Enter</Button>
					</>
				)}
				{offsetWindow && !cutMode && (
					<>
						<label>
							<br></br>
							Choose eastern Offset for new Polygon in Degrees
							<br></br>
							<input
								name="offset"
								type="number"
								value={0.01}
								onChange={handleInputChange}
								onKeyDown={handleKeyPress}
							/>
						</label>
						<Button onClick={clonePolygon}>Enter</Button>
					</>
				)}
				{editMode === 'split_polygon' && (
					<MlFeatureEditor
						mapId={props.mapId}
						insertBeforeLayer={props.insertBeforeLayer}
						//	geojson={props.inputPolygon}
						mode="draw_line_string"
						onChange={(state) => {
							state && setLine(state[0] as Feature);
						}}
						onFinish={() => {
							setSplitPolygon(true);
						}}
					/>
				)}
				{editMode === 'cut_polygon' && (
					<MlFeatureEditor
						mapId={props.mapId}
						insertBeforeLayer={props.insertBeforeLayer}
						//	geojson={props.inputPolygon}
						mode="draw_polygon"
						onChange={(state) => {
							state && setCutArea(state[0] as Feature);
						}}
						onFinish={() => {
							cutPolygon();
						}}
					/>
				)}
			</Box>
		</>
	);
};

MlPolygonEditor.defaultProps = {
	mapId: undefined,
};
export default MlPolygonEditor;
