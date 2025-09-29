import { SxProps, Theme } from '@mui/material';
export interface MlCenterPositionProps {
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
    style?: SxProps<Theme> | undefined;
}
/**
 * Component template
 *
 */
declare const MlCenterPosition: (props: MlCenterPositionProps) => import("react/jsx-runtime").JSX.Element;
export default MlCenterPosition;
//# sourceMappingURL=MlCenterPosition.d.ts.map