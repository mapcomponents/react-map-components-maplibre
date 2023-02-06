import React, { useEffect, useState } from 'react';

import LayerList from './LayerList';
import LayerListItem from './LayerListItem';

import mapContextDecorator from '../../decorators/EmptyMapDecorator';
import Sidebar from '../Sidebar';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import sample_geojson_1 from './assets/sample_1.json';
import sample_geojson_2 from './assets/sample_2.json';
import LayerListFolder from './LayerListFolder';

import style from './assets/style.json';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import { LayerSpecification } from 'maplibre-gl';
import { Feature } from '@turf/turf';

const storyoptions = {
	title: 'UiComponents/LayerList',
	component: LayerList,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const sidebarSx = {
	width: { xs: '80%', sm: '60%', md: '350px', lg: '350px' },
	boxSizing: 'border-box',
};

const Template = () => {
	const [layerOneState, setLayerOneState] = useState({ geojson: sample_geojson_1 as Feature });
	const [layerTwoState, setLayerTwoState] = useState({ geojson: sample_geojson_2 as Feature });

	useEffect(() => {
		console.log(layerOneState, layerTwoState);
	}, [layerOneState, layerTwoState]);

	return (
		<>
			<Sidebar sx={sidebarSx} drawerPaperProps={{ sx: sidebarSx }}>
				<LayerList>
					<LayerListItem
						layerComponent={<MlGeoJsonLayer {...layerOneState} />}
						setLayerState={setLayerOneState}
						visible={true}
						configurable={false}
						type="layer"
						name="GeoJSON Layer"
					/>
					<LayerListItem
						layerComponent={<MlGeoJsonLayer {...layerTwoState} />}
						setLayerState={setLayerTwoState}
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
			<Sidebar sx={sidebarSx} drawerPaperProps={{ sx: sidebarSx }}>
				<LayerList>
					<LayerListFolder visible={true} name={'GeoJSON Layers'}>
						<LayerListItem
							layerComponent={<MlGeoJsonLayer geojson={sample_geojson_1 as Feature} />}
							visible={true}
							configurable={false}
							type="layer"
							name="GeoJSON Layer"
						/>
						<LayerListItem
							layerComponent={<MlGeoJsonLayer geojson={sample_geojson_2 as Feature} />}
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

const VectortileTemplate = () => {
	const [layerState, setLayerState] = useState({
		layerId: 'openmaptiles',
		sourceOptions: {
			type: 'vector' as const,
			tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf'],
		},
		layers: [...style.layers] as LayerSpecification[],
	});

	useEffect(() => {
		console.log(layerState);
	},[layerState])

	return (
		<>
			<Sidebar sx={sidebarSx} drawerPaperProps={{ sx: sidebarSx }}>
				<LayerList>
					<LayerListItem
						layerComponent={<MlVectorTileLayer {...layerState} />}
						setLayerState={setLayerState}
						visible={true}
						configurable={false}
						type="layer"
						name="Vector style"
					/>
				</LayerList>
			</Sidebar>
		</>
	);
};
export const VectortileExample = VectortileTemplate.bind({});

VectortileExample.parameters = {};
VectortileExample.args = {};
