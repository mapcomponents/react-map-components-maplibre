import { default as React } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { SxProps } from '@mui/material';
import { LayerOrderItem } from '../../stores/map.store';
interface LayerTreeListItemProps {
    visible?: boolean;
    type?: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';
    name?: string;
    description?: string;
    setLayerState?: (state: unknown) => void;
    showDeleteButton?: boolean;
    listItemSx?: SxProps;
    buttons?: React.JSX.Element;
    sortable?: boolean;
    mapConfigKey: string;
    layerOrderConfig: LayerOrderItem;
}
declare function LayerTreeListItem(props: LayerTreeListItemProps): import("react/jsx-runtime").JSX.Element;
export default LayerTreeListItem;
//# sourceMappingURL=LayerTreeListItem.d.ts.map