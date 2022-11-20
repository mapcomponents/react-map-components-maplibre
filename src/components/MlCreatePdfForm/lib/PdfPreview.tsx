import React, { useRef, useState, useContext, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import PdfContext from './PdfContext';
import Moveable from 'react-moveable';
import MlGeoJsonLayer from '../../MlGeoJsonLayer/MlGeoJsonLayer';
import { Polygon } from '@turf/turf';
import { Feature } from 'maplibre-gl';
import useMap from '../../../hooks/useMap';
import useMapState from '../../../hooks/useMapState';
import { Coordinate } from 'mapbox-gl';

type Props = {
	geojsonRef: any;
	orientation: string;
	width: number;
	height: number;
	center: number[];
};

interface geojsonProps {
	center: { lng: number; lat: number };
	distance: number;
	bearing: number;
	geojson: Feature<Polygon> | undefined;
}

const scaleAnchorInPixels = 10;

function getRotationAngle(target) {
	const obj = window.getComputedStyle(target, null);
	const matrix =
		obj.getPropertyValue('-webkit-transform') ||
		obj.getPropertyValue('-moz-transform') ||
		obj.getPropertyValue('-ms-transform') ||
		obj.getPropertyValue('-o-transform') ||
		obj.getPropertyValue('transform');

	let angle = 0;

	if (matrix !== 'none') {
		const values = matrix.split('(')[1].split(')')[0].split(',');
		const a = values[0];
		const b = values[1];
		angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
	}

	return angle < 0 ? (angle += 360) : angle;
}

function calcElemTransformedPoint(elem, point, transformOrigin) {
	var style = getComputedStyle(elem);
	var p = [point[0] - transformOrigin[0], point[1] - transformOrigin[1]];
	// Matrix
	const matrix = new DOMMatrixReadOnly(style.transform);

	// Matrix multiplication
	return [
		p[0] * matrix.a + p[1] * matrix.c + matrix.e + transformOrigin[0],
		p[0] * matrix.b + p[1] * matrix.d + matrix.f + transformOrigin[1],
	];
}

function getMapZoomScaleModifier(point, _map) {
	const left = _map.unproject(point);
	const right = _map.unproject([point[0] + scaleAnchorInPixels, point[1]]);
	const maxMeters = left.distanceTo(right);
	return scaleAnchorInPixels / maxMeters;
}
export default function PdfPreview(props: Props) {
	const mapState = useMapState({ mapId: props.mapId, watch: { layers: false, viewport: true } });
	const targetRef = useRef<HTMLDivElement>(null);
	const zoomRef = useRef<number>(0);
	const moveableRef = useRef<HTMLDivElement>(null);
	//const [transform, setTransform] = useState('translate(452.111px, 15.6148px)');
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const [scalePoints, setScalePoints] = useState();

	useEffect(() => {
		if (!mapState?.viewport?.zoom || !mapHook.map) return;

		//initialize props if not defined
		const _centerX = Math.round(mapHook.map.map._container.clientWidth / 2);
		const _centerY = Math.round(mapHook.map.map._container.clientHeight / 2);

		if (!props.transformScale) {
			//const scale = parseFloat(/(14/mapState.viewport.zoom));
			const scale =  1/getMapZoomScaleModifier([_centerX, _centerY], mapHook.map);

			props.setTransformScale([scale, scale]);
		}
		if (!props.center) {
			const _center = mapHook.map.map.unproject([_centerX, _centerY]);
			props.setCenter([_center.lng, _center.lat]);
		}
	}, [mapHook.map, mapState.viewport?.zoom]);

	useEffect(() => {
		if (!mapHook.map) return;

		mapHook.map.map.setPitch(0);
		let _maxPitch = mapHook.map.map.getMaxPitch();
		mapHook.map.map.setMaxPitch(0);
		return () => {
			mapHook.map.map.setMaxPitch(_maxPitch);
		};
	}, [mapHook.map]);

	const transformOrigin = useMemo(() => {
		if (props.orientation === 'portrait') {
			return [props.width / 2, props.height / 2];
		} else {
			return [props.height / 2, props.width / 2];
		}
	}, [props.orientation, props.width, props.height]);

	const transform = useMemo(() => {
		if (!mapHook.map || !props.transformScale) return 'none';

		const centerInPixels = mapHook.map.map.project(props.center);

		//const scale = parseFloat(props.transformScale[0])*(mapState.viewport.zoom/14);
		const x = centerInPixels.x;
		const y = centerInPixels.y;
		const scale =
			parseFloat(props.transformScale[0]) * getMapZoomScaleModifier([x, y], mapHook.map);

		//console.log('scale calculated', scale);

		const _transform = `translate(${parseInt(centerInPixels.x - transformOrigin[0])}px,${parseInt(
			centerInPixels.y - transformOrigin[1]
		)}px) rotate(${props.transformRotate - mapState.viewport.bearing}deg) scale(${scale},${scale})`;
		targetRef.current.style.transform = _transform;
		//console.log('transform memo: ', _transform);

		return _transform;
	}, [
		mapHook.map,
		mapState.viewport,
		props.transformScale,
		props.transformRotate,
		props.center,
		transformOrigin,
	]);

	useEffect(() => {
		moveableRef.current?.updateTarget();
	}, [transform]);

	const geojson = useMemo(() => {
		if (targetRef.current && mapHook.map) {
			// apply orientation
			let _width = props.width;
			let _height = props.height;
			if (props.orientation === 'portrait') {
				targetRef.current.style.width = props.width + 'px';
				targetRef.current.style.height = props.height + 'px';
			} else {
				targetRef.current.style.width = props.height + 'px';
				targetRef.current.style.height = props.width + 'px';
				_width = props.height;
				_height = props.width;
			}
			moveableRef.current?.updateTarget();

			let topLeft = mapHook.map.unproject(
				calcElemTransformedPoint(targetRef.current, [0, 0], transformOrigin)
			);
			let topRight = mapHook.map.unproject(
				calcElemTransformedPoint(targetRef.current, [_width, 0], transformOrigin)
			);
			let bottomLeft = mapHook.map.unproject(
				calcElemTransformedPoint(targetRef.current, [0, _height], transformOrigin)
			);
			let bottomRight = mapHook.map.unproject(
				calcElemTransformedPoint(targetRef.current, [_width, _height], transformOrigin)
			);
			const _geoJson = {
				type: 'Feature',
				bbox: [topLeft.lng, topLeft.lat, bottomRight.lng, bottomRight.lat],
				geometry: {
					type: 'Polygon',
					coordinates: [
						[
							[topLeft.lng, topLeft.lat],
							[topRight.lng, topRight.lat],
							[bottomRight.lng, bottomRight.lat],
							[bottomLeft.lng, bottomLeft.lat],
							[topLeft.lng, topLeft.lat],
						],
					],
				},
				properties: { bearing: getRotationAngle(targetRef.current) },
			};
			props.geojsonRef.current = _geoJson;
			return _geoJson;
		}

		return undefined;
	}, [
		mapHook,
		transform,
		props.orientation,
		props.geojsonRef,
		mapState,
		targetRef.current,
		transformOrigin,
	]);

	return ReactDOM.createPortal(
		<>
			<div
				className="target"
				ref={targetRef}
				style={{ transform: transform, transformOrigin: 'center center' }}
			></div>
			<Moveable
				ref={moveableRef}
				target={targetRef}
				container={null}
				origin={true}
				keepRatio={true}
				/* draggable */
				draggable={true}
				onDrag={(e) => {
					if (mapHook.map) {
						//const matrix = new DOMMatrixReadOnly(e.transform);
						//let _topLeft = mapHook.map?.map.unproject([matrix.m41, matrix.m42]);

						let _transformParts = e.transform.split('translate(');
						_transformParts = _transformParts[1].split('px)')[0].split('px, ');
						let _center = mapHook.map?.map.unproject([
							parseInt(_transformParts[0]) + transformOrigin[0],
							parseInt(_transformParts[1]) + transformOrigin[1],
						]);
						props.setCenter([_center.lng, _center.lat]);
					}
					//e.target.style.transform = e.transform;
					//setTransform(e.transform);
				}}
				/* Only one of resizable, scalable, warpable can be used. */
				/* scalable */
				/* Only one of resizable, scalable, warpable can be used. */
				scalable={true}
				onScale={(e) => {

					let _transformParts = e.drag.transform.split('scale(');
					_transformParts = _transformParts[1].split(')')[0].split(', ');

					const centerInPixels = mapHook.map.map.project(props.center);

					const x = centerInPixels.x;
					const y = centerInPixels.y;

					const scale =
						parseFloat(_transformParts[0]) * (1 / getMapZoomScaleModifier([x, y], mapHook.map));

					//console.log(scale);

					props.setTransformScale([scale, scale]);
				}}
				/* rotatable */
				rotatable={true}
				onRotate={(e) => {

					let _transformParts = e.drag.transform.split('rotate(');
					_transformParts = _transformParts[1].split('deg)')[0];

					props.setTransformRotate(parseFloat(_transformParts) + mapState.viewport.bearing);
				}}
			/>
			{props.center && (
				<MlGeoJsonLayer
					//layerId="pdfPreviewGeojsonRotationHandle"
					paint={{
						'circle-radius': 10,
						//'circle-opacity': 0,
						'circle-color': '#ff2323',
					}}
					type="circle"
					geojson={{
						type: 'Feature',
						geometry: { type: 'Point', coordinates: props.center },
						properties: {},
					}}
				/>
			)}
			{geojson && (
				<MlGeoJsonLayer
					//layerId="pdfPreviewGeojsonRotationHandle"
					paint={{
						'circle-radius': 20,
						//'circle-opacity': 0,
						'circle-color': '#86dd71',
					}}
					type="circle"
					geojson={geojson}
				/>
			)}
		</>,
		document.querySelector('.mapContainer')
	);
}
