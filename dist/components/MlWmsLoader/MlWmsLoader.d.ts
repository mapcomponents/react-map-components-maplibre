import { LngLat } from "maplibre-gl";
interface MlWmsLoaderProps {
    /**
     * WMS URL
     */
    url: string;
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId: string;
    /**
     * URL parameters that will be used in the getCapabilities request
     */
    urlParameters: object;
    /**
     * URL parameters that will be added when requesting WMS capabilities
     */
    wmsUrlParameters: object;
    /**
     * URL parameters that will be added when requesting tiles
     */
    layerUrlParameters: object;
    lngLat: LngLat;
    idPrefix: string;
}
/**
 * Loads a WMS getCapabilities xml document and adds a MlWmsLayer component for each layer that is
 * offered by the WMS.
 *
 * TODO: EaseTo the extend offered by the WMS in a zoom level that is supported
 *
 * @component
 */
declare const MlWmsLoader: {
    (props: MlWmsLoaderProps): JSX.Element;
    defaultProps: {
        url: string;
        urlParameters: {
            SERVICE: string;
            VERSION: string;
            REQUEST: string;
        };
        wmsUrlParameters: {
            TRANSPARENT: string;
        };
    };
};
export default MlWmsLoader;
