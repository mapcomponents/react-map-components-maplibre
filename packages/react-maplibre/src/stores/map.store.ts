import { Layer } from 'wms-capabilities';
import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { LayerSpecification, SourceSpecification, StyleSpecification } from 'maplibre-gl';
import { MlWmsLayerProps } from '../components/MlWmsLayer/MlWmsLayer';
import { MlGeoJsonLayerProps } from '../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { MlVectorTileLayerProps } from '../components/MlVectorTileLayer/MlVectorTileLayer';

export interface wmsLoaderConfigProps {
	getFeatureInfoUrl: string;
	layers: Layer[];
	name: string;
	open: boolean;
	visible: boolean;
	wmsUrl: string;
}

export interface wmsConfig {
	featureInfoActive?: boolean;
	config?: wmsLoaderConfigProps;
	url: string;
}

export type WmsLayerConfig = {
	type: 'wms';
	uuid: string;
	name?: string;
	id?: string;
	config?: MlWmsLayerProps;
	masterVisible?: boolean;
};

export type GeojsonLayerConfig = {
	type: 'geojson';
	uuid: string;
	name?: string;
	id?: string;
	config: MlGeoJsonLayerProps;
	masterVisible?: boolean;
	configurable?: boolean;
};

export type VtLayerConfig = {
	type: 'vt';
	uuid: string;
	name?: string;
	id?: string;
	config: MlVectorTileLayerProps;
	visible?: boolean;
	masterVisible?: boolean;
};

export type FolderLayerConfig = {
	type: 'folder';
	uuid: string;
	name?: string;
	visible?: boolean;
	masterVisible?: boolean;
	id?: string;
	config?: undefined;
};

export type LayerConfig = WmsLayerConfig | GeojsonLayerConfig | VtLayerConfig | FolderLayerConfig;

export interface MapProps {
	center: [number, number];
	zoom: number;
}

export interface LayerOrderItem {
	uuid: string;
	layers?: LayerOrderItem[];
}

export interface MapConfig {
	name: string;
	mapProps: MapProps;
	layers: LayerConfig[];
	layerOrder: LayerOrderItem[];
	/** Non-symbol layers from the active base map style (rendered below user layers). */
	backgroundLayers?: LayerSpecification[];
	/** Symbol/label layers from the active base map style (rendered above user layers). */
	symbolLayers?: LayerSpecification[];
	/** Sources from the active base map style. */
	styleSources?: { [key: string]: SourceSpecification };
	/** Sprite URL from the active base map style. */
	styleSprite?: StyleSpecification['sprite'];
	/** Glyphs URL template from the active base map style. */
	styleGlyphs?: string;
	/** Internal index for O(1) uuid lookups. Auto-built by store actions if omitted. */
	_layerIndex?: Map<string, LayerConfig>;
}

export type MapState = {
	mapConfigs: { [key: string]: MapConfig };
};

// Actions interface
export interface MapActions {
	setMapConfig: (key: string, mapConfig: MapConfig) => void;
	removeMapConfig: (key: string) => void;
	setLayerInMapConfig: (mapConfigKey: string, layer: LayerConfig) => void;
	removeLayerFromMapConfig: (mapConfigKey: string, layerUuid: string) => void;
	updateLayerOrder: (mapConfigKey: string, newOrder: LayerOrderItem[]) => void;
	setMasterVisible: (mapConfigKey: string, layerId: string, masterVisible: boolean) => void;
	updateStyle: (mapConfigKey: string, style: StyleSpecification) => void;
}

// --- Internal helpers ---

/** Build a uuid->LayerConfig index from a layers array */
function buildLayerIndex(layers: LayerConfig[]): Map<string, LayerConfig> {
	const map = new Map<string, LayerConfig>();
	for (const layer of layers) {
		map.set(layer.uuid, layer);
	}
	return map;
}

/** Ensure a MapConfig has a _layerIndex, building it if missing (for external callers who omit it) */
function ensureIndex(mc: MapConfig): MapConfig & { _layerIndex: Map<string, LayerConfig> } {
	if (mc._layerIndex && mc._layerIndex.size === mc.layers.length) {
		return mc as MapConfig & { _layerIndex: Map<string, LayerConfig> };
	}
	return { ...mc, _layerIndex: buildLayerIndex(mc.layers) };
}

/** Get the _layerIndex from a MapConfig, building it on-the-fly if missing */
function getIndex(mc: MapConfig): Map<string, LayerConfig> {
	return mc._layerIndex ?? buildLayerIndex(mc.layers);
}

/** Recursively clone a layerOrder tree, removing items with the given uuid.
 *  Uses structural sharing: only clones ancestors of removed nodes. */
function removeFromLayerOrder(
	items: LayerOrderItem[],
	targetUuid: string
): { result: LayerOrderItem[]; changed: boolean } {
	let changed = false;
	const result: LayerOrderItem[] = [];

	for (const item of items) {
		if (item.uuid === targetUuid) {
			changed = true;
			continue; // skip this item
		}
		if (item.layers) {
			const sub = removeFromLayerOrder(item.layers, targetUuid);
			if (sub.changed) {
				changed = true;
				result.push({ ...item, layers: sub.result });
			} else {
				result.push(item); // structural sharing — same reference
			}
		} else {
			result.push(item);
		}
	}
	return { result, changed };
}

/** Recursively clone a layerOrder tree, applying a move operation.
 *  Uses structural sharing: only clones the array where the move happens. */
function moveInLayerOrder(
	items: LayerOrderItem[],
	uuid: string,
	getNewPos: (oldPos: number) => number
): { result: LayerOrderItem[]; found: boolean } {
	for (let i = 0; i < items.length; i++) {
		if (items[i].uuid === uuid) {
			const newPos = getNewPos(i);
			if (newPos < 0 || newPos >= items.length) {
				return { result: items, found: true }; // out of bounds, no-op
			}
			const newItems = [...items];
			const [item] = newItems.splice(i, 1);
			newItems.splice(newPos, 0, item);
			return { result: newItems, found: true };
		}
		const childLayers = items[i].layers;
		if (childLayers && childLayers.length > 0) {
			const sub = moveInLayerOrder(childLayers, uuid, getNewPos);
			if (sub.found) {
				const newItems = [...items];
				newItems[i] = { ...items[i], layers: sub.result };
				return { result: newItems, found: true };
			}
		}
	}
	return { result: items, found: false };
}

/** Extract all uuids from a nested layerOrder tree */
function extractUuidsFromItems(items: LayerOrderItem[]): string[] {
	const uuids: string[] = [];
	function walk(items: LayerOrderItem[]): void {
		for (const item of items) {
			uuids.push(item.uuid);
			if (item.layers && item.layers.length > 0) {
				walk(item.layers);
			}
		}
	}
	walk(items);
	return uuids;
}

// --- Zustand store ---

export const useMapStore = create<MapState & MapActions>()((set) => ({
	mapConfigs: {},

	setMapConfig: (key, mapConfig) =>
		set((state) => ({
			mapConfigs: {
				...state.mapConfigs,
				[key]: ensureIndex(mapConfig),
			},
		})),

	removeMapConfig: (key) =>
		set((state) => {
			const { [key]: _, ...rest } = state.mapConfigs;
			return { mapConfigs: rest };
		}),

	setLayerInMapConfig: (mapConfigKey, updatedLayer) =>
		set((state) => {
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (!mapConfig) return state;

			const index = getIndex(mapConfig);
			// Only create a new array if the layer actually changed
			const existing = index.get(updatedLayer.uuid);
			if (existing === updatedLayer) return state; // same reference, no-op

			const newLayers = mapConfig.layers.map((l) =>
				l.uuid === updatedLayer.uuid ? updatedLayer : l
			);
			const newIndex = new Map(index);
			newIndex.set(updatedLayer.uuid, updatedLayer);

			return {
				mapConfigs: {
					...state.mapConfigs,
					[mapConfigKey]: { ...mapConfig, layers: newLayers, _layerIndex: newIndex },
				},
			};
		}),

	removeLayerFromMapConfig: (mapConfigKey, layerUuid) =>
		set((state) => {
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (!mapConfig) return state;
			const index = getIndex(mapConfig);
			if (!index.has(layerUuid)) return state;

			const newLayers = mapConfig.layers.filter((el) => el.uuid !== layerUuid);
			const newIndex = new Map(index);
			newIndex.delete(layerUuid);

			// Structural-sharing removal from layerOrder (no JSON.parse/stringify)
			const { result: newLayerOrder } = removeFromLayerOrder(mapConfig.layerOrder, layerUuid);

			return {
				mapConfigs: {
					...state.mapConfigs,
					[mapConfigKey]: {
						...mapConfig,
						layers: newLayers,
						layerOrder: newLayerOrder,
						_layerIndex: newIndex,
					},
				},
			};
		}),

	updateLayerOrder: (mapConfigKey, newOrder) =>
		set((state) => {
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (!mapConfig) return state;
			return {
				mapConfigs: {
					...state.mapConfigs,
					[mapConfigKey]: { ...mapConfig, layerOrder: newOrder },
				},
			};
		}),

	setMasterVisible: (mapConfigKey, layerId, masterVisible) =>
		set((state) => {
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (!mapConfig) return state;

			const index = getIndex(mapConfig);
			const layerConfig = index.get(layerId);
			if (!layerConfig) return state;

			const newIndex = new Map(index);
			const updatedLayers = [...mapConfig.layers];

			// Helper: update a single layer at its index
			const updateLayerAt = (uuid: string, updater: (l: LayerConfig) => LayerConfig) => {
				const idx = updatedLayers.findIndex((l) => l.uuid === uuid);
				if (idx === -1) return;
				const updated = updater(updatedLayers[idx]);
				updatedLayers[idx] = updated;
				newIndex.set(uuid, updated);
			};

			// Recursively find a LayerOrderItem by uuid anywhere in the tree
			const findOrderItem = (
				items: LayerOrderItem[],
				uuid: string
			): LayerOrderItem | undefined => {
				for (const item of items) {
					if (item.uuid === uuid) return item;
					if (item.layers) {
						const found = findOrderItem(item.layers, uuid);
						if (found) return found;
					}
				}
				return undefined;
			};

			// Recursively propagate masterVisible to all descendants
			const propagateToChildren = (orderItems: LayerOrderItem[]) => {
				for (const child of orderItems) {
					const childLayer = index.get(child.uuid);
					if (!childLayer) continue;

					if (childLayer.type === 'folder') {
						// Mark the sub-folder itself, then recurse into its children
						updateLayerAt(child.uuid, (l) => ({ ...l, masterVisible }));
						if (child.layers) {
							propagateToChildren(child.layers);
						}
					} else if (childLayer.type === 'vt' && childLayer.config?.layers) {
						updateLayerAt(child.uuid, (l) => {
							const vt = l as VtLayerConfig;
							return {
								...vt,
								masterVisible,
								config: {
									...vt.config,
									layers: vt.config.layers.map((sl) => ({
										...sl,
										masterVisible,
									})),
								},
							} as VtLayerConfig;
						});
					} else {
						updateLayerAt(child.uuid, (l) => ({ ...l, masterVisible }));
					}
				}
			};

			if (layerConfig.type === 'folder') {
				const folderOrder = findOrderItem(mapConfig.layerOrder, layerId);
				if (folderOrder?.layers) {
					propagateToChildren(folderOrder.layers);
				}
			}

			if (layerConfig.type === 'vt' && layerConfig.config?.layers) {
				updateLayerAt(layerId, (l) => {
					const vt = l as VtLayerConfig;
					return {
						...vt,
						config: {
							...vt.config,
							layers: vt.config.layers.map((sl) => ({
								...sl,
								masterVisible,
							})),
						},
					} as VtLayerConfig;
				});
			}

			return {
				mapConfigs: {
					...state.mapConfigs,
					[mapConfigKey]: { ...mapConfig, layers: updatedLayers, _layerIndex: newIndex },
				},
			};
		}),
	updateStyle: (mapConfigKey, style) =>
		set((state) => {
			if (!style?.layers) return state;

			// Initialise a minimal mapConfig if none exists yet
			const mapConfig: MapConfig = state.mapConfigs[mapConfigKey] ?? {
				name: mapConfigKey,
				mapProps: { center: [0, 0], zoom: 1 },
				layers: [],
				layerOrder: [],
			};

			const backgroundLayers: LayerSpecification[] = [];
			const symbolLayers: LayerSpecification[] = [];

			style.layers.forEach((layer: LayerSpecification, idx: number) => {
				if (layer.type === 'symbol') {
					symbolLayers.push(layer);
				} else {
					// Give the first non-symbol layer a stable id derived from the style name
					const l = idx === 0 ? { ...layer, id: style.name || 'background' } : layer;
					backgroundLayers.push(l);
				}
			});

			// --- Stable UUIDs for the style folders / VT entries ---
			const bgFolderUuid = '__style-background-folder__';
			const bgVtUuid = '__style-background-vt__';
			const labelsFolderUuid = '__style-labels-folder__';
			const labelsVtUuid = '__style-labels-vt__';

			// Remove any previous style layer entries from layers array
			const styleUuids = new Set([bgFolderUuid, bgVtUuid, labelsFolderUuid, labelsVtUuid]);
			const userLayers = mapConfig.layers.filter((l) => !styleUuids.has(l.uuid));
			const userLayerOrder = mapConfig.layerOrder.filter((o) => !styleUuids.has(o.uuid));

			// Build new layer configs for the style entries
			const newLayers: LayerConfig[] = [...userLayers];
			const newLayerOrder: LayerOrderItem[] = [];

			// Labels folder + VT (top of tree = top of map)
			if (symbolLayers.length > 0) {
				newLayers.push(
					{ type: 'folder', uuid: labelsFolderUuid, name: 'Labels', visible: true },
					{
						type: 'vt',
						uuid: labelsVtUuid,
						name: style.name ? `${style.name} Labels` : 'Style Labels',
						visible: true,
						config: { layers: symbolLayers as MlVectorTileLayerProps['layers'] },
					} as VtLayerConfig,
				);
				newLayerOrder.push({
					uuid: labelsFolderUuid,
					layers: [{ uuid: labelsVtUuid }],
				});
			}

			// User layers in the middle
			newLayerOrder.push(...userLayerOrder);

			// Background folder + VT (bottom of tree = bottom of map)
			if (backgroundLayers.length > 0) {
				newLayers.push(
					{ type: 'folder', uuid: bgFolderUuid, name: 'Background', visible: true },
					{
						type: 'vt',
						uuid: bgVtUuid,
						name: style.name ? `${style.name} Background` : 'Style Background',
						visible: true,
						config: { layers: backgroundLayers as MlVectorTileLayerProps['layers'] },
					} as VtLayerConfig,
				);
				newLayerOrder.push({
					uuid: bgFolderUuid,
					layers: [{ uuid: bgVtUuid }],
				});
			}

			return {
				mapConfigs: {
					...state.mapConfigs,
					[mapConfigKey]: {
						...mapConfig,
						layers: newLayers,
						layerOrder: newLayerOrder,
						backgroundLayers,
						symbolLayers,
						styleSources: style.sources as { [key: string]: SourceSpecification } | undefined,
						styleSprite: style.sprite,
						styleGlyphs: style.glyphs,
						_layerIndex: buildLayerIndex(newLayers),
					},
				},
			};
		}),
}));

// --- Selector hooks ---

/**
 * Get the layerOrder array for a specific mapConfig key.
 */
export function useLayerOrder(mapConfigKey: string): LayerOrderItem[] | undefined {
	return useMapStore((state) => state.mapConfigs[mapConfigKey]?.layerOrder);
}

/**
 * Get the layers array for a specific mapConfig key.
 */
export function useLayers(mapConfigKey: string): LayerConfig[] | undefined {
	return useMapStore((state) => state.mapConfigs[mapConfigKey]?.layers);
}

/**
 * Get a single layer by uuid within a specific mapConfig.
 * O(1) lookup via the internal index. Only re-renders when that specific layer object changes.
 */
export function useLayerByUuid(mapConfigKey: string, uuid: string): LayerConfig | undefined {
	return useMapStore((state) => state.mapConfigs[mapConfigKey]?._layerIndex?.get(uuid));
}

/**
 * Get the full MapConfig for a specific key.
 */
export function useMapConfig(mapConfigKey: string): MapConfig | undefined {
	return useMapStore((state) => state.mapConfigs[mapConfigKey]);
}

/**
 * Get flattened uuid list from layerOrder for a specific mapConfig key.
 * Uses shallow comparison to avoid unnecessary re-renders.
 */
export function useLayerStoreOrderIds(mapConfigKey: string): string[] {
	return useMapStore(
		useShallow((state) => {
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (!mapConfig) return [];
			return extractUuidsFromItems(mapConfig.layerOrder);
		})
	);
}

// --- Standalone selectors (non-hook, for use outside React) ---

/**
 * Find a layer by uuid across all mapConfigs. O(1) per mapConfig via index.
 */
export const getLayerByUuid = (state: MapState, uuid: string): LayerConfig | null => {
	for (const key in state.mapConfigs) {
		const found = state.mapConfigs[key]._layerIndex?.get(uuid);
		if (found) return found;
	}
	return null;
};

/**
 * Extract uuids from layerOrder for a mapConfig key (non-hook version).
 */
export const extractUuidsFromLayerOrder = (state: MapState, mapConfigKey: string): string[] => {
	const mapConfig = state.mapConfigs[mapConfigKey];
	if (!mapConfig) return [];
	return extractUuidsFromItems(mapConfig.layerOrder);
};

// --- Convenience action accessors (can be called outside React components) ---

export const setMapConfig = (key: string, mapConfig: MapConfig) =>
	useMapStore.getState().setMapConfig(key, mapConfig);

export const removeMapConfig = (key: string) => useMapStore.getState().removeMapConfig(key);

export const setLayerInMapConfig = (mapConfigKey: string, layer: LayerConfig) =>
	useMapStore.getState().setLayerInMapConfig(mapConfigKey, layer);

export const removeLayerFromMapConfig = (mapConfigKey: string, layerUuid: string) =>
	useMapStore.getState().removeLayerFromMapConfig(mapConfigKey, layerUuid);

export const updateLayerOrder = (mapConfigKey: string, newOrder: LayerOrderItem[]) =>
	useMapStore.getState().updateLayerOrder(mapConfigKey, newOrder);

export const setMasterVisible = (mapConfigKey: string, layerId: string, masterVisible: boolean) =>
	useMapStore.getState().setMasterVisible(mapConfigKey, layerId, masterVisible);

export const updateStyle = (mapConfigKey: string, style: StyleSpecification) =>
	useMapStore.getState().updateStyle(mapConfigKey, style);

export const clearMapConfigs = () => useMapStore.setState({ mapConfigs: {} });

/** Exposed for use in LayerTreeListItem move operations (structural sharing, no JSON clone) */
export const moveInLayerOrderHelper = moveInLayerOrder;

export default useMapStore;
