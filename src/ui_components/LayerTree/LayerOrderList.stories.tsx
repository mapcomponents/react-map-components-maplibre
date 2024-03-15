import React from 'react';
import LayerOrderList from './LayerOrderList';
import LayerOnMap from './LayerOnMap';
import Sidebar from '../Sidebar';
import MapContextReduxStoreDecorator from '../../decorators/MapContextReduxStoreDecorator';
import sample_polygon_1 from '../LayerList/assets/sample_polygon_1.json';
import sample_points_inside_polygon from '../LayerList/assets/sample_points_inside_polygon.json';
import { FeatureCollection } from '@turf/turf';
import { MapState, setMapConfig } from '../../stores/map.store';
import { useDispatch } from 'react-redux';

const storyoptions = {
	title: 'UiComponents/LayerOrderList',
	component: LayerOrderList,
	argTypes: {},
	decorators: MapContextReduxStoreDecorator,
};
export default storyoptions;
const LayerOrder = () => {
	const mapConfigUuid = 'dc272150-8f04-44e2-97c5-d8f266a04cf8';
	const layerUuid1 = 'fec837fa-1d5d-432b-89c2-b416c9773523';
	const layerUuid2 = '0587c0ed-aaa0-4315-bb77-a40937a684d7';
	const layerUuid3 = '71d0f136-786b-414b-ad61-178cc5dfd96c';
	const mapId = 'map_1';
	const demoData: MapState = {
		mapConfigs: {
			mapConfig1: {
				uuid: mapConfigUuid,
				name: 'Demo Map',
				mapProps: {
					center: [7.0851268, 50.73884],
					zoom: 12,
				},
				layers: {
					layer1: {
						type: 'geojson',
						uuid: layerUuid1,
						name: 'Example Point Layer',
						config: {
							geojson: sample_points_inside_polygon as FeatureCollection,
						},
					},
					layer2: {
						type: 'geojson',
						uuid: layerUuid2,
						name: 'Example Polygon Layer',
						config: {
							geojson: sample_polygon_1 as FeatureCollection,
						},
					},
					layer3: {
						type: 'vt',
						uuid: layerUuid3,
						name: 'Example Vectoretile Layer',
						config: {
							mapId: mapId,
							layers: [
								//{
								//	id: 'river',
								//	type: 'fill',
								//	'source-layer': 'water',
								//	source: 'openmaptiles',
								//	layout: {
								//		visibility: 'visible',
								//	},
								//	paint: { 'fill-color': '#0905f5', 'fill-opacity': 0.5 },
								//	maxzoom: 20,
								//},
								{
									id: layerUuid3,
									type: 'fill',
									'source-layer': 'building',
									source: 'openmaptiles',
									layout: {},
									paint: { 'fill-color': '#717875' },
									maxzoom: 20,
								},
							],
							sourceOptions: {
								type: 'vector',
								minzoom: 0,
								tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf'],
							},
						},
					},
				},
				layerOrder: [{ uuid: layerUuid3 }, { uuid: layerUuid2 }, { uuid: layerUuid1 }],
			},
		},
	};
	const dispatch = useDispatch();
	dispatch(setMapConfig(demoData.mapConfigs['mapConfig1']));

	return (
		<>
			<Sidebar open={true}>
				<h2>Layertree 1</h2>
				<LayerOrderList mapConfigUuid={mapConfigUuid}></LayerOrderList>
				<h2>Layertree 2</h2>
				<LayerOrderList mapConfigUuid={mapConfigUuid}></LayerOrderList>
			</Sidebar>
			<LayerOnMap mapConfigUuid={mapConfigUuid} mapId={mapId}></LayerOnMap>
		</>
	);
};
export const LayerOrderExample = LayerOrder.bind({});

LayerOrderExample.parameters = {};
LayerOrderExample.args = {};
