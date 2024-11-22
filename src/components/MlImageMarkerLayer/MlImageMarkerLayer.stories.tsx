import React from 'react';
import MlImageMarkerLayer from './MlImageMarkerLayer';
import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlImageMarkerLayer',
	component: MlImageMarkerLayer,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => (
	<MlImageMarkerLayer
		options={{
			source: {
				type: 'geojson',
				data: {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [7.0847929969609424, 50.73855193187643],
					},
					properties: { id: 'test' },
				},
			},
			layout: {
				'icon-allow-overlap': true,
				'icon-size': 0.14,
				'icon-offset': [0, -180],
			},
		}}
		imgSrc={'assets/marker.png'}
	/>
);

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
