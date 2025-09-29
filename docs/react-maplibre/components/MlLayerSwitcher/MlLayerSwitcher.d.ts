import { default as React } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
type LayerConfig = {
    layerId: string;
    src?: string;
    label: string;
    linkedTo?: string;
};
type BaseSourceConfig = {
    label?: string;
    active?: boolean;
    layers: LayerConfig[];
};
type DetailLayerConfig = {
    label?: string;
    layers: LayerConfig[];
};
export type MlLayerSwitcherProps = {
    baseSourceConfig: BaseSourceConfig;
    detailLayerConfig: DetailLayerConfig;
    mapId?: string;
};
/**
 * @component
 *
 *
 */
declare const MlLayerSwitcher: React.FC<MlLayerSwitcherProps>;
export default MlLayerSwitcher;
//# sourceMappingURL=MlLayerSwitcher.d.ts.map