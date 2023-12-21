/// <reference types="react" />
import { MlGeoJsonLayerProps } from 'src/components/MlGeoJsonLayer/MlGeoJsonLayer';
export interface GeoJsonLayerFormProps {
    config?: MlGeoJsonLayerProps;
    onSubmit: (config: MlGeoJsonLayerProps) => void;
    onCancel: () => void;
}
export default function GeoJsonLayerForm(props: GeoJsonLayerFormProps): JSX.Element;
