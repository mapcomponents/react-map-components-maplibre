import { ScenegraphLayerProps } from '@deck.gl/mesh-layers';
export interface MlScenegraphLayerProps extends ScenegraphLayerProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order
     * This layer will be visually beneath the layer with the "beforeId" id.
     */
    beforeId?: string;
}
declare const MlScenegraphLayer: (props: MlScenegraphLayerProps) => import("react/jsx-runtime").JSX.Element;
export default MlScenegraphLayer;
//# sourceMappingURL=MlScenegraphLayer.d.ts.map