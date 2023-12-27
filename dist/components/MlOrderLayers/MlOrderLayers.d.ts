/// <reference types="react" />
export interface MlOrderLayersProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    layerIds: string[];
    insertBeforeLayer?: string;
}
/**
 * Creates an invisible layer for each entry in props.layerIds with the id `order-{entry}` and a reliable order
 *
 */
declare const MlOrderLayers: {
    (props: MlOrderLayersProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
        insertBeforeLayer: undefined;
    };
};
export default MlOrderLayers;
