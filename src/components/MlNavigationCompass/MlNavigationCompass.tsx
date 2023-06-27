import React, { useState, useEffect, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { Box, useMediaQuery } from '@mui/material';
import useMap from '../../hooks/useMap';
import { ReactComponent as CompassNeedle } from './assets/CompassNeedle.svg';
import { ReactComponent as CompassBackground } from './assets/CompassBackground.svg';
import getTheme from '../../ui_components/MapcomponentsTheme';

interface MlNavigationCompassProps {
	mapId?: string;
	insertBeforeLayer?: string;
	style?: CSSProperties;
	backgroundStyle?: CSSProperties;
	needleStyle?: CSSProperties;
}
/**
 * Navigation component that displays a compass component which indicates the current oriantation of the map it is registered for and offers controls to turn the bearing 90° left/right or reset north to point up.
 *
 * All style props are applied using @emotion/css to allow more complex css selectors.
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
	const theme = getTheme('light');
	const mediaIsMobile = useMediaQuery(theme.breakpoints.down('md'));

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
			<Box
				sx={{
					zIndex: 1000,
					transform: mediaIsMobile ? 'scale(1.6)' : 'scale(1)',
					cursor: 'pointer',
					...props.style,
				}}
			>
				<Box
					onClick={rotate}
					sx={{
						position: 'absolute',
						right: mediaIsMobile ? '0px' : '-10px',
						top: mediaIsMobile ? '-52px' : '-52px',
						circle: {
							fill: theme.palette.compass.compColor,
						},
						'&:hover circle': {
							fill: theme.palette.compass.compHover,
						},
						...props.backgroundStyle,
					}}
				>
					<CompassBackground />
					<Box
						onClick={rotate}
						sx={{
							position: 'absolute',
							right: '21.4px',
							top: '6px',
							...props.needleStyle,
						}}
					>
						<CompassNeedle
							style={{
								transform: 'rotate(' + (bearing > 0 ? '-' + bearing : -1 * bearing) + 'deg)',
							}}
						/>
					</Box>
				</Box>
			</Box>
		</>
	);
};

MlNavigationCompass.propTypes = {
	/**
	 * Component id prefix
	 */
	idPrefix: PropTypes.string,
	/**
	 * Style object to adjust css definitions of the component.
	 */
	style: PropTypes.object,
	/**
	 * Style object to adjust css definitions of the background.
	 */
	backgroundStyle: PropTypes.object,
	/**
	 * Style object to adjust css definitions of the compass needle.
	 */
	needleStyle: PropTypes.object,
};


export default MlNavigationCompass;
