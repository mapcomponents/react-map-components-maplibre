import { default as React } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
export interface MlLayerMagnifyProps {
    /**
     * Id of the first MapLibre instance
     */
    map1Id: string;
    /**
     * Id of the second MapLibre instance
     */
    map2Id: string;
    /**
     * Size of the "magnifier"-circle
     */
    magnifierRadius?: number;
    /**
     * object (React.CSSProperties) that is added to the magnifier default style
     */
    magnifierStyle: React.CSSProperties | undefined;
}
/**
 *
 * Hides the MapLibreMap referenced by props.map2Id except for the "magnifier"-circle that reveals
 * the map and can be dragged around on top of the MapLibreMap referenced by props.map1Id
 */
declare const MlLayerMagnify: (props: MlLayerMagnifyProps) => import("react/jsx-runtime").JSX.Element;
export default MlLayerMagnify;
//# sourceMappingURL=MlLayerMagnify.d.ts.map