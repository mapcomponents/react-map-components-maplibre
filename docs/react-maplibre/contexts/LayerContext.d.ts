import { StyleSpecification } from 'maplibre-gl';
import { default as React } from '../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { MlVectorTileLayerProps } from '../components/MlVectorTileLayer/MlVectorTileLayer';
import { MlGeoJsonLayerProps } from '../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { Layer } from 'wms-capabilities';
export interface LayerContextProps {
    children: React.ReactNode;
}
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
    name?: string;
    id?: string;
    config: wmsConfig;
};
export type GeojsonLayerConfig = {
    type: 'geojson';
    name?: string;
    id?: string;
    config: MlGeoJsonLayerProps;
};
export type VtLayerConfig = {
    type: 'vt';
    name?: string;
    id?: string;
    config: MlVectorTileLayerProps;
};
export type LayerConfig = WmsLayerConfig | GeojsonLayerConfig | VtLayerConfig;
export interface LayerContextType {
    layers: LayerConfig[];
    setLayers: (layers: LayerConfig[] | ((layers: LayerConfig[]) => LayerConfig[])) => void;
    backgroundLayers: MlVectorTileLayerProps['layers'];
    setBackgroundLayers: (layers: MlVectorTileLayerProps['layers'] | ((layers: MlVectorTileLayerProps['layers']) => MlVectorTileLayerProps['layers'])) => void;
    symbolLayers: MlVectorTileLayerProps['layers'];
    setSymbolLayers: (layers: MlVectorTileLayerProps['layers'] | ((layers: MlVectorTileLayerProps['layers']) => MlVectorTileLayerProps['layers'])) => void;
    updateStyle: (style: StyleSpecification) => void;
    vtLayerConfig: Partial<MlVectorTileLayerProps>;
    setTileUrl: (url: string) => void;
    tileUrl: string;
    moveUp: (layerId: string) => void;
    moveDown: (layerId: string) => void;
    moveLayer: (layerId: string, getNewPos: (oldPos: number) => number) => void;
}
declare const LayerContext: React.Context<LayerContextType>;
declare function LayerContextProvider(props: LayerContextProps): import("react/jsx-runtime").JSX.Element;
export default LayerContext;
export { LayerContextProvider };
//# sourceMappingURL=LayerContext.d.ts.map