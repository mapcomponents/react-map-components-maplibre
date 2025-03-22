import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Paper from '@mui/material/Paper';
import useMap from '../../hooks/useMap';
import maplibregl from 'maplibre-gl';

export interface MlMarkerProps {
	mapId?: string;
	insertBeforeLayer?: string;
	lng: number;
	lat: number;
	content?: string;
	markerStyle?: React.CSSProperties;
	containerStyle?: React.CSSProperties;
	iframeStyle?: React.CSSProperties;
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
	const [container] = useState(() => document.createElement('div'));

	useEffect(() => {
		if (!mapHook.map) return;

		const markerStyle = {
			width: '14px',
			height: '14px',
			borderRadius: '50%',
			backgroundColor: 'rgba(40,200,20,0.5)',
			...props.markerStyle,
		};

		const maplibreMarker = new maplibregl.Marker({
			element: container,
			anchor: props.anchor || 'center',
		})
			.setLngLat([props.lng, props.lat])
			.addTo(mapHook.map.map);

		setMarker(maplibreMarker);

		const markerDot = document.createElement('div');

		if (markerStyle) {
			Object.entries(markerStyle).forEach(([key, value]) => {
				// @ts-ignore
				markerDot.style[key] = value;
			});
		}

		container.appendChild(markerDot);

		return () => {
			markerDot.remove();
			maplibreMarker.remove();
			container.remove();
		};
	}, [mapHook.map, props.lng, props.lat, props.markerStyle, props.anchor]);

	useEffect(() => {
		if (marker) {
			marker.setLngLat([props.lng, props.lat]);
		}
	}, [marker, props.lng, props.lat]);

	const iframeRef = useRef<HTMLIFrameElement>(null);

	return createPortal(
		<Paper
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
					...(props.iframeStyle || {}),
				}}
				srcDoc={props.content}
				ref={iframeRef}
				sandbox="allow-same-origin allow-popups-to-escape-sandbox"
				title={mapHook.componentId}
			/>
		</Paper>,
		container
	);
};

export default MlMarker;
