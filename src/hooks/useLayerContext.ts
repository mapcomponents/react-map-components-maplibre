import { useContext } from 'react';
import LayerContext from '../contexts/LayerContext';


const useLayerContext = () => {
	const layerContext = useContext(LayerContext);
	return layerContext;
};
export default useLayerContext;
