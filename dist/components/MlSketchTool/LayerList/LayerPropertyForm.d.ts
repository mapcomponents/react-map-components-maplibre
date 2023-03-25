import { CircleLayerSpecification, FillLayerSpecification, LineLayerSpecification } from 'maplibre-gl';
export type paintPropsType = CircleLayerSpecification['paint'] | FillLayerSpecification['paint'] | LineLayerSpecification['paint'];
type Props = {
    paintProps: paintPropsType;
    setPaintProps: (paintProps: paintPropsType | ((current: paintPropsType) => paintPropsType)) => void;
    layerType: string;
};
export default function LayerPropertyForm({ paintProps, setPaintProps }: Props): JSX.Element;
export {};
