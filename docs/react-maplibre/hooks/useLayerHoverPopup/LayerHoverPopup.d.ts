import { Feature } from 'geojson';
export interface LayerHoverPopupProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Id of an existing layer in the mapLibre instance this event will be registered to
     */
    layerId?: string;
    getPopupContent: (feature: Feature) => string;
}
/**
 * useLayerHoverPopup hook registers a mouseenter event to display feature properties in a MapLibre popup if a feature on the configured layer is hovered
 *
 */
declare const LayerHoverPopup: {
    (props: LayerHoverPopupProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        mapId: undefined;
    };
};
export default LayerHoverPopup;
//# sourceMappingURL=LayerHoverPopup.d.ts.map