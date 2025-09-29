/**
 * Renders obj or gltf 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */
export interface MlThreeJsLayerProps {
    mapId?: string;
    init?: () => void;
    onDone?: () => void;
}
declare const MlThreeJsLayer: (props: MlThreeJsLayerProps) => import("react/jsx-runtime").JSX.Element;
export default MlThreeJsLayer;
//# sourceMappingURL=MlThreeJsLayer.d.ts.map