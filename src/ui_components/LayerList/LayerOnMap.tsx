import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores/map.store';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { Feature } from '@turf/turf';
import MlOrderLayers from '../../components/MlOrderLayers/MlOrderLayers';
import useMap from '../../hooks/useMap';

interface LayerOnMapProps {
	mapConfigUuid: string;
	mapId: string;
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

	const mapHook = useMap({
		mapId: props.mapId,
	});

	//	const sortedLayers = useMemo(() => {
	//		const sorted: { [key: string]: LayerConfig } = {};
	//		layerStoreOrder.forEach((orderItem) => {
	//			Object.entries(layers).forEach(([key, layer]) => {
	//				if (layer.uuid === orderItem.uuid) {
	//					sorted[key] = layer;
	//				}
	//			});
	//		});
	//		return sorted;
	//	}, [layers, layerStoreOrder]);

	useEffect(() => {
		if (mapHook.map && layerStoreOrder.length > 0) {
			const newOrder = [...layerStoreOrder];

			newOrder.forEach((layerId, index) => {
				const nextLayerId = index < newOrder.length - 1 ? newOrder[index + 1] : undefined;
				if (mapHook.map?.getLayer(layerId.uuid)) {
					mapHook.map.moveLayer(layerId.uuid, nextLayerId?.uuid);
				}
			});
		}
	}, [layerStoreOrder, mapHook.map]);

	return (
		<>
			<MlOrderLayers layerIds={orderLayers}></MlOrderLayers>
			{Object.entries(layers).map(([key, layer], index) => {
				if (layer.type === 'geojson') {
					return (
						<MlGeoJsonLayer
							key={key}
							layerId={layer.uuid}
							geojson={layer.config.geojson as Feature}
							insertBeforeLayer={'layer_number_' + (layerStoreLength - 1 - index)}
							layout={layer.config.layout}
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
