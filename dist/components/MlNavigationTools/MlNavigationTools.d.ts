interface MlNavigationToolsProps {
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
     * Show follow GPS button
     */
    showFollowGpsButton?: boolean;
    /**
     * Show center on current position button
     */
    showCenterLocationButton?: boolean;
}
/**
 * @component
 */
declare const MlNavigationTools: {
    (props: MlNavigationToolsProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
        showFollowGpsButton: boolean;
        showCenterLocationButton: boolean;
    };
};
export default MlNavigationTools;
