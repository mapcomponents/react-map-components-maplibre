import { wmsConfig } from '../../../contexts/LayerContext';
export interface WmsLayerConfig {
    url: string;
}
export interface WmsLayerFormProps {
    onSubmit: (config: wmsConfig) => void;
    onCancel: () => void;
}
export default function WmsLayerForm(props: WmsLayerFormProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=WmsLayerForm.d.ts.map