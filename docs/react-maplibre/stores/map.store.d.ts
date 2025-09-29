import { Layer } from 'wms-capabilities';
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
}
export type MapState = {
    mapConfigs: {
        [key: string]: MapConfig;
    };
};
export type RootState = {
    mapConfig: MapState;
};
export declare const initialState: MapState;
export declare const getLayerByUuid: (state: MapState, uuid: string) => LayerConfig | null;
export declare const extractUuidsFromLayerOrder: (state: RootState, mapConfigKey: string) => string[];
declare const store: import('@reduxjs/toolkit').EnhancedStore<{
    mapConfig: MapState;
}, import('redux').UnknownAction, import('@reduxjs/toolkit').Tuple<[import('redux').StoreEnhancer<{
    dispatch: import('redux-thunk').ThunkDispatch<{
        mapConfig: MapState;
    }, undefined, import('redux').UnknownAction>;
}>, import('redux').StoreEnhancer]>>;
export declare const setMapConfig: import('@reduxjs/toolkit').ActionCreatorWithPayload<{
    key: string;
    mapConfig: MapConfig;
}, "mapConfig/setMapConfig">, removeMapConfig: import('@reduxjs/toolkit').ActionCreatorWithPayload<{
    key: string;
}, "mapConfig/removeMapConfig">, setLayerInMapConfig: import('@reduxjs/toolkit').ActionCreatorWithPayload<{
    mapConfigKey: string;
    layer: LayerConfig;
}, "mapConfig/setLayerInMapConfig">, removeLayerFromMapConfig: import('@reduxjs/toolkit').ActionCreatorWithPayload<{
    mapConfigKey: string;
    layerUuid: string;
}, "mapConfig/removeLayerFromMapConfig">, updateLayerOrder: import('@reduxjs/toolkit').ActionCreatorWithPayload<{
    mapConfigKey: string;
    newOrder: LayerOrderItem[];
}, "mapConfig/updateLayerOrder">, setMasterVisible: import('@reduxjs/toolkit').ActionCreatorWithPayload<{
    mapConfigKey: string;
    layerId: string;
    masterVisible: boolean;
}, "mapConfig/setMasterVisible">;
export default store;
//# sourceMappingURL=map.store.d.ts.map