import React from 'react';
import ColorPicker from '../../../ColorPicker/ColorPicker';

interface PaintPropsColorPickerProps {
	value: string;
	onChange: (value: string) => void;
}

function PaintPropsColorPicker(props: PaintPropsColorPickerProps) {
	return (
		<ColorPicker
			value={props.value}
			label="Color"
			onChange={(value: string) => {
				if (typeof props.onChange === 'function') {
					props.onChange(value);
				}
			}}
		/>
	);
}
export default PaintPropsColorPicker;
