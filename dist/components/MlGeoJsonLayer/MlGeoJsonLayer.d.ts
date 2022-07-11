import { Feature, FeatureCollection } from "@turf/turf";
declare type MlGeoJsonLayerProps = {
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
     * Id of the new layer and source that are added to the MapLibre instance
     */
    layerId?: string;
    /**
     * GeoJSON data that is supposed to be rendered by this component.
     */
    geojson: Feature | FeatureCollection | undefined;
    /**
     * Type of the layer that will be added to the MapLibre instance.
     * Possible values: "line", "circle", "fill"
     */
    type?: string;
    /**
     * Paint property object, that is passed to the addLayer call.
     * Possible props depend on the layer type.
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
     */
    paint?: any;
    /**
     * Layout property object, that is passed to the addLayer call.
     * Possible props depend on the layer type.
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
     */
    layout?: any;
    /**
     * Javascript object that is spread into the addLayer commands first parameter.
     */
    options?: any;
    /**
     * Javascript object with optional properties "fill", "line", "circle" to override implicit layer type default paint properties.
     */
    defaultPaintOverrides?: any;
    /**
     * Hover event handler that is executed whenever a geometry rendered by this component is hovered.
     */
    onHover?: Function;
    /**
     * Click event handler that is executed whenever a geometry rendered by this component is clicked.
     */
    onClick?: Function;
    /**
     * Leave event handler that is executed whenever a geometry rendered by this component is
     * left/unhovered.
     */
    onLeave?: Function;
};
/**
 * Adds source and layer of types "line", "fill" or "circle" to display GeoJSON data on the map.
 *
 * @component
 */
declare const MlGeoJsonLayer: (props: MlGeoJsonLayerProps) => JSX.Element;
export default MlGeoJsonLayer;
