import { MlGeoJsonLayerProps } from '../../../components/MlGeoJsonLayer/MlGeoJsonLayer';
export interface ProtocolHandlerLayerFormProps {
    originType: string;
    config?: MlGeoJsonLayerProps;
    mapId?: string;
    onSubmit: (config: MlGeoJsonLayerProps) => void;
    onCancel: () => void;
}
export default function ProtocolHandlerLayerForm(props: ProtocolHandlerLayerFormProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ProtocolHandlerLayerForm.d.ts.map