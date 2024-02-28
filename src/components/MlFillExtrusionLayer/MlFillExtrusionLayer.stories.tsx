import React from 'react';

import MlFillExtrusionLayer, { MlFillExtrusionLayerProps } from './MlFillExtrusionLayer';

import { makeMapContextDecorators } from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlFillExtrusionLayer',
	component: MlFillExtrusionLayer,
	argTypes: {},
	decorators: makeMapContextDecorators({
		center: [13.738382110055795, 51.052846749921514],
		bearing: 180,
		zoom: 16.5,
		pitch: 60
	}),
};
export default storyoptions;

const Template = (props: MlFillExtrusionLayerProps) => {
	return <MlFillExtrusionLayer {...props} />;
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	paint: {
		'fill-extrusion-color': 'hsl(196, 61%, 83%)',
		'fill-extrusion-height': {
			property: 'render_height',
			type: 'identity',
		},
		'fill-extrusion-base': {
			property: 'render_min_height',
			type: 'identity',
		},
		'fill-extrusion-opacity': [
			'interpolate',
			// Set to interpoleta linearly between the pair of stops
			['linear'],
			['zoom'],
			// When zoom is 13.5, buildings will be 100% transparent.
			13.5,
			0,
			// When zoom is 15 or higher, buildings will be 100% opaque.
			14.5,
			1,
		],
	},
};
