/// <reference types="react" />
import PropTypes from 'prop-types';
import { RasterLayerSpecification, RasterSourceSpecification } from 'maplibre-gl';
interface MlWmsLayerProps {
    urlParameters?: {
        [key: string]: string;
    };
    url: string;
    visible?: boolean;
    attribution?: string;
    mapId?: string;
    sourceOptions?: RasterSourceSpecification;
    layerOptions?: RasterLayerSpecification;
    insertBeforeLayer?: string;
    layerId?: string;
}
/**
 * Adds a WMS raster source & layer to the maplibre-gl instance
 *
 * @param {object} props
 * @param {object} props.urlParameters URL query parameters that will be added to the WMS URL. A layers property (string) is mandatory. Any value defined on this attribute will extend the default object
 * @param {string} props.url WMS URL
 * @param {bool}	 props.visible Sets layer "visibility" property to "visible" if true or "none" if false
 * @param {string} props.attribution MapLibre attribution shown in the bottom right of the map, if this layer is visible
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 * @param {object} props.sourceOptions Object that is passed to the MapLibre.addSource call as config option parameter
 * @param {object} props.layerOptions Object that is passed to the MapLibre.addLayer call as config option parameter
 * @param {string} props.insertBeforeLayer Id of an existing layer in the mapLibre instance to help specify the layer order
                                                                                     This layer will be visually beneath the layer with the "insertBeforeLayer" id
 *
 * @component
 */
declare const MlWmsLayer: {
    (props: MlWmsLayerProps): JSX.Element;
    defaultProps: {
        visible: boolean;
        urlParameters: {
            bbox: string;
            format: string;
            service: string;
            version: string;
            request: string;
            srs: string;
            width: number;
            height: number;
            styles: string;
        };
        attribution: string;
        sourceOptions: {
            minZoom: number;
            maxZoom: number;
        };
        layerOptions: {
            minZoom: number;
            maxZoom: number;
        };
    };
    propTypes: {
        /**
         * WMS URL
         */
        url: PropTypes.Validator<string>;
        /**
         * URL query parameters that will be added to the WMS URL. A layers property (string) is mandatory. Any value defined on this attribute will extend the default object.
         */
        urlParameters: PropTypes.Requireable<PropTypes.InferProps<{
            layers: PropTypes.Validator<string>;
            bbox: PropTypes.Requireable<string>;
            format: PropTypes.Requireable<string>;
            service: PropTypes.Requireable<string>;
            version: PropTypes.Requireable<string>;
            request: PropTypes.Requireable<string>;
            srs: PropTypes.Requireable<string>;
            width: PropTypes.Requireable<number>;
            height: PropTypes.Requireable<number>;
        }>>;
        /**
         * Id of the target MapLibre instance in mapContext
         */
        mapId: PropTypes.Requireable<string>;
        /**
         * MapLibre attribution shown in the bottom right of the map, if this layer is visible
         */
        attribution: PropTypes.Requireable<string>;
        /**
         * Object that is passed to the MapLibre.addLayer call as config option parameter
         */
        layerOptions: PropTypes.Requireable<object>;
        /**
         * Object that is passed to the MapLibre.addSource call as config option parameter
         */
        sourceOptions: PropTypes.Requireable<object>;
        /**
         * Id of an existing layer in the mapLibre instance to help specify the layer order
         * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
         */
        insertBeforeLayer: PropTypes.Requireable<string>;
        /**
         * Sets layer "visibility" property to "visible" if true or "none" if false
         */
        visible: PropTypes.Requireable<boolean>;
    };
};
export default MlWmsLayer;
