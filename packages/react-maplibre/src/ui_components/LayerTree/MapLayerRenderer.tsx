import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import MlWmsLayer from '../../components/MlWmsLayer/MlWmsLayer';
import MlLayer from '../../components/MlLayer/MlLayer';
import { STYLE_LAYER_UUIDS } from './styleLayerUuids';
import { useOrderReconciler } from './useOrderReconciler';

interface MapLayerRendererProps {
	mapConfigKey?: string;
	mapId?: string;
}

// Prefix for per-layer invisible order markers created by MlOrderLayers.
const ORDER_PREFIX = 'order-';

// Zone boundary marker IDs (also created by MlOrderLayers).
const ORDER_LABELS = 'order-labels';
const ORDER_BACKGROUND = 'order-background';

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

	// Classify store UUIDs into the three zones.
	const { labelUuids, customUuids, bgUuids } = useMemo(() => {
		const labelSet = new Set<string>([STYLE_LAYER_UUIDS.labelsFolder, STYLE_LAYER_UUIDS.labelsVt]);
		const bgSet = new Set<string>([STYLE_LAYER_UUIDS.bgFolder, STYLE_LAYER_UUIDS.bgVt]);

		const label: string[] = [];
		const custom: string[] = [];
		const bg: string[] = [];

		for (const uuid of layerStoreOrderIds) {
			if (labelSet.has(uuid)) label.push(uuid);
			else if (bgSet.has(uuid)) bg.push(uuid);
			else custom.push(uuid);
		}
		return { labelUuids: label, customUuids: custom, bgUuids: bg };
	}, [layerStoreOrderIds]);

	// ── Per-layer order markers ───────────────────────────────────
	//
	// Build an array of { id, insertBeforeLayer } entries for the
	// invisible MlLayer order markers.  Each marker is chained to
	// the one directly above it via insertBeforeLayer / waitForLayer,
	// guaranteeing a deterministic creation order on the map.
	//
	//   order-{labelVtUuid}                   ← top (no insertBefore)
	//   order-labels                          ← insertBefore = above
	//   order-{customUuid1}                   ← insertBefore = order-labels
	//   order-{customUuid2}                   ← insertBefore = order-{customUuid1}
	//   order-background                      ← insertBefore = last custom
	//   order-{bgVtUuid}                      ← insertBefore = order-background
	//
	// Each data layer component receives
	//   insertBeforeLayer = "order-{uuid}"
	// so it waits for its own order marker and is placed directly
	// below it.
	//
	// IMPORTANT: once an order marker's insertBeforeLayer is assigned
	// it must NEVER change, because useLayer re-creates the MapLibre
	// layer every time insertBeforeLayer changes (new useMap call →
	// new mapHook → effect re-fires → "already exists" error).
	// We use a stable ref-map to freeze values after first assignment.

	// Stable map: order-marker-id → its frozen insertBeforeLayer value.
	const frozenInsertBeforeRef = useRef<Map<string, string | undefined>>(new Map());

	const orderLayers = useMemo(() => {
		const entries: { id: string; insertBeforeLayer?: string }[] = [];

		// Skip folder UUIDs — they have no map layer.
		const skipFolders = (uuids: string[]) =>
			uuids.filter((uuid) => layerIndex.get(uuid)?.type !== 'folder');

		const frozen = frozenInsertBeforeRef.current;

		const push = (id: string) => {
			const prev = entries.length > 0 ? entries[entries.length - 1].id : undefined;
			// If we've already assigned this id an insertBeforeLayer value, keep it frozen.
			// This prevents useLayer from re-creating the layer when the chain shifts
			// (e.g. when updateStyle inserts new style-layer UUIDs above existing entries).
			if (!frozen.has(id)) {
				frozen.set(id, prev);
			}
			entries.push({ id, insertBeforeLayer: frozen.get(id) });
		};

		for (const uuid of skipFolders(labelUuids)) push(ORDER_PREFIX + uuid);
		push(ORDER_LABELS);
		for (const uuid of skipFolders(customUuids)) push(ORDER_PREFIX + uuid);
		push(ORDER_BACKGROUND);
		for (const uuid of skipFolders(bgUuids)) push(ORDER_PREFIX + uuid);

		return entries;
	}, [labelUuids, customUuids, bgUuids, layerIndex]);

	// ── Base map style: sources, glyphs & sprite ──────────────────────
	//
	// useLayoutEffect ensures sources exist BEFORE child component
	// effects fire, preventing the race condition where VT layers
	// call addLayer referencing source "openmaptiles" before it exists.
	const addedSourceIdsRef = useRef<string[]>([]);
	const [sourcesReady, setSourcesReady] = useState(false);

	useLayoutEffect(() => {
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

		if (mapConfig?.styleSources) {
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

			const addedIds: string[] = [];
			for (const [sourceId, sourceDef] of Object.entries(mapConfig.styleSources)) {
				if (!rawMap.getSource(sourceId)) {
					rawMap.addSource(sourceId, sourceDef);
					addedIds.push(sourceId);
				}
			}
			addedSourceIdsRef.current = addedIds;
		}

		setSourcesReady(true);

		// Recreate sources after a base-style reload wipes them
		const onStyleData = () => {
			if (
				addedSourceIdsRef.current.length > 0 &&
				!rawMap.getSource(addedSourceIdsRef.current[0]) &&
				mapConfig?.styleSources
			) {
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
			setSourcesReady(false);
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

	// ── Layer order reconciler ────────────────────────────────────
	// Checks the actual MapLibre layer stack after each addlayer event
	// and fixes any zone violations with moveLayer calls.
	useOrderReconciler({
		mapWrapper: mapHook.map,
		labelUuids,
		customUuids,
		bgUuids,
		layerIndex,
		sourcesReady,
	});

	function renderLayer(layer: LayerOrderItem): React.ReactNode {
		const layerConfig: LayerConfig | undefined = layerIndex.get(layer.uuid);
		// Each data layer's insertBeforeLayer points to its own order marker.
		const insertBeforeLayer =
			layerConfig?.type === 'folder' ? undefined : ORDER_PREFIX + layer.uuid;
		switch (layerConfig?.type) {
			case 'geojson':
				return (
					<MlGeoJsonLayer
						key={layerConfig.uuid}
						layerId={layerConfig.uuid}
						insertBeforeLayer={insertBeforeLayer}
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
						insertBeforeLayer={insertBeforeLayer}
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
						insertBeforeLayer={insertBeforeLayer}
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

	// Walk the layerStoreOrder tree and collect all renderable LayerOrderItems
	// in depth-first order (matching layerStoreOrderIds).
	const allOrderItems = useMemo(() => {
		const items: LayerOrderItem[] = [];
		const walk = (list: LayerOrderItem[]) => {
			for (const item of list) {
				items.push(item);
				if (item.layers) walk(item.layers);
			}
		};
		if (layerStoreOrder) walk(layerStoreOrder);
		return items;
	}, [layerStoreOrder]);

	return (
		<>
			{/* Per-layer order markers rendered as individual MlLayer
			    components.  Each has a stable key and insertBeforeLayer
			    pointing to the entry above it in the stack.  When new
			    layers appear (e.g. after updateStyle), only new MlLayer
			    instances are mounted — existing ones keep their props. */}
			{orderLayers.map((entry) => (
				<MlLayer
					key={entry.id}
					layerId={entry.id}
					insertBeforeLayer={entry.insertBeforeLayer}
				/>
			))}

			{/* Data layers — each references its own order-{uuid} marker */}
			{sourcesReady && allOrderItems.map((item) => renderLayer(item))}
		</>
	);
}

export default MapLayerRenderer;
