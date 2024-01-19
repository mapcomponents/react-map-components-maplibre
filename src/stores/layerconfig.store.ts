import { MlGeoJsonLayerProps } from 'src/components/MlGeoJsonLayer/MlGeoJsonLayer';
import { MlVectorTileLayerProps } from 'src/components/MlVectorTileLayer/MlVectorTileLayer';
import { Layer } from 'wms-capabilities';
import { configureStore } from '@reduxjs/toolkit';

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
};

export type LayerConfig = WmsLayerConfig | GeojsonLayerConfig | VtLayerConfig | FolderLayerConfig;

interface MapConfig {
	name: string;
	layers: LayerConfig[];
	center: [number, number];
	zoom: number;
}

export type AppState = {
	mapConfigs: { [key: string]: MapConfig };
};

// Action types
const ADD_MAP_CONFIG = 'ADD_MAP_CONFIG';
const UPDATE_LAYER_CONFIG = 'UPDATE_LAYER_CONFIG';
const ADD_LAYER = 'ADD_LAYER';

// Action creators
function addMapConfig(name: string, initialConfig?: MapConfig) {
	const defaultInstance: MapConfig = {
		name,
		layers: [],
		center: [0, 0],
		zoom: 1,
		...initialConfig,
	};
	return { type: ADD_MAP_CONFIG, payload: { key: name, instance: defaultInstance } };
}

function updateLayerConfig(instanceKey: string, layerUuid: string, newConfig: LayerConfig) {
	return { type: UPDATE_LAYER_CONFIG, payload: { instanceKey, layerUuid, newConfig } };
}

function addLayer(instanceKey: string, newLayer: LayerConfig) {
	return { type: ADD_LAYER, payload: { instanceKey, newLayer } };
}

// Helper function update LayerConfig
function updateLayerConfigRecursive(
	layers: LayerConfig[],
	layerUuid: string,
	newConfig: LayerConfig
): LayerConfig[] {
	return layers.map((layer) => {
		if (layer.uuid === layerUuid) {
			return { ...layer, ...newConfig };
		} else if (layer.type === 'folder' && layer.layers) {
			return { ...layer, layers: updateLayerConfigRecursive(layer.layers, layerUuid, newConfig) };
		}
		return layer;
	});
}

interface AddMapInstanceAction {
	type: typeof ADD_MAP_CONFIG;
	payload: { key: string; instance: MapConfig };
}

interface UpdateLayerConfigAction {
	type: typeof UPDATE_LAYER_CONFIG;
	payload: { instanceKey: string; layerUuid: string; newConfig: LayerConfig };
}

interface AddLayerAction {
	type: typeof ADD_LAYER;
	payload: { instanceKey: string; newLayer: LayerConfig };
}

type MapActionTypes = AddMapInstanceAction | UpdateLayerConfigAction | AddLayerAction;

// Reducer
function rootReducer(state: AppState = { mapConfigs: {} }, action: MapActionTypes) {
	switch (action.type) {
		case ADD_MAP_CONFIG:
			return {
				...state,
				mapConfigs: {
					...state.mapConfigs,
					[action.payload.key]: action.payload.instance,
				},
			};
		case UPDATE_LAYER_CONFIG: {
			const { instanceKey, layerUuid, newConfig } = action.payload;
			const instance = state.mapConfigs[instanceKey];
			if (!instance) {
				return state;
			}

			const updatedLayers = updateLayerConfigRecursive(instance.layers, layerUuid, newConfig);

			return {
				...state,
				mapConfigs: {
					...state.mapConfigs,
					[instanceKey]: { ...instance, layers: updatedLayers },
				},
			};
		}
		case ADD_LAYER: {
			const { instanceKey: addKey, newLayer } = action.payload;
			const addInstance = state.mapConfigs[addKey];
			if (!addInstance) {
				return state;
			}
			return {
				...state,
				mapConfigs: {
					...state.mapConfigs,
					[addKey]: {
						...addInstance,
						layers: [...addInstance.layers, newLayer],
					},
				},
			};
		}
		default:
			return state;
	}
}
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export { addMapConfig, updateLayerConfig, addLayer, store };
