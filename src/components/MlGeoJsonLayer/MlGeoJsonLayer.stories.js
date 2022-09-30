import React, { useRef, useEffect, useState } from 'react';

import MlGeoJsonLayer from './MlGeoJsonLayer';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import PolygonStyler from './story_utils/MlGeoJsonLayer.polygonStyler';
import LineStyler from './story_utils/MlGeoJsonLayer.lineStyler';


import sample_geojson_1 from './assets/sample_1.json';
import sample_geojson_2 from './assets/sample_2.json';


console.log();
const storyoptions = {
	title: 'MapComponents/MlGeoJsonLayer',
	component: MlGeoJsonLayer,

	argTypes: {},

	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props) => {
	return (
		<>
			<MlGeoJsonLayer type="line" geojson={sample_geojson_2}  />
			
		</>
	);
};
const PolygonTemplate = (props) => {

	//const [color, setColor]= useState('');

	return (
		<>
			<PolygonStyler {...props}/>
		</>
	);
};


export const Linestring = Template.bind({});
Linestring.parameters = {};
Linestring.args = {
	paint:{
		"stroke-color": 'rgba(123,20,80)',
		"fill-opacity": 0
	},
	type:'line'
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
