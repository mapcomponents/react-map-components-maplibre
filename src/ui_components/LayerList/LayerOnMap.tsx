import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LayerConfig, RootState } from '../../stores/map.store';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { Feature } from '@turf/turf';
import MlOrderLayers from '../../components/MlOrderLayers/MlOrderLayers';

interface LayerOnMapProps {
	mapConfigUuid: string;
}

function LayerOnMap(props: LayerOnMapProps) {
	const layers = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs[props.mapConfigUuid].layers
	);
	const layerStoreOrder = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs[props.mapConfigUuid].layerOrder
	);
	const layerStoreIds = Object.values(layers).map((layer) => layer.uuid);
	const layerStoreLength = Object.keys(layers).length;

	const orderLayers = useMemo(() => {
		const layerIds = [
			'order-background',
			...[...layerStoreIds].map((_el, idx) => 'layer_number_' + idx),
			'order-labels',
		];
		return layerIds.reverse();
	}, [layerStoreOrder]);

	const sortedLayers = useMemo(() => {
		const sorted: { [key: string]: LayerConfig } = {};
		layerStoreOrder.forEach((orderItem) => {
			Object.entries(layers).forEach(([key, layer]) => {
				if (layer.uuid === orderItem.uuid) {
					sorted[key] = layer;
				}
			});
		});
		return sorted;
	}, [layers, layerStoreOrder]);

	return (
		<>
			<MlOrderLayers layerIds={orderLayers}></MlOrderLayers>
			{Object.entries(sortedLayers).map(([key, layer], index) => {
				if (layer.type === 'geojson') {
					return (
						<MlGeoJsonLayer
							key={key}
							geojson={layer.config.geojson as Feature}
							insertBeforeLayer={'layer_number_' + (layerStoreLength - 1 - index)}
						></MlGeoJsonLayer>
					);
				} else {
					//TODO: handle all other layer types
					return null;
				}
			})}
		</>
	);
}

export default LayerOnMap;
