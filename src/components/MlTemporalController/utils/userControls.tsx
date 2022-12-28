import React from 'react';
import { Drawer, Slider, Typography, TextField, List, ListItem, Checkbox } from '@mui/material';
import { ColorPicker } from 'mui-color';

interface userControlsProps {
	showOptions: boolean;
	step: number;
	minVal: number;
	maxVal: number;
	fadeIn: number;
	open: boolean;
	setFadeIn: Function;
	fadeOut: number;
	setFadeOut: Function;
	setStep: Function;
	featuresColor: string;
	setFeatureColor: Function;
	labels: boolean;
	setLabels: Function;
	labelColor: string;
	setlabelColor: Function;
	labelFadeIn: number;
	setLabelFadein: Function;
	labelFadeOut: number;
	setLabelFadeOut: Function;
	accumulate: boolean;
	setAccumulate: Function;
}

export default function UserControls(props: userControlsProps) {
	const optionsList = [
		{ id: 1, targetProp: 'fadeIn', type: 'slider', setter: props.setFadeIn, max: 15 },
		{ id: 2, targetProp: 'fadeOut', type: 'slider', setter: props.setFadeOut, max: 15 },
		{
			id: 3,
			targetProp: 'featuresColor',
			type: 'colorpicker',
			setter: props.setFeatureColor,
			max: 0,
		},
		{ id: 4, targetProp: 'labelColor', type: 'colorpicker', setter: props.setlabelColor, max: 0 },
		{ id: 5, targetProp: 'labelFadeIn', type: 'slider', setter: props.setLabelFadein, max: 15 },
		{ id: 6, targetProp: 'labelFadeOut', type: 'slider', setter: props.setLabelFadeOut, max: 15 },
		{ id: 7, targetProp: 'step', type: 'numberfield', setter: props.setStep, max: 0 },
		{ id: 8, targetProp: 'accumulate', type: 'boolean', setter: props.setAccumulate, max: 0 },
		{ id: 9, targetProp: 'labels', type: 'boolean', setter: props.setLabels, max: 0 },
	];

	const createWidget = (key: string, targetProp: string, setter: Function, max: number) => {
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
							{label}
							<Slider
								{...props[targetProp]}
								size={'small'}
								inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
								value={props[targetProp]}
								max={max}
								onChange={(ev: any) => {
									setter(ev.target?.value);
								}}
							/>
							<Typography> {props[targetProp]} </Typography>
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
			}
		}

		return null;
	};

	return (
		<Drawer
			anchor="bottom"
			open={props.showOptions}
			variant="persistent"
			sx={{
				flexShrink: 0,

				'& .MuiDrawer-paper': {
					width: '20%',
					height: 'auto',
					alignItems: 'center',
					marginLeft: '4%',
					padding: 5,
				},
			}}
		>
			<List>
				{optionsList.map((el) => {
					return (
						<ListItem
							sx={{ boxShadow: 'inset 0px 0px 10px rgb(50 50 50 / 10%)', borderRadius: '5px' }}
							key={el.id}
						>
							{createWidget(el.type, el.targetProp, el.setter, el.max)}
						</ListItem>
					);
				})}
			</List>
		</Drawer>
	);
}

/*
<Typography id={'fadeIn_setter'}>Fade In</Typography>
<Slider
				value={props.fadeIn}
				size={'small'}
				defaultValue={props.fadeIn}
				max={15}
				onChange={(e: any) => props.setFadeIn(e.target.value)}
			/>
			*/
