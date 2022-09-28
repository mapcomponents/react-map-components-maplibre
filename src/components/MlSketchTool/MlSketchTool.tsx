import React, { useRef, useEffect, useState, useCallback } from 'react';
import useMap from '../../hooks/useMap';
import Button from '@mui/material/Button';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PentagonIcon from '@mui/icons-material/Pentagon';
import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import MlFeatureEditor from '../MlFeatureEditor/MlFeatureEditor';

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

	return (
		<>
			<Box
				sx={{
					zIndex: 104,
					position: 'absolute',
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

			{/*drawMode !== 'edit' && drawMode !== '' && (
				<Box
					sx={{
						zIndex: 104,
						height: '200px',
						width: '400px',
						position: 'absolute',
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: '#ececec',
						left: '30%',
					}}
				>
					Bearbeitungsmenu
				</Box>
			)*/}

			{drawMode ? (
				drawMode === 'edit' ? (
					<MlFeatureEditor mode={'edit'} />
				) : (
					<MlFeatureEditor
						mode={drawMode}
						onChange={(feature: any) => {
							let _geometries = [...geometries];
							console.log(feature, _geometries);
							if (!activeGeometryIndex) {
								_geometries.push(feature);
								setActiveGeometryIndex(_geometries.length - 1);
							} else {
								_geometries[activeGeometryIndex] = feature;
							}

							setGeometries(_geometries);
						}}
					/>
				)
			) : (
				<MlFeatureEditor />
			)}
		</>
	);
};

MlSketchTool.defaultProps = {
	mapId: undefined,
};
export default MlSketchTool;
