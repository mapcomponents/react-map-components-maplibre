import React, { useState } from 'react';

import { ChromePicker, } from 'react-color';
import { Button } from '@mui/material';
import { converters } from './transformers';

export interface ColorPickerProps {
	onChange?: (value: string) => void;
	convert: string;
	internalValue?: string;
	setValue?: (value: string) => void;
	value?: string;
}

const ColorPicker = ({
	convert,
	...props
}: ColorPickerProps) => {
	const [showPicker, setShowPicker] = useState(false);
	const [value, setValue] = useState(props?.value || '');

	return (
		<>
			<Button variant="outlined" onClick={() => setShowPicker(true)}>
				<div style={{ width: '20px', height: '20px', backgroundColor: value }} />
			</Button>
			{showPicker && (
				<div style={{ position: 'relative' }}>
					<div style={{ position: 'absolute', zIndex: 1000 }}>
						<div
							style={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
							onClick={() => {
								setShowPicker(false);
							}}
						/>
						<ChromePicker
							color={value}
							onChange={(c) => {
								console.log('c', c);

								const newValue = converters[convert](c);
								setValue(newValue);
								props?.onChange?.(newValue);
							}}
						/>
					</div>
				</div>
			)}
		</>
	);
};

ColorPicker.defaultProps = {
	convert: 'rgba_hex',
	label: 'Color',
	name: 'color',
};

export default ColorPicker;

