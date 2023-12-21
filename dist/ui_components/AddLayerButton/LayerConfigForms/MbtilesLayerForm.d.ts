/// <reference types="react" />
import { MlVectorTileLayerProps } from 'src/components/MlVectorTileLayer/MlVectorTileLayer';
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
export default function MbtilesLayerForm(props: MbtilesLayerFormProps): JSX.Element;
