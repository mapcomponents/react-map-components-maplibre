import { default as React, Dispatch, ReactNode, SetStateAction } from '../../../../../node_modules/.pnpm/react@19.1.0/node_modules/react';
import { SxProps } from '@mui/material';
interface LayerListItemProps {
    layerComponent: React.JSX.Element;
    visible: boolean;
    configurable: boolean;
    type?: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';
    name: string | ReactNode;
    description?: string;
    setLayerState?: Dispatch<SetStateAction<any>>;
    showDeleteButton?: boolean;
    listItemSx?: SxProps;
    buttons?: React.JSX.Element;
    layerId?: string;
    sortable?: boolean;
}
declare function LayerListItem({ layerComponent, visible, type, name, description, configurable, setLayerState, ...props }: LayerListItemProps): import("react/jsx-runtime").JSX.Element;
declare namespace LayerListItem {
    var defaultProps: {
        type: string;
        visible: boolean;
        showDeleteButton: boolean;
        buttons: import("react/jsx-runtime").JSX.Element;
    };
}
export default LayerListItem;
//# sourceMappingURL=LayerListItem.d.ts.map