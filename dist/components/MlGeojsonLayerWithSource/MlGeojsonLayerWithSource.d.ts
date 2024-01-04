/// <reference types="react" />
export interface MlGeojsonLayerWithSourceProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order
     * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
     */
    insertBeforeLayer?: string;
}
/**
 * MlGeojsonLayerWithSource
 *
 */
declare const MlGeojsonLayerWithSource: {
    (props: MlGeojsonLayerWithSourceProps): JSX.Element;
    defaultProps: {
        mapId: string;
    };
};
export default MlGeojsonLayerWithSource;
