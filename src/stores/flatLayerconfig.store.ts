import { MlGeoJsonLayerProps } from 'src/components/MlGeoJsonLayer/MlGeoJsonLayer';
import { MlVectorTileLayerProps } from 'src/components/MlVectorTileLayer/MlVectorTileLayer';
import { Layer } from 'wms-capabilities';
import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

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

export interface MapState {
	center: [number, number];
	zoom: number;
}

interface MapConfig {
	uuid: string;
	name: string;
	layerIds: string[];
	mapState: MapState;
}

export type AppState = {
	layers: { [uuid: string]: LayerConfig };
	mapConfigs: { [key: string]: MapConfig };
};

// Action types layers
const ADD_UPDATE_LAYER = 'ADD_UPDATE_LAYER';
const REMOVE_LAYER = 'REMOVE_LAYER';

// Action types for maps
const ADD_UPDATE_MAP_CONFIG = 'ADD_UPDATE_MAP_CONFIG';
const REMOVE_MAP_CONFIG = 'REMOVE_MAP_CONFIG';

// Action creators for layers
function addOrUpdateLayer(layerConfig: LayerConfig) {
	return { type: ADD_UPDATE_LAYER, payload: layerConfig };
}

function removeLayer(uuid: string) {
	return { type: REMOVE_LAYER, payload: uuid };
}

// Action creators for maps
function addOrUpdateMapConfig(mapConfig: MapConfig) {
	return { type: ADD_UPDATE_MAP_CONFIG, payload: mapConfig };
}

function removeMapConfig(key: string) {
	return { type: REMOVE_MAP_CONFIG, payload: key };
}

// Layer Types
interface AddUpdateLayerAction {
	type: typeof ADD_UPDATE_LAYER;
	payload: LayerConfig;
}

interface RemoveLayerAction {
	type: typeof REMOVE_LAYER;
	payload: string; // UUID of the layer to remove
}

type LayerActionTypes = AddUpdateLayerAction | RemoveLayerAction;

// Map Types
interface AddUpdateMapConfigAction  {
	type: typeof ADD_UPDATE_MAP_CONFIG;
	payload: MapConfig;
}

interface RemoveMapConfigAction {
	type: typeof REMOVE_MAP_CONFIG;
	payload: string; // MapConfig key
}

type MapActionTypes = AddUpdateMapConfigAction | RemoveMapConfigAction;

type AppActionTypes = LayerActionTypes | MapActionTypes;

// Reducer
// Reducers for layersState
function layersReducer(
	state: { [uuid: string]: LayerConfig } = {},
	action: LayerActionTypes
): { [uuid: string]: LayerConfig } {
	switch (action.type) {
		case ADD_UPDATE_LAYER: {
			const { uuid } = action.payload;
			return {
				...state,
				[uuid]: action.payload,
			};
		}
		case REMOVE_LAYER: {
			const { [action.payload]: _, ...newState } = state;
			return newState;
		}
		default:
			return state;
	}
}

// Reducers for mapsState
function mapsReducer(
	state: { [key: string]: MapConfig } = {},
	action: MapActionTypes
): { [key: string]: MapConfig } {
	switch (action.type) {
		case ADD_UPDATE_MAP_CONFIG:
			return {
				...state,
				[action.payload.uuid]: action.payload,
			};
		case REMOVE_MAP_CONFIG: {
			const newState = { ...state };
			delete newState[action.payload];
			return newState;
		}

		default:
			return state;
	}
}

// Root reducer
const rootReducer: Reducer<AppState, AppActionTypes> = combineReducers({
	layers: layersReducer,
	mapConfigs: mapsReducer,
});
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export { addOrUpdateLayer, removeLayer, addOrUpdateMapConfig, removeMapConfig, store };
