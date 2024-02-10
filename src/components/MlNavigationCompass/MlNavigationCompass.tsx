import React, { useState, useEffect, CSSProperties } from 'react';
import { Box, styled } from '@mui/material';
import { ReactComponent as CompassNeedle } from './assets/CompassNeedle.svg';
import { ReactComponent as CompassBackground } from './assets/CompassBackground.svg';
import useMap from '../../hooks/useMap';

const BoxStyled = styled(Box)(({ theme }) => ({
	zIndex: 1000,
	cursor: 'pointer',
	transform: 'scale(1)',
	[theme.breakpoints.down('md')]: {
		transform: 'scale(1.6)',
	},
}));
const CompassBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	right: '-10px',
	top: '-52px',
	width: '52px',
	height: '52px',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	[theme.breakpoints.down('md')]: {
		right: '0px',
		top: '-52px',
	},
	circle: {
		fill: theme.palette.compass.compColor,
		stroke: theme.palette.compass.compStroke,
	},
	path: {
		fill: theme.palette.compass.compStroke,
	},
	'&:hover circle': {
		fill: theme.palette.compass.compHover,
	},
}));
const NeedleBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	'path:nth-of-type(2)': {
		fill: theme.palette.compass.compSouth,
	},
	'path:nth-of-type(1)': {
		fill: theme.palette.compass.compNorth,
	},
}));

export interface MlNavigationCompassProps {
	/**
	 * Id of the target MapLibre instance in mapHook
	 */
	mapId?: string;
	/**
	 * The layerId of an existing layer this layer should be rendered visually beneath
	 * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
	 */
	insertBeforeLayer?: string;
	/**
	 * Style object to adjust css definitions of the component.
	 */
	style?: CSSProperties;
	/**
	 * Style object to adjust css definitions of the background.
	 */
	backgroundStyle?: CSSProperties;
	/**
	 * Style object to adjust css definitions of the compass needle.
	 */
	needleStyle?: CSSProperties;
}
/**
 * Navigation component that displays a compass component which indicates the current oriantation of the map it is registered for and offers controls to turn the bearing 90° left/right or reset north to point up.
 *
 * All style props are applied using @mui/material/styled to allow more complex css selectors.
 *
 * @component
 */
const MlNavigationCompass = (props: MlNavigationCompassProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [bearing, setBearing] = useState(0);
	const _updateBearing = () => {
		if (!mapHook.map?.map?.getBearing) return;
		setBearing(Math.round(mapHook.map.map.getBearing()));
	};
	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map.on('rotate', _updateBearing, mapHook.componentId);
		_updateBearing();
		return () => {
			mapHook.map?.map.off('rotate', _updateBearing);
		};
	}, [mapHook.map, props.mapId]);

	const rotate = () => {
		if (bearing == 0) {
			mapHook.map?.map.setBearing(-90);
		} else if (bearing == -90) {
			mapHook.map?.map.setBearing(180);
		} else if (bearing == 180) {
			mapHook.map?.map.setBearing(90);
		} else {
			mapHook.map?.map.setBearing(0);
		}
	};

	return (
		<>
			<BoxStyled sx={{ ...props.style }}>
				<CompassBox onClick={rotate} sx={{ ...props.backgroundStyle }}>
					<CompassBackground style={{ position: 'absolute', top: 0, left: 0 }} />
					<NeedleBox onClick={rotate} sx={{ ...props.needleStyle }}>
						<CompassNeedle
							style={{
								transform: 'rotate(' + (bearing > 0 ? '-' + bearing : -1 * bearing) + 'deg)',
							}}
						/>
					</NeedleBox>
				</CompassBox>
			</BoxStyled>
		</>
	);
};

export default MlNavigationCompass;
