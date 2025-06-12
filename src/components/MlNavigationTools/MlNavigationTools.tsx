import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';
import MlNavigationCompass from '../MlNavigationCompass/MlNavigationCompass';
import MlFollowGps from '../MlFollowGps/MlFollowGps';
import useMediaQuery from '@mui/material/useMediaQuery';
import useMap from '../../hooks/useMap';
import MlCenterPosition from '../MlCenterPosition/MlCenterPosition';
import MlGlobeButton from '../MlGlobeButton/MlGlobeButton';
import { useTheme } from '@mui/material';

export interface MlNavigationToolsProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * The layerId of an existing layer this layer should be rendered visually beneath
	 * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
	 */
	insertBeforeLayer?: string;
	/**
	 * Show 3D button
	 */
	show3DButton?: boolean;
	/**
	 * Show global button
	 */
	showGlobalButton?: boolean;
	/**
	 * Show zoom button
	 */
	showZoomButtons?: boolean;
	/**
	 * Show follow GPS button
	 */
	showFollowGpsButton?: boolean;
	/**
	 * Show center on current position button
	 */
	showCenterLocationButton?: boolean;
	/**
	 * Additional JSX Elements to be rendered below MlNavigationTools buttons
	 */
	children?: React.JSX.Element;
	/**
	 * Style attribute for NavigationTools container
	 */
	sx?: SxProps;
	/**
	 * Style attribute for NavigationTools container
	 */
	mediaIsMobile?: boolean;
}

/**
 * @component
 */

const MlNavigationTools = (props: MlNavigationToolsProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [pitch, setPitch] = useState(0);
	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const theme = useTheme();

	useEffect(() => {
		if (!mapHook.map) return;

		mapHook.map.on(
			'pitchend',
			() => {
				if (!mapHook.map) return;

				setPitch(mapHook.map.getPitch());
			},
			mapHook.componentId
		);
		setPitch(mapHook.map.getPitch());
	}, [mapHook.map, props.mapId]);

	const zoomIn = useCallback(() => {
		if (!mapHook.map) return;

		mapHook.map.easeTo({ zoom: mapHook.map.getZoom() + 0.5 });
	}, [mapHook.map]);

	const zoomOut = useCallback(() => {
		if (!mapHook.map) return;

		mapHook.map.easeTo({ zoom: mapHook.map.getZoom() - 0.5 });
	}, [mapHook.map]);

	const adjustPitch = useCallback(() => {
		if (!mapHook.map) return;
		setPitch(mapHook.map.getPitch());
		const targetPitch = mapHook.map.getPitch() !== 0 ? 0 : 60;
		mapHook.map.easeTo({ pitch: targetPitch });
	}, [mapHook.map]);

	return (
		<Box
			sx={{
				zIndex: 501,
				position: 'absolute',
				display: 'flex',
				flexDirection: 'column',
				right: mediaIsMobile ? '15px' : '25px',
				bottom: mediaIsMobile ? '20px' : '40px',
				...(mediaIsMobile ? { margin: '80px 10px 50px 10px' } : { marginTop: '50px' }),
				...props.sx,
			}}
		>
			<MlNavigationCompass />
			{props.show3DButton && (
				<Button
					variant="navtools"
					onClick={adjustPitch}
					sx={{ color: (theme) => theme.palette.navigation.buttonColor }}
				>
					{pitch < 29 ? '2D' : '3D'}
				</Button>
			)}
			{props.showGlobalButton && <MlGlobeButton />}
			{props.showFollowGpsButton && <MlFollowGps />}
			{props.showCenterLocationButton && <MlCenterPosition />}
			<ButtonGroup
				orientation="vertical"
				sx={{
					border: 'none',
					Button: { minWidth: '20px !important', color: theme.palette.navigation.buttonColor },
					'Button:hover': { border: 'none' },
				}}
			>
				{props.showZoomButtons && (
					<>
						<Button
							variant="navtools"
							onClick={zoomIn}
							sx={{
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
								position: 'relative',

								'&::after': {
									content: '""',
									position: 'absolute',
									left: '20%',
									bottom: 0,
									width: '60%',
									height: '1px',
									backgroundColor: '#ccc',
									borderRadius: '1px',
								}, // Dividing line
							}}
						>
							<AddIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
						</Button>
						<Button
							variant="navtools"
							onClick={zoomOut}
							sx={{
								margin: 0,
								borderTopLeftRadius: 0,
								borderTopRightRadius: 0,
							}}
						>
							<RemoveIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
						</Button>
					</>
				)}
			</ButtonGroup>
			{props.children && React.cloneElement(props.children, {})}
		</Box>
	);
};

MlNavigationTools.defaultProps = {
	mapId: undefined,
	show3DButton: true,
	showGlobalButton: false,
	showFollowGpsButton: true,
	showCenterLocationButton: false,
	showZoomButtons: true,
};

export default MlNavigationTools;
