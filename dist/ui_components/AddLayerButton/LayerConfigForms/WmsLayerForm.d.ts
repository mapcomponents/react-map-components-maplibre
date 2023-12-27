/// <reference types="react" />
import { wmsConfig } from 'src/contexts/LayerContext';
export interface WmsLayerConfig {
    url: string;
}
export interface WmsLayerFormProps {
    onSubmit: (config: wmsConfig) => void;
    onCancel: () => void;
}
export default function WmsLayerForm(props: WmsLayerFormProps): JSX.Element;
