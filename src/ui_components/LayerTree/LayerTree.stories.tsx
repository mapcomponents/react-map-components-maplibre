import React from 'react';
import LayerTree from './LayerTree';
import LayerOnMap from './LayerOnMap';
import Sidebar from '../Sidebar';
import MapContextReduxStoreDecorator from '../../decorators/MapContextReduxStoreDecorator';
import sample_polygon_1 from '../LayerList/assets/sample_polygon_1.json';
import sample_points_inside_polygon from '../LayerList/assets/sample_points_inside_polygon.json';
import { FeatureCollection } from '@turf/turf';
import { MapState, setMapConfig } from '../../stores/map.store';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';

const storyoptions = {
	title: 'UiComponents/LayerTree',
	component: LayerTree,
	argTypes: {},
	decorators: MapContextReduxStoreDecorator,
};
export default storyoptions;
const LayerOrder = () => {
	const demoData: MapState = {
		mapConfigs: {
			mapConfig1: {
				uuid: 'dc272150-8f04-44e2-97c5-d8f266a04cf8',
				name: 'Demo Map',
				mapProps: {
					center: [7.0851268, 50.73884],
					zoom: 12,
				},
				layers: {
					'acd3d99f-2f82-40a5-a5c9-f303d54f5606': {
						type: 'folder',
						uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
						name: 'layers in a folder',
						visible: true,
						config: undefined,
					},
					'fec837fa-1d5d-432b-89c2-b416c9773523': {
						type: 'geojson',
						uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523',
						name: 'Example Point Layer',
						configurable: true,
						config: {
							type: 'circle',
							geojson: sample_points_inside_polygon as FeatureCollection,
							options: {
								paint: {
									'circle-color': 'blue',
									'circle-radius': 5,
								},
							},
						},
					},
					'0587c0ed-aaa0-4315-bb77-a40937a684d7': {
						type: 'geojson',
						uuid: '0587c0ed-aaa0-4315-bb77-a40937a684d7',
						name: 'Example Polygon Layer',
						config: {
							geojson: sample_polygon_1 as FeatureCollection,
						},
					},
				},
				layerOrder: [
					{
						uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
						layers: [
							{ uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523' },
							{ uuid: '0587c0ed-aaa0-4315-bb77-a40937a684d7' },
						],
					},
				],
			},
		},
	};
	const dispatch = useDispatch();
	dispatch(setMapConfig({ key: 'mapConfig1', mapConfig: demoData.mapConfigs['mapConfig1'] }));

	return (
		<>
			<Sidebar open={true}>
				<Typography variant="h4">Layertree 1</Typography>
				<LayerTree mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerTree>
				<Typography variant="h4">Layertree 2</Typography>
				<LayerTree mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerTree>
			</Sidebar>
			<LayerOnMap mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerOnMap>
		</>
	);
};
export const LayerOrderExample = LayerOrder.bind({});

LayerOrderExample.parameters = {};
LayerOrderExample.args = {};
const LayerOrderFolder = () => {
	const demoData: MapState = {
		mapConfigs: {
			mapConfig1: {
				uuid: 'dc272150-8f04-44e2-97c5-d8f266a04cf8',
				name: 'Demo Map',
				mapProps: {
					center: [7.0851268, 50.73884],
					zoom: 12,
				},
				layers: {
					'acd3d99f-2f82-40a5-a5c9-f303d54f5606': {
						type: 'folder',
						uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
						name: 'layers in a folder',
						visible: true,
					},
					'fec837fa-1d5d-432b-89c2-b416c9773523': {
						type: 'geojson',
						uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523',
						name: 'Example Point Layer',
						configurable: true,
						config: {
							geojson: sample_points_inside_polygon as FeatureCollection,
						},
					},
					'0587c0ed-aaa0-4315-bb77-a40937a684d7': {
						type: 'geojson',
						uuid: '0587c0ed-aaa0-4315-bb77-a40937a684d7',
						name: 'Example Polygon Layer',
						config: {
							geojson: sample_polygon_1 as FeatureCollection,
						},
					},
				},
				layerOrder: [
					{
						uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
						layers: [
							{ uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523' },
							{ uuid: '0587c0ed-aaa0-4315-bb77-a40937a684d7' },
						],
					},
				],
			},
		},
	};
	const dispatch = useDispatch();
	dispatch(setMapConfig({ key: 'mapConfig1', mapConfig: demoData.mapConfigs['mapConfig1'] }));

	return (
		<>
			<Sidebar open={true}>
				<Typography variant="h2">Layertree 1</Typography>
				<LayerTree mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerTree>
			</Sidebar>
			<LayerOnMap mapConfigKey={Object.keys(demoData.mapConfigs)[0]}></LayerOnMap>
		</>
	);
};
export const LayerOrderFolderExample = LayerOrderFolder.bind({});

LayerOrderFolderExample.parameters = {};
LayerOrderFolderExample.args = {};
