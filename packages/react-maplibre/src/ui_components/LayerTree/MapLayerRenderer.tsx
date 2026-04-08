import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react';
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
import { STYLE_LAYER_UUIDS } from './styleLayerUuids';

interface MapLayerRendererProps {
	mapConfigKey?: string;
	mapId?: string;
}

// Root-level boundary marker IDs.
// "order-labels" sits above custom layers; label style layers go above it.
// "order-background" sits below custom layers; background style layers go below it.
const ORDER_LABELS = 'order-labels';
const ORDER_BACKGROUND = 'order-background';

// Transparent background paint for marker layers.
const MARKER_PAINT = { 'background-color': 'rgba(0,0,0,0)' } as const;

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

	// ── Imperative layer ordering ───────────────────────────────
	//
	// Three stacking zones on the MapLibre map, separated by two
	// invisible boundary markers:
	//
	//   ┌─ top of map ──────────────────────────────┐
	//   │  Label style layers  (above order-labels)  │
	//   │─────────── order-labels ───────────────────│
	//   │  Custom / user layers                      │
	//   │─────────── order-background ───────────────│
	//   │  Background style layers (below it)        │
	//   └─ bottom of map ───────────────────────────┘
	//
	// The reorder function positions every store layer into the
	// correct zone by checking its UUID against the style-layer
	// constants.

	// Helper: ensure a transparent marker layer exists on the map.
	const ensureMarker = useCallback(
		(rawMap: maplibregl.Map, id: string, beforeId?: string) => {
			if (!rawMap.getLayer(id)) {
				try {
					rawMap.addLayer(
						{ id, type: 'background', paint: MARKER_PAINT } as maplibregl.BackgroundLayerSpecification,
						beforeId
					);
				} catch {
					/* layer may already exist from a concurrent path */
				}
			}
		},
		[]
	);

	useEffect(() => {
		if (!mapHook.map) return;
		const rawMap = mapHook.map.map;
		if (!rawMap || !layerStoreOrderIds.length) return;

		// --- classify store UUIDs into the three zones ---
		const labelUuids: string[] = [];   // style label layers  → above ORDER_LABELS
		const customUuids: string[] = [];  // user / custom layers → between markers
		const bgUuids: string[] = [];      // style background     → below ORDER_BACKGROUND

		const labelSet = new Set<string>([STYLE_LAYER_UUIDS.labelsFolder, STYLE_LAYER_UUIDS.labelsVt]);
		const bgSet = new Set<string>([STYLE_LAYER_UUIDS.bgFolder, STYLE_LAYER_UUIDS.bgVt]);

		for (const uuid of layerStoreOrderIds) {
			if (labelSet.has(uuid)) labelUuids.push(uuid);
			else if (bgSet.has(uuid)) bgUuids.push(uuid);
			else customUuids.push(uuid);
		}

		// Expand a store uuid into the actual MapLibre layer ids.
		const expand = (uuid: string): string[] => {
			const cfg = layerIndex.get(uuid);
			if (cfg?.type === 'vt' && cfg.config?.layers) {
				return cfg.config.layers.map((l: { id: string }) => l.id);
			}
			if (cfg?.type === 'folder') return []; // folders have no map layer
			return [uuid];
		};

		// Build the full desired order (highest → lowest on the map)
		// including the two boundary markers.
		const buildDesiredOrder = (): string[] => {
			const ids: string[] = [];
			for (const uuid of labelUuids) {
				for (const id of expand(uuid)) {
					if (rawMap.getLayer(id)) ids.push(id);
				}
			}
			ids.push(ORDER_LABELS);
			for (const uuid of customUuids) {
				for (const id of expand(uuid)) {
					if (rawMap.getLayer(id)) ids.push(id);
				}
			}
			ids.push(ORDER_BACKGROUND);
			for (const uuid of bgUuids) {
				for (const id of expand(uuid)) {
					if (rawMap.getLayer(id)) ids.push(id);
				}
			}
			return ids;
		};

		// Fast-path: check if layers are already in the right order.
		const isInOrder = (): boolean => {
			const desired = buildDesiredOrder();
			if (desired.length <= 2) return true; // only markers

			const allLayers = rawMap.getStyle()?.layers;
			if (!allLayers) return true;

			const layerIdToIndex = new Map<string, number>();
			for (let i = 0; i < allLayers.length; i++) {
				layerIdToIndex.set(allLayers[i].id, i);
			}

			// desired[0] = highest (largest index), each next should be lower.
			let prevIdx = Infinity;
			for (const id of desired) {
				const idx = layerIdToIndex.get(id);
				if (idx === undefined) return false;
				if (idx > prevIdx) return false;
				prevIdx = idx;
			}
			return true;
		};

		const tryMove = (id: string, before: string | undefined) => {
			if (rawMap.getLayer(id)) {
				try {
					rawMap.moveLayer(id, before);
				} catch {
					/* noop */
				}
			}
		};

		// Move a group of store UUIDs so that the first UUID's layers
		// are highest and each subsequent group is below. Returns the
		// new beforeId (= the lowest layer placed).
		const moveGroup = (uuids: string[], startBeforeId: string | undefined): string | undefined => {
			let beforeId = startBeforeId;
			for (const uuid of uuids) {
				const cfg = layerIndex.get(uuid);
				if (cfg?.type === 'vt' && cfg.config?.layers) {
					// VT: move sub-layers in reverse so first spec
					// layer ends up highest within the group.
					for (let s = cfg.config.layers.length - 1; s >= 0; s--) {
						const subId = cfg.config.layers[s].id;
						tryMove(subId, beforeId);
						if (rawMap.getLayer(subId)) beforeId = subId;
					}
				} else if (cfg?.type !== 'folder') {
					tryMove(uuid, beforeId);
					if (rawMap.getLayer(uuid)) beforeId = uuid;
				}
			}
			return beforeId;
		};

		const reorder = () => {
			if (isInOrder()) return;

			// Ensure the two boundary markers exist.
			ensureMarker(rawMap, ORDER_BACKGROUND);
			ensureMarker(rawMap, ORDER_LABELS);

			// --- 1. Label zone (top) ---
			// Move label layers above ORDER_LABELS.
			// We move them with beforeId = undefined → top of stack.
			let beforeId: string | undefined;
			beforeId = moveGroup(labelUuids, beforeId);

			// --- 2. ORDER_LABELS marker ---
			tryMove(ORDER_LABELS, beforeId);
			if (rawMap.getLayer(ORDER_LABELS)) beforeId = ORDER_LABELS;

			// --- 3. Custom zone (middle) ---
			beforeId = moveGroup(customUuids, beforeId);

			// --- 4. ORDER_BACKGROUND marker ---
			tryMove(ORDER_BACKGROUND, beforeId);
			if (rawMap.getLayer(ORDER_BACKGROUND)) beforeId = ORDER_BACKGROUND;

			// --- 5. Background zone (bottom) ---
			moveGroup(bgUuids, beforeId);
		};

		// Run immediately.
		reorder();

		// Run when a new layer appears on the map (data layer mount).
		mapHook.map.wrapper.on('addlayer', reorder);
		// Safety net for async layer recreation (styledata reloads).
		rawMap.on('idle', reorder);

		return () => {
			mapHook.map?.wrapper.off('addlayer', reorder);
			rawMap.off('idle', reorder);
		};
	}, [layerStoreOrderIds, layerIndex, mapHook.map, ensureMarker]);

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

	function renderLayer(layer: LayerOrderItem): React.ReactNode {
		const layerConfig: LayerConfig | undefined = layerIndex.get(layer.uuid);
		switch (layerConfig?.type) {
			case 'geojson':
				return (
					<MlGeoJsonLayer
						key={layerConfig.uuid}
						layerId={layerConfig.uuid}
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

	return <>{sourcesReady && layerStoreOrder?.map?.((layerOrderItem) => renderLayer(layerOrderItem))}</>;
}

export default MapLayerRenderer;
