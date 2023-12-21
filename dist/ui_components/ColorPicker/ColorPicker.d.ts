/// <reference types="react" />
export interface ColorPickerProps {
    onChange?: (value: string) => void;
    convert: 'rgb' | 'rgba' | 'rgba_hex' | 'hex' | 'rgba_rgb';
    internalValue?: string;
    setValue?: (value: string) => void;
    value?: string;
}
declare const ColorPicker: {
    ({ convert, ...props }: ColorPickerProps): JSX.Element;
    defaultProps: {
        convert: string;
        label: string;
        name: string;
    };
};
export default ColorPicker;
