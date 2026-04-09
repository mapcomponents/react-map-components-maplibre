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

/**
 * Move layers into correct order using the minimum number of moveLayer
 * calls.  We walk the expected sequence from bottom to top; whenever a
 * layer is out of place we move it just below the next layer that IS
 * already in the correct position above it.
 */
function reconcile(
	expectedSeq: string[],
	rawMap: { getStyle: () => { layers: { id: string }[] }; moveLayer: (id: string, beforeId?: string) => void }
) {
	const actualLayers = rawMap.getStyle()?.layers ?? [];
	const actualIds = new Set(actualLayers.map((l) => l.id));
	const actualIndex = new Map(actualLayers.map((l, i) => [l.id, i]));

	// Filter expected sequence to only layers currently on the map.
	const present = expectedSeq.filter((id) => actualIds.has(id));
	if (present.length === 0) return;

	if (isInOrder(present, actualIds, actualIndex)) return; // nothing to fix

	// Walk bottom→top through present layers.
	// For each layer, find the next present layer in expected order (its
	// "beforeId").  If the current layer isn't immediately below that
	// beforeId, move it there.
	for (let i = 0; i < present.length; i++) {
		const id = present[i];
		const beforeId = i + 1 < present.length ? present[i + 1] : undefined;

		// Re-read actual index (it changes with each moveLayer call).
		const freshLayers = rawMap.getStyle()?.layers ?? [];
		const freshIndex = new Map(freshLayers.map((l, j) => [l.id, j]));

		const currentPos = freshIndex.get(id) ?? -1;
		const beforePos = beforeId ? (freshIndex.get(beforeId) ?? -1) : freshLayers.length;

		// Layer is correctly positioned if it appears immediately below beforeId
		// (i.e. currentPos === beforePos - 1), or at the top if no beforeId.
		if (beforeId) {
			if (currentPos !== beforePos - 1) {
				try {
					rawMap.moveLayer(id, beforeId);
				} catch {
					// layer may not exist yet — ignore and continue
				}
			}
		} else {
			// Should be the topmost layer
			if (currentPos !== freshLayers.length - 1) {
				try {
					rawMap.moveLayer(id);
				} catch {
					// ignore
				}
			}
		}
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

	useEffect(() => {
		if (!mapWrapper || !sourcesReady) return;

		const rawMap = mapWrapper.map;

		const runReconcile = () => {
			const { labelUuids, customUuids, bgUuids, layerIndex } = paramsRef.current;
			const expected = buildExpectedSequence(labelUuids, customUuids, bgUuids, layerIndex);
			reconcile(expected, rawMap);
		};

		// Run once immediately (catches layers already present).
		runReconcile();

		// Re-run whenever a layer is added (new layers may arrive out of order).
		const onAddLayer = () => runReconcile();
		mapWrapper.wrapper.on('addlayer', onAddLayer as Parameters<typeof mapWrapper.wrapper.on>[1]);

		return () => {
			mapWrapper.wrapper.off('addlayer', onAddLayer as Parameters<typeof mapWrapper.wrapper.on>[1]);
		};
	}, [mapWrapper, sourcesReady]);
}
