import React, { useEffect, useRef, useState } from 'react';

import MlHighlightFeature from './MlHighlightFeature';

import mapContextDecorator from '../../decorators/MapContextDecorator';

import examplePolygons from '../MlGeoJsonLayer/assets/sample_1.json';
import exampleLines from './assets/sample_lines.json'; 
import examplePoints from './assets/sample_points.json';
import MlGeoJsonLayer from '../MlGeoJsonLayer/MlGeoJsonLayer';
import { Feature, FeatureCollection } from '@turf/turf';
import useMap from '../../hooks/useMap';


const storyoptions = {
	title: 'MapComponents/MlHighlightFeature',
	component: MlHighlightFeature,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (props: any) => {
	const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>();
	const selectedId = useRef<number[]>([]);	
	const mapHook = useMap({
		mapId: undefined,
	});
	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [7.105175528281227, 50.73348799274236], zoom: 15 });
	}, [mapHook.map]);

	return (
		<>	
		<MlHighlightFeature features={selectedFeatures}  paint={props.type !== "circle"  ? { 'line-opacity': 0.5 }: {}} />

			<MlGeoJsonLayer				
				type={props.type}
				geojson={props.sample as FeatureCollection}
				onClick={(event: any) => {
					if (selectedId.current?.includes(event.features[0].id)) {
						setSelectedFeatures((current) => {
							let newArray: Feature[] = [];
							if (current) {
								 newArray = current.filter((feature)=> feature.id !== event.features[0].id )								
							}		
							return newArray;				
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
		
		</>
	);
};

export const Polygon = Template.bind({});
Polygon.parameters = {};
Polygon.args = { sample: examplePolygons, type: "fill"};

export const Line = Template.bind({});
Line.parameters = {};
Line.args = {sample: exampleLines, type: "line"};

export const Circle = Template.bind({});
Circle.parameters = {};
Circle.args = {sample: examplePoints, type: "circle"};
