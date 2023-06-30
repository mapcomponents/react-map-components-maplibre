import React, { useRef, useEffect } from 'react';
import MlGeoJsonLayer from './MlGeoJsonLayer';
import useMap from '../../hooks/useMap';
import geoJsonDecorator from '../../decorators/GeoJsonMapDecorator';
import PolygonStyler from './story_utils/MlGeoJsonLayer.polygonStyler';
import LineStyler from './story_utils/MlGeoJsonLayer.lineStyler';
import HeatMapStyler from './story_utils/MlGeojsonLayerHeatMapStyler';
import sample_geojson_1 from './assets/sample_1.json';
import sample_geojson_2 from './assets/sample_2.json';
import earthquakes from './assets/earthquake.json';
import wg_locations from './assets/wg_locations.json';
import { Feature, Geometry, GeometryCollection } from '@turf/turf';
import { MlGeoJsonLayerProps } from './MlGeoJsonLayer';
import CircleMapStyler from './story_utils/MlGeojsonLayerCircleStyler';

const storyoptions = {
	title: 'MapComponents/MlGeoJsonLayer',
	component: MlGeoJsonLayer,

	argTypes: {},

	decorators: geoJsonDecorator,
};
export default storyoptions;

interface TemplateProps {
	geojson: Feature<Geometry | GeometryCollection>;
	mapId: string;
	type: string;
}

const Template = (props: MlGeoJsonLayerProps) => {
	return (
		<>
			<MlGeoJsonLayer {...props} />
		</>
	);
};

const LineTemplate = (props: TemplateProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [7.100175528281227, 50.73487992742369], zoom: 16 });
	}, [mapHook.map]);
	return (
		<>
			<LineStyler {...props} />
		</>
	);
};
const PolygonTemplate = (props: TemplateProps) => {
	return (
		<>
			<PolygonStyler {...props} />
		</>
	);
};

const CircleTemplate = (props: MlGeoJsonLayerProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [10.251805123900311, 51.11826171422632], zoom: 5 });
	}, [mapHook.map]);

	return <CircleMapStyler {...props} />;
};

const HeatmapTemplate = (props: MlGeoJsonLayerProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [-150.4048, 63.1224], zoom: 3 });
	}, [mapHook.map]);

	return <HeatMapStyler {...props} />;
};

export const Circle = CircleTemplate.bind({});
Circle.parameters = {};
Circle.args = {
	geojson: wg_locations,
	paint: {
		//'circle-radius': ['/', ['get', 'Mitarbeitende'], 1.1],
		'circle-radius': { property: 'Mitarbeitende', stops: [ [3, 6], [26, 35] ] },
		'circle-color': '#B11E40',
	},
	type: 'circle',
};

export const Linestring = LineTemplate.bind({});
Linestring.parameters = {};
Linestring.args = {
	geojson: sample_geojson_2,
	mapId: 'Map_1',
	type: 'line',
};

export const Polygon = PolygonTemplate.bind({});

Polygon.args = {
	geojson: sample_geojson_1,
};

export const HeatMap = HeatmapTemplate.bind({});
HeatMap.parameters = {};
HeatMap.args = {
	geojson: earthquakes,
	options: {
		// paint examples copied from https://maplibre.org/maplibre-gl-js-docs/example/heatmap-layer/
		paint: {
			// Increase the heatmap weight based on frequency and property magnitude
			'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
			// Increase the heatmap color weight by zoom level
			// heatmap-intensity is a multiplier on top of heatmap-weight
			'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
			// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
			// Begin color ramp at 0-stop with a 0-transparancy color
			// to create a blur-like effect.
			'heatmap-color': [
				'interpolate',
				['linear'],
				['heatmap-density'],
				0,
				'rgba(33,102,172,0)',
				0.2,
				'rgb(103,169,207)',
				0.4,
				'rgb(209,229,240)',
				0.6,
				'rgb(253,219,199)',
				0.8,
				'rgb(239,138,98)',
				1,
				'rgb(178,24,43)',
			],
			// Adjust the heatmap radius by zoom level
			'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
			// Transition from heatmap to circle layer by zoom level
			'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
		},
	},
	type: 'heatmap',
};

export const DefaultPaintOverrides = Template.bind({});
DefaultPaintOverrides.parameters = {};
DefaultPaintOverrides.args = {
	defaultPaintOverrides: {
		fill: {
			'fill-color': 'blue',
		},
		circle: {
			'circle-color': 'red',
		},
		line: {
			'line-color': 'black',
		},
	},
	geojson: sample_geojson_1,
	type: '',
};
