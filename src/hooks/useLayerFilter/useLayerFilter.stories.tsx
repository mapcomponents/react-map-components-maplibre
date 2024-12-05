import React from 'react';

import useLayerFilter from './useLayerFilter';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import sample from '../../components/MlGeoJsonLayer/assets/sample_2.json';
import { FeatureCollection } from 'geojson';

const storyoptions = {
	title: 'hooks/useLayerFilter',
	component: useLayerFilter,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (args: { filter_name: string }) => {
	useLayerFilter({ layerId: 'filter_test', filter: ['==', 'name', args.filter_name] });
	return <MlGeoJsonLayer layerId="filter_test" geojson={sample as FeatureCollection} />;
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	filter_name: 'Mauspfad',
};
ExampleConfig.argTypes = {
	filter_name: {
		options: [
			'Mauspfad',
			'Windeckstraße',
			'Münsterplatz',
			'Postrstraße',
			'In der Sürst',
			'Remiglustraße',
		],
		control: { type: 'radio' },
	},
};
