import { default as React } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
export interface MlLayerSwipeProps {
    /**
     * Id of the first MapLibre instance.
     */
    map1Id: string;
    /**
     * Id of the second MapLibre instance.
     */
    map2Id: string;
    /**
     * object (React.CSSProperties) that is added to the button default style
     */
    buttonStyle: React.CSSProperties | undefined;
}
/**
 *	creates a split view of 2 synchronised maplibre instances
 */
declare const MlLayerSwipe: (props: MlLayerSwipeProps) => import("react/jsx-runtime").JSX.Element;
export default MlLayerSwipe;
//# sourceMappingURL=MlLayerSwipe.d.ts.map