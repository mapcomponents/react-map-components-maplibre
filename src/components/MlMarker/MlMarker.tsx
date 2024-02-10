import React, { useRef, useState, useEffect } from "react";
import MlGeoJsonLayer from "../MlGeoJsonLayer/MlGeoJsonLayer";
import Paper from "@mui/material/Paper";
import useMapState from "../../hooks/useMapState";
import useMap from "../../hooks/useMap";

import Point from "@mapbox/point-geometry";

export interface MlMarkerProps {
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
	 * Longitude of the marker position
	 */
	lng: number;
	/**
	 * Latitude of the marker position
	 */
	lat: number;
	/**
	 * Content of the description popup
	 */
	content?: string;
}

/**
 * Adds a marker to the map and displays the contents of the "content" property in an iframe next to it
 */
const MlMarker = (props: MlMarkerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const mapState = useMapState({
		mapId: props.mapId,
		watch: { viewport: true },
	});

	const iframe = useRef<HTMLIFrameElement>(null);

	const [iframeDimensions, setIframeDimensions] = useState({
		width: "400px",
		height: "500px",
	});

	const [markerPixelPos, setMarkerPixelPos] = useState<Point>();

	useEffect(() => {
		if (!mapHook.map?.map?.project) return;

		const _pixelPos = mapHook.map.map.project([props.lng, props.lat]);

		setMarkerPixelPos(_pixelPos);
	}, [mapHook.map, props.lng, props.lat, mapState.viewport]);

	useEffect(() => {
		if (
			!mapHook.map ||
			!iframe.current?.contentWindow?.document?.body?.scrollHeight
		)
			return;

		const mapHeight = mapHook.map.map._container.clientHeight;

		const _pixelPos = mapHook.map.map.project([props.lng, props.lat]);
		const pixelToBottom = mapHeight - _pixelPos.y;
		const iframeHeight =
			iframe.current?.contentWindow?.document?.body?.scrollHeight;
		const iframeWidth =
			iframe.current?.contentWindow?.document?.body?.scrollWidth;

		setIframeDimensions({
			width: iframeWidth + "px",
			height:
				(pixelToBottom < iframeHeight ? pixelToBottom : iframeHeight) + "px",
		});
	}, [props.lng, props.lat, props.content]);

	return (
		<>
			<MlGeoJsonLayer
				geojson={{
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [props.lng, props.lat],
					},
					properties: {},
				}}
				paint={{
					"circle-radius": 14,
					"circle-color": "rgba(40,200,20,0.5)",
				}}
				type="circle"
				mapId={props.mapId}
			></MlGeoJsonLayer>
			{markerPixelPos && (
				<Paper
					sx={{
						opacity: 0.7,
						position: "fixed",
						display: "flex",
						/** TODO: fix positioning delay when moving the map */
						left: markerPixelPos.x,
						top: markerPixelPos.y,
						width: iframeDimensions.width,
						height: iframeDimensions.height,
						"&:hover": {
							opacity: 1,
						},
						zIndex: -1,
					}}
				>
					<iframe
						style={{ width: "100%" }}
						srcDoc={props.content}
						ref={iframe}
						sandbox="allow-same-origin allow-popups-to-escape-sandbox"
						frameBorder="0"
						title={mapHook.componentId}
					></iframe>
				</Paper>
			)}
		</>
	);
};

MlMarker.defaultProps = {
	mapId: undefined,
};

export default MlMarker;
