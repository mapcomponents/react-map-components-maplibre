export interface MlHexagonMapProps {
    /**
     * Id of the target MapLibre instance in mapContext
     */
    mapId?: string;
    /**
     * Id of an existing layer in the mapLibre instance to help specify the layer order
     * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
     */
    insertBeforeLayer?: string;
}
declare const MlHexagonMap: (props: MlHexagonMapProps) => import("react/jsx-runtime").JSX.Element;
export default MlHexagonMap;
//# sourceMappingURL=MlHexagonMap.d.ts.map