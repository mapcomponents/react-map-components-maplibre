/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MlGeoJsonLayerProps } from 'src/components/MlGeoJsonLayer/MlGeoJsonLayer';
import { MlVectorTileLayerProps } from 'src/components/MlVectorTileLayer/MlVectorTileLayer';
import { Layer } from 'wms-capabilities';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MlWmsLayerProps } from '../components/MlWmsLayer/MlWmsLayer';

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
	/*uuid: string;*/
	name: string;
	mapProps: MapProps;
	layers: LayerConfig[];
	layerOrder: LayerOrderItem[];
}

export type MapState = {
	mapConfigs: { [key: string]: MapConfig };
};

export type RootState = {
	mapConfig: MapState;
};

function processLayerOrderItems(
	action: (item: LayerOrderItem, parent?: LayerOrderItem) => void,
	items: LayerOrderItem[],
	parent?: LayerOrderItem
): void {
	items.forEach((item) => {
		action(item, parent);
		if (item.layers && item.layers.length > 0) {
			processLayerOrderItems(action, item.layers, item);
		}
	});
}

export const initialState: MapState = {
	mapConfigs: {},
};
//@ts-ignore
const mapConfigSlice = createSlice({
	name: 'mapConfig',
	initialState,
	reducers: {
		// Add or update a MapConfig
		setMapConfig: (state, action: PayloadAction<{ key: string; mapConfig: MapConfig }>) => {
			const mapConfig = action.payload.mapConfig;
			const key = action.payload.key;
			//@ts-ignore
			state.mapConfigs[key] = mapConfig;
		},
		// Remove a MapConfig by its uuid
		removeMapConfig: (state: MapState, action: PayloadAction<{ key: string }>) => {
			delete state.mapConfigs[action.payload.key];
		},
		// Add or update a layer within a MapConfig
		setLayerInMapConfig: (
			state: MapState,
			action: PayloadAction<{
				mapConfigKey: string;
				layer: LayerConfig;
			}>
		) => {
			const { mapConfigKey, layer: updatedLayer } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (mapConfig) {
				for (let i = 0; i < mapConfig.layers.length; i++) {
					if (mapConfig.layers[i].uuid === updatedLayer.uuid) {
						mapConfig.layers[i] = updatedLayer;
						break;
					}
				}
			}
		},
		// Remove a layer from a MapConfig
		removeLayerFromMapConfig: (
			state: MapState,
			action: PayloadAction<{
				mapConfigKey: string;
				layerUuid: string;
			}>
		) => {
			const { mapConfigKey, layerUuid } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigKey];

			if (mapConfig) {
				const targetLayerIndex = mapConfig.layers.findIndex((el) => el.uuid === layerUuid);
				if (targetLayerIndex !== -1) {
					delete mapConfig.layers[targetLayerIndex];
					processLayerOrderItems(function (_, parent?: LayerOrderItem): void {
						if (parent && parent.layers) {
							parent.layers = parent.layers.filter((child) => child.uuid !== layerUuid);
						}
					}, mapConfig.layerOrder);
				}
			}
		},
		updateLayerOrder: (
			state: MapState,
			action: PayloadAction<{ mapConfigKey: string; newOrder: LayerOrderItem[] }>
		) => {
			const { mapConfigKey, newOrder } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (mapConfig) {
				mapConfig.layerOrder = newOrder;
			}
		},
		// masterVisible property will be applied to all children of a folder that is set to be not visible
		// masterVisible will over rule the actual layer config if set to false
		// if masterVisible is true the actual layerConfig visibility setting is respected
		setMasterVisible(
			state: MapState,
			action: PayloadAction<{ mapConfigKey: string; layerId: string; masterVisible: boolean }>
		) {
			const { mapConfigKey, layerId, masterVisible } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (mapConfig) {
				const targetLayerIndex = mapConfig.layers.findIndex((el) => el.uuid === layerId);
				if (targetLayerIndex !== -1) {
					const layerConfig = mapConfig.layers[targetLayerIndex];
					if (layerConfig) {
						const updatedLayers = [...mapConfig.layers];
						if (layerConfig.type === 'folder') {
							mapConfig.layerOrder.forEach((folder) => {
								if (folder.uuid === layerId) {
									folder.layers?.forEach((childUuid) => {
										const childLayerIndex = mapConfig.layers.findIndex(
											(el) => el.uuid === childUuid.uuid
										);

										const childLayer = updatedLayers[childLayerIndex];

										updatedLayers[childLayerIndex] = {
											...childLayer,
											masterVisible,
										};
										if (childLayer?.type === 'vt' && childLayer?.config?.layers) {
											childLayer.config.layers = childLayer.config.layers.map((layer) => ({
												...layer,
												masterVisible,
											}));
										}
									});
								}
							});
						}
						if (layerConfig.type === 'vt' && layerConfig?.config?.layers) {
							layerConfig.config.layers = layerConfig.config.layers.map((layer) => ({
								...layer,
								masterVisible,
							}));
						}
						state.mapConfigs[mapConfigKey].layers = updatedLayers;
					}
				}
			}
		},
	},
});
export const getLayerByUuid = (state: MapState, uuid: string): LayerConfig | null => {
	const mapConfigs = state.mapConfigs;

	for (const key in mapConfigs) {
		const mapConfig = mapConfigs[key];
		const targetLayerIndex = mapConfig.layers.findIndex((el) => el.uuid === uuid);
		const foundLayer = mapConfig.layers[targetLayerIndex];
		if (foundLayer) return foundLayer;
	}
	return null;
};

export const extractUuidsFromLayerOrder = (state: RootState, mapConfigKey: string): string[] => {
	const mapConfig = state.mapConfig.mapConfigs[mapConfigKey];
	if (!mapConfig) {
		return [];
	}
	const layerOrder = mapConfig.layerOrder;
	const uuids: string[] = [];
	function extractUuids(items: LayerOrderItem[]): void {
		items.forEach((item) => {
			uuids.push(item.uuid);
			if (item.layers && item.layers.length > 0) {
				extractUuids(item.layers);
			}
		});
	}

	extractUuids(layerOrder);
	return uuids;
};

const store = configureStore({
	reducer: {
		mapConfig: mapConfigSlice.reducer,
	},
});

export const {
	setMapConfig,
	removeMapConfig,
	setLayerInMapConfig,
	removeLayerFromMapConfig,
	updateLayerOrder,
	setMasterVisible,
} = mapConfigSlice.actions;
export default store;
