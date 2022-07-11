interface MlCreatePdfButtonProps {
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
 * Renders a button that will create a PDF version of the current map view (dimensions adjusted to fit Din A4 Paper).
 */
declare const MlCreatePdfButton: {
    (props: MlCreatePdfButtonProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
    };
};
export default MlCreatePdfButton;
