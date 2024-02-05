/// <reference types="react" />
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
export interface MlSketchToolProps {
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
     * Style attribute for the button-style
     * https://mui.com/system/getting-started/the-sx-prop/
     */
    buttonStyleOverride?: SxProps;
}
/**
 * Component template
 *
 */
declare const MlSketchTool: {
    (props: MlSketchToolProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
        buttonStyleOverride: {};
    };
};
export default MlSketchTool;
