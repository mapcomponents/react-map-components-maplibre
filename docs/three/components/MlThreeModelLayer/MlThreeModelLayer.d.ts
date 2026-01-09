import { UseThreeModelProps } from '../../hooks/useThreeModel';
/**
 * Renders obj or gltf 3D Models on the MapLibreMap
 *
 * @component
 */
export type MlThreeModelLayerProps = Omit<UseThreeModelProps, 'loaders'> & {
    mapId?: string;
};
declare const MlThreeModelLayer: (props: MlThreeModelLayerProps) => null;
export default MlThreeModelLayer;
//# sourceMappingURL=MlThreeModelLayer.d.ts.map