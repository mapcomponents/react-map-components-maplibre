import * as turf from "@turf/turf";
interface MlMeasureToolProps {
    /**
     * String that specify if the Tool measures an area ("polygon") or length ("line")
     */
    measureType?: string;
    /**
     * String that dictates which unit of measurement is used
     */
    unit?: turf.Units;
}
declare const MlMeasureTool: {
    (props: MlMeasureToolProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
        measureType: string;
        unit: string;
    };
};
export default MlMeasureTool;
