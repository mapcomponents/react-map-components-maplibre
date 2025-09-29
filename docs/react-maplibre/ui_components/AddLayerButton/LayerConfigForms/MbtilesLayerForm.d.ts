import { MlVectorTileLayerProps } from '../../../components/MlVectorTileLayer/MlVectorTileLayer';
export interface WmsLayerConfig {
    url: string;
}
export interface MbtilesLayerFormProps {
    originType: string;
    config: MlVectorTileLayerProps;
    mapId?: string;
    onSubmit: (config: MlVectorTileLayerProps) => void;
    onCancel: () => void;
}
export default function MbtilesLayerForm(props: MbtilesLayerFormProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=MbtilesLayerForm.d.ts.map