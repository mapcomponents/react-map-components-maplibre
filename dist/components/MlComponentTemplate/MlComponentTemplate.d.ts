interface MlComponentTemplateProps {
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
 * Component template
 *
 */
declare const MlComponentTemplate: {
    (props: MlComponentTemplateProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
    };
};
export default MlComponentTemplate;
