import React, { useRef, useState } from 'react';

import MlHighlightFeature from './MlHighlightFeature';

import mapContextDecorator from '../../decorators/MapContextDecorator';

import Sample1 from '../MlGeoJsonLayer/assets/sample_1.json';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { Feature, FeatureCollection } from '@turf/turf';

const storyoptions = {
	title: 'MapComponents/MlHighlightFeature',
	component: MlHighlightFeature,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [selectedFeatures, setSelectedFeatures] = useState<Feature>();
	const selectedId = useRef();
	return (
		<>
			<MlGeoJsonLayer
				geojson={Sample1 as FeatureCollection}
				onClick={(event: any) => {
					if (selectedId.current === event.features[0].id) {
						setSelectedFeatures(undefined);
						selectedId.current = undefined
					} else {
						setSelectedFeatures({
							type: event.features[0].type,
							geometry: event.features[0].geometry,
						} as Feature);
						selectedId.current = event.features[0].id;
					}
				}}
			/>
			<MlHighlightFeature features={selectedFeatures} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
