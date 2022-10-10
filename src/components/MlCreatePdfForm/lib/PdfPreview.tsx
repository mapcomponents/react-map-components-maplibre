import React, { useContext, useRef, useState, useEffect } from 'react';
import MlGeoJsonLayer from '../../MlGeoJsonLayer/MlGeoJsonLayer';
import * as turf from '@turf/turf';
import useMap from '../../../hooks/useMap';
import useLayerEvent from '../../../hooks/useLayerEvent';
import { BBox, Feature, Polygon } from '@turf/turf';
import PdfContext from './PdfContext';
import { MapMouseEvent, MapTouchEvent, MapLayerMouseEvent, LngLat } from 'maplibre-gl';

const createPreviewGeojson = (
	geojsonProps: { center: LngLat; distance: number; bearing: number },
	orientation: string
) => {
	const topLeftAngle = orientation === 'portrait' ? -35.3 : -54.7;
	const bottomRightAngle = orientation === 'portrait' ? 144.7 : 125.3;
	const topLeft = turf.destination(
		[geojsonProps.center.lng, geojsonProps.center.lat],
		geojsonProps.distance,
		topLeftAngle
	);
	const bottomRight = turf.destination(
		[geojsonProps.center.lng, geojsonProps.center.lat],
		geojsonProps.distance,
		bottomRightAngle
	);
	const bbox = [
		topLeft.geometry.coordinates[0],
		topLeft.geometry.coordinates[1],
		bottomRight.geometry.coordinates[0],
		bottomRight.geometry.coordinates[1],
	];

	let _previewGeojson = turf.bboxPolygon(bbox as BBox);
	_previewGeojson = turf.transformRotate(_previewGeojson, geojsonProps.bearing);
	if (!_previewGeojson?.properties) {
		_previewGeojson.properties = {};
	}
	_previewGeojson.properties.bearing = geojsonProps.bearing;
	return _previewGeojson;
};

interface PdfPreviewProps {
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

interface geojsonProps {
	center: { lng: number; lat: number };
	distance: number;
	bearing: number;
	geojson: Feature<Polygon> | undefined;
}

export default function PdfPreview(props: PdfPreviewProps) {
	const pdfContext = useContext(PdfContext);
	const initializedRef = useRef(false);
	const activeFeature = useRef();

	const dragging = useRef(false);

	const draggingResizeHandle = useRef(false);

	const draggingRotationHandle = useRef(false);

	const [geojsonProps, setGeojsonProps] = useState<geojsonProps>({
		center: { lng: 0, lat: 0 },
		distance: 10,
		bearing: 0,
		geojson: undefined,
	});

	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	useEffect(() => {
		if (
			!mapHook.map ||
			!pdfContext.geojsonRef ||
			!pdfContext.orientation ||
			!pdfContext.template ||
			initializedRef.current
		)
			return;

		initializedRef.current = true;

		const center = mapHook.map.map.getCenter();
		const canvasHeight = mapHook.map.map._canvas.height;
		const canvasWidth = mapHook.map.map._canvas.width;
		const bboxPixelHeight = Math.ceil(canvasHeight / 2);
		const bboxPixelWidth = Math.ceil(
			(pdfContext.template.width / pdfContext.template.height) * bboxPixelHeight
		);

		const topLeft = mapHook.map.map.unproject([
			Math.floor(canvasWidth / 2 - bboxPixelWidth / 2),
			Math.floor(canvasHeight / 2 - bboxPixelHeight / 2),
		]);

		const distance = turf.distance([center.lng, center.lat], [topLeft.lng, topLeft.lat]);

		const tmpGeojsonProps = {
			center,
			distance,
			bearing: 0,
			geojson: createPreviewGeojson({ center, distance, bearing: 0 }, pdfContext.orientation),
		};
		setGeojsonProps(tmpGeojsonProps);
		pdfContext.geojsonRef.current = tmpGeojsonProps.geojson;
	}, [mapHook.map]);

	useEffect(() => {
		if (!pdfContext.orientation || !pdfContext.geojsonRef) return;

		const tmpGeojsonProps = JSON.parse(JSON.stringify(geojsonProps));
		tmpGeojsonProps.geojson = createPreviewGeojson(tmpGeojsonProps, pdfContext.orientation);
		setGeojsonProps(tmpGeojsonProps);
		pdfContext.geojsonRef.current = tmpGeojsonProps.geojson;
	}, [pdfContext.orientation]);

	// Resize handle events
	useLayerEvent({
		event: 'mouseenter',
		layerId: 'pdfPreviewGeojsonResizeHandle',
		eventHandler: function () {
			if (!mapHook.map) return;

			mapHook.map.map._canvas.style.cursor = 'nwse-resize';
			mapHook.map.map.dragPan.disable();
		},
	});
	useLayerEvent({
		event: 'mouseleave',
		layerId: 'pdfPreviewGeojsonResizeHandle',
		eventHandler: function () {
			if (!mapHook.map) return;

			mapHook.map.map._canvas.style.cursor = '';
			mapHook.map.map.dragPan.enable();
		},
	});
	useLayerEvent({
		event: 'mousedown',
		layerId: 'pdfPreviewGeojsonResizeHandle',
		addTouchEvents: true,
		eventHandler: function (e: MapMouseEvent | MapTouchEvent) {
			e.preventDefault();
			if (!mapHook.map) return;

			dragging.current = false;
			draggingRotationHandle.current = false;
			draggingResizeHandle.current = true;
			mapHook.map.map._canvas.style.cursor = 'move';

			function onMove(e: MapMouseEvent | MapTouchEvent) {
				if (!pdfContext.geojsonRef || !draggingResizeHandle.current || !pdfContext.orientation)
					return;

				const tmpGeojsonProps = JSON.parse(JSON.stringify(geojsonProps));
				let _distance = turf.distance(
					[tmpGeojsonProps.center.lng, tmpGeojsonProps.center.lat],
					[e.lngLat.lng, e.lngLat.lat]
				);
				// limit max diagonal distance of PDF area to 120km as larger area lead to distortions for northern and southern areas
				if (_distance > 60) {
					_distance = 60;
				}
				tmpGeojsonProps.distance = _distance;
				tmpGeojsonProps.geojson = createPreviewGeojson(tmpGeojsonProps, pdfContext.orientation);
				pdfContext.geojsonRef.current = tmpGeojsonProps.geojson;
				setGeojsonProps(tmpGeojsonProps);
			}
			function onUp() {
				if (!draggingResizeHandle.current || !mapHook.map) return;

				mapHook.map.map._canvas.style.cursor = '';
				draggingResizeHandle.current = false;

				mapHook.map.map.dragPan.enable();
				// Unbind mouse events
				mapHook.map.map.off('mousemove', onMove);
				mapHook.map.map.off('touchmove', onMove);
			}

			// Mouse events
			mapHook.map.map.on('mousemove', onMove);
			mapHook.map.map.on('touchmove', onMove);
			mapHook.map.map.once('mouseup', onUp);
			mapHook.map.map.once('touchend', onUp);
		},
	});

	// Rotation handle events
	useLayerEvent({
		event: 'mouseenter',
		layerId: 'pdfPreviewGeojsonRotationHandle',
		eventHandler: function () {
			if (!mapHook.map) return;

			mapHook.map.map._canvas.style.cursor = 'nwse-resize';
			mapHook.map.map.dragPan.disable();
		},
	});
	useLayerEvent({
		event: 'mouseleave',
		layerId: 'pdfPreviewGeojsonRotationHandle',
		eventHandler: function () {
			if (!mapHook.map) return;

			mapHook.map.map._canvas.style.cursor = '';
			mapHook.map.map.dragPan.enable();
		},
	});
	useLayerEvent({
		event: 'mousedown',
		layerId: 'pdfPreviewGeojsonRotationHandle',
		addTouchEvents: true,
		eventHandler: function (e: MapMouseEvent | MapTouchEvent) {
			e.preventDefault();
			if (!mapHook.map || !pdfContext.orientation) return;

			dragging.current = false;
			draggingResizeHandle.current = false;
			draggingRotationHandle.current = true;
			mapHook.map.map._canvas.style.cursor = 'move';

			function onMove(e: MapMouseEvent | MapTouchEvent) {
				e.preventDefault();
				if (!draggingRotationHandle.current || !pdfContext.orientation || !pdfContext.geojsonRef)
					return;

				const tmpGeojsonProps = JSON.parse(JSON.stringify(geojsonProps));
				const _bearing = turf.bearing(
					[tmpGeojsonProps.center.lng, tmpGeojsonProps.center.lat],
					[e.lngLat.lng, e.lngLat.lat]
				);
				tmpGeojsonProps.bearing = 144.7 + _bearing;
				tmpGeojsonProps.geojson = createPreviewGeojson(tmpGeojsonProps, pdfContext.orientation);
				pdfContext.geojsonRef.current = tmpGeojsonProps.geojson;
				setGeojsonProps(tmpGeojsonProps);
			}
			function onUp() {
				if (!draggingRotationHandle.current || !mapHook.map) return;

				mapHook.map.map._canvas.style.cursor = '';
				draggingRotationHandle.current = false;

				mapHook.map.map.dragPan.enable();
				// Unbind mouse events
				mapHook.map.map.off('mousemove', onMove);
				mapHook.map.map.off('touchmove', onMove);
			}

			// Mouse events
			mapHook.map.map.on('mousemove', onMove);
			mapHook.map.map.on('touchmove', onMove);
			mapHook.map.map.once('mouseup', onUp);
			mapHook.map.map.once('touchend', onUp);
		},
	});

	// drag & drop events
	useLayerEvent({
		event: 'mouseenter',
		layerId: 'pdfPreviewGeojson',
		eventHandler: function (e: MapLayerMouseEvent) {
			if (!mapHook.map || !e?.features?.length) return;
			mapHook.map.map._canvas.style.cursor = 'move';
			activeFeature.current = e.features[0];
		},
	});
	useLayerEvent({
		event: 'mouseleave',
		layerId: 'pdfPreviewGeojson',
		eventHandler: function () {
			if (!mapHook.map) return;

			mapHook.map.map._canvas.style.cursor = '';
			mapHook.map.map.dragPan.enable();
			activeFeature.current = undefined;
		},
	});
	useLayerEvent({
		event: 'mousedown',
		addTouchEvents: true,
		layerId: 'pdfPreviewGeojson',
		eventHandler: function (e: MapMouseEvent | MapTouchEvent) {
			e.preventDefault();
			console.log('mousedown');
			if (!mapHook.map) return;

			draggingResizeHandle.current = false;
			draggingRotationHandle.current = false;
			dragging.current = true;
			mapHook.map.map._canvas.style.cursor = 'move';

			function onMove(e: MapMouseEvent | MapTouchEvent) {
				e.preventDefault();
				if (!dragging.current || !pdfContext.geojsonRef || !pdfContext.orientation) return;

				const tmpGeojsonProps = JSON.parse(JSON.stringify(geojsonProps));
				tmpGeojsonProps.center = e.lngLat;
				tmpGeojsonProps.geojson = createPreviewGeojson(tmpGeojsonProps, pdfContext.orientation);
				pdfContext.geojsonRef.current = tmpGeojsonProps.geojson;
				setGeojsonProps(tmpGeojsonProps);
			}
			function onUp() {
				if (!dragging.current || !mapHook.map) return;

				mapHook.map.map._canvas.style.cursor = '';
				dragging.current = false;

				mapHook.map.map.dragPan.enable();
				// Unbind mouse events
				mapHook.map.map.off('mousemove', onMove);
				mapHook.map.map.off('touchmove', onMove);
			}

			// Mouse events
			mapHook.map.map.on('mousemove', onMove);
			mapHook.map.map.on('touchmove', onMove);
			mapHook.map.map.once('mouseup', onUp);
			mapHook.map.map.once('touchend', onUp);
		},
	});

	//map.on('mouseleave', 'point', function() {
	//    map.setPaintProperty('point', 'circle-color', '#3887be');
	//    canvas.style.cursor = '';
	//    isCursorOverPoint = false;
	//    map.dragPan.enable();
	//});

	return (
		<>
			{geojsonProps?.geojson?.bbox && (
				<>
					<MlGeoJsonLayer
						paint={{ 'line-color': '#616161', 'line-width': 4 }}
						type="line"
						layerId="pdfPreviewGeojsonOutline"
						geojson={geojsonProps.geojson}
					/>
					<MlGeoJsonLayer
						paint={{ 'fill-opacity': 0 }}
						type="fill"
						layerId="pdfPreviewGeojson"
						geojson={geojsonProps.geojson}
					/>
					<MlGeoJsonLayer
						layerId="pdfPreviewGeojsonResizeHandle"
						paint={{
							'circle-radius': 10,
							'circle-color': '#1976d2',
							'circle-stroke-width': 2,
							'circle-stroke-color': '#ffffff',
						}}
						geojson={{
							type: 'Feature',
							geometry: {
								type: 'Point',
								//coordinates: [geojsonProps.geojson.bbox[2], geojsonProps.geojson.bbox[3]],
								coordinates: geojsonProps.geojson.geometry.coordinates[0][2],
							},
							properties: {},
						}}
					/>
					<MlGeoJsonLayer
						layerId="pdfPreviewGeojsonRotationHandle"
						paint={{
							'circle-radius': 10,
							'circle-color': '#86dd71',
							'circle-stroke-width': 2,
							'circle-stroke-color': '#ffffff',
						}}
						geojson={{
							type: 'Feature',
							geometry: {
								type: 'Point',
								//coordinates: [geojsonProps.geojson.bbox[0], geojsonProps.geojson.bbox[3]],
								coordinates: geojsonProps.geojson.geometry.coordinates[0][3],
							},
							properties: {},
						}}
					/>
				</>
			)}
		</>
	);
}
