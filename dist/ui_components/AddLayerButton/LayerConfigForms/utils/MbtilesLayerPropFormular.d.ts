import { Dispatch, SetStateAction } from 'react';
import { LayerSpecification } from 'maplibre-gl';
interface MbtilesLayerPropFormularProps {
    setter: Dispatch<SetStateAction<LayerSpecification[]>>;
}
export default function MbtilesLayerPropFormular(props: MbtilesLayerPropFormularProps): JSX.Element;
export {};
