import {
	CircleLayerSpecification,
	FillLayerSpecification,
	LineLayerSpecification,
} from 'maplibre-gl';
import React, { useRef } from 'react';
import ColorPicker from './input/ColorPicker';
import { Box, ListItem, Paper, Slider, TextField, Typography } from '@mui/material';
import { useCallback } from 'react';

export type paintPropsType =
	| CircleLayerSpecification['paint']
	| FillLayerSpecification['paint']
	| LineLayerSpecification['paint'];

type Props = {
	paintProps: paintPropsType;
	setPaintProps: (
		paintProps: paintPropsType | ((current: paintPropsType) => paintPropsType)
	) => void;
	layerType: string;
};

const mapPropKeyToFormInputType = {
	'circle-color': 'colorpicker',
	'circle-radius': 'slider',
	'circle-stroke-color': 'colorpicker',
	'circle-stroke-width': 'slider',
	'fill-color': 'colorpicker',
	'fill-outline-color': 'colorpicker',
	'line-color': 'colorpicker',
	'line-width': 'slider',
	'line-blur': 'slider',
};
const mapPropKeyToFormInputTypeKeys = Object.keys(mapPropKeyToFormInputType);

const inputPropsByPropKey = {
	'circle-stroke-width': {
		step: 1,
		min: 1,
		max: 20,
	},
	'circle-radius': {
		step: 1,
		min: 1,
		max: 100,
	},
	'line-blur': {
		step: 1,
		min: 1,
		max: 100,
	},
	'line-width': {
		step: 1,
		min: 1,
		max: 100,
	},
};

export default function LayerPropertyForm({ paintProps = {}, setPaintProps }: Props) {
	const key = useRef(Math.round(Math.random() * 10000000000));
	//const onChange = (event) => {};

	const getFormInputByType = useCallback(
		(key: string) => {
			if (
				mapPropKeyToFormInputTypeKeys.indexOf(key) !== -1 &&
				(typeof paintProps[key] === 'number' || typeof paintProps[key] === 'string')
			) {
				const label = (
					<Typography id={key + '_label'} gutterBottom>
						{key}
					</Typography>
				);
				switch (mapPropKeyToFormInputType[key]) {
					case 'slider':
						return (
							<React.Fragment key={key}>
								{label}
								<Slider
									{...inputPropsByPropKey[key]}
									inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
									value={paintProps[key]}
									valueLabelDisplay="auto"
									onChange={(_ev: Event, value: number) => {
										if (value) {
											setPaintProps((current) => ({ ...current, [key]: value }));
										}
									}}
								/>
							</React.Fragment>
						);
						break;
					case 'numberfield':
						return (
							<React.Fragment key={key}>
								{label}
								<TextField
									inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
									value={paintProps[key]}
									onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
										if (ev?.target?.value) {
											setPaintProps((current) => ({
												...current,
												[key]: parseInt(ev.target.value),
											}));
										}
									}}
								/>
							</React.Fragment>
						);
						break;
					case 'colorpicker':
						return (
							<React.Fragment key={key}>
								{label}
								<Box sx={{ '& > div': { width: 'initial !important' } }}>
									<ColorPicker
										key={key}
										value={paintProps[key]}
										propKey={key}
										setPaintProps={setPaintProps}
									/>
								</Box>
							</React.Fragment>
						);
						break;
				}
			}
			return null;
		},
		[paintProps]
	);

	return (
		<>
			<Box
				sx={{
					marginLeft: '-100px',
					marginRight: '-20px',
					background: '#F5F5F5',
					paddingLeft: '115px',
				}}
			>
				<ListItem key={key + '_paintPropForm'}>
					<Box
						sx={{
							marginLeft: '61px',
						}}
					>
						{Object.keys(paintProps).map((el: string) => getFormInputByType(el))}
					</Box>
				</ListItem>
			</Box>
		</>
	);
}
