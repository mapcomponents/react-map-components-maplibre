import { Feature } from 'geojson';
import * as turf from '@turf/turf';
export interface MlMeasureToolOnChangeOptions {
    value: number;
    unit: string | undefined;
    geojson: Feature;
    geometries?: [];
}
export interface MlMeasureToolProps {
    /**
     * String that specify if the Tool measures an area ("polygon") or length ("line")
     */
    measureType?: 'polygon' | 'line';
    /**
     * String that dictates which unit of measurement is used
     */
    unit?: turf.Units;
    /**
     * Callback function that is called each time measurment geometry within has changed within MlMeasureTool.
     * First parameter is the new GeoJson feature.
     */
    onChange?: (options: MlMeasureToolOnChangeOptions) => void;
    /**
     * Callback function that is called by the end of drawing geometries.
     */
    onFinish?: () => void;
}
declare const MlMeasureTool: (props: MlMeasureToolProps) => import("react/jsx-runtime").JSX.Element;
export default MlMeasureTool;
//# sourceMappingURL=MlMeasureTool.d.ts.map