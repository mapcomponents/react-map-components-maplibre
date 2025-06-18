import React, { useState, useEffect, CSSProperties } from 'react';
import useMap from '../../hooks/useMap';
import { Button, styled } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PublicIcon from '@mui/icons-material/Public';

export interface MlGlobeButtonProps {
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
	 * Style object to adjust css definitions of the component.
	 */
	style?: CSSProperties;
	/**
	 * Initial projection mode of the map.
	 */
	mode?: 'globe' | 'mercator';
}

/**
 * Projection component that displays the map as a globe or as a mercator projection.
 * @component
 */

const GlobeButtonStyled = styled(Button)(({ theme }) => ({
	zIndex: 1000,
	// color: theme.palette.navigation.buttonColor,
	color: '#fff',
	transform: 'scale(1)',
}));

const MlGlobeButton = (props: MlGlobeButtonProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [projection, setProjection] = useState<'globe' | 'mercator'>(props.mode || 'mercator');

	useEffect(() => {
		const current = mapHook.map?.map.getProjection?.()?.type;
		if (current !== projection) {
			mapHook.map?.setProjection({ type: projection });
		}
	}, [mapHook.map]);

	const handleClick = () => {
		if (!mapHook.map) return;
		const next = projection === 'globe' ? 'mercator' : 'globe';
		mapHook.map.setProjection({ type: next });
		setProjection(next);
	};

	return (
		<>
			<GlobeButtonStyled variant="navtools" onClick={handleClick} style={props.style}>
				{projection === 'globe' ? (
					<PublicIcon data-testid="PublicIcon" sx={{ fontSize: { xs: '1.4em', md: '1em' } }} /> // data-testid added for testing purposes
				) : (
					<MapIcon data-testid="MapIcon" sx={{ fontSize: { xs: '1.4em', md: '1em' } }} /> // data-testid added for testing purposes
				)}
			</GlobeButtonStyled>
		</>
	);
};

MlGlobeButton.defaultProps = {
	mapId: undefined,
	mode: 'mercator',
};
export default MlGlobeButton;
