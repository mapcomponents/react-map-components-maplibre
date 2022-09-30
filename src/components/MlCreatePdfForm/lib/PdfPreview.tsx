import React, { useContext, useMemo, useRef, useState, useEffect } from 'react';
import MlGeoJsonLayer from '../../MlGeoJsonLayer/MlGeoJsonLayer';
import * as turf from '@turf/turf';
import useMap from '../../../hooks/useMap';
import useLayerEvent from '../../../hooks/useLayerEvent';
import { BBox } from '@turf/turf';
import PdfContext from './PdfContext';

const createPreviewGeojson = (geojsonProps: any, orientation:string) => {
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
	console.log(bbox);

	let _previewGeojson = turf.bboxPolygon(bbox as BBox);
	_previewGeojson = turf.transformRotate(_previewGeojson, geojsonProps.bearing);
	if(!_previewGeojson?.properties){
		_previewGeojson.properties = {};
	}
	_previewGeojson.properties.bearing = geojsonProps.bearing;
	return _previewGeojson;
};

export default function PdfPreview(props: any) {
	const pdfContext = useContext(PdfContext);
	const initializedRef = useRef(false);
	const activeFeature = useRef();

	const cursorOverGeometry = useRef(false);
	const dragging = useRef(false);

	const cursorOverGeometryResizeHandle = useRef(false);
	const draggingResizeHandle = useRef(false);

	const cursorOverGeometryRotationHandle = useRef(false);
	const draggingRotationHandle = useRef(false);

	const [geojsonProps, setGeojsonProps] = useState({
		center: { lng: 0, lat: 0 },
		distance: 10,
		bearing: 0,
		geojson: undefined as any,
	});

	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;

		const center = mapHook.map.map.getCenter();
		const canvasHeight = mapHook.map.map._canvas.height;
		const canvasWidth = mapHook.map.map._canvas.width;
		const bboxPixelHeight = Math.ceil(canvasHeight / 2);
		const bboxPixelWidth = Math.ceil(
			// @ts-ignore
			(pdfContext.template.width / pdfContext.template.height) * bboxPixelHeight
		);

		const topLeft = mapHook.map.map.unproject([
			Math.floor(canvasWidth / 2 - bboxPixelWidth / 2),
			Math.floor(canvasHeight / 2 - bboxPixelHeight / 2),
		]);

		const distance = turf.distance([center.lng, center.lat], [topLeft.lng, topLeft.lat]);

		// @ts-ignore
		setGeojsonProps({
			center,
			distance,
			bearing: 0,
			geojson: createPreviewGeojson({ center, distance, bearing: 0 }, pdfContext.orientation),
		});
	}, [mapHook.map]);

	useEffect(() => {
		const tmpGeojsonProps = JSON.parse(JSON.stringify(geojsonProps));
		tmpGeojsonProps.geojson = createPreviewGeojson(tmpGeojsonProps, pdfContext.orientation);
		setGeojsonProps(tmpGeojsonProps);
		pdfContext.geojsonRef.current = tmpGeojsonProps.geojson;
	}, [pdfContext.orientation]);

	// Resize handle events
	useLayerEvent({
		event: 'mouseenter',
		layerId: 'pdfPreviewGeojsonResizeHandle',
		eventHandler: function (e: any) {
			if (!mapHook.map) return;

			cursorOverGeometryResizeHandle.current = true;
			mapHook.map.map._canvas.style.cursor = 'nwse-resize';
			mapHook.map.map.dragPan.disable();
		},
	});
	useLayerEvent({
		event: 'mouseleave',
		layerId: 'pdfPreviewGeojsonResizeHandle',
		eventHandler: function (e: any) {
			if (!mapHook.map) return;

			cursorOverGeometryResizeHandle.current = false;
			mapHook.map.map._canvas.style.cursor = '';
			mapHook.map.map.dragPan.enable();
		},
	});
	useLayerEvent({
		event: 'mousedown',
		layerId: 'pdfPreviewGeojsonResizeHandle',
		eventHandler: function () {
			if (!mapHook.map) return;
			if (!cursorOverGeometryResizeHandle.current) return;


			dragging.current = false;
      cursorOverGeometry.current = false;
			draggingResizeHandle.current = true;
			mapHook.map.map._canvas.style.cursor = 'move';

			function onMove(e: any) {
				if (!draggingResizeHandle.current) return;

				const tmpGeojsonProps = JSON.parse(JSON.stringify(geojsonProps));
				let _distance = turf.distance(
					[tmpGeojsonProps.center.lng, tmpGeojsonProps.center.lat],
					[e.lngLat.lng, e.lngLat.lat]
				);
				// limit max diagonal distance of PDF area to 120km as larger area lead to distortions for northern and southern areas
				if(_distance > 60){
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
			}

			// Mouse events
			mapHook.map.map.on('mousemove', onMove);
			mapHook.map.map.once('mouseup', onUp);
		},
	});

	// Rotation handle events
	useLayerEvent({
		event: 'mouseenter',
		layerId: 'pdfPreviewGeojsonRotationHandle',
		eventHandler: function (e: any) {
			if (!mapHook.map) return;

			cursorOverGeometryRotationHandle.current = true;
			mapHook.map.map._canvas.style.cursor = 'nwse-resize';
			mapHook.map.map.dragPan.disable();
		},
	});
	useLayerEvent({
		event: 'mouseleave',
		layerId: 'pdfPreviewGeojsonRotationHandle',
		eventHandler: function (e: any) {
			if (!mapHook.map) return;

			cursorOverGeometryRotationHandle.current = false;
			mapHook.map.map._canvas.style.cursor = '';
			mapHook.map.map.dragPan.enable();
		},
	});
	useLayerEvent({
		event: 'mousedown',
		layerId: 'pdfPreviewGeojsonRotationHandle',
		eventHandler: function () {
			if (!mapHook.map) return;
			if (!cursorOverGeometryRotationHandle.current) return;


			dragging.current = false;
      cursorOverGeometry.current = false;
			draggingRotationHandle.current = true;
			mapHook.map.map._canvas.style.cursor = 'move';

			function onMove(e: any) {
				if (!draggingRotationHandle.current) return;

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
			}

			// Mouse events
			mapHook.map.map.on('mousemove', onMove);
			mapHook.map.map.once('mouseup', onUp);
		},
	});

	// drag & drop events
	useLayerEvent({
		event: 'mouseenter',
		layerId: 'pdfPreviewGeojson',
		eventHandler: function (e: any) {
			if (!mapHook.map) return;
			cursorOverGeometry.current = true;
			mapHook.map.map._canvas.style.cursor = 'move';
			mapHook.map.map.dragPan.disable();
			activeFeature.current = e.features[0];
		},
	});
	useLayerEvent({
		event: 'mouseleave',
		layerId: 'pdfPreviewGeojson',
		eventHandler: function () {
			if (!mapHook.map) return;

			cursorOverGeometry.current = false;
			mapHook.map.map._canvas.style.cursor = '';
			mapHook.map.map.dragPan.enable();
			activeFeature.current = undefined;
		},
	});
	useLayerEvent({
		event: 'mousedown',
		layerId: 'pdfPreviewGeojson',
		eventHandler: function () {
			if (!mapHook.map) return;
			if (!cursorOverGeometry.current) return;

			dragging.current = true;
			mapHook.map.map._canvas.style.cursor = 'move';

			function onMove(e: any) {
				if (!dragging.current) return;

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

				// Unbind mouse events
				mapHook.map.map.off('mousemove', onMove);
			}

			// Mouse events
			mapHook.map.map.on('mousemove', onMove);
			mapHook.map.map.once('mouseup', onUp);
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
								coordinates: geojsonProps.geojson.geometry.coordinates[0][2]
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
								coordinates: geojsonProps.geojson.geometry.coordinates[0][3]
							},
							properties: {},
						}}
					/>
				</>
			)}
		</>
	);
}
