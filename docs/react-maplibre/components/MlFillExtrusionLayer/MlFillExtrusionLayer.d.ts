export interface MlFillExtrusionLayerProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * The layerId of an existing layer this layer should be rendered visually beneath
     * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
     */
    insertBeforeLayer?: string;
    /**
     * Id of the layer that will be added by this component
     */
    layerId?: string;
    /**
     * Paint properties of the config object that is passed to the MapLibreGl.addLayer call. All
     * available properties are documented in the MapLibreGl documentation
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#fill-extrusion
     */
    paint?: object;
    /**
     * Source id of a vector tile source containing the geometries to use for this fill-extrusion
     * layer.
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#source-layer
     */
    sourceId?: string;
    /**
     * Layer id from a vector tile source containing the geometries to use for this fill-extrusion
     * layer.
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#source-layer
     */
    sourceLayer?: string;
    /**
     * This layer will be hidden for zoom levels lower than defined on this property
     * https://maplibre.org/maplibre-gl-js-docs/style-spec/layers/#minzoom
     */
    minZoom?: number;
}
/**
 * Adds a fill extrusion layer to the MapLibre instance reference by props.mapId
 *
 */
declare const MlFillExtrusionLayer: {
    (props: MlFillExtrusionLayerProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        mapId: undefined;
        paint: {
            'fill-extrusion-color': string;
            'fill-extrusion-height': {
                property: string;
                type: string;
            };
            'fill-extrusion-base': {
                property: string;
                type: string;
            };
            'fill-extrusion-opacity': number;
        };
    };
};
export default MlFillExtrusionLayer;
//# sourceMappingURL=MlFillExtrusionLayer.d.ts.map