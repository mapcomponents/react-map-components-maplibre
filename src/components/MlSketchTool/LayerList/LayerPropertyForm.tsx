import {
	CircleLayerSpecification,
	FillLayerSpecification,
	LineLayerSpecification,
} from 'maplibre-gl';
import React, { useRef } from 'react';
import ColorPicker from './ColorPicker';
import { ListItem, Slider, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

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

const mapLayerTypeToPaintProps = {
	circle: ['circle-color'],
	line: ['line-color', 'line-width', 'line-blur'],
	fill: ['fill-color'],
};
const mapPropKeyToFormInputType = {
	'line-color': 'colorpicker',
	'line-width': 'slider',
	'line-blur': 'slider',
	'fill-color': 'colorpicker',
	'circle-color': 'colorpicker',
};
const mapPropKeyToFormInputTypeKeys = Object.keys(mapPropKeyToFormInputType);

const inputPropsByPropKey = {
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

	const getFormInputByType = (key: string, value: any) => {
		if (mapPropKeyToFormInputTypeKeys.indexOf(key) !== -1) {
			const label = (
				<Typography id={key + '_label'} gutterBottom>
					{key}
				</Typography>
			);
			switch (mapPropKeyToFormInputType[key]) {
				case 'slider':
					return (
						<>
							{label}
							<Slider
								{...inputPropsByPropKey[key]}
								inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
								value={paintProps[key]}
								onChange={(ev: Event, value: number, activeThumb) => {
									if (value) {
										setPaintProps((current) => ({ ...current, [key]: value }));
									}
								}}
							/>
						</>
					);
					break;
				case 'numberfield':
					return (
						<>
							{label}
							<TextField
								inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
								value={paintProps[key]}
								onChange={(ev: React.ChangeEvent) => {
									if (ev?.target?.value) {
										setPaintProps((current) => ({ ...current, [key]: parseInt(ev.target.value) }));
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
								key={key}
								value={paintProps[key]}
								propKey={key}
								setPaintProps={setPaintProps}
							/>
						</>
					);
					break;
			}
		}
		return null;
	};

	return (
		<>
			<ListItem
				sx={{ boxShadow: 'inset 0px 0px 10px rgb(50 50 50 / 10%)', borderRadius: '5px' }}
				key={key + '_paintPropForm'}
			>
				<Box>
					{Object.keys(paintProps).map((el: string) => getFormInputByType(el, paintProps[el]))}
				</Box>
			</ListItem>
		</>
	);
}
