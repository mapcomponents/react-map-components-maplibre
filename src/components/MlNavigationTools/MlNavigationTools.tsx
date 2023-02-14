import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Box from "@mui/material/Box";
import { SxProps } from "@mui/material";

import MlNavigationCompass from "../MlNavigationCompass/MlNavigationCompass";
import MlFollowGps from "../MlFollowGps/MlFollowGps";
import useMediaQuery from "@mui/material/useMediaQuery";
import useMap from "../../hooks/useMap";
import MlCenterPosition from "../MlCenterPosition/MlCenterPosition";

interface MlNavigationToolsProps {
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
	children?: JSX.Element;
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
	const mediaIsMobile = useMediaQuery('(max-width:900px)');

	useEffect(() => {
		if (!mapHook.map) return;

		mapHook.map.on(
			'pitchend',
			() => {
				if (!mapHook.map) return;

				setPitch(mapHook.map.map.getPitch());
			},
			mapHook.componentId
		);
		setPitch(mapHook.map.map.getPitch());
	}, [mapHook.map, props.mapId]);

	const zoomIn = () => {
		if (!mapHook.map) return;

		if (mapHook.map.map.transform._zoom + 0.5 <= mapHook.map.map.transform._maxZoom) {
			mapHook.map.map.easeTo({ zoom: mapHook.map.map.transform._zoom + 0.5 });
		}
	};

	const zoomOut = () => {
		if (!mapHook.map) return;

		if (mapHook.map.map.transform._zoom - 0.5 >= mapHook.map.map.transform._minZoom) {
			mapHook.map.map.easeTo({ zoom: mapHook.map.map.transform._zoom - 0.5 });
		}
	};

	const adjustPitch = () => {
		if (!mapHook.map) return;

		let targetPitch = 60;
		if (mapHook.map.map.getPitch() !== 0) {
			targetPitch = 0;
		}
		mapHook.map.map.easeTo({ pitch: targetPitch });
	};

	return (
		<Box
			sx={{
				zIndex: 501,
				position: 'absolute',
				display: 'flex',
				flexDirection: 'column',
				...(mediaIsMobile ? { margin: '20px 10px 20px 10px' } : {}),
				...props.sx,
			}}
		>
			<MlNavigationCompass
				style={{
					width: '31px',
					position: 'relative',
					height: mediaIsMobile ? '55px' : '45px',
					marginLeft: mediaIsMobile ? '3px' : '-5px',
					transform: mediaIsMobile ? 'scale(1.6)' : 'scale(1)',
				}}
				backgroundStyle={{
					boxShadow: '0px 0px 18px rgba(0,0,0,.5)',
				}}
			/>
			{props.show3DButton && (
				<Button variant="navtools" onClick={adjustPitch}>
					{pitch ? '2D' : '3D'}
				</Button>
			)}
			{props.showFollowGpsButton && <MlFollowGps />}
			{props.showCenterLocationButton && <MlCenterPosition />}
			<ButtonGroup
				orientation="vertical"
				sx={{
					width: '50px',
					border: 'none',
					Button: { minWidth: '20px !important'},
					'Button:hover': { border: 'none' },
				}}
			>
				{props.showZoomButtons && (
					<>
						<Button variant="navtools" onClick={zoomIn}>
							<ControlPointIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
						</Button>
						<Button variant="navtools" onClick={zoomOut}>
							<RemoveCircleOutlineIcon sx={{ fontSize: { xs: '1.4em', md: '1em' } }} />
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
	showFollowGpsButton: true,
	showCenterLocationButton: false,
	showZoomButtons: true,
	sx: {
		right: "5px",
		bottom: "20px",
	},
};

export default MlNavigationTools;
