import React, { useRef, useCallback } from 'react';
import {
	CircleLayerSpecification,
	FillLayerSpecification,
	LineLayerSpecification,
} from 'maplibre-gl';
import { Box, ListItem, Paper, Slider, TextField, Typography, styled } from '@mui/material';
import ColorPicker from './input/ColorPicker';

const PaperStyled = styled(Paper)({
	marginLeft: '-100px',
	marginRight: '-21px',
	paddingLeft: '53px',
	borderRadius: '0px',
	boxShadow: 'none',
	backgroundColor: 'rgb(0, 0, 0, 0)',
});
const BoxStyled = styled(Box)({
	marginLeft: '61px',
});

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

export type paintPropsType =
	| CircleLayerSpecification['paint']
	| FillLayerSpecification['paint']
	| LineLayerSpecification['paint'];

interface LayerPropertyFormProps {
	paintProps: paintPropsType;
	setPaintProps: (
		paintProps: paintPropsType | ((current: paintPropsType) => paintPropsType)
	) => void;
	layerType: string;
}

function LayerPropertyForm({ paintProps = {}, setPaintProps }: LayerPropertyFormProps) {
	const key = useRef(Math.round(Math.random() * 10000000000));

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
			<PaperStyled>
				<ListItem key={key + '_paintPropForm'}>
					<BoxStyled>
						{Object.keys(paintProps).map((el: string) => getFormInputByType(el))}
					</BoxStyled>
				</ListItem>
			</PaperStyled>
		</>
	);
}
export default LayerPropertyForm;
