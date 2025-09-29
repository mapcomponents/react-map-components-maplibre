import { default as MapboxDraw } from '@mapbox/mapbox-gl-draw';
import { Feature } from 'geojson';
export interface useFeatureEditorProps {
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
     * Input GeoJson data at initialization
     */
    geojson?: Feature;
    /**
     * Callback function that is called each time the GeoJson data has changed within MlFeatureEditor.
     * First parameter is the new GeoJson feature.
     */
    onChange?: (para: Feature[]) => void;
    /**
     * Callback function that is called each time the GeoJson data within has been finished within MlFeatureEditor.
     * First parameter is the new GeoJson feature.
     */
    onFinish?: () => void;
    /**
     * Feature editor modes:
     * - draw_line_string
     * - draw_polygon
     * - draw_point
     * - simple_select
     * - direct_select
     */
    mode?: keyof MapboxDraw.Modes;
}
/**
 * GeoJson Feature editor that allows to create or manipulate GeoJson data
 */
declare const useFeatureEditor: (props: useFeatureEditorProps) => {
    feature: Feature<import('geojson').Geometry, import('geojson').GeoJsonProperties>[] | undefined;
    drawToolsReady: boolean;
    draw: MapboxDraw | null;
};
export default useFeatureEditor;
//# sourceMappingURL=useFeatureEditor.d.ts.map