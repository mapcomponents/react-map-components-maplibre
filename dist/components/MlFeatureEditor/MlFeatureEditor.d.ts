import "./MlFeatureEditor.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
interface MlFeatureEditorProps {
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
    geojson?: any;
    /**
     * Callback function that is called each time the GeoJson data within has changed within MlFeatureEditor.
     * First parameter is the new GeoJson feature.
     */
    onChange?: Function;
    /**
     * Feature editor mode:
     * - "custom_select" edit features
     * - "custom_polygon" draw Polygon
     * - "draw_point" draw Point
     * - "draw_line_string" draw LineString
     */
    mode?: string;
}
/**
 * GeoJson Feature editor that allows to create or manipulate GeoJson data
 */
declare const MlFeatureEditor: (props: MlFeatureEditorProps) => JSX.Element;
export default MlFeatureEditor;
