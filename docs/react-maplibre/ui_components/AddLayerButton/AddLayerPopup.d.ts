import { LayerConfig } from '../../contexts/LayerContext';
export interface AddLayerPopupProps {
    open: boolean;
    config?: LayerConfig;
    layerTypes: string[];
    setOpen: (open: boolean) => void;
    onChange?: (config: LayerConfig) => void;
    onComplete?: (config: LayerConfig) => void;
}
declare const AddLayerPopup: {
    (props: AddLayerPopupProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {};
};
export default AddLayerPopup;
//# sourceMappingURL=AddLayerPopup.d.ts.map