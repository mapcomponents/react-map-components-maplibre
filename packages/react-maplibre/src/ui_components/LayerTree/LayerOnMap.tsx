import React, { useEffect, useMemo, useRef } from 'react';
import {
	useLayers,
	useLayerOrder,
	useLayerStoreOrderIds,
	LayerOrderItem,
	LayerConfig,
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
	const layers = useLayers(props.mapConfigKey);
	const layerStoreOrder = useLayerOrder(props.mapConfigKey);
	const mapHook = useMap({ mapId: props?.mapId });
	const layerStoreOrderIds = useLayerStoreOrderIds(props.mapConfigKey);

	// Build a local index for O(1) lookups during render.
	// This is derived from the reactive `layers` subscription so it's always current.
	const layerIndex = useMemo(() => {
		const map = new Map<string, LayerConfig>();
		if (layers) {
			for (const l of layers) {
				map.set(l.uuid, l);
			}
		}
		return map;
	}, [layers]);

	const previousLayerStoreOrderRef = useRef<LayerOrderItem[]>([]);

	useEffect(() => {
		if (!mapHook.map || !layerStoreOrder) return;

		const adjustLayerOrderAtLevel = (
layerItems: LayerOrderItem[],
previousLayers: LayerOrderItem[],
map: MapLibreGlWrapper
) => {
			for (let i = 0; i < layerItems.length; i++) {
				const currentLayer = layerItems[i];
				const previousLayer = previousLayers ? previousLayers[i] : null;
				if (currentLayer.uuid !== previousLayer?.uuid) {
					if (map.getLayer(currentLayer.uuid)) {
						const beforeLayer = i > 0 ? layerItems[i - 1].uuid : undefined;
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
		const layerConfig: LayerConfig | undefined = layerIndex.get(layer.uuid);
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
				const l = layerConfig.config.layers.map((vtLayer: ExtendedLayerSpecification) => {
					const newLayer = { ...vtLayer };

					if (newLayer.layout) {
						newLayer.layout = {
							...newLayer.layout,
							visibility:
								newLayer.masterVisible === false
									? 'none'
									: (newLayer.layout.visibility ?? 'visible'),
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
