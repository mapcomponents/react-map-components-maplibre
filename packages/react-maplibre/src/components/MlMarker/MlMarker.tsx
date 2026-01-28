import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useMap from '../../hooks/useMap';
import maplibregl from 'maplibre-gl';
import { Box, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Constants for popup styling
const POPUP_PADDING_VERTICAL = 12;
const POPUP_PADDING_HORIZONTAL = 16;
const CLOSE_BUTTON_SPACING = 4;
const SCROLLBAR_WIDTH = 16; // Typical scrollbar width
const CLOSE_BUTTON_OFFSET = SCROLLBAR_WIDTH + CLOSE_BUTTON_SPACING;
const POPUP_MIN_WIDTH = 200;
const POPUP_MAX_WIDTH = 750;
const POPUP_MAX_HEIGHT = 500;

export interface MlMarkerProps {
	/** ID of the map to add the marker to */
	mapId?: string;
	/** Layer ID before which to insert the marker */
	insertBeforeLayer?: string;
	/** Longitude of the marker position */
	lng: number;
	/** Latitude of the marker position */
	lat: number;
	/** HTML content for the marker popup */
	content?: string;
	/** CSS properties to apply to the marker dot */
	markerStyle?: React.CSSProperties;
	/** CSS properties to apply to the content container */
	containerStyle?: React.CSSProperties;
	/** CSS properties to apply to the iframe element */
	iframeStyle?: React.CSSProperties;
	/** CSS properties to apply to the body of the iframe */
	iframeBodyStyle?: React.CSSProperties;
	/** Offset in pixels between the marker and its content */
	contentOffset?: number;
	/** Whether mouse events pass through the marker content */
	passEventsThrough?: boolean;
	/** Whether to show a close button to remove the marker */
	showCloseButton?: boolean;
	/** Callback function when the close button is clicked */
	onClose?: () => void;
	/** Anchor position of the marker relative to its coordinates */
	anchor?:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'top-left'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-right';
}

const getBoxTransform = (anchor: MlMarkerProps['anchor'] = 'top') => {
	switch (anchor) {
		case 'bottom':
			return 'translate(-50%, 0%)';
		case 'left':
			return 'translate(-100%, -50%)';
		case 'right':
			return 'translate(0%, -50%)';
		case 'top-left':
			return 'translate(-100%, -100%)';
		case 'top-right':
			return 'translate(0%, -100%)';
		case 'bottom-left':
			return 'translate(-100%, 0%)';
		case 'bottom-right':
			return 'translate(0%, 0%)';
		default:
		case 'top':
			return 'translate(-50%, -100%)';
	}
};

function getBoxMargins(
	anchor: MlMarkerProps['anchor'],
	offset: number,
	style?: React.CSSProperties
) {
	const w = parseInt(String(style?.width || 14), 10);
	const h = parseInt(String(style?.height || 14), 10);
	const m: Record<string, string> = {};
	switch (anchor) {
		case 'bottom':
			m.marginTop = `${offset}px`;
			break;
		case 'left':
			m.marginLeft = `-${offset}px`;
			break;
		case 'right':
			m.marginLeft = `${w + offset}px`;
			break;
		case 'top-left':
			m.marginTop = `-${h + offset}px`;
			m.marginLeft = `-${offset}px`;
			break;
		case 'top-right':
			m.marginTop = `-${h + offset}px`;
			m.marginLeft = `${w + offset}px`;
			break;
		case 'bottom-left':
			m.marginTop = `${offset}px`;
			m.marginLeft = `-${offset}px`;
			break;
		case 'bottom-right':
			m.marginTop = `${offset}px`;
			m.marginLeft = `${w + offset}px`;
			break;
		case 'top':
		default:
			m.marginTop = `-${h + offset}px`;
			break;
	}
	return m;
}

const MlMarker = ({
	passEventsThrough = true,
	contentOffset = 5,
	showCloseButton = true,
	...props
}: MlMarkerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [marker, setMarker] = useState<maplibregl.Marker | null>(null);
	const [contentWidth, setContentWidth] = useState<number>(300);
	const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);
	const container = useRef<HTMLDivElement | null>(null);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);

	const handleClose = (event: React.MouseEvent) => {
		event.stopPropagation();
		if (props.onClose) {
			props.onClose();
		} else {
			// Default behavior: remove the marker
			marker?.remove();
			container.current?.remove();
		}
	};

	useEffect(() => {
		if (!mapHook.map) return;

		container.current = document.createElement('div');

		const defaultMarkerStyle = {
			width: '12px',
			height: '12px',
			background: 'linear-gradient(135deg, rgb(186, 208, 218) 0%, rgb(96, 209, 253) 100%)',
			border: '1px solid rgba(255, 255, 255, 0.7)',
			boxShadow: '0 2px 6px rgba(90, 0, 0, 0.2), 0 0 0 2px rgba(240, 147, 251, 0.2)',
			borderRadius: '50%',
		};
		const markerStyle = {
			...defaultMarkerStyle,
			...props.markerStyle,
		};

		const maplibreMarker = new maplibregl.Marker({
			element: container.current,
			anchor: 'center',
		})
			.setLngLat([props.lng, props.lat])
			.addTo(mapHook.map.map);

		setMarker(maplibreMarker);

		const markerDot = document.createElement('div');
		Object.entries(markerStyle).forEach(([key, value]) => {
			markerDot.style.setProperty(key.replace(/([A-Z])/g, '-$1').toLowerCase(), String(value));
		});
		container.current.appendChild(markerDot);

		return () => {
			markerDot.remove();
			maplibreMarker.remove();
			container.current?.remove();
		};
	}, [mapHook.map, props.lng, props.lat, props.markerStyle, props.anchor]);

	useEffect(() => {
		if (marker) {
			marker.setLngLat([props.lng, props.lat]);
		}
	}, [marker, props.lng, props.lat]);

	function handleIframeLoad() {
		const iframeDoc = iframeRef.current?.contentWindow?.document;
		if (iframeDoc && iframeRef.current) {
			const scrollHeight = iframeDoc.documentElement.scrollHeight;
			const scrollWidth = iframeDoc.documentElement.scrollWidth;
			iframeRef.current.style.height = `${scrollHeight}px`;

			// Check if the content box will have a vertical scrollbar
			const hasVerticalScrollbar = scrollHeight > POPUP_MAX_HEIGHT;
			setHasScrollbar(hasVerticalScrollbar);

			// Set width based on content, with min and max constraints
			const calculatedWidth = Math.max(
				POPUP_MIN_WIDTH,
				Math.min(scrollWidth + POPUP_PADDING_HORIZONTAL * 2, POPUP_MAX_WIDTH)
			);
			setContentWidth(calculatedWidth);
		}
	}

	return (
		container.current &&
		createPortal(
			<Box
				sx={{
					position: 'absolute',
					transform: getBoxTransform(props.anchor),
					...getBoxMargins(props.anchor, contentOffset, props.markerStyle),
					zIndex: -1,
					...props.containerStyle,
				}}
			>
				<Paper
					elevation={8}
					sx={{
						width: `${contentWidth}px`,
						maxWidth: '90vw',
						opacity: passEventsThrough ? 1 : 0.85,
						pointerEvents: 'auto',
						overflow: 'hidden',
						position: 'relative',
						transition: 'opacity 0.2s ease-in-out, width 0.2s ease-in-out',
						'&:hover': {
							opacity: 1,
						},
					}}
				>
					{showCloseButton && (
						<IconButton
							onClick={handleClose}
							sx={{
								position: 'absolute',
								top: CLOSE_BUTTON_SPACING,
								right: CLOSE_BUTTON_OFFSET,
								zIndex: 1,
								padding: '4px',
								backgroundColor: 'rgba(255, 255, 255, 0.9)',
								'&:hover': {
									backgroundColor: 'rgba(255, 255, 255, 1)',
								},
							}}
							size="small"
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					)}
					<Box
						sx={{
							maxHeight: `${POPUP_MAX_HEIGHT}px`,
							overflowY: 'auto',
							overflowX: 'hidden',
						}}
					>
						<iframe
							ref={iframeRef}
							onLoad={handleIframeLoad}
							style={{
								width: '100%',
								border: 'none',
								display: 'block',
								...props.iframeStyle,
							}}
							srcDoc={`<div>
	<style>
		* {
			box-sizing: border-box;
		}
		body {
			margin: 0;
			padding: ${POPUP_PADDING_VERTICAL}px ${POPUP_PADDING_HORIZONTAL}px;
			${showCloseButton ? 'padding-top: 40px;' : ''}
			background: transparent;
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
			font-size: 14px;
			line-height: 1.6;
			color: rgba(0, 0, 0, 0.87);
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			overflow-x: hidden;
			${Object.entries(props.iframeBodyStyle || {})
				.map(([key, val]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val};`)
				.join(' ')}
		}
		h1, h2, h3, h4, h5, h6 {
			margin: 0 0 8px 0;
			font-weight: 500;
		}
		p {
			margin: 0 0 8px 0;
		}
		table {
			border-collapse: collapse;
			width: 100%;
			max-width: 100%;
		}
		th, td {
			padding: 4px 8px;
			text-align: left;
			border-bottom: 1px solid rgba(0, 0, 0, 0.12);
			word-wrap: break-word;
		}
		th {
			font-weight: 500;
			color: rgba(0, 0, 0, 0.6);
		}
		img {
			max-width: 100%;
			height: auto;
		}
	</style>
	${props.content || ''}
</div>`}
							sandbox="allow-same-origin allow-popups-to-escape-sandbox allow-scripts"
							title={mapHook.componentId}
						/>
					</Box>
				</Paper>
			</Box>,
			container.current
		)
	);
};

export default MlMarker;
