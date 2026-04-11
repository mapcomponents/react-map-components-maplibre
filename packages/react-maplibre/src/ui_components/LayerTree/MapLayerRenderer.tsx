import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
	useLayerOrder,
	useLayerStoreOrderIds,
	useStyleConfig,
	useLayerIndex,
	LayerOrderItem,
	LayerConfig,
} from '../../stores/map.store';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import useMap from '../../hooks/useMap';
import MlVectorTileLayer, {
	ExtendedLayerSpecification,
	type MlVectorTileLayerProps,
} from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import MlWmsLayer from '../../components/MlWmsLayer/MlWmsLayer';
import { STYLE_LAYER_UUIDS } from './styleLayerUuids';
import { useOrderReconciler } from './useOrderReconciler';
import { LayerSpecification } from 'maplibre-gl';

interface MapLayerRendererProps {
	mapConfigKey?: string;
	mapId?: string;
}

// Prefix for per-layer invisible order markers created by MlOrderLayers.
const ORDER_PREFIX = 'order-';

// Zone boundary marker IDs (also created by MlOrderLayers).
const ORDER_LABELS = 'order-labels';
const ORDER_BACKGROUND = 'order-background';

/** Shallow-compare two plain objects by their key-value pairs.
 * Much faster than JSON.stringify for small paint/layout objects.
 */
function shallowEqual(a: object | undefined, b: object | undefined): boolean {
	if (a === b) return true;
	if (!a || !b) return false;
	const aKeys = Object.keys(a);
	if (aKeys.length !== Object.keys(b).length) return false;
	for (const k of aKeys) {
		if ((a as any)[k] !== (b as any)[k]) return false;
	}
	return true;
}

// Memoized wrapper so React skips re-rendering when layers/url/insertBeforeLayer
// haven't changed (avoids unnecessary prop-diffing inside MlVectorTileLayer).
const MemoizedMlVectorTileLayer = React.memo(MlVectorTileLayer, (prev: MlVectorTileLayerProps, next: MlVectorTileLayerProps) => {
	// Re-render if url or insertBeforeLayer changed
	if (prev.url !== next.url || prev.insertBeforeLayer !== next.insertBeforeLayer) return false;
	// Re-render if layer count changed
	if (prev.layers.length !== next.layers.length) return false;
	// Re-render if any layer's id, layout, or paint changed (shallow compare — no JSON.stringify)
	for (let i = 0; i < prev.layers.length; i++) {
		const p = prev.layers[i];
		const n = next.layers[i];
		if (p.id !== n.id) return false;
		if (!shallowEqual(p.layout, n.layout)) return false;
		if (!shallowEqual(p.paint, n.paint)) return false;
	}
	return true; // props are equal → skip re-render
});

function MapLayerRenderer(props: MapLayerRendererProps) {
	const mapConfigKey = props.mapConfigKey || 'map_1';
	const layerStoreOrder = useLayerOrder(mapConfigKey);
	const mapHook = useMap({ mapId: props?.mapId });
	const layerStoreOrderIds = useLayerStoreOrderIds(mapConfigKey);
	// useStyleConfig: shallow-equal selector over the 5 style fields only.
	// Unrelated store changes (visibility, layer names, etc.) do NOT trigger a re-render.
	const styleConfig = useStyleConfig(mapConfigKey);
	// useLayerIndex: returns the store's pre-built _layerIndex Map directly.
	// No useMemo or manual Map construction needed.
	const layerIndex = useLayerIndex(mapConfigKey);

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
	// Order markers are INVISIBLE background layers added to MapLibre in one
	// synchronous batch (inside the useLayoutEffect below) so they exist on
	// the map BEFORE any data-layer component mounts.  This eliminates the
	// serial waitForLayer React-state chain that previously caused each data
	// layer to wait for the previous marker's layerchange → setState cycle.
	//
	// Desired bottom → top stack:
	//   order-{bgVtUuid}   order-background
	//   order-{customUuid} ... order-labels
	//   order-{labelUuid}
	//
	// Each data layer component still receives
	//   insertBeforeLayer = "order-{uuid}"
	// so useMap(waitForLayer) resolves immediately via a synchronous
	// map.getLayer() check (fast-path added to useMap).

	// Build the bottom→top ordered list of marker IDs that should exist.
	const orderMarkerIds = useMemo(() => {
		const ids: string[] = [];
		const skipFolders = (uuids: string[]) =>
			uuids.filter((uuid) => layerIndex.get(uuid)?.type !== 'folder');

		// Push in bottom→top order so index 0 = bottommost
		for (const uuid of skipFolders(bgUuids).toReversed()) ids.push(ORDER_PREFIX + uuid);
		ids.push(ORDER_BACKGROUND);
		for (const uuid of skipFolders(customUuids).toReversed()) ids.push(ORDER_PREFIX + uuid);
		ids.push(ORDER_LABELS);
		for (const uuid of skipFolders(labelUuids).toReversed()) ids.push(ORDER_PREFIX + uuid);

		return ids;
	}, [labelUuids, customUuids, bgUuids, layerIndex]);

	// Track which order marker IDs were imperatively created so we can
	// clean them up when the layer list changes or the component unmounts.
	const addedOrderMarkerIdsRef = useRef<string[]>([]);

	// ── Base map style: sources, glyphs, sprite & layer data ────────────
	//
	// useLayoutEffect ensures sources exist BEFORE child component
	// effects fire, preventing the race condition where VT layers
	// call addLayer referencing source "openmaptiles" before it exists.
	//
	// Style layers (background zone + labels zone) are applied here
	// directly via map.style.addLayer() — bypassing the React component
	// lifecycle — and a single map._update() call triggers one redraw.
	// This matches MapLibre's own setStyle() performance because it avoids
	// the per-addLayer _update() call that useLayer/MlVectorTileLayer does.
	const addedSourceIdsRef = useRef<string[]>([]);
	const addedStyleLayerIdsRef = useRef<string[]>([]);
	const [sourcesReady, setSourcesReady] = useState(false);

	useLayoutEffect(() => {
		const map = mapHook.map;
		if (!map) return;
		const rawMap = map.map;

		// ── 1. Remove previously batch-applied style layers ──────────────
		for (const id of addedStyleLayerIdsRef.current) {
			if (rawMap.style?.getLayer(id)) {
				rawMap.style.removeLayer(id);
			}
		}
		addedStyleLayerIdsRef.current = [];

		// ── 2. Sources: skip ones that are already present with same def ──
		// Remove sources that no longer exist in the new style config.
		const newSourceIds = new Set(Object.keys(styleConfig.styleSources ?? {}));
		const sourcesToRemove = addedSourceIdsRef.current.filter((id) => !newSourceIds.has(id));
		for (const id of sourcesToRemove) {
			if (rawMap.getSource(id)) rawMap.removeSource(id);
		}
		addedSourceIdsRef.current = addedSourceIdsRef.current.filter((id) => newSourceIds.has(id));

		if (styleConfig.styleSources) {
			if (styleConfig.styleGlyphs) {
				rawMap.style.setGlyphs(styleConfig.styleGlyphs);
			}
			if (styleConfig.styleSprite) {
				const spriteValue = styleConfig.styleSprite;
				if (typeof spriteValue === 'string') {
					rawMap.style.setSprite([{ id: 'default', url: spriteValue }]);
				} else if (Array.isArray(spriteValue)) {
					rawMap.style.setSprite(spriteValue);
				}
			}

			for (const [sourceId, sourceDef] of Object.entries(styleConfig.styleSources)) {
				if (!rawMap.getSource(sourceId)) {
					rawMap.addSource(sourceId, sourceDef);
					addedSourceIdsRef.current.push(sourceId);
				}
			}
		}

		// ── 3. Batch-apply bg and label style layers directly ─────────────
		// Insert before the first user-land order marker so they land in the
		// correct zone without going through the React component pipeline.
		// We call map.style.addLayer() (no _update per call) then _update once.
		const bgLayers = styleConfig.backgroundLayers ?? [];
		const labelLayers = styleConfig.symbolLayers ?? [];

		// bg layers go below order-background; labels go above order-labels.
		// We insert each layer "before" the appropriate boundary marker when
		// it already exists, otherwise just append (reconciler will fix order).
		const applyLayers = (layerSpecs: LayerSpecification[], insertBefore: string | undefined) => {
			const addedIds: string[] = [];
			for (const spec of layerSpecs) {
				if (!rawMap.style?.getLayer(spec.id)) {
					try {
						const beforeId = insertBefore && rawMap.style?.getLayer(insertBefore)
							? insertBefore
							: undefined;
						rawMap.style.addLayer(spec as Parameters<typeof rawMap.style.addLayer>[0], beforeId);
						addedIds.push(spec.id);
					} catch {
						// layer may reference a source not yet loaded — reconciler will retry
					}
				}
			}
			return addedIds;
		};

		const bgIds = applyLayers(bgLayers as LayerSpecification[], ORDER_BACKGROUND);
		const labelIds = applyLayers(labelLayers as LayerSpecification[], undefined /* topmost */);
		addedStyleLayerIdsRef.current = [...bgIds, ...labelIds];

		// ── 4. Batch-create order markers synchronously ───────────────────
		// Remove stale markers that are no longer in the list.
		const newMarkerSet = new Set(orderMarkerIds);
		for (const id of addedOrderMarkerIdsRef.current) {
			if (!newMarkerSet.has(id) && rawMap.style?.getLayer(id)) {
				rawMap.style.removeLayer(id);
			}
		}
		addedOrderMarkerIdsRef.current = [];

		// Add markers that don't exist yet, bottom→top so each can be appended
		// on top of the previous without specifying an insertBefore (they'll be
		// in the right relative order and the reconciler handles absolute order).
		for (const markerId of orderMarkerIds) {
			if (!rawMap.style?.getLayer(markerId)) {
				try {
					rawMap.style.addLayer({
						id: markerId,
						type: 'background',
						paint: { 'background-color': 'rgba(0,0,0,0)', 'background-opacity': 0 },
					});
					addedOrderMarkerIdsRef.current.push(markerId);
				} catch {
					// ignore — may already exist
				}
			} else {
				addedOrderMarkerIdsRef.current.push(markerId);
			}
		}

		// Single redraw for all the layers we just added
		(rawMap as any)._update?.(true);

		setSourcesReady(true);

		// ── 5. Re-apply after a base-style reload wipes our additions ──────
		const onStyleData = () => {
			const stillMissing =
				addedSourceIdsRef.current.some((id) => !rawMap.getSource(id)) ||
				addedStyleLayerIdsRef.current.some((id) => !rawMap.style?.getLayer(id)) ||
				addedOrderMarkerIdsRef.current.some((id) => !rawMap.style?.getLayer(id));

			if (!stillMissing) return;

			// Re-add sources
			if (styleConfig.styleSources) {
				for (const [sourceId, sourceDef] of Object.entries(styleConfig.styleSources)) {
					if (!rawMap.getSource(sourceId)) rawMap.addSource(sourceId, sourceDef);
				}
				if (styleConfig.styleGlyphs) rawMap.style.setGlyphs(styleConfig.styleGlyphs);
				if (styleConfig.styleSprite) {
					const sv = styleConfig.styleSprite;
					if (typeof sv === 'string') rawMap.style.setSprite([{ id: 'default', url: sv }]);
					else if (Array.isArray(sv)) rawMap.style.setSprite(sv);
				}
			}

			// Re-add style layers
			addedStyleLayerIdsRef.current = [];
			const rBg = applyLayers(bgLayers as LayerSpecification[], ORDER_BACKGROUND);
			const rLabel = applyLayers(labelLayers as LayerSpecification[], undefined);
			addedStyleLayerIdsRef.current = [...rBg, ...rLabel];

			// Re-add order markers
			addedOrderMarkerIdsRef.current = [];
			for (const markerId of orderMarkerIds) {
				if (!rawMap.style?.getLayer(markerId)) {
					try {
						rawMap.style.addLayer({
							id: markerId,
							type: 'background',
							paint: { 'background-color': 'rgba(0,0,0,0)', 'background-opacity': 0 },
						});
					} catch { /* ignore */ }
				}
				addedOrderMarkerIdsRef.current.push(markerId);
			}
			if (rBg.length + rLabel.length > 0) (rawMap as any)._update?.(true);
		};
		rawMap.on('styledata', onStyleData);

		return () => {
			rawMap.off('styledata', onStyleData);
			setSourcesReady(false);
		};
	}, [mapHook.map, styleConfig.styleSources, styleConfig.styleGlyphs, styleConfig.styleSprite,
		styleConfig.backgroundLayers, styleConfig.symbolLayers, orderMarkerIds]);

	// Cleanup all imperatively-created layers and sources on unmount.
	useEffect(() => {
		return () => {
			const map = mapHook.map;
			if (!map) return;
			const rawMap = map.map;
			for (const id of addedStyleLayerIdsRef.current) {
				if (rawMap.style?.getLayer(id)) rawMap.style.removeLayer(id);
			}
			for (const id of addedOrderMarkerIdsRef.current) {
				if (rawMap.style?.getLayer(id)) rawMap.style.removeLayer(id);
			}
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
				// bg and labels VT layers are applied imperatively via map.style.addLayer()
				// in the useLayoutEffect above — no React component needed.
				if (
					layerConfig.uuid === STYLE_LAYER_UUIDS.bgVt ||
					layerConfig.uuid === STYLE_LAYER_UUIDS.labelsVt
				) {
					return null;
				}

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
					<MemoizedMlVectorTileLayer
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
			{/* Data layers — each references its own order-{uuid} marker.
			    Order markers are created imperatively in useLayoutEffect above
			    so they exist synchronously before any data layer mounts,
			    eliminating the serial waitForLayer React-state chain. */}
			{sourcesReady && allOrderItems.map((item) => renderLayer(item))}
		</>
	);
}

export default MapLayerRenderer;
