import React, { useEffect, useMemo, useRef } from 'react';
import {
	useLayers,
	useLayerOrder,
	useLayerStoreOrderIds,
	useMapConfig,
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
interface MapLayerRendererProps {
	mapConfigKey?: string;
	mapId?: string;
}

function MapLayerRenderer(props: MapLayerRendererProps) {
	const mapConfigKey = props.mapConfigKey || 'map_1';
	const layers = useLayers(mapConfigKey);
	const layerStoreOrder = useLayerOrder(mapConfigKey);
	const mapHook = useMap({ mapId: props?.mapId });
	const layerStoreOrderIds = useLayerStoreOrderIds(mapConfigKey);
	const mapConfig = useMapConfig(mapConfigKey);

	// Build a local index for O(1) lookups during render.
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
		// Reverse the order so that layerStoreOrderIds[0] (top of tree list)
		// gets the highest order marker on the map (= rendered on top).
		const reversedIds = [...layerStoreOrderIds].reverse();
		const layerIds = [
			'order-background',
			...reversedIds.map((el) => 'layer_id_' + el),
			'order-labels',
		];
		return layerIds;
	}, [layerStoreOrderIds]);

	// ── Base map style: sources, glyphs & sprite ──────────────────────
	// Style layers reference sources by name (e.g. "openmaptiles") and
	// need glyphs/sprite for symbol layers.  We add these imperatively
	// so that the MlVectorTileLayer components for background/symbol
	// layers find the correct source already present on the map.
	const addedSourceIdsRef = useRef<string[]>([]);

	useEffect(() => {
		const map = mapHook.map;
		if (!map) return;
		const rawMap = map.map;

		// Remove previously added sources
		for (const id of addedSourceIdsRef.current) {
			if (rawMap.getSource(id)) {
				rawMap.removeSource(id);
			}
		}
		addedSourceIdsRef.current = [];

		if (!mapConfig?.styleSources) return;

		// Set glyphs & sprite (needed for symbol/text layers)
		if (mapConfig?.styleGlyphs) {
			rawMap.style.setGlyphs(mapConfig.styleGlyphs);
		}
		if (mapConfig?.styleSprite) {
			const spriteValue = mapConfig.styleSprite;
			if (typeof spriteValue === 'string') {
				rawMap.style.setSprite([{ id: 'default', url: spriteValue }]);
			} else if (Array.isArray(spriteValue)) {
				rawMap.style.setSprite(spriteValue);
			}
		}

		// Add sources from the style
		const addedIds: string[] = [];
		for (const [sourceId, sourceDef] of Object.entries(mapConfig.styleSources)) {
			if (!rawMap.getSource(sourceId)) {
				rawMap.addSource(sourceId, sourceDef);
				addedIds.push(sourceId);
			}
		}
		addedSourceIdsRef.current = addedIds;

		// Recreate sources after a base-style reload wipes them
		const onStyleData = () => {
			if (addedIds.length > 0 && !rawMap.getSource(addedIds[0]) && mapConfig.styleSources) {
				for (const [sourceId, sourceDef] of Object.entries(mapConfig.styleSources)) {
					if (!rawMap.getSource(sourceId)) {
						rawMap.addSource(sourceId, sourceDef);
					}
				}
				if (mapConfig?.styleGlyphs) {
					rawMap.style.setGlyphs(mapConfig.styleGlyphs);
				}
				if (mapConfig?.styleSprite) {
					const sv = mapConfig.styleSprite;
					if (typeof sv === 'string') {
						rawMap.style.setSprite([{ id: 'default', url: sv }]);
					} else if (Array.isArray(sv)) {
						rawMap.style.setSprite(sv);
					}
				}
			}
		};
		rawMap.on('styledata', onStyleData);

		return () => {
			rawMap.off('styledata', onStyleData);
		};
	}, [mapHook.map, mapConfig?.styleSources, mapConfig?.styleGlyphs, mapConfig?.styleSprite]);

	// Cleanup sources on unmount
	useEffect(() => {
		return () => {
			const map = mapHook.map;
			if (!map) return;
			const rawMap = map.map;
			for (const id of addedSourceIdsRef.current) {
				if (rawMap.getSource(id)) rawMap.removeSource(id);
			}
		};
	}, [mapHook.map]);

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

export default MapLayerRenderer;
