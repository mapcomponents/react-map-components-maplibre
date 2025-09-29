import { default as React } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { useWmsProps, useWmsReturnType } from '../../hooks/useWms';
import { Layer2 } from 'wms-capabilities';
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
    url: string;
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
}
export type LayerType = {
    visible: boolean;
    Name: string;
    Attribution?: {
        Title: string;
    };
} & Omit<Layer2, 'Layer' | 'CRS'> & Partial<Pick<Layer2, 'Layer'>>;
/**
 * Loads a WMS getCapabilities xml document and adds a MlWmsLayer component for each layer that is
 * offered by the WMS.
 *
 * @component
 */
declare const MlWmsLoader: {
    (props: MlWmsLoaderProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        mapId: undefined;
        url: string;
        urlParameters: {
            SERVICE: string;
            VERSION: string;
            REQUEST: string;
        };
        wmsUrlParameters: {
            TRANSPARENT: string;
        };
        featureInfoEnabled: boolean;
        zoomToExtent: boolean;
        showDeleteButton: boolean;
    };
};
export default MlWmsLoader;
//# sourceMappingURL=MlWmsLoader.d.ts.map