import { StyleSpecification } from 'maplibre-gl';
export interface SelectStylePopupProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    styles?: StyleSpecification[];
    onSelect?: (style: StyleSpecification) => void;
    styleThumbnailPaths?: {
        [key: string]: string;
    };
}
declare const SelectStylePopup: {
    (props: SelectStylePopupProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        styleThumbnailPaths: {};
    };
};
export default SelectStylePopup;
//# sourceMappingURL=SelectStylePopup.d.ts.map