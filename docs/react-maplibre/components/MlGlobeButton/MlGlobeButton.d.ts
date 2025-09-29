import { CSSProperties } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
export interface MlGlobeButtonProps {
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
     * Style object to adjust css definitions of the component.
     */
    style?: CSSProperties;
    /**
     * Initial projection mode of the map.
     */
    mode?: 'globe' | 'mercator';
}
declare const MlGlobeButton: (props: MlGlobeButtonProps) => import("react/jsx-runtime").JSX.Element;
export default MlGlobeButton;
//# sourceMappingURL=MlGlobeButton.d.ts.map