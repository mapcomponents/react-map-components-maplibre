import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useMap from '../../hooks/useMap';
import maplibregl from 'maplibre-gl';
import { Box } from '@mui/material';

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

function getBoxMargins(anchor: MlMarkerProps['anchor'], offset: number, style?: React.CSSProperties) {
	const w = parseInt(String(style?.width || 14), 10);
	const h = parseInt(String(style?.height || 14), 10);
	const m: Record<string, string> = {};
	switch (anchor) {
		case 'bottom': m.marginTop = `${offset}px`; break;
		case 'left': m.marginLeft = `-${offset}px`; break;
		case 'right': m.marginLeft = `${w + offset}px`; break;
		case 'top-left': m.marginTop = `-${h + offset}px`; m.marginLeft = `-${offset}px`; break;
		case 'top-right': m.marginTop = `-${h + offset}px`; m.marginLeft = `${w + offset}px`; break;
		case 'bottom-left': m.marginTop = `${offset}px`; m.marginLeft = `-${offset}px`; break;
		case 'bottom-right': m.marginTop = `${offset}px`; m.marginLeft = `${w + offset}px`; break;
		case 'top': default: m.marginTop = `-${h + offset}px`; break;
	}
	return m;
}

const MlMarker = ({ passEventsThrough = true, contentOffset = 5, ...props }: MlMarkerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [marker, setMarker] = useState<maplibregl.Marker | null>(null);
	const container = useRef<HTMLDivElement | null>(null);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);

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
			markerDot.style.setProperty(
				key.replace(/([A-Z])/g, '-$1').toLowerCase(),
				String(value)
			);
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
		if (iframeDoc && iframeRef.current?.parentElement) {
			const scrollHeight = iframeDoc.documentElement.scrollHeight;
			iframeRef.current.parentElement.style.height = `${scrollHeight}px`;
		}
	}

	return (
		container.current &&
		createPortal(
			<Box
				sx={{
					position: 'absolute',
					display: 'flex',
					width: '300px',
					maxHeight: '500px',
					opacity: passEventsThrough ? 1 : 0.7,
					zIndex: -1,
					transform: getBoxTransform(props.anchor),
					...getBoxMargins(props.anchor, contentOffset, props.markerStyle),
					pointerEvents: passEventsThrough ? 'none' : 'auto',
					'&:hover': {
						opacity: 1,
					},
					...props.containerStyle,
				}}
			>
				<iframe
					ref={iframeRef}
					onLoad={handleIframeLoad}
					style={{
						width: '100%',
						borderStyle: 'none',
						...props.iframeStyle,
					}}
					srcDoc={`<div>
	<style>
		body {
			${Object.entries(props.iframeBodyStyle || {})
							.map(([key, val]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${val};`)
							.join(' ')
						}
		}
	</style>
	${props.content || ''}
</div>`}
					sandbox="allow-same-origin allow-popups-to-escape-sandbox allow-scripts"
					title={mapHook.componentId}
				/>
			</Box>,
			container.current
		)
	);
};

export default MlMarker;
