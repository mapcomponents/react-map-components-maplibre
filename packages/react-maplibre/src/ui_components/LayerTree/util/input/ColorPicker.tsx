import ColorPicker from '../../../ColorPicker/ColorPicker';

interface PaintPropsColorPickerProps {
	value: string;
	onChange: (value: string) => void;
}

function PaintPropsColorPicker(props: PaintPropsColorPickerProps) {
	return (
		<ColorPicker
			value={props.value}
			onChange={(value: string) => {
				if (typeof props.onChange === 'function') {
					props.onChange(value);
				}
			}}
		/>
	);
}
export default PaintPropsColorPicker;
