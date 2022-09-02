interface MlGPXViewerProps {
    /**
     * Id of the target MapLibre instance in mapHook
     */
    mapId?: string;
    /**
     * The layerId of an existing layer this layer should be rendered visually beneath
     * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
     */
    insertBeforeLayer?: string;
    /**
     * Prefix of the component id this component uses when adding elements to the MapLibreGl-instance
     */
    idPrefix?: string;
    /**
     * Sets the layers layout-property "visibility" to "none" if false or "visible" if true
     */
    visible?: boolean;
}
/**
 * MlGPXViewer returns a dropzone and a button to load a GPX Track into the map.
 */
declare const MlGPXViewer: {
    (props: MlGPXViewerProps): JSX.Element;
    defaultProps: {
        visible: boolean;
    };
};
export default MlGPXViewer;
