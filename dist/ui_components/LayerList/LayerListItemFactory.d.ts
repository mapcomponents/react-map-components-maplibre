/// <reference types="react" />
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
declare function LayerListItemFactory(props: LayerListItemFactoryProps): JSX.Element;
declare namespace LayerListItemFactory {
    var defaultProps: {
        mapId: undefined;
    };
}
export default LayerListItemFactory;
