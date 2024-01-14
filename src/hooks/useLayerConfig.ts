import { useSelector } from 'react-redux';
import { AppState, LayerConfig } from '../stores/layerconfig.store'; // Import LayerConfig from your definitions

interface UseLayerConfigParams {
  instanceKey: string;
  layerUuid: string;
}

const useLayerConfig = ({ instanceKey, layerUuid }: UseLayerConfigParams): LayerConfig | null => {
  const layerConfig = useSelector((state: AppState) => {
    const instance = state.mapConfigs[instanceKey];
    if (!instance) return null;

    const findLayerConfig = (layers: LayerConfig[]): LayerConfig | null => {
      for (const layer of layers) {
        if (layer.uuid === layerUuid) {
          return layer;
        }
        if (layer.type === 'folder' && 'layers' in layer) {
          const found = findLayerConfig(layer.layers);
          if (found) return found;
        }
      }
      return null;
    };

    return findLayerConfig(instance.layers);
  });

  return layerConfig;
};

export default useLayerConfig;