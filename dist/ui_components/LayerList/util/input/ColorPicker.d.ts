/// <reference types="react" />
import { paintPropsType } from '../LayerPropertyForm';
interface PaintPropsColorPickerProps {
    key: string;
    value: string;
    propKey: string;
    setPaintProps: (paintProps: paintPropsType | ((current: paintPropsType) => paintPropsType)) => void;
}
declare function PaintPropsColorPicker({ propKey, value, setPaintProps }: PaintPropsColorPickerProps): JSX.Element;
export default PaintPropsColorPicker;
