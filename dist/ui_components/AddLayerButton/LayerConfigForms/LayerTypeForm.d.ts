/// <reference types="react" />
export interface LayerTypeFormProps {
    onSelect: (type: string) => void;
    layerTypes: string[];
}
declare const LayerTypeForm: {
    (props: LayerTypeFormProps): JSX.Element;
    defaultProps: {};
};
export default LayerTypeForm;
