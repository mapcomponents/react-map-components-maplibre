import React, { useState, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { Button } from '@mui/material';
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
}

/**
 * Projection component that displays the map as a globe or as a mercator projection.
 * @component
 */

const MlGlobeButton = (props: MlGlobeButtonProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [projection, setProjection] = useState<'globe' | 'mercator'>('mercator');

	useEffect(() => {
		const current = mapHook.map?.map.getProjection?.()?.type;
		if (current === 'globe' || current === 'mercator') {
			setProjection(current);
		}
	}, [mapHook.map]);

	const handleClick = () => {
		if (!mapHook.map) return;
		const next = projection === 'globe' ? 'mercator' : 'globe';
		mapHook.map.map.setProjection({ type: next });
		setProjection(next);
	};

	return (
		<>
			<Button
				variant="navtools"
				sx={{ zIndex: 1000, color: (theme) => theme.palette.navigation.buttonColor }}
				onClick={handleClick}
			>
				{projection === 'globe' ? (
					<PublicIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
				) : (
					<MapIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
				)}
			</Button>
		</>
	);
};

MlGlobeButton.defaultProps = {
	mapId: undefined,
};
export default MlGlobeButton;
