import React, { useState, useCallback, useEffect } from 'react';
import Button from '@mui/material/Button';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PentagonIcon from '@mui/icons-material/Pentagon';
import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import MlFeatureEditor from '../MlFeatureEditor/MlFeatureEditor';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import useMap from '../../hooks/useMap';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIconButton from '@mui/material/ListItemButton';
import * as turf from '@turf/turf';

interface MlSketchToolProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
}

/**
 * Component template
 *
 */
const MlSketchTool = (props: MlSketchToolProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [drawMode, setDrawMode] = useState('');
	const [geometries, setGeometries] = useState([]);
	const [activeGeometryIndex, setActiveGeometryIndex] = useState();
	const [selectedGeoJson, setSelectedGeoJson] = useState();

	const buttonStyle = {
		minWidth: '20px',
		minHeight: '20px',
		width: mediaIsMobile ? '50px' : '30px',
		height: mediaIsMobile ? '50px' : '30px',
		backgroundColor: '#414141',
		borderRadius: '23%',
		margin: 0.15,
		fontSize: mediaIsMobile ? '1.4em' : '1.2em',
		':hover': {
			backgroundColor: '#515151',
		},
		color: '#ececec',
	};

	const buttonClickHandler = useCallback(
		(buttonDrawMode: string) => {
			drawMode !== buttonDrawMode ? setDrawMode(buttonDrawMode) : setDrawMode('');
		},
		[drawMode]
	);

	const clickHandler = (e) => {
		if (!mapHook?.map?.map.queryRenderedFeatures(e.point, { layers: [selectedGeoJson.id] })[0]) {
			setDrawMode('');
			setSelectedGeoJson(undefined);
		}
	};

	const removeGeoJson = (geoJson) => {
		const tempGeometries = [...geometries];
		tempGeometries.splice(tempGeometries.indexOf(geoJson), 1);
		setGeometries(tempGeometries);
		setActiveGeometryIndex(activeGeometryIndex - 1);
		console.log(geometries, activeGeometryIndex);
	};

	useEffect(() => {
		if (!geometries || !selectedGeoJson) return;
		selectedGeoJson
			? mapHook?.map?.map.on('click', clickHandler)
			: mapHook?.map?.map.off('click', clickHandler);
	}, [selectedGeoJson]);

	return (
		<>
			<Box
				sx={{
					zIndex: 104,
				}}
			>
				<Button sx={buttonStyle} onClick={() => buttonClickHandler('draw_point')}>
					<PanoramaFishEyeIcon />
				</Button>
				<Button sx={buttonStyle} onClick={() => buttonClickHandler('draw_line_string')}>
					<ShowChartIcon />
				</Button>
				<Button sx={buttonStyle} onClick={() => buttonClickHandler('custom_polygon')}>
					<PentagonIcon />
				</Button>
			</Box>

			{drawMode && (
				<MlFeatureEditor
					mode={
						drawMode === 'edit'
							? selectedGeoJson?.geometry?.type === 'LineString'
								? 'simple_select'
								: 'custom_select'
							: drawMode
					}
					geojson={drawMode === 'edit' ? selectedGeoJson : undefined}
					onChange={(feature: any) => {
						const _geometries = [...geometries];
						console.log(feature, _geometries, geometries);
						if (drawMode === 'edit') {
							_geometries[_geometries.indexOf(selectedGeoJson)] = feature[0];
						} else {
							if (!activeGeometryIndex) {
								const tempFeature = feature[0];
								tempFeature.properties.id = tempFeature.id;

								_geometries.push(tempFeature);
								setActiveGeometryIndex(_geometries.length - 1);
							} else {
								_geometries[activeGeometryIndex] = feature;
							}
						}
						setGeometries(_geometries);
					}}
				/>
			)}

			<List sx={{ zIndex: 105 }}>
				{geometries.map((el) => (
					<>
						<ListItem sx={{ display: 'flex', flexDirection: 'column' }}>
							<ListIconButton
								onMouseOver={() => {
									mapHook?.map?.setFeatureState(
										{ source: 'highlightBorder', id: el.properties.id },
										{ hover: true }
									);
									console.log(el.id, 'in');
									console.log(geometries, mapHook);
								}}
								onMouseLeave={() => {
									mapHook?.map?.setFeatureState(
										{ source: 'highlightBorder', id: el.properties.id },
										{ hover: false }
									);
									console.log(el?.id, 'leave');
								}}
								onClick={() => {
									const centerPoint =
										el.geometry.type === 'Point' ? el.geometry.coordinates : turf.centerOfMass(el);
									mapHook.map.map.setCenter(centerPoint.geometry.coordinates);
								}}
							>
								{el.id}
							</ListIconButton>
							<br />
							<Box flexDirection={'row'}>
								<Button
									sx={buttonStyle}
									onClick={() => {
										setSelectedGeoJson(el);
										setDrawMode('edit');
									}}
								>
									<EditIcon />
								</Button>
								<Button
									sx={buttonStyle}
									onClick={() => {
										console.log(el);
									}}
								>
									<SettingsIcon />
								</Button>
								<Button
									sx={buttonStyle}
									onClick={() => {
										removeGeoJson(el);
									}}
								>
									<DeleteIcon />
								</Button>
							</Box>
						</ListItem>
						<MlGeoJsonLayer mapId={props.mapId} geojson={el} layerId={el.id} />
					</>
				))}
				{geometries?.[0] && (
					<MlGeoJsonLayer
						mapId={props.mapId}
						geojson={{ type: 'FeatureCollection', features: geometries }}
						type={'line'}
						layerId={'highlightBorder'}
						paint={{
							'line-color': '#dd9900',
							'line-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.2],
							'line-width': 10,
						}}
					/>
				)}
			</List>
			{drawMode === 'edit' && <Box>Edit {selectedGeoJson?.geometry?.type}</Box>}
		</>
	);
};
//["case", ["boolean", ["feature-state", "hover"], false], 7
MlSketchTool.defaultProps = {
	mapId: undefined,
};
export default MlSketchTool;
