import { useEffect, useRef } from 'react';
import MapLibreGlWrapper from '../../components/MapLibreMap/lib/MapLibreGlWrapper';
import { LayerConfig } from '../../stores/map.store';

/**
 * useOrderReconciler
 *
 * After all layers have been added to the map, checks that the actual
 * MapLibre layer stack matches the intended zone ordering and fixes any
 * violations with `map.moveLayer` calls.
 *
 * Expected stack from bottom (index 0) to top (highest index):
 *
 *   bg data sub-layers … order-{bgUuid} …
 *   order-background
 *   custom data sub-layers … order-{customUuid} …
 *   order-labels
 *   label data sub-layers … order-{labelUuid} …
 *
 * Each data layer sits *below* its own order marker because it was added
 * with `insertBeforeLayer = "order-{uuid}"`.  The reconciler preserves
 * this relative order and only moves layers that are genuinely in the
 * wrong zone.
 */

const ORDER_PREFIX = 'order-';
const ORDER_LABELS = 'order-labels';
const ORDER_BACKGROUND = 'order-background';

export interface OrderReconcilerParams {
	/** The wrapper returned by useMap – null while map hasn't mounted yet */
	mapWrapper: MapLibreGlWrapper | undefined;
	/** Flat list of non-folder layer UUIDs in the label zone */
	labelUuids: string[];
	/** Flat list of non-folder layer UUIDs in the custom zone */
	customUuids: string[];
	/** Flat list of non-folder layer UUIDs in the background zone */
	bgUuids: string[];
	/** O(1) lookup of LayerConfig by UUID */
	layerIndex: Map<string, LayerConfig>;
	/** Set to true once sources are ready and data layers have been rendered */
	sourcesReady: boolean;
}

/**
 * Returns all MapLibre layer IDs that belong to a store entry, in the
 * order they should appear on the map (bottom→top within the entry).
 * For VT layers this expands to the individual sub-layer IDs; for all
 * other types it is just the UUID itself.
 */
function dataLayerIds(uuid: string, layerIndex: Map<string, LayerConfig>): string[] {
	const config = layerIndex.get(uuid);
	if (!config || config.type === 'folder') return [];
	if (config.type === 'vt' && config.config?.layers?.length) {
		return config.config.layers.map((l) => l.id);
	}
	return [uuid];
}

/**
 * Build the full expected bottom→top sequence of layer IDs that should
 * exist on the map, interleaving data sub-layers with their order markers.
 *
 * The store's layerOrder has index 0 = top of the map (labels side) and
 * last index = bottom (background side).  Each zone array therefore needs
 * to be iterated in reverse so that the first item pushed is the one
 * nearest the bottom of the map.
 *
 * Layout (bottom = index 0):
 *   [bg data, order-{bgUuid}] × N reversed  →  order-background
 *   [custom data, order-{customUuid}] × N reversed  →  order-labels
 *   [label data, order-{labelUuid}] × N reversed
 */
function buildExpectedSequence(
	labelUuids: string[],
	customUuids: string[],
	bgUuids: string[],
	layerIndex: Map<string, LayerConfig>
): string[] {
	const seq: string[] = [];

	const pushEntry = (uuid: string) => {
		for (const id of dataLayerIds(uuid, layerIndex)) seq.push(id);
		seq.push(ORDER_PREFIX + uuid);
	};

	// Reversed: last store entry = bottom of map = first in bottom→top sequence
	for (const uuid of bgUuids.toReversed()) pushEntry(uuid);
	seq.push(ORDER_BACKGROUND);
	for (const uuid of customUuids.toReversed()) pushEntry(uuid);
	seq.push(ORDER_LABELS);
	for (const uuid of labelUuids.toReversed()) pushEntry(uuid);

	return seq;
}

/**
 * Check whether the given layer IDs appear in the correct relative order
 * within the actual MapLibre layer list.
 * Accepts the live order array directly to avoid building intermediate
 * Set/Map when we already have them from the reconcile() pre-check.
 */
function isInOrder(expectedSeq: string[], actualIds: Set<string>, actualIndex: Map<string, number>): boolean {
	let lastPos = -1;
	for (const id of expectedSeq) {
		if (!actualIds.has(id)) continue; // layer not yet on map — skip
		const pos = actualIndex.get(id) ?? -1;
		if (pos < lastPos) return false;
		lastPos = pos;
	}
	return true;
}

/** Read the current ordered layer-id array directly from MapLibre internals.
 * This avoids the full style-clone that rawMap.getStyle() performs on every call.
 * Falls back to getStyle() if the internal property isn't available.
 */
function getRawLayerOrder(rawMap: any): string[] {
	// MapLibre keeps the live ordered array at map.style._order.
	// It is an array of layer-id strings, updated in-place on every addLayer / moveLayer.
	const order: unknown = rawMap.style?._order;
	if (Array.isArray(order)) return order as string[];
	// Fallback: older MapLibre builds or mocks that don't expose _order
	return (rawMap.getStyle?.()?.layers ?? []).map((l: { id: string }) => l.id);
}

/**
 * Move layers into correct order using the minimum number of moveLayer
 * calls.  All moves are applied to map.style directly (no _update per
 * move) and a single _update(true) is issued at the end, matching the
 * pattern used for batched style-layer application in MapLayerRenderer.
 *
 * Algorithm: walk top→bottom (highest z-index first) through the expected
 * sequence.  For each layer, insert it immediately before the previously
 * placed layer (its expected upper neighbour).  Re-reading the live order
 * array after each move ensures every subsequent check reflects current state.
 *
 * Walking top→bottom avoids the "block shift" failure that occurs when
 * walking bottom→top: once an item is placed at the top, all subsequent
 * insertions go below it, so the full block is correctly repositioned even
 * when all members of the block are already in the right relative order
 * but sitting in the wrong zone.
 *
 * Performance: getRawLayerOrder() reads rawMap.style._order directly —
 * an in-place array that MapLibre updates on every addLayer/moveLayer — so
 * there is no full style-clone per iteration (unlike getStyle().layers).
 */
function reconcile(
	expectedSeq: string[],
	rawMap: { getStyle: () => { layers: { id: string }[] }; moveLayer: (id: string, beforeId?: string) => void; style?: { moveLayer?: (id: string, beforeId?: string) => void }; _update?: (force: boolean) => void }
) {
	const initialOrder = getRawLayerOrder(rawMap);
	const actualIds = new Set(initialOrder);
	const actualIndex = new Map(initialOrder.map((id, i) => [id, i]));

	// Filter expected sequence to only layers currently on the map.
	const present = expectedSeq.filter((id) => actualIds.has(id));
	if (present.length === 0) return;

	if (isInOrder(present, actualIds, actualIndex)) return; // nothing to fix

	// Use map.style.moveLayer() directly (no _update per call) then flush once.
	const styleMoveLayer = (rawMap as any).style?.moveLayer
		? (id: string, beforeId?: string) => (rawMap as any).style.moveLayer(id, beforeId)
		: (id: string, beforeId?: string) => rawMap.moveLayer(id, beforeId);

	let moved = false;

	// Walk top→bottom (present[last] = top).  For each layer, place it just
	// below its expected upper neighbour (present[i+1]).
	for (let i = present.length - 1; i >= 0; i--) {
		const id = present[i];
		const aboveId = i + 1 < present.length ? present[i + 1] : undefined;

		// Re-read the live order array (O(n) scan but no clone).
		const freshOrder = getRawLayerOrder(rawMap);
		const freshIndex = new Map(freshOrder.map((lid, j) => [lid, j]));

		const currentPos = freshIndex.get(id) ?? -1;

		if (aboveId) {
			const abovePos = freshIndex.get(aboveId) ?? -1;
			if (currentPos >= abovePos) {
				try {
					styleMoveLayer(id, aboveId);
					moved = true;
				} catch {
					// layer may not exist yet — ignore
				}
			}
		}
		// topmost item: no action needed (see algorithm comment above)
	}

	if (moved) {
		(rawMap as any)._update?.(true);
	}
}

export function useOrderReconciler({
	mapWrapper,
	labelUuids,
	customUuids,
	bgUuids,
	layerIndex,
	sourcesReady,
}: OrderReconcilerParams) {
	// Keep a ref to the latest params so the event handler always uses
	// fresh values without being re-registered on every render.
	const paramsRef = useRef({ labelUuids, customUuids, bgUuids, layerIndex });
	paramsRef.current = { labelUuids, customUuids, bgUuids, layerIndex };

	// Debounce timer ref so rapid reorders coalesce into one reconcile call.
	const reconcileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Run reconcile immediately whenever the intended order changes (e.g. after
	// a drag-reorder).  Debounced so multiple rapid store updates coalesce.
	useEffect(() => {
		if (!mapWrapper || !sourcesReady) return;
		const rawMap = mapWrapper.map;

		// Cancel any pending debounced reconcile
		if (reconcileTimerRef.current !== null) {
			clearTimeout(reconcileTimerRef.current);
		}

		// Run immediately on the next microtask so the current render cycle
		// completes first (avoids reading a partially-updated style).
		reconcileTimerRef.current = setTimeout(() => {
			reconcileTimerRef.current = null;
			const { labelUuids, customUuids, bgUuids, layerIndex } = paramsRef.current;
			const expected = buildExpectedSequence(labelUuids, customUuids, bgUuids, layerIndex);
			reconcile(expected, rawMap);
		}, 0);

		return () => {
			if (reconcileTimerRef.current !== null) {
				clearTimeout(reconcileTimerRef.current);
				reconcileTimerRef.current = null;
			}
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mapWrapper, sourcesReady, labelUuids, customUuids, bgUuids]);
	// Note: layerIndex intentionally omitted – it changes identity together with
	// labelUuids/customUuids/bgUuids so the above deps already capture the right
	// moment.  Including it would cause a redundant extra run on every layer
	// config update (visibility etc.) which we don't need here.

	useEffect(() => {
		if (!mapWrapper || !sourcesReady) return;

		const rawMap = mapWrapper.map;

		// Debounce the addlayer handler so rapid multi-layer additions (e.g.
		// MlVectorTileLayer adding N sub-layers) coalesce into one reconcile.
		let addLayerTimer: ReturnType<typeof setTimeout> | null = null;

		const runReconcile = () => {
			const { labelUuids, customUuids, bgUuids, layerIndex } = paramsRef.current;
			const expected = buildExpectedSequence(labelUuids, customUuids, bgUuids, layerIndex);
			reconcile(expected, rawMap);
		};

		const onAddLayer = () => {
			if (addLayerTimer !== null) clearTimeout(addLayerTimer);
			addLayerTimer = setTimeout(() => {
				addLayerTimer = null;
				runReconcile();
			}, 0);
		};
		mapWrapper.wrapper.on('addlayer', onAddLayer as Parameters<typeof mapWrapper.wrapper.on>[1]);

		return () => {
			if (addLayerTimer !== null) clearTimeout(addLayerTimer);
			mapWrapper.wrapper.off('addlayer', onAddLayer as Parameters<typeof mapWrapper.wrapper.on>[1]);
		};
	}, [mapWrapper, sourcesReady]);
}
