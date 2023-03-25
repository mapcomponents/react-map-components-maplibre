import { paintPropsType } from './LayerPropertyForm';
type Props = {
    key: string;
    value: string;
    propKey: string;
    setPaintProps: (paintProps: paintPropsType | ((current: paintPropsType) => paintPropsType)) => void;
};
export default function PaintPropsColorPicker({ propKey, value, setPaintProps }: Props): JSX.Element;
export {};
