import { MlGeoJsonLayerProps } from 'src/components/MlGeoJsonLayer/MlGeoJsonLayer';
import { MlVectorTileLayerProps } from 'src/components/MlVectorTileLayer/MlVectorTileLayer';
import { Layer } from 'wms-capabilities';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

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
	config: wmsConfig;
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

interface MapProps {
	center: [number, number];
	zoom: number;
}

export interface LayerOrderItem {
	uuid: string;
	layers?: LayerOrderItem[];
}

interface MapConfig {
	uuid: string;
	name: string;
	mapProps: MapProps;
	layers: { [uuid: string]: LayerConfig };
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
const mapConfigSlice = createSlice({
	name: 'mapConfig',
	initialState,
	reducers: {
		// Add or update a MapConfig
		setMapConfig: (state, action: PayloadAction<{ key: string; mapConfig: MapConfig }>) => {
			const mapConfig = action.payload.mapConfig;
			const key = action.payload.key;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			state.mapConfigs[key] = mapConfig;
		},
		// Remove a MapConfig by its uuid
		removeMapConfig: (state, action: PayloadAction<{ key: string }>) => {
			delete state.mapConfigs[action.payload.key];
		},
		// Add or update a layer within a MapConfig
		setLayerInMapConfig: (
			state,
			action: PayloadAction<{
				mapConfigKey: string;
				layer: LayerConfig;
			}>
		) => {
			const { mapConfigKey, layer: updatedLayer } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (mapConfig) {
				const layerKeys = Object.keys(mapConfig.layers);
				for (const key of layerKeys) {
					const layer = mapConfig.layers[key];
					if (layer.uuid === updatedLayer.uuid) {
						mapConfig.layers[key] = updatedLayer;
						break;
					}
				}
			}
		},
		// Remove a layer from a MapConfig
		removeLayerFromMapConfig: (
			state,
			action: PayloadAction<{
				mapConfigKey: string;
				layerUuid: string;
			}>
		) => {
			const { mapConfigKey, layerUuid } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (mapConfig && mapConfig.layers[layerUuid]) {
				delete mapConfig.layers[layerUuid];
				processLayerOrderItems(function (_, parent?: LayerOrderItem): void {
					if (parent && parent.layers) {
						parent.layers = parent.layers.filter((child) => child.uuid !== layerUuid);
					}
				}, mapConfig.layerOrder);
			}
		},
		updateLayerOrder: (
			state,
			action: PayloadAction<{ mapConfigKey: string; newOrder: LayerOrderItem[] }>
		) => {
			const { mapConfigKey, newOrder } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigKey];
			if (mapConfig) {
				mapConfig.layerOrder = newOrder;
			}
		},
		setMasterVisible(
			state,
			action: PayloadAction<{ mapConfigKey: string; layerId: string; masterVisible: boolean }>
		) {
			const { mapConfigKey, layerId, masterVisible } = action.payload;

			const mapConfig = state.mapConfigs[mapConfigKey];

			if (mapConfig && mapConfig.layers[layerId]?.type === 'folder') {
				const updatedLayers = { ...mapConfig.layers };
				updatedLayers[layerId] = {
					...updatedLayers[layerId],
					masterVisible,
				};
				mapConfig.layerOrder.forEach((folder) => {
					if (folder.uuid === layerId) {
						folder.layers?.forEach((child) => {
							updatedLayers[child.uuid] = {
								...updatedLayers[child.uuid],
								masterVisible,
							};
						});
					}
				});
				state.mapConfigs[mapConfigKey].layers = updatedLayers;
			}
		},
	},
});
export const getLayerByUuid = (state: MapState, uuid: string): LayerConfig | null => {
	const mapConfigs = state.mapConfigs;

	for (const key in mapConfigs) {
		const mapConfig = mapConfigs[key];
		const foundLayer = mapConfig.layers[uuid];
		if (foundLayer) return foundLayer;
	}
	return null;
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
