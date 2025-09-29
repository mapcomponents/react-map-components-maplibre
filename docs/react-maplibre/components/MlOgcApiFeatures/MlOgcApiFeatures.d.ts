import { MlGeoJsonLayerProps } from '../MlGeoJsonLayer/MlGeoJsonLayer';
export type MlOgcApiFeaturesProps = {
    visible?: boolean;
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * The url of OGC API
     */
    ogcApiUrl: URL;
    /**
     * The additional query parameters of OGC API
     */
    ogcApiFeatureParams?: OgcApiFeaturesParamsTypes;
    /**
     * Fetches the features everytime (based on the current bbox) when the map gets moved
     */
    reloadFeaturesOnMapMove?: boolean;
    /**
     * Geojson Layer props. But omit 'geojson' because it gets set from the OGC API Feature call
     */
    mlGeoJsonLayerProps?: Omit<MlGeoJsonLayerProps, 'geojson'>;
};
export type OgcApiFeaturesParamsTypes = {
    bbox?: string;
    bbox_crs?: string;
    limit?: number;
    offset?: number;
    crs?: string;
    datetime?: string;
    properties?: string;
    sortby?: string;
    f?: string;
    filter?: string;
    lang?: string;
    q?: string;
    properties_crs?: string;
    id?: string;
    filter_lang?: string;
    filter_crs?: string;
};
declare const MlOgcApiFeatures: (props: MlOgcApiFeaturesProps) => import("react/jsx-runtime").JSX.Element;
export default MlOgcApiFeatures;
//# sourceMappingURL=MlOgcApiFeatures.d.ts.map