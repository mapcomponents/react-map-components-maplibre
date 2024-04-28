import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { extractUuidsFromLayerOrder, LayerOrderItem, RootState } from '../../stores/map.store';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import useMap from '../../hooks/useMap';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import MlOrderLayers from '../../components/MlOrderLayers/MlOrderLayers';
import MapLibreGlWrapper from '../../components/MapLibreMap/lib/MapLibreGlWrapper';

interface LayerOnMapProps {
	mapConfigKey: string;
	mapId?: string;
}

function LayerOnMap(props: LayerOnMapProps) {
	const layers = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs?.[props.mapConfigKey]?.layers
	);
	const layerStoreOrder = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs?.[props.mapConfigKey]?.layerOrder
	);

	const mapHook = useMap({
		mapId: props?.mapId,
	});
	const layerStoreOrderIds = useSelector((state: RootState) =>
		extractUuidsFromLayerOrder(state, props.mapConfigKey)
	);

	useEffect(() => {
		// recursively adjust the order of layers at each level of layers.
		if (!mapHook.map || !layerStoreOrder) return;
		const adjustLayerOrderAtLevel = (layers: LayerOrderItem[], map: MapLibreGlWrapper) => {
			for (let i = layers.length - 1; i > 0; i--) {
				const currentLayer = layers[i];
				const previousLayer = layers[i - 1];
				if (map.getLayer(currentLayer.uuid) && map.getLayer(previousLayer.uuid)) {
					map.moveLayer(currentLayer.uuid, previousLayer.uuid);
				}
			}
			layers.forEach((layer) => {
				if (layer.layers && layer.layers.length > 0) {
					adjustLayerOrderAtLevel(layer.layers, map);
				}
			});
		};
		adjustLayerOrderAtLevel(layerStoreOrder, mapHook.map);
	}, [layerStoreOrder, mapHook.map]);

	const orderLayers = useMemo(() => {
		const layerIds = [
			'order-background',
			...layerStoreOrderIds.map((el) => 'layer_id_' + el),
			'order-labels',
		];
		return layerIds;
	}, [layerStoreOrder]);

	function renderLayer(layer: LayerOrderItem): React.ReactNode {
		const layerConfig = layers[layer.uuid];

		switch (layerConfig?.type) {
			case 'geojson':
				return (
					<MlGeoJsonLayer
						key={layerConfig.uuid}
						layerId={layerConfig.uuid}
						insertBeforeLayer={'layer_id_' + layerConfig.uuid}
						{...layerConfig.config}
						options={{
							...layerConfig.config.options,
							layout: {
								...layerConfig?.config?.layout,
								visibility:
									layerConfig.masterVisible === false
										? 'none'
										: layerConfig?.config?.layout?.visibility
											? layerConfig?.config?.layout?.visibility
											: 'visible',
							},
						}}
					/>
				);
			case 'vt':
				return (
					<MlVectorTileLayer
						key={layerConfig.uuid}
						layerId={layerConfig.uuid}
						url={layerConfig.config.url}
						layers={layerConfig.config.layers}
					/>
				);
			case 'wms':
				//TODO: Handle WMS
				return <></>;
			case 'folder':
				return layer?.layers ? (
					layer.layers.map((subLayer: LayerOrderItem) => renderLayer(subLayer))
				) : (
					<></>
				);
			default:
				return null;
		}
	}

	return (
		<>
			<MlOrderLayers layerIds={orderLayers}></MlOrderLayers>
			{layerStoreOrder?.map?.((layerOrderItem) => renderLayer(layerOrderItem))}
		</>
	);
}

export default LayerOnMap;
