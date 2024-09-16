import React, { useState } from 'react';

import { ChromePicker } from 'react-color';
import { Button, Grid } from '@mui/material';
import { converters } from './transformers';

export interface ColorPickerProps {
	onChange?: (value: string) => void;
	convert: 'rgb' | 'rgba' | 'rgba_hex' | 'hex' | 'rgba_rgb';
	value?: string;
}

const ColorPicker = ({ convert, ...props }: ColorPickerProps) => {
	const [showPicker, setShowPicker] = useState(false);
	const value = props?.value || '';

	return (
		<>
			<Grid container sx={{ flexWrap: 'nowrap' }}>
				<Grid xs={12} item>
					<Button
						variant="outlined"
						onClick={() => setShowPicker(true)}
						sx={{
							minWidth: '100%',
							padding: '5px',
							marginBottom: '10px',
							justifyContent: 'flex-start',
							borderColor: (theme) => theme.palette.text.primary,
							color: (theme) => theme.palette.text.primary,
						}}
					>
						<div
							style={{
								width: '25px',
								height: '25px',
								marginRight: '10px',
								backgroundColor: value,
							}}
						/>

						{value}
					</Button>
				</Grid>
			</Grid>
			{showPicker && (
				<div style={{ position: 'relative', marginTop: 0 }}>
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
