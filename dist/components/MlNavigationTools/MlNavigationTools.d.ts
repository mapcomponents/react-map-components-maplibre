/// <reference types="react" />
import { SxProps } from '@mui/material';
export interface MlNavigationToolsProps {
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
     * Show 3D button
     */
    show3DButton?: boolean;
    /**
     * Show zoom button
     */
    showZoomButtons?: boolean;
    /**
     * Show follow GPS button
     */
    showFollowGpsButton?: boolean;
    /**
     * Show center on current position button
     */
    showCenterLocationButton?: boolean;
    /**
     * Additional JSX Elements to be rendered below MlNavigationTools buttons
     */
    children?: JSX.Element;
    /**
     * Style attribute for NavigationTools container
     */
    sx?: SxProps;
    /**
     * Style attribute for NavigationTools container
     */
    mediaIsMobile?: boolean;
}
/**
 * @component
 */
declare const MlNavigationTools: {
    (props: MlNavigationToolsProps): JSX.Element;
    defaultProps: {
        mapId: undefined;
        show3DButton: boolean;
        showFollowGpsButton: boolean;
        showCenterLocationButton: boolean;
        showZoomButtons: boolean;
    };
};
export default MlNavigationTools;
