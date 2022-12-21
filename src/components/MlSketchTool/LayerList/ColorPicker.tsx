import { ColorPicker } from 'mui-color';
import React from 'react';
import { paintPropsType } from './LayerPropertyForm';

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
			onChange={(value: any) => {
				setPaintProps((current: paintPropsType): paintPropsType => {
					if (!value?.rgb?.[0]) {
						return current;
					}

					const newProps = {
						...current,
						[propKey]:
							'rgba(' +
							value.rgb[0] +
							',' +
							value.rgb[1] +
							',' +
							value.rgb[2] +
							',' +
							value.alpha +
							')',
					};

					return newProps;
				});
			}}
		/>
	);
}
