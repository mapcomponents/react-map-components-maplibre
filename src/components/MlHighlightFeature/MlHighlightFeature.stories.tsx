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
	const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>();
	const selectedId = useRef<number[]>([]);	

	return (
		<>
			<MlGeoJsonLayer
				geojson={Sample1 as FeatureCollection}
				onClick={(event: any) => {
					if (selectedId.current?.includes(event.features[0].id)) {
						setSelectedFeatures((current) => {
							if (current) {
								const newArray: Feature[] = current.filter((feature)=> feature.id !== event.features[0].id )
								return newArray;
							}
							return undefined;
						});
						selectedId.current = selectedId.current.filter((idx)=> idx !== event.features[0].id )
					} else {
						setSelectedFeatures((current) => {
							const newArray: Feature[] = [];
							current && newArray.push(...current);

							newArray.push({
								type: event.features[0].type,
								geometry: event.features[0].geometry,
								id:  event.features[0].id
							} as Feature);
							return newArray;
						});
						selectedId.current.push(event.features[0].id)
					}
				}}
			/>
			<MlHighlightFeature features={selectedFeatures} offset={-5} paint={{ 'line-opacity': 0.5 }} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
