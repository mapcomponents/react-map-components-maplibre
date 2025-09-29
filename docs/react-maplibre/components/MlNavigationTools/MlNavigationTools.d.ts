import { default as React } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
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
     * Show global button
     */
    showGlobeButton?: boolean;
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
    children?: React.JSX.Element;
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
declare const MlNavigationTools: (props: MlNavigationToolsProps) => import("react/jsx-runtime").JSX.Element;
export default MlNavigationTools;
//# sourceMappingURL=MlNavigationTools.d.ts.map