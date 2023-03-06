import React, { useState } from 'react';

import { ChromePicker } from 'react-color';
import { Button, Grid, TextField } from '@mui/material';
import { converters } from './transformers';

export interface ColorPickerProps {
	onChange?: (value: string) => void;
	convert: 'rgb' | 'rgba' | 'rgba_hex' | 'hex' | 'rgba_rgb';
	internalValue?: string;
	setValue?: (value: string) => void;
	value?: string;
}

const ColorPicker = ({ convert, ...props }: ColorPickerProps) => {
	const [showPicker, setShowPicker] = useState(false);
	const [value, setValue] = useState(props?.value || '');

	return (
		<>
			<Grid container sx={{flexWrap:'nowrap'}}>
				<Grid xs={3} item style={{ display: 'flex', alignItems:'stretch' }}>
					<Button variant="outlined" onClick={() => setShowPicker(true)} sx={{borderColor:(theme) => 'rgb(17,17,17)'}}>
						<div style={{ width: '26px', height: '26px', backgroundColor: value }} />
					</Button>
				</Grid>
				<Grid xs={9} item>
					<TextField value={value} variant="outlined" disabled={true} />
				</Grid>
			</Grid>
			{showPicker && (
				<div style={{ position: 'relative', marginTop:0 }}>
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
