import { MlGeoJsonLayerProps } from 'src/components/MlGeoJsonLayer/MlGeoJsonLayer';
import { MlVectorTileLayerProps } from 'src/components/MlVectorTileLayer/MlVectorTileLayer';
import { Layer } from 'wms-capabilities';
import { configureStore, createSlice } from '@reduxjs/toolkit';

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
	layers: { [uuid: string]: LayerConfig };
	mapState: MapState;
}

export type AppState = {
	layers: { [key: string]: LayerConfig };
	mapConfigs: { [key: string]: MapConfig };
};

const layersSlice = createSlice({
  name: 'layers',
  initialState: {} as { [key: string]: LayerConfig },
  reducers: {
    addOrUpdateLayer(state, action) {
      const { uuid } = action.payload;
      state[uuid] = action.payload;
    },
    removeLayer(state, action) {
      delete state[action.payload];
    },
  },
});

// Map Config Slice
const mapConfigsSlice = createSlice({
  name: 'mapConfigs',
  initialState: {} as { [key: string]: MapConfig },
  reducers: {
    addOrUpdateMapConfig(state, action) {
      const { uuid } = action.payload;
      // Update the entire MapConfig object, including layers and mapState
      state[uuid] = action.payload;
    },
    removeMapConfig(state, action) {
      delete state[action.payload];
    },
    addOrUpdateLayerInMapConfig(state, action) {
      const { mapConfigUuid, layerConfig } = action.payload;
      const mapConfig = state[mapConfigUuid];
      if (mapConfig) {
        mapConfig.layers[layerConfig.uuid] = layerConfig;
      }
    },
    removeLayerFromMapConfig(state, action) {
      const { mapConfigUuid, layerUuid } = action.payload;
      const mapConfig = state[mapConfigUuid];
      if (mapConfig && mapConfig.layers[layerUuid]) {
        delete mapConfig.layers[layerUuid];
      }
    }
  },
});

const store = configureStore({
  reducer: {
    layers: layersSlice.reducer,
    mapConfigs: mapConfigsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const {
  addOrUpdateLayer,
  removeLayer
} = layersSlice.actions;

export const {
  addOrUpdateMapConfig,
  removeMapConfig,
  addOrUpdateLayerInMapConfig,
  removeLayerFromMapConfig
} = mapConfigsSlice.actions;

export { store };
