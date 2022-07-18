import { Feature, FeatureCollection } from "@turf/turf";
import { CircleLayerSpecification, FillLayerSpecification, LineLayerSpecification, MapLayerMouseEvent } from "maplibre-gl";
interface MlTransitionGeoJsonLayerProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId: string;
    /**
     * GeoJSON data that is supposed to be rendered by this component.
     */
    geojson: Feature | FeatureCollection | undefined;
    /**
     * Type of the layer that will be added to the MapLibre instance.
     * Possible values: "line", "circle", "fill"
     */
    type?: "fill" | "line" | "circle";
    /**
     * Paint property object, that is passed to the addLayer call.
     * Possible props depend on the layer type.
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
     */
    paint?: CircleLayerSpecification['paint'] | FillLayerSpecification['paint'] | LineLayerSpecification['paint'];
    /**
     * Layout property object, that is passed to the addLayer call.
     * Possible props depend on the layer type.
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#line
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#circle
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill
     */
    layout?: CircleLayerSpecification['layout'] | FillLayerSpecification['layout'] | LineLayerSpecification['layout'];
    /**
     * Javascript object that is spread into the addLayer commands first parameter.
     */
    options?: CircleLayerSpecification | FillLayerSpecification | LineLayerSpecification;
    /**
     * Javascript object with optional properties "fill", "line", "circle" to override implicit layer type default paint properties.
     */
    defaultPaintOverrides?: {
        circle?: CircleLayerSpecification['paint'];
        fill?: FillLayerSpecification['paint'];
        line?: LineLayerSpecification['paint'];
    };
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order
     * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
     */
    insertBeforeLayer: string;
    /**
     * Hover event handler that is executed whenever a geometry rendered by this component is hovered.
     */
    onHover?: MapLayerMouseEvent;
    /**
     * Click event handler that is executed whenever a geometry rendered by this component is clicked.
     */
    onClick?: MapLayerMouseEvent;
    /**
     * Leave event handler that is executed whenever a geometry rendered by this component is
     * left/unhovered.
     */
    onLeave?: MapLayerMouseEvent;
    /**
     * Creates transition animation whenever the geojson prop changes.
     * Only works with layer type "line" and LineString GeoJSON data.
     */
    transitionTime: number;
}
/**
 * Adds source and layer of types "line", "fill" or "circle" to display GeoJSON data on the map.
 */
declare const MlTransitionGeoJsonLayer: (props: MlTransitionGeoJsonLayerProps) => JSX.Element;
export default MlTransitionGeoJsonLayer;
