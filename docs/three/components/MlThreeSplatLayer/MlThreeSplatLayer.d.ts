import { UseThreeModelProps } from '../../hooks/useThreeModel';
/**
 * Renders splat 3D Models on the MapLibreMap
 *
 * @component
 */
export type MlThreeSplatLayerProps = Omit<UseThreeModelProps, 'loaders'> & {
    mapId?: string;
};
declare const MlThreeSplatLayer: (props: MlThreeSplatLayerProps) => null;
export default MlThreeSplatLayer;
//# sourceMappingURL=MlThreeSplatLayer.d.ts.map