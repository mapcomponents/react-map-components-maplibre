import React, { useRef, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import Moveable from 'react-moveable';
import useMap from '../../../hooks/useMap';
import useMapState from '../../../hooks/useMapState';
import * as turf from '@turf/turf';
import { PdfPreviewOptions } from './pdfContext';
import {  LngLatLike, Map as MapType, PointLike } from 'maplibre-gl';
import { Units } from '@turf/turf';
import {Feature} from 'geojson';

type Props = {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Polygon GeoJson Feature representing the printing area
	 */
	geojsonRef: React.MutableRefObject<
		| Feature
		| undefined
	>;
	/**
	 * a state variable containing the PDF previews current state
	 */
	options: PdfPreviewOptions;
	/**
	 * setter function to update the current PDF preview state
	 */
	setOptions: (arg1: (val: PdfPreviewOptions) => PdfPreviewOptions) => void;
};

function getTargetRotationAngle(target: HTMLDivElement) {
	const el_style = window.getComputedStyle(target, null);
	const el_transform = el_style.getPropertyValue('transform');

	let deg = 0;

	if (el_transform !== 'none') {
		const values = el_transform.split('(')[1].split(')')[0].split(',');
		const a = parseFloat(values[0]);
		const b = parseFloat(values[1]);
		deg = Math.round(Math.atan2(b, a) * (180 / Math.PI));
	}

	return deg < 0 ? deg + 360 : deg;
}

function calcElemTransformedPoint(
	el: HTMLDivElement,
	point: [number, number],
	transformOrigin: [number, number]
): PointLike {
	const style = getComputedStyle(el);
	const p = [point[0] - transformOrigin[0], point[1] - transformOrigin[1]];

	const matrix = new DOMMatrixReadOnly(style.transform);

	// transform pixel coordinates according to the css transform state of "el" (target)
	return [
		p[0] * matrix.a + p[1] * matrix.c + matrix.e + transformOrigin[0],
		p[0] * matrix.b + p[1] * matrix.d + matrix.f + transformOrigin[1],
	];
}

// measure distance in pixels that is used to determine the current css transform.scale relative to the maps viewport.zoom
const scaleAnchorInPixels = 10;

// used to determine the MapZoomScale modifier which is multiplied with props.options.scale to relate the scale to the current map viewport.zoom
function getMapZoomScaleModifier(point: [number, number], _map: MapType) {
	const left = _map.unproject(point);
	const right = _map.unproject([point[0] + scaleAnchorInPixels, point[1]]);
	const maxMeters = left.distanceTo(right);
	return scaleAnchorInPixels / maxMeters;
}

/**
 * PdfPreview component renders a transformable (drag, scale, rotate) preview of the desired export or print content
 */
export default function PdfPreview(props: Props) {
	const mapState = useMapState({ mapId: props.mapId, watch: { layers: false, viewport: true } });
	const targetRef = useRef<HTMLDivElement>(null);
	const fixedScaleRef = useRef<number | undefined>();
	const moveableRef = useRef<Moveable>(null);
	const mapContainerRef = useRef<HTMLDivElement>(document.querySelector('.mapContainer'));
	//const [transform, setTransform] = useState('translate(452.111px, 15.6148px)');
	const mapHook = useMap({
		mapId: props.mapId,
	});

	useEffect(() => {
		if (!mapState?.viewport?.zoom || !mapHook.map) return;
		// if the component was initialized with scale or center as undefined derive those values from the current map view state

		//initialize props if not defined
		const _centerX = Math.round(mapHook.map.map._container.clientWidth / 2);
		const _centerY = Math.round(mapHook.map.map._container.clientHeight / 2);

		if (!props.options.scale) {
			//const scale = parseFloat(/(14/mapState.viewport.zoom));
			const scale = 1 / getMapZoomScaleModifier([_centerX, _centerY], mapHook.map.map);

			props.setOptions((val: PdfPreviewOptions) => ({ ...val, scale: [scale, scale] }));
		}
		if (!props.options.center) {
			const _center = mapHook.map.map.unproject([_centerX, _centerY]);
			props.setOptions((val: PdfPreviewOptions) => ({
				...val,
				center: [_center.lng, _center.lat],
			}));
		}
	}, [mapHook.map, mapState.viewport?.zoom]);

	useEffect(() => {
		if (!mapHook.map) return;

		mapHook.map.map.setPitch(0);
		const _maxPitch = mapHook.map.map.getMaxPitch();
		mapHook.map.map.setMaxPitch(0);
		return () => {
			mapHook.map?.map.setMaxPitch(_maxPitch);
		};
	}, [mapHook.map]);

	const transformOrigin = useMemo<[number, number]>(() => {
		if (props.options.orientation === 'portrait') {
			return [props.options.width / 2, props.options.height / 2];
		} else {
			return [props.options.height / 2, props.options.width / 2];
		}
	}, [props.options.orientation, props.options.width, props.options.height]);

	const transform = useMemo(() => {
		if (!mapHook.map || !props.options.scale) return 'none';

		const centerInPixels = mapHook.map.map.project(props.options.center as LngLatLike);

		const x = centerInPixels.x;
		const y = centerInPixels.y;
		const scale = props.options.scale[0] * getMapZoomScaleModifier([x, y], mapHook.map.map);

		const viewportBearing = mapState?.viewport?.bearing ? mapState.viewport?.bearing : 0;

		const _transform = `translate(${Math.floor(
			centerInPixels.x - transformOrigin[0]
		)}px,${Math.floor(centerInPixels.y - transformOrigin[1])}px) rotate(${
			props.options.rotate - viewportBearing
		}deg) scale(${scale},${scale})`;

		if (targetRef.current) targetRef.current.style.transform = _transform;

		return _transform;
	}, [
		mapHook.map,
		mapState.viewport,
		props.options.scale,
		props.options.rotate,
		props.options.center,
		transformOrigin,
	]);

	useEffect(() => {
		moveableRef.current?.updateTarget();
	}, [transform]);

	useEffect(() => {
		// update props.options.scale if fixedScale was changed
		if (
			!mapHook.map ||
			!props.options.center ||
			!props.options.fixedScale ||
			(typeof props.options.fixedScale !== 'undefined' &&
				fixedScaleRef.current === props.options.fixedScale)
		)
			return;

		fixedScaleRef.current = props.options.fixedScale;
		const point = turf.point(props.options.center);
		const distance = props.options.fixedScale * (props.options.width / 1000);

		const bearing = 90;
		const options = { units: 'meters' as Units };
		const destination = turf.destination(point, distance, bearing, options);

		const centerInPixels = mapHook.map.map.project(point.geometry.coordinates as LngLatLike);
		const destinationInPixels = mapHook.map.map.project(
			destination.geometry.coordinates as LngLatLike
		);

		const scaleFactor =
			(Math.round(destinationInPixels.x - centerInPixels.x) / props.options.width) *
			(1 / getMapZoomScaleModifier([centerInPixels.x, centerInPixels.y], mapHook.map.map));
		props.setOptions((val: PdfPreviewOptions) => ({ ...val, scale: [scaleFactor, scaleFactor] }));
	}, [mapHook.map, props.options.width, props.options.center, props.options.fixedScale]);

	// update props.geoJsonRef
	useEffect(() => {
		if (targetRef.current && mapHook.map) {
			// apply orientation
			let _width = props.options.width;
			let _height = props.options.height;
			if (props.options.orientation === 'portrait') {
				targetRef.current.style.width = props.options.width + 'px';
				targetRef.current.style.height = props.options.height + 'px';
			} else {
				targetRef.current.style.width = props.options.height + 'px';
				targetRef.current.style.height = props.options.width + 'px';
				_width = props.options.height;
				_height = props.options.width;
			}
			moveableRef.current?.updateTarget();

			const topLeft = mapHook.map.map.unproject(
				calcElemTransformedPoint(targetRef.current, [0, 0], transformOrigin)
			);
			const topRight = mapHook.map.map.unproject(
				calcElemTransformedPoint(targetRef.current, [_width, 0], transformOrigin)
			);
			const bottomLeft = mapHook.map.map.unproject(
				calcElemTransformedPoint(targetRef.current, [0, _height], transformOrigin)
			);
			const bottomRight = mapHook.map.map.unproject(
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
				properties: { bearing: getTargetRotationAngle(targetRef.current) },
			} as Feature;
			props.geojsonRef.current = _geoJson;
		}

		return undefined;
	}, [
		mapHook,
		transform,
		props.options.orientation,
		props.geojsonRef,
		mapState,
		targetRef.current,
		transformOrigin,
	]);

	return mapContainerRef.current ? ReactDOM.createPortal(
		<>
			<div
				className="target"
				ref={targetRef}
				style={{ transform: transform, transformOrigin: 'center center' }}
			></div>
			<Moveable
				// eslint-disable-next-line
				// @ts-ignore:
				ref={moveableRef}
				target={targetRef}
				container={null}
				origin={true}
				keepRatio={true}
				/* draggable */
				draggable={true}
				onDrag={(e) => {
					if (mapHook.map) {

						let _transformParts = e.transform.split('translate(');
						_transformParts = _transformParts[1].split('px)')[0].split('px, ');
						const _center = mapHook.map?.map.unproject([
							parseInt(_transformParts[0]) + transformOrigin[0],
							parseInt(_transformParts[1]) + transformOrigin[1],
						]);
						props.setOptions((val: PdfPreviewOptions) => ({
							...val,
							center: [_center.lng, _center.lat],
						}));
					}
				}}
				/* scalable */
				scalable={props.options.fixedScale ? false : true}
				onScale={(e) => {
					if (mapHook.map) {
						let _transformParts = e.drag.transform.split('scale(');
						_transformParts = _transformParts[1].split(')')[0].split(', ');

						const centerInPixels = mapHook.map.map.project(props.options.center as LngLatLike);

						const x = centerInPixels.x;
						const y = centerInPixels.y;

						const scale =
							parseFloat(_transformParts[0]) *
							(1 / getMapZoomScaleModifier([x, y], mapHook.map.map));


						props.setOptions((val: PdfPreviewOptions) => ({ ...val, scale: [scale, scale] }));
					}
				}}
				/* rotatable */
				rotatable={true}
				onRotate={(e) => {
					if (mapHook.map && mapState.viewport) {
						const _transformParts = e.drag.transform.split('rotate(');
						const _transformPartString = _transformParts[1].split('deg)')[0];
						const viewportBearing = mapState?.viewport?.bearing ? mapState.viewport.bearing : 0;

						props.setOptions((val: PdfPreviewOptions) => ({
							...val,
							rotate: parseFloat(_transformPartString) + viewportBearing,
						}));
					}
				}}
			/>
		</>,
		mapContainerRef.current
	):<></>;
}
