import PropTypes from "prop-types";
interface MlVectorTileLayerProps {
    mapId?: string;
    insertBeforeLayer?: string;
    layerId?: string;
    sourceOptions?: any;
    url?: string;
    layers?: any;
}
/**
 * Adds a vector-tile source and 0...n vector-tile-layers to the MapLibre instance referenced by
 * props.mapId
 *
 * @component
 */
declare const MlVectorTileLayer: {
    (props: MlVectorTileLayerProps): JSX.Element;
    propTypes: {
        /**
         * Id of the target MapLibre instance in mapContext
         */
        mapId: PropTypes.Requireable<string>;
        /**
         * Options object that will be used as first parameter on the MapLibreGl.addSource call see MapLibre source options documentation.
         */
        sourceOptions: PropTypes.Requireable<object>;
        /**
         * Object that hold layers
         */
        layers: PropTypes.Requireable<object>;
        /**
         * String of the URL of a wms layer
         */
        url: PropTypes.Requireable<string>;
    };
};
export default MlVectorTileLayer;
