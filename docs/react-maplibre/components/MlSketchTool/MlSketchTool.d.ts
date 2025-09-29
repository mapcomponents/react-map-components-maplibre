import { Feature } from 'geojson';
import { SxProps } from '@mui/material';
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
    /**
     * Callback function that is called each time GeoJson data has changed within MlSketchTool.
     * First parameter contains all geometries in the `geometries` prop.
     */
    onChange?: (para: SketchStateType) => void;
    /**
     * Determines whether the instruction text should be shown.
     */
    showInstruction?: boolean;
    /**
     * Callback function triggered when the "Show instructions" checkbox is toggled.
     */
    onShowInstructionChange?: (value: boolean) => void;
}
type SketchStateType = {
    selectedGeoJson?: Feature;
    activeGeometryIndex?: number;
    geometries: Feature[];
    drawMode?: keyof MapboxDraw.Modes;
};
/**
 * Component template
 *
 */
declare const MlSketchTool: (props: MlSketchToolProps) => import("react/jsx-runtime").JSX.Element;
export default MlSketchTool;
//# sourceMappingURL=MlSketchTool.d.ts.map