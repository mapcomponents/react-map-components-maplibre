interface MlCenterPositionProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order
     * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
     */
    insertBeforeLayer?: string;
    /**
     * Active button font color
     */
    onColor?: string;
    /**
     * Inactive button font color
     */
    offColor?: string;
    /**
     * CSS style object that is applied to the button component
     */
    style?: any;
}
/**
 * Component template
 *
 */
declare const MlCenterPosition: {
    (props: MlCenterPositionProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
        style: {
            minWidth: string;
            minHeight: string;
            width: string;
            height: string;
            backgroundColor: string;
            borderRadius: string;
            margin: number;
            fontSize: string;
            ":hover": {
                backgroundColor: string;
                color: string;
            };
        };
        onColor: string;
        offColor: string;
    };
};
export default MlCenterPosition;
