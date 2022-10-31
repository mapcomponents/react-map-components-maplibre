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
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import useMap from '../../hooks/useMap';

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
	const mapHook = useMap('map_1');
	const mediaIsMobile = useMediaQuery('(max-width:900px)');
	const [drawMode, setDrawMode] = useState('');
	const [geometries, setGeometries] = useState([]);
	const [activeGeometryIndex, setActiveGeometryIndex] = useState();
	const [selectedGeoJson, setSelectedGeoJson] = useState();
	const [hasFeatureSelected, setHasFeatureSelected] = useState(false);

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
		if (!mapHook.map.map.queryRenderedFeatures(e.point, { layers: [selectedGeoJson.id] })[0]) {
			setDrawMode('');
			setHasFeatureSelected(false);
		}
	};

	useEffect(() => {
		if (!geometries || !selectedGeoJson) return;
		hasFeatureSelected
			? mapHook.map.map.on('click', clickHandler)
			: mapHook.map.map.off('click', clickHandler);
	}, [selectedGeoJson, hasFeatureSelected]);

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
						let _geometries = [...geometries];
						console.log(feature, _geometries, geometries);
						if (drawMode === 'edit') {
							_geometries[_geometries.indexOf(selectedGeoJson)] = feature[0];
						} else {
							if (!activeGeometryIndex) {
								_geometries.push(...feature);
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
						<ListItem>
							<IconButton
								onClick={() => {
									setSelectedGeoJson(el);
									setHasFeatureSelected(true);
									setDrawMode('edit');
								}}
							>
								<ListItemText primary={el?.geometry.type} secondary={el.id} />
							</IconButton>
						</ListItem>
						<MlGeoJsonLayer geojson={el} layerId={el.id} />
					</>
				))}
			</List>
			{drawMode === 'edit' && <Box>Edit {selectedGeoJson?.geometry?.type}</Box>}
		</>
	);
};

MlSketchTool.defaultProps = {
	mapId: undefined,
};
export default MlSketchTool;
