import React from 'react';
import { paintPropsType } from '../LayerPropertyForm';
import ColorPicker from '../../../ColorPicker/ColorPicker';

interface PaintPropsColorPickerProps {
	key: string;
	value: string;
	propKey: string;
	setPaintProps: (
		paintProps: paintPropsType | ((current: paintPropsType) => paintPropsType)
	) => void;
}

function PaintPropsColorPicker({ propKey, value, setPaintProps }: PaintPropsColorPickerProps) {
	return (
		<ColorPicker
			value={value}
			label="Color"
			onChange={(value: string) => {
				setPaintProps((current: paintPropsType): paintPropsType => {
					const newProps = {
						...current,
						[propKey]: value,
					};
					return newProps;
				});
			}}
		/>
	);
}
export default PaintPropsColorPicker;
