import React, { useRef, useState, useContext, useMemo } from 'react';
import ReactDOM from 'react-dom';
import PdfContext from './PdfContext';
import Moveable from 'react-moveable';
import MlGeoJsonLayer from '../../MlGeoJsonLayer/MlGeoJsonLayer';
import { Polygon } from '@turf/turf';
import { Feature } from 'maplibre-gl';
import useMap from '../../../hooks/useMap';
import useMapState from '../../../hooks/useMapState';

type Props = {};

interface geojsonProps {
	center: { lng: number; lat: number };
	distance: number;
	bearing: number;
	geojson: Feature<Polygon> | undefined;
}

function getRotationAngle(target) 
{
  const obj = window.getComputedStyle(target, null);
  const matrix = obj.getPropertyValue('-webkit-transform') || 
    obj.getPropertyValue('-moz-transform') ||
    obj.getPropertyValue('-ms-transform') ||
    obj.getPropertyValue('-o-transform') ||
    obj.getPropertyValue('transform');

  let angle = 0; 

  if (matrix !== 'none') 
  {
    const values = matrix.split('(')[1].split(')')[0].split(',');
    const a = values[0];
    const b = values[1];
    angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
  } 

  return (angle < 0) ? angle +=360 : angle;
}

function calcElemTransformedPoint(elem, point) {
	var style = getComputedStyle(elem);
	var transformOrigin = style.transformOrigin.split(' ').map(function (e) {
		// Remove 'px' and cast to number
		return +e.slice(0, -2);
	});

	var p = [point[0] - transformOrigin[0], point[1] - transformOrigin[1]];
	// Matrix
	const matrix = new DOMMatrixReadOnly(style.transform);

	// Matrix multiplication
	return [
		p[0] * matrix.a + p[1] * matrix.c + matrix.e + transformOrigin[0],
		p[0] * matrix.b + p[1] * matrix.d + matrix.f + transformOrigin[1],
	];
}
const width = '210px';
const height = '297px';

export default function PdfPreview(props: Props) {
	const mapState = useMapState({mapId: props.mapId, watch:{layers:false, viewport:true}})
	const targetRef = useRef<HTMLDivElement>(null);
	const moveableRef = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState('translate(452.111px, 15.6148px)');
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const geojson = useMemo(() => {
		if (targetRef.current && mapHook.map) {
			// apply orientation
			if (props.orientation === 'portrait') {
				targetRef.current.style.width = width;
				targetRef.current.style.height = height;
			} else {
				targetRef.current.style.width = height;
				targetRef.current.style.height = width;
			}
			moveableRef.current?.updateTarget();
			console.log(targetRef.current);

			const style = window.getComputedStyle(targetRef.current);

			const _width = parseInt(style.width.replace('px', ''));
			const _height = parseInt(style.height.replace('px', ''));

			let topLeft = mapHook.map.unproject(calcElemTransformedPoint(targetRef.current, [0, 0]));
			let topRight = mapHook.map.unproject(
				calcElemTransformedPoint(targetRef.current, [_width, 0])
			);
			let bottomLeft = mapHook.map.unproject(
				calcElemTransformedPoint(targetRef.current, [0, _height])
			);
			let bottomRight = mapHook.map.unproject(
				calcElemTransformedPoint(targetRef.current, [_width, _height])
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
				properties: {bearing:getRotationAngle(targetRef.current)},
			};
			props.geojsonRef.current = _geoJson;
			return _geoJson;
		}

		return undefined;
	}, [mapHook, transform, props.orientation, props.geojsonRef, mapState]);

	return ReactDOM.createPortal(
		<>
			<div className="target" ref={targetRef} style={{ transform: transform }}></div>
			<Moveable
				ref={moveableRef}
				target={targetRef}
				container={null}
				origin={true}
				keepRatio={true}
				/* draggable */
				draggable={true}
				onDrag={(e) => {
					console.log(e.transform);
					//e.target.style.transform = e.transform;
					setTransform(e.transform);
				}}
				/* Only one of resizable, scalable, warpable can be used. */
				/* scalable */
				/* Only one of resizable, scalable, warpable can be used. */
				scalable={true}
				onScale={(e) => {
					console.log(e.drag.transform);
					//e.target.style.transform = e.drag.transform;
					setTransform(e.drag.transform);
				}}
				/* rotatable */
				rotatable={true}
				onRotate={(e) => {
					console.log(e.drag.transform);
					//e.target.style.transform = e.drag.transform;
					setTransform(e.drag.transform);
				}}
			/>
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
