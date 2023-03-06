import {
	CircleLayerSpecification,
	FillLayerSpecification,
	LineLayerSpecification,
} from 'maplibre-gl';
import React, { useRef } from 'react';
import ColorPicker from './input/ColorPicker';
import { Box, ListItem, Paper, Slider, TextField, Typography } from '@mui/material';
import {useCallback} from 'react';

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
	'fill-color': 'colorpicker',
	'line-color': 'colorpicker',
	'line-width': 'slider',
	'line-blur': 'slider',
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

	const getFormInputByType = useCallback((key: string) => {
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
								onChange={(_ev: Event, value: number) => {
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
								onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
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
							<Box sx={{ '& > div': { width: 'initial !important' } }}>
								<ColorPicker
									key={key}
									value={paintProps[key]}
									propKey={key}
									setPaintProps={setPaintProps}
								/>
							</Box>
						</>
					);
					break;
			}
		}
		return null;
	},[paintProps]);

	return (
		<>
			<ListItem key={key + '_paintPropForm'}>
				<Paper
					sx={{
						padding: '15px',
						boxShadow: 'inset 0px 0px 10px rgb(50 50 50 / 10%)',
						borderRadius: '5px',
						width: '100%',
					}}
				>
					{Object.keys(paintProps).map((el: string) => getFormInputByType(el))}
				</Paper>
			</ListItem>
		</>
	);
}
