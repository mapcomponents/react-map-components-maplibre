import React, { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
	extractUuidsFromLayerOrder,
	LayerOrderItem,
	RootState,
} from '../../stores/map.store';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import useMap from '../../hooks/useMap';
import MlVectorTileLayer, {
	ExtendedLayerSpecification,
} from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import MlOrderLayers from '../../components/MlOrderLayers/MlOrderLayers';
import MapLibreGlWrapper from '../../components/MapLibreMap/lib/MapLibreGlWrapper';
import MlWmsLayer from '../../components/MlWmsLayer/MlWmsLayer';

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
	const mapHook = useMap({ mapId: props?.mapId });
	const layerStoreOrderIds = useSelector((state: RootState) =>
		extractUuidsFromLayerOrder(state, props.mapConfigKey)
	);

	const previousLayerStoreOrderRef = useRef<LayerOrderItem[]>([]);

	useEffect(() => {
		if (!mapHook.map || !layerStoreOrder) return;

		const adjustLayerOrderAtLevel = (
			layers: LayerOrderItem[],
			previousLayers: LayerOrderItem[],
			map: MapLibreGlWrapper
		) => {
			for (let i = 0; i < layers.length; i++) {
				const currentLayer = layers[i];
				const previousLayer = previousLayers ? previousLayers[i] : null;
				if (currentLayer.uuid !== previousLayer?.uuid) {
					if (map.getLayer(currentLayer.uuid)) {
						const beforeLayer = i > 0 ? layers[i - 1].uuid : undefined;
						map.moveLayer(currentLayer.uuid, beforeLayer);
					}
				}
				if (currentLayer.layers && currentLayer.layers.length > 0) {
					const previousSubLayers = previousLayer?.layers || [];
					adjustLayerOrderAtLevel(currentLayer.layers, previousSubLayers, map);
				}
			}
		};
		const previousLayerStoreOrder = previousLayerStoreOrderRef.current;
		adjustLayerOrderAtLevel(layerStoreOrder, previousLayerStoreOrder, mapHook.map);
		previousLayerStoreOrderRef.current = layerStoreOrder;
	}, [layerStoreOrder, mapHook.map]);

	const orderLayers = useMemo(() => {
		const layerIds = [
			'order-background',
			...layerStoreOrderIds.map((el) => 'layer_id_' + el),
			'order-labels',
		];
		return layerIds;
	}, [layerStoreOrderIds]);

	function renderLayer(layer: LayerOrderItem): React.ReactNode {
		const targetLayerIndex = layers.findIndex((el) => el.uuid === layer.uuid);
		const layerConfig = layers[targetLayerIndex];
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
								...layerConfig?.config?.options?.layout,
								visibility:
									layerConfig.masterVisible === false
										? 'none'
										: layerConfig?.config?.options?.layout?.visibility
											? layerConfig?.config?.options?.layout?.visibility
											: 'visible',
							},
						}}
					/>
				);
			case 'vt': {
				const l = layerConfig.config.layers.map((layer: ExtendedLayerSpecification) => {
					const newLayer = { ...layer };

					if (newLayer.layout) {
						newLayer.layout = {
							...newLayer.layout,
							visibility:
								newLayer.masterVisible === false ? 'none' : newLayer.layout.visibility ?? 'visible',
						};
					}
					return newLayer;
				});

				return (
					<MlVectorTileLayer
						key={layerConfig.uuid}
						layerId={layerConfig.uuid}
						insertBeforeLayer={'layer_id_' + layerConfig.uuid}
						url={layerConfig.config.url}
						layers={l}
					/>
				);
			}
			case 'wms': {
				const visible = layerConfig.masterVisible === false ? false : layerConfig.config?.visible;
				return (
					<MlWmsLayer
						key={layerConfig.uuid}
						layerId={layerConfig.uuid}
						insertBeforeLayer={'layer_id_' + layerConfig.uuid}
						url={layerConfig.config?.url || ''}
						urlParameters={layerConfig.config?.urlParameters}
						visible={visible}
					/>
				);
			}
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
