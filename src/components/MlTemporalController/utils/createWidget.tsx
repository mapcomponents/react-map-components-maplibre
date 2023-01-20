import React from 'react';
import { Slider, Typography, TextField, Checkbox, Grid } from '@mui/material';
import { ColorPicker } from 'mui-color';

interface createWidgetProps {
	type: string;
	targetProp: string;
	setter: Function;
	max: number, 
	value: string | number | boolean
}
export default function CreateWidget(props: createWidgetProps) {
	

//	const ref = useRef<userControlsProps | undefined>();


	if (props.type === 'slider' || 'numberfield' || 'colorpicker' || 'boolean') {
		const label = (
			<Typography id={props.targetProp + '_label'} gutterBottom>
				{props.targetProp}
			</Typography>
		);

		switch (props.type) {
			case 'slider':
				return (
					<>
						<Grid container spacing={1}>
							<Grid item md={4}>{label}</Grid>
							<Grid item md={7}>
								<Slider
									size={'small'}
									inputMode={'decimal'}
									value={props.value as number}
									max={props.max}
									onChange={(ev: any) => {
										props.setter(ev.target?.value);
									}}
								/>
							</Grid>
							<Grid item md={1} >
								<Typography> {props.value} </Typography>
							</Grid>
						</Grid>
					</>
				);
				
			case 'numberfield':
				return (
					<>
						{label}
						<TextField
							id={props.targetProp + '_numberfield'}
							inputMode={'numeric'}
							defaultValue={props.value}
							onChange={(ev: any) => {
								if (ev?.target?.value) {
									props.setter(parseFloat(ev.target.value));
								}
							}}
						/>
					</>
				);
				
			case 'colorpicker':
				return (
					<>
						{label}
						<ColorPicker
							key={props.targetProp + '_colorpicker'}
							value={props.value as string}
							hideTextfield
							disableAlpha
							onChange={(ev: any) => {
								props.setter('#' + ev.hex);
							}}
						/>
					</>
				);
			
			case 'boolean':
				return (
					<>
						{label}
						{props.value !== undefined && (
							<Checkbox
								id={props.value + '_check'}
								value={props.value}
								checked={props.value ? true : false}
								onChange={() => {
									if (props.value !== undefined) {
										props.setter(!props.value);
									}
								}}
							/>
						)}
					</>
				);
			
			default:
				return <></>;
		}
	}

	return null;
}
