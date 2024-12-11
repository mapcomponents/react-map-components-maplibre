import { Theme, useMediaQuery } from '@mui/material';
function featureEditorStyle() {
	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	const featureEditorStyle = [
		{
			id: 'gl-draw-polygon-fill-inactive',
			type: 'fill',
			filter: [
				'all',
				['==', 'active', 'false'],
				['==', '$type', 'Polygon'],
				['!=', 'mode', 'static'],
			],
			paint: {
				'fill-color': '#009EE0',
				'fill-outline-color': '#009EE0',	
				'fill-opacity': 0.3,
			},
		},

		{
			id: 'gl-draw-polygon-fill-active',
			type: 'fill',
			filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
			paint: {
				'fill-color': '#009EE0',
				'fill-outline-color': '#009EE0',
				'fill-opacity': 0.2,
			},
		},
		
		{
			id: 'gl-draw-polygon-stroke-inactive',
			type: 'line',
			filter: [
				'all',
				['==', 'active', 'false'],
				['==', '$type', 'Polygon'],
				['!=', 'mode', 'static'],
			],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': '#009EE0',
				'line-width': 3,
			},
		},
		{
			id: 'gl-draw-polygon-stroke-active',
			type: 'line',
			filter: ['all', ['==', 'active', 'true'], ['==', '$type', 'Polygon']],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': '#009EE0',
				'line-dasharray': [0.2, 2],
				'line-width': 2,
			},
		},
		
		{
			id: 'gl-draw-line-inactive',
			type: 'line',
			filter: [
				'all',
				['==', 'active', 'false'],
				['==', '$type', 'LineString'],
				['!=', 'mode', 'static'],
			],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': '#009EE0',
				'line-width': 3,
			},
		},
		{
			id: 'gl-draw-line-active',
			type: 'line',
			filter: ['all', ['==', '$type', 'LineString'], ['==', 'active', 'true']],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': "#009EE0",
				'line-dasharray': [0.2, 2],
				'line-width': 2,
			},
		},
		{
			id: 'gl-draw-polygon-midpoint',
			type: 'circle',
			filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
			paint: {
				'circle-radius': mediaIsMobile ? 5 : 4,
				'circle-color': '#ffffff',
				'circle-stroke-color': '#009EE0',	
				'circle-stroke-width': 1
			},
		},
		{
			id: 'gl-draw-polygon-and-line-vertex-stroke-inactive',
			type: 'circle',
			filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
			paint: {
				'circle-radius': mediaIsMobile ? 8 : 6,
				'circle-color': '#fff',
			},
		},
		{
			id: 'gl-draw-polygon-and-line-vertex-inactive',
			type: 'circle',
			filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
			paint:  {
				'circle-radius': mediaIsMobile ? 7 : 5,
				'circle-color': '#ffffff',
				'circle-stroke-color': '#009EE0',	
				'circle-stroke-width': 1
			},
		},
		{
			id: 'gl-draw-point-point-stroke-inactive',
			type: 'circle',
			filter: [
				'all',
				['==', 'active', 'false'],
				['==', '$type', 'Point'],
				['==', 'meta', 'feature'],
				['!=', 'mode', 'static'],
			],
			paint: {
				'circle-radius': mediaIsMobile ? 10 : 9,
				'circle-opacity': 1,
				'circle-color': '#009EE0',
			},
		},
		{
			id: 'gl-draw-point-inactive',
			type: 'circle',
			filter: [
				'all',
				['==', 'active', 'false'],
				['==', '$type', 'Point'],
				['==', 'meta', 'feature'],
				['!=', 'mode', 'static'],
			],
			paint: {
				'circle-radius': mediaIsMobile ? 7.5 : 6.5,
				'circle-color': '#009EE0',		
			},
		},
		{
			id: 'gl-draw-point-stroke-active',
			type: 'circle',
			filter: [
				'all',
				['==', '$type', 'Point'],
				['==', 'active', 'true'],
				['!=', 'meta', 'midpoint'],
			],
			paint: {
				'circle-radius': mediaIsMobile ? 11 : 10,
				'circle-color': '#fff',
			},
		},
		{
			id: 'gl-draw-point-active',
			type: 'circle',
			filter: [
				'all',
				['==', '$type', 'Point'],
				['!=', 'meta', 'midpoint'],
				['==', 'active', 'true'],
			],
			paint: {
				'circle-radius': mediaIsMobile ? 8.5 : 7.5,
				'circle-color': '#009EE0',
			},
		},
		{
			id: 'gl-draw-polygon-fill-static',
			type: 'fill',
			filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
			paint: {
				'fill-color': '#404040',
				'fill-outline-color': '#404040',
				'fill-opacity': 0.1,
			},
		},
		{
			id: 'gl-draw-polygon-stroke-static',
			type: 'line',
			filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': '#404040',
				'line-width': 2,
			},
		},
		{
			id: 'gl-draw-line-static',
			type: 'line',
			filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': '#404040',
				'line-width': 2,
			},
		},
		{
			id: 'gl-draw-point-static',
			type: 'circle',
			filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Point']],
			paint: {
				'circle-radius': mediaIsMobile ? 8.5 : 6.5,
				'circle-color': '#404040',
			},
		},
	];
	return featureEditorStyle;
}
export default featureEditorStyle;
