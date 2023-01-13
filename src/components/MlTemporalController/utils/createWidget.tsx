import React from 'react';
import { Slider, Typography, TextField, Checkbox, Grid } from '@mui/material';
import { ColorPicker } from 'mui-color';

export default function useCreateWidget(
	key: string,
	targetProp: string,
	setter: Function,
	max: number,
	props: any
) {
	if (key === 'slider' || 'numberfield' || 'colorpicker' || 'boolean') {
		const label = (
			<Typography id={targetProp + '_label'} gutterBottom>
				{targetProp}
			</Typography>
		);

		switch (key) {
			case 'slider':
				return (
					<>
						<Grid container spacing={1}>
							<Grid item md={3}>{label}</Grid>
							<Grid item md={7}>
								<Slider
									size={'small'}
									inputMode={'decimal'}
									value={props[targetProp]}
									max={max}
									onChange={(ev: any) => {
										setter(ev.target?.value);
									}}
								/>
							</Grid>
							<Grid item md={2} >
								<Typography> {props[targetProp]} </Typography>
							</Grid>
						</Grid>
					</>
				);
				break;

			case 'numberfield':
				return (
					<>
						{label}
						<TextField
							id={targetProp + '_numberfield'}
							inputMode={'numeric'}
							defaultValue={props[targetProp]}
							onChange={(ev: any) => {
								if (ev?.target?.value) {
									setter(parseFloat(ev.target.value));
								}
							}}
						/>
					</>
				);
				break;
			case 'colorpicker':
				return (
					<>
						{label}
						<ColorPicker
							key={targetProp + '_colorpicker'}
							value={props[targetProp]}
							hideTextfield
							disableAlpha
							onChange={(ev: any) => {
								setter('#' + ev.hex);
							}}
						/>
					</>
				);
				break;
			case 'boolean':
				return (
					<>
						{label}
						{props[targetProp] !== undefined && (
							<Checkbox
								id={props[targetProp + '_check']}
								value={props[targetProp]}
								checked={props[targetProp]}
								onChange={() => {
									if (props[targetProp] !== undefined) {
										setter(!props[targetProp]);
									}
								}}
							/>
						)}
					</>
				);
				break;
			default:
				return <></>;
		}
	}

	return null;
}
