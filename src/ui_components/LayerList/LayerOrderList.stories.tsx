import React from 'react';
import LayerOrderList from './LayerOrderList';
import LayerOnMap from './LayerOnMap';
import Sidebar from '../Sidebar';
import emptyMapReduxStoreDecorator from '../../decorators/EmptyMapReduxStoreDecorator';
import sample_polygon_1 from './assets/sample_polygon_1.json';
import sample_points_inside_polygon from './assets/sample_points_inside_polygon.json';
import { FeatureCollection } from '@turf/turf';
import { MapState, setMapConfig } from '../../stores/map.store';
import { useDispatch } from 'react-redux';

const storyoptions = {
	title: 'UiComponents/LayerOrderList',
	component: LayerOrderList,
	argTypes: {},
	decorators: emptyMapReduxStoreDecorator,
};
export default storyoptions;
const LayerOrder = () => {
	const mapConfigUuid = 'dc272150-8f04-44e2-97c5-d8f266a04cf8';
	const layerUuid1 = 'fec837fa-1d5d-432b-89c2-b416c9773523';
	const layerUuid2 = '0587c0ed-aaa0-4315-bb77-a40937a684d7';
	const mapId = 'map_1';
	const demoData: MapState = {
		mapConfigs: {
			mapConfig1: {
				uuid: mapConfigUuid,
				name: 'Demo Map',
				mapProps: {
					center: [7.0851268, 50.73884],
					zoom: 14,
				},
				layers: {
					layer1: {
						type: 'geojson',
						uuid: layerUuid1,
						name: 'point',
						config: {
							geojson: sample_points_inside_polygon as FeatureCollection,
						},
					},
					layer2: {
						type: 'geojson',
						uuid: layerUuid2,
						name: 'Polygon',
						config: {
							geojson: sample_polygon_1 as FeatureCollection,
						},
					},
				},
				layerOrder: [{ uuid: layerUuid1 }, { uuid: layerUuid2 }],
			},
		},
	};
	const dispatch = useDispatch();
	//useEffect(() => {
	dispatch(setMapConfig(demoData.mapConfigs['mapConfig1']));
	//}, [dispatch, demoData]);

	return (
		<>
			<Sidebar open={true}>
				<LayerOrderList mapConfigUuid={mapConfigUuid}></LayerOrderList>
			</Sidebar>
			<LayerOnMap mapConfigUuid={mapConfigUuid} mapId={mapId}></LayerOnMap>
		</>
	);
};
export const LayerOrderExample = LayerOrder.bind({});

LayerOrderExample.parameters = {};
LayerOrderExample.args = {};
