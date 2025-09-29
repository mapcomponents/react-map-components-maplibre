import { SxProps } from '@mui/material';
import { Feature } from 'geojson';
import * as turf from '@turf/turf';
export interface MlMultiMeasureToolProps {
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
     * String that specify if the Tool measures an area ("polygon") or length ("line")
     */
    measureType?: 'polygon' | 'line';
    /**
     * Boolean which decides if the user can switch between measure modes
     */
    multiType?: boolean;
    /**
     * String that dictates which unit of measurement is used
     */
    unit?: turf.Units;
    /**
     * Callback function that is called each time measurment geometry within has changed within MlMeasureTool.
     * First parameter is the new GeoJson feature.
     */
    onChange?: (options: {
        value: number;
        unit?: string;
        geojson: Feature;
        geometries?: [];
    }) => void;
    /**
     * Callback function that is called by the end of drawing geometries.
     */
    onFinish?: () => void;
}
declare const MlMultiMeasureTool: (props: MlMultiMeasureToolProps) => import("react/jsx-runtime").JSX.Element;
export default MlMultiMeasureTool;
//# sourceMappingURL=MlMultiMeasureTool.d.ts.map