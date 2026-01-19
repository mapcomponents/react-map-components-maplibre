import { HexagonLayerProps } from '@deck.gl/aggregation-layers';
export interface MlHexagonMapProps extends HexagonLayerProps {
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
declare const MlHexagonLayer: (props: MlHexagonMapProps) => import("react/jsx-runtime").JSX.Element;
export default MlHexagonLayer;
//# sourceMappingURL=MlHexagonLayer.d.ts.map