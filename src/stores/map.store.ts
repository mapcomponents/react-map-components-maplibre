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
};

export type GeojsonLayerConfig = {
	type: 'geojson';
	uuid: string;
	name?: string;
	id?: string;
	config: MlGeoJsonLayerProps;
};

export type VtLayerConfig = {
	type: 'vt';
	uuid: string;
	name?: string;
	id?: string;
	config: MlVectorTileLayerProps;
};

export type FolderLayerConfig = {
	type: 'folder';
	uuid: string;
	name?: string;
	id?: string;
	layers: LayerConfig[];
	config: undefined;
};

export type LayerConfig = WmsLayerConfig | GeojsonLayerConfig | VtLayerConfig | FolderLayerConfig;

interface MapProps {
	center: [number, number];
	zoom: number;
}

interface LayerOrderItem {
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

export const initialState: MapState = {
	mapConfigs: {},
};
const mapConfigSlice = createSlice({
	name: 'mapConfig',
	initialState,
	reducers: {
		// Add or update a MapConfig
		setMapConfig: (state, action: PayloadAction<MapConfig>) => {
			const mapConfig = action.payload;
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			state.mapConfigs[mapConfig.uuid] = mapConfig;
		},
		// Remove a MapConfig by its uuid
		removeMapConfig: (state, action: PayloadAction<{ uuid: string }>) => {
			delete state.mapConfigs[action.payload.uuid];
		},
		// Add or update a layer within a MapConfig
		setLayerInMapConfig: (
			state,
			action: PayloadAction<{
				mapConfigUuid: string;
				layer: LayerConfig;
			}>
		) => {
			const { mapConfigUuid, layer: updatedLayer } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigUuid];
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
				mapConfigUuid: string;
				layerUuid: string;
			}>
		) => {
			const { mapConfigUuid, layerUuid } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigUuid];
			if (mapConfig && mapConfig.layers[layerUuid]) {
				delete mapConfig.layers[layerUuid];
			}
		},
		updateLayerOrder: (
			state,
			action: PayloadAction<{ mapConfigUuid: string; newOrder: LayerOrderItem[] }>
		) => {
			const { mapConfigUuid, newOrder } = action.payload;
			const mapConfig = state.mapConfigs[mapConfigUuid];
			if (mapConfig) {
				mapConfig.layerOrder = newOrder;
			}
		},
	},
});
export const getLayerByUuid = (state: MapState, uuid: string): LayerConfig | null => {
	const mapConfigs = state.mapConfigs;
	for (const key in mapConfigs) {
		const mapConfig = mapConfigs[key];
		const layers = mapConfig.layers;
		for (const layerKey in layers) {
			const layer = layers[layerKey];
			if (layer.uuid === uuid) {
				return layer;
			}
		}
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
} = mapConfigSlice.actions;
export default store;
