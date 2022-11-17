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
	topLeft: number[];
};

interface geojsonProps {
	center: { lng: number; lat: number };
	distance: number;
	bearing: number;
	geojson: Feature<Polygon> | undefined;
}

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
function getTransformTranslate(transform: string) {
	if (transform.indexOf('translate') === -1) return false;

	let _transformParts = transform.split('translate(');
	_transformParts = _transformParts[1].split('px)')[0].split('px, ');

	return _transformParts;
}
function getTransformRotate(transform: string) {
	if (transform.indexOf('rotate') === -1) return false;

	let _transformParts = transform.split('rotate(');
	_transformParts = _transformParts[1].split('deg)')[0];

	return _transformParts;
}
function getTransformScale(transform: string) {
	if (transform.indexOf('scale') === -1) return false;

	let _transformParts = transform.split('scale(');
	_transformParts = _transformParts[1].split(')')[0].split(', ');

	return _transformParts;
}
export default function PdfPreview(props: Props) {
	const mapState = useMapState({ mapId: props.mapId, watch: { layers: false, viewport: true } });
	const targetRef = useRef<HTMLDivElement>(null);
	const moveableRef = useRef<HTMLDivElement>(null);
	//const [transform, setTransform] = useState('translate(452.111px, 15.6148px)');
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	useEffect(() => {
		if (!mapHook.map) return;

		mapHook.map.map.setPitch(0);
		let _maxPitch = mapHook.map.map.getMaxPitch();
		mapHook.map.map.setMaxPitch(0);
		return () => {
		mapHook.map.map.setMaxPitch(_maxPitch);
		}
	}, [mapHook.map])

	const transformOrigin = useMemo(() => {

		if (props.orientation === 'portrait') {
			return [props.width / 2, props.height / 2];
		} else {
			return [props.height / 2, props.width / 2];
		}
	}, [props.orientation, props.width, props.height]);

	const transform = useMemo(() => {
		if (!mapHook.map) return 'none';

		const topLeftInPixels = mapHook.map.map.project(props.topLeft);

		//const scale = parseFloat(props.transformScale[0])*(mapState.viewport.zoom/14);
		const x = topLeftInPixels.x;
		const y = topLeftInPixels.y;
		const left = mapHook.map.unproject([x, y]);
		const right = mapHook.map.unproject([x+transformOrigin[0], y]);
		const maxMeters = left.distanceTo(right);
		const scale = parseFloat(props.transformScale[0]) * (transformOrigin[0] / maxMeters);
		const transform = `translate(${topLeftInPixels.x - transformOrigin[0]}px,${
			topLeftInPixels.y - transformOrigin[1]
		}px) rotate(${props.transformRotate - mapState.viewport.bearing}deg) scale(${scale},${scale})`;
		targetRef.current.style.transform = transform;

		return transform;
	}, [
		mapHook.map,
		props.transformScale,
		props.transformRotate,
		props.topLeft,
		mapState.viewport,
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

			let topLeft = mapHook.map.unproject(calcElemTransformedPoint(targetRef.current, [0, 0], transformOrigin));
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
	}, [mapHook, transform, props.orientation, props.geojsonRef, mapState, targetRef.current, transformOrigin]);

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
						let _topLeft = mapHook.map?.map.unproject([
							parseInt(_transformParts[0]) + transformOrigin[0],
							parseInt(_transformParts[1]) + transformOrigin[1],
						]);
						props.setTopLeft([_topLeft.lng, _topLeft.lat]);
					}
					//e.target.style.transform = e.transform;
					//setTransform(e.transform);
				}}
				/* Only one of resizable, scalable, warpable can be used. */
				/* scalable */
				/* Only one of resizable, scalable, warpable can be used. */
				scalable={true}
				onScale={(e) => {
					//e.target.style.transform = e.drag.transform;
					//setTransformScale(e.drag.transform);
					let _transformParts = e.drag.transform.split('scale(');
					_transformParts = _transformParts[1].split(')')[0].split(', ');

					const y = mapHook.map._container.clientHeight / 2;
					const left = mapHook.map.unproject([0, y]);
					const right = mapHook.map.unproject([100, y]);
					const maxMeters = left.distanceTo(right);
					const scale = parseFloat(_transformParts[0]) * (maxMeters / 100);

					props.setTransformScale([scale, scale]);
				}}
				/* rotatable */
				rotatable={true}
				onRotate={(e) => {
					//const matrix = new DOMMatrixReadOnly(e.transform);
					//console.log(matrix);

					let _transformParts = e.drag.transform.split('rotate(');
					_transformParts = _transformParts[1].split('deg)')[0];

					//e.target.style.transform = e.drag.transform;
					props.setTransformRotate(parseFloat(_transformParts) + mapState.viewport.bearing);
				}}
			/>
			{props.topLeft && (
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
						geometry: { type: 'Point', coordinates: props.topLeft },
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
