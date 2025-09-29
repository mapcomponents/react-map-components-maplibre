export interface ColorPickerProps {
    onChange?: (value: string) => void;
    convert: 'rgb' | 'rgba' | 'rgba_hex' | 'hex' | 'rgba_rgb';
    value?: string;
}
declare const ColorPicker: {
    ({ convert, ...props }: ColorPickerProps): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        convert: string;
        label: string;
        name: string;
    };
};
export default ColorPicker;
//# sourceMappingURL=ColorPicker.d.ts.map