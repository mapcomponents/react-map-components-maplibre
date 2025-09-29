import { LayerConfig } from '../../contexts/LayerContext';
import { FitBoundsOptions } from 'maplibre-gl';
export interface LayerListItemFactoryProps {
    mapId?: string;
    layers: LayerConfig[];
    setLayers?: (layers: LayerConfig[] | ((state: LayerConfig[]) => LayerConfig[])) => void;
    insertBeforeLayer?: string;
    sortable?: boolean;
    fitBoundsOptions?: FitBoundsOptions;
}
declare function LayerListItemFactory(props: LayerListItemFactoryProps): import("react/jsx-runtime").JSX.Element;
declare namespace LayerListItemFactory {
    var defaultProps: {
        mapId: undefined;
    };
}
export default LayerListItemFactory;
//# sourceMappingURL=LayerListItemFactory.d.ts.map