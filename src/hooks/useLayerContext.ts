import { useContext } from 'react';
import LayerContext from '../contexts/LayerContext';

type Props = {};

const useLayerContext = (_props?: Props) => {
	const layerContext = useContext(LayerContext);
	return layerContext;
};
export default useLayerContext;
