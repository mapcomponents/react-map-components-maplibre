import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useMap from '../../hooks/useMap';
import maplibregl from 'maplibre-gl';
import { Box } from '@mui/material';

export interface MlMarkerProps {
	mapId?: string;
	insertBeforeLayer?: string;
	lng: number;
	lat: number;
	content?: string;
	markerStyle?: React.CSSProperties;
	containerStyle?: React.CSSProperties;
	iframeStyle?: React.CSSProperties;
	iframeBodyStyle?: React.CSSProperties;
	anchor?:
	| 'center'
	| 'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'top-left'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-right';
}

const MlMarker = (props: MlMarkerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [marker, setMarker] = useState<maplibregl.Marker | null>(null);
	const container = useRef<HTMLDivElement | undefined>(undefined);

	useEffect(() => {
		if (!mapHook.map) return;

		container.current = document.createElement('div')

		const markerStyle = {
			width: '14px',
			height: '14px',
			borderRadius: '50%',
			backgroundColor: 'rgba(40,200,20,0.5)',
			...props.markerStyle,
		};

		const maplibreMarker = new maplibregl.Marker({
			element: container.current,
			anchor: props.anchor || 'center',
		})
			.setLngLat([props.lng, props.lat])
			.addTo(mapHook.map.map);

		setMarker(maplibreMarker);

		const markerDot = document.createElement('div');

		if (markerStyle) {
			Object.entries(markerStyle).forEach(([key, value]) => {
				markerDot.style.setProperty(key, String(value));
			});
		}

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

	const iframeRef = useRef<HTMLIFrameElement>(null);

	return container.current && createPortal(
		<Box
			sx={{
				opacity: 0.7,
				position: 'absolute',
				display: 'flex',
				width: '300px',
				height: '300px',
				'&:hover': {
					opacity: 1,
				},
				zIndex: -1,
				transform: 'translate(14px, -100%)',
				...(props.containerStyle || {}),
			}}
		>
			<iframe
				style={{
					width: '100%',
					borderStyle: 'none',
					...(props.iframeStyle || {}),
				}}
				srcDoc={`
			<div>
	  <style>
		body {
		${Object.entries(props.iframeBodyStyle || {})
						.map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
						.join(' ')}
		}
	  </style>
	  ${props.content || ''}
			</div>
  `}
				ref={iframeRef}
				sandbox="allow-same-origin allow-popups-to-escape-sandbox allow-scripts"
				title={mapHook.componentId}
			/>
		</Box>,
		container.current
	);
};


export default MlMarker;
