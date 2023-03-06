import ColorPicker from '../../../ColorPicker/ColorPicker';
import React from 'react';
import { paintPropsType } from '../LayerPropertyForm';

type Props = {
	key: string;
	value: string;
	propKey: string;
	setPaintProps: (
		paintProps: paintPropsType | ((current: paintPropsType) => paintPropsType)
	) => void;
};

export default function PaintPropsColorPicker({ propKey, value, setPaintProps }: Props) {
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
