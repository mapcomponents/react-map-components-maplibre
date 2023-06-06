import React, { useState, useEffect, CSSProperties } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as CompassNeedle } from './assets/CompassNeedle.svg';
import { ReactComponent as CompassBackground } from './assets/CompassBackground.svg';

import styled from '@emotion/styled';
import { css } from '@emotion/css';
import useMap from '../../hooks/useMap';

const NeedleButton = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	width: 60;
	height: 150;

	&:hover {
		cursor: pointer;
	}
	path {
		filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.2));
	}
	&:hover path {
		filter: drop-shadow(0px 0px 13px rgba(255, 255, 255, 0.1));
	}
	path:nth-of-type(2) {
		fill: #d3dce1;
	}
	&:hover path:nth-of-type(2) {
		fill: #d3dce1;
	}
	path:nth-of-type(1) {
		fill: #cf003d;
	}
	&:hover path:nth-of-type(1) {
		fill: #cf003d;
	}
`;
const NeedleContainer = styled.div`
	pointer-events: none;
	display: flex;
	z-index: 1050;
	align-items: center;

	&:hover {
		cursor: pointer;
	}

	svg {
		transform: scale(5);
	}
`;
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

	useEffect(() => {
		if (!mapHook.map) return;

		const _updateBearing = () => {
			if (!mapHook.map?.map?.getBearing) return;
			setBearing(Math.round(mapHook.map.map.getBearing()));
		};

		mapHook.map.on('rotate', _updateBearing, mapHook.componentId);
		_updateBearing();

		return () => {
			mapHook.map?.map.off('rotate', _updateBearing);
		};
	}, [mapHook.map, props.mapId]);

	return (
		<>
			<div
				className={css({
					zIndex: 1000,
					top: 0,
					position: 'absolute',
					...props.style,
				})}
			>
				<div
					className={css({
						position: 'absolute',
						border: '10px solid',
						height: '200px',
						width: '200px',
						borderRadius: '50%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						transform: 'scale(0.2) translateX(-448px) translateY(-448px)',
						...props.backgroundStyle,
						'&:hover circle': {
							fill: '#f5f5f5',
						},
					})}
				>
					<CompassBackground
						style={{ transform: 'scale(4.6)', cursor: 'pointer' }}
						onClick={() => {
							if (bearing / 90 != 0 || bearing / 180 != 0 || bearing / 270 != 0) {
								mapHook.map?.map.setBearing(0);
							} else {
								mapHook.map?.map.setBearing(bearing + 90);
							}
						}}
					/>

					<NeedleButton
						className={css({ ...props.needleStyle })}
						onClick={() => {
							mapHook.map?.map.setBearing(0);
						}}
					>
						<NeedleContainer
							style={{
								transform: 'rotate(' + (bearing > 0 ? '-' + bearing : -1 * bearing) + 'deg)',
							}}
						>
							<CompassNeedle />
						</NeedleContainer>
					</NeedleButton>
				</div>
			</div>
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
