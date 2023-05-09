type Props = {
    layerComponent: JSX.Element;
    visible: boolean;
    configurable: boolean;
    type?: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';
    name: string;
    description?: string;
    additionalButtons?: JSX.Element;
};
declare function LayerListItem({ layerComponent, visible, type, name, description, configurable, }: Props): JSX.Element;
export default LayerListItem;
