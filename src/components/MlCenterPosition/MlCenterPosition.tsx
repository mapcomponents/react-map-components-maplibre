import React, { useState, useCallback } from "react";
import useMap from "../../hooks/useMap";
import { Button, SxProps, Theme } from '@mui/material';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';

export interface MlCenterPositionProps {
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
	 * Active button font color
	 */
	onColor?: string;
	/**
	 * Inactive button font color
	 */
	offColor?: string;
	/**
	 * CSS style object that is applied to the button component
	 */
	style?: SxProps<Theme> | undefined;
}

/**
 * Component template
 *
 */
const MlCenterPosition = (props: MlCenterPositionProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [locationAccessDenied, setLocationAccessDenied] = useState(false);

	const centerCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
	};

	const getLocationSuccess = useCallback(
		(location: GeolocationPosition) => {
			mapHook.map?.map.setCenter?.([location.coords.longitude, location.coords.latitude]);
		},
		[mapHook.map]
	);

	const getLocationError = () => {
		console.log('Access of user location denied');
		setLocationAccessDenied(true);
	};
	return (
		<>
			<Button
				variant="navtools"
				sx={{
					zIndex: 1002,
					color: !locationAccessDenied ? props.onColor : props.offColor,
				}}
				onClick={centerCurrentLocation}
				disabled={locationAccessDenied}
			>
				<FilterCenterFocusIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
			</Button>
		</>
	);
};

MlCenterPosition.defaultProps = {
	mapId: undefined,
};
export default MlCenterPosition;
