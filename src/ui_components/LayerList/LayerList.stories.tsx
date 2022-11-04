import React, { useState } from 'react';

import LayerList from './LayerList';
import LayerListItem from './LayerListItem';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../Sidebar';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import sample_geojson_1 from './assets/sample_1.json';
import sample_geojson_2 from './assets/sample_2.json';
import LayerListFolder from './LayerListFolder';

const storyoptions = {
	title: 'UiComponents/LayerList',
	component: LayerList,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	return (
		<>
			<Sidebar sx={{ minWidth: '400px' }}>
				<LayerList>
					<LayerListItem
						layerComponent={<MlGeoJsonLayer geojson={sample_geojson_1} />}
						visible={true}
						configurable={false}
						type="layer"
						name="GeoJSON Layer"
						description="A visualization of a GeoJSON LineString"
					/>
					<LayerListItem
						layerComponent={<MlGeoJsonLayer geojson={sample_geojson_1} />}
						visible={true}
						configurable={true}
						type="layer"
						name="configurable GeoJSON Layer"
						description="A visualization of a GeoJSON LineString"
					/>
				</LayerList>
			</Sidebar>
		</>
	);
};
export const ExampleConfig = Template.bind({});

ExampleConfig.parameters = {};
ExampleConfig.args = {};

const FolderTemplate = () => {
	return (
		<>
			<Sidebar sx={{ minWidth: '400px' }}>
				<LayerList>
					<LayerListFolder visible={true}>
						<LayerListItem
							layerComponent={<MlGeoJsonLayer geojson={sample_geojson_1} />}
							visible={true}
							configurable={false}
							type="layer"
							name="GeoJSON Layer"
						/>
						<LayerListItem
							layerComponent={<MlGeoJsonLayer geojson={sample_geojson_2} />}
							visible={true}
							configurable={true}
							type="layer"
							name="GeoJSON Layer 2"
							description="A visualization of a GeoJSON LineString"
						/>
					</LayerListFolder>
				</LayerList>
			</Sidebar>
		</>
	);
};
export const FolderExample = FolderTemplate.bind({});

FolderExample.parameters = {};
FolderExample.args = {};
