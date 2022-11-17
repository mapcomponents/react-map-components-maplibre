import React from 'react';
import MlGeoJsonLayer from './MlGeoJsonLayer';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import PolygonStyler from './story_utils/MlGeoJsonLayer.polygonStyler';
import LineStyler from './story_utils/MlGeoJsonLayer.lineStyler';
import sample_geojson_1 from './assets/sample_1.json';
import sample_geojson_2 from './assets/sample_2.json';
import { GeoJSONObject } from '@turf/turf';

const storyoptions = {
	title: 'MapComponents/MlGeoJsonLayer',
	component: MlGeoJsonLayer,

	argTypes: {},

	decorators: mapContextDecorator,
};
export default storyoptions;

interface TemplateProps {
	geojson: GeoJSONObject;
	mapId: string;
	type: string;
}

const Template = (props: TemplateProps) => {
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

export const Linestring = Template.bind({});
Linestring.parameters = {};
Linestring.args = {
	geojson: sample_geojson_2,
	mapId: 'Map_1',
	/*paint:{
		"stroke-color": 'rgba(123,20,80)',
		"fill-opacity": 0
	},*/
	type: 'line',
};

export const Polygon = PolygonTemplate.bind({});

Polygon.args = {
	geojson: sample_geojson_1,
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
