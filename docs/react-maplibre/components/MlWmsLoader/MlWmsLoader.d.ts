import { default as React } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { useWmsProps, useWmsReturnType } from '../../hooks/useWms';
export interface WmsConfig {
    /**
     * The URL to use for the getFeatureInfo request
     */
    getFeatureInfoUrl: useWmsReturnType['getFeatureInfoUrl'];
    /**
     * The URL of the WMS service
     */
    wmsUrl: useWmsReturnType['wmsUrl'];
    /**
     * The layers to display on the map
     */
    layers: LayerType[];
    /**
     * If true, the WMS layer is visible
     */
    visible: boolean;
    /**
     * If true, the WMS layer is open
     */
    open: boolean;
    /**
     * The name of the WMS layer
     */
    name?: string;
}
export interface MlWmsLoaderProps {
    /**
     * WMS URL
     */
    url?: string;
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    layerId?: string;
    insertBeforeLayer?: string;
    /**
     * URL parameters that will be used in the getCapabilities request
     */
    urlParameters?: useWmsProps['urlParameters'];
    /**
     * URL parameters that will be added when requesting WMS capabilities
     */
    wmsUrlParameters?: {
        [key: string]: string;
    };
    /**
     * If true, zooms to the extent of the WMS layer after loading the getCapabilities response
     */
    zoomToExtent?: boolean;
    /**
     * The name of the ListItem element representing the WmsLoader
     */
    name?: string;
    /**
     * If true, enables the feature info functionality
     */
    featureInfoEnabled?: boolean;
    /**
     * If true, the feature info functionality is active
     */
    featureInfoActive?: boolean;
    /**
     * A function to set the feature info active state
     */
    setFeatureInfoActive?: (val: boolean | ((current: boolean) => boolean)) => void;
    /**
     * Callback function that is called after the featureInfoRequest has succeeded
     */
    featureInfoSuccess?: (content: string, lngLat: {
        lng: number;
        lat: number;
    }) => void;
    /**
     * If true, displays a marker at the feature info location
     */
    featureInfoMarkerEnabled?: boolean;
    /**
     * The WMS configuration object
     */
    config?: WmsConfig;
    /**
     * A function to handle changes to the WMS configuration
     */
    onConfigChange?: (config: WmsConfig | false) => void;
    /**
     * A function to update a LayerType config array that is passed to this component at props.config.layers
     */
    setLayers?: (layers: LayerType[]) => void;
    /**
     * If true, shows the delete button for the WMSLoader
     */
    showDeleteButton?: boolean;
    /**
     * Custom buttons to display for the WMSLoader
     */
    buttons?: React.JSX.Element;
    sortable?: boolean;
    /**
     * Array of layer Names (IDs) that should be visible at start. If not provided, default visibility logic applies.
     */
    visibleLayersAtStart?: string[];
    /**
     * If true, renders the layer list UI. If false, only the WMS layer is rendered without UI controls.
     */
    showLayerList?: boolean;
}
export interface WmsLayer {
    Name?: string;
    Title?: string;
    Abstract?: string;
    KeywordList?: string[];
    CRS?: string | string[];
    SRS?: string | string[];
    EX_GeographicBoundingBox?: number[];
    LatLonBoundingBox?: number[];
    BoundingBox?: any[];
    Dimension?: any;
    Attribution?: {
        Title: string;
        OnlineResource?: string;
        LogoURL?: any;
    };
    AuthorityURL?: any[];
    Identifier?: any[];
    MetadataURL?: any[];
    DataURL?: any[];
    FeatureListURL?: any[];
    Style?: any[];
    MinScaleDenominator?: number;
    MaxScaleDenominator?: number;
    Layer?: WmsLayer[];
    queryable?: boolean;
    opaque?: boolean;
    noSubsets?: boolean;
    fixedWidth?: number;
    fixedHeight?: number;
}
export type LayerType = {
    visible: boolean;
    Name: string;
    Attribution?: {
        Title: string;
    };
} & Omit<WmsLayer, 'Layer' | 'CRS'> & Partial<Pick<WmsLayer, 'Layer'>>;
/**
 * Loads a WMS getCapabilities xml document and adds a MlWmsLayer component for each layer that is
 * offered by the WMS.
 *
 * @component
 */
declare const MlWmsLoader: (props: MlWmsLoaderProps) => import("react/jsx-runtime").JSX.Element;
export default MlWmsLoader;
//# sourceMappingURL=MlWmsLoader.d.ts.map