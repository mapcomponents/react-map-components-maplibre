/// <reference types="react" />
import { CircleLayerSpecification, FillLayerSpecification, LineLayerSpecification } from 'maplibre-gl';
export type paintPropsType = CircleLayerSpecification['paint'] | FillLayerSpecification['paint'] | LineLayerSpecification['paint'];
interface LayerPropertyFormProps {
    paintProps: paintPropsType;
    setPaintProps: (paintProps: paintPropsType | ((current: paintPropsType) => paintPropsType)) => void;
    layerType: string;
}
declare function LayerPropertyForm({ paintProps, setPaintProps }: LayerPropertyFormProps): JSX.Element;
export default LayerPropertyForm;
