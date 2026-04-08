import React, { useCallback, useMemo, useRef } from 'react';
import {
	CircleLayerSpecification,
	FillLayerSpecification,
	LineLayerSpecification,
} from 'maplibre-gl';
import {
	Box,
	ListItem,
	Paper,
	Slider,
	SliderProps,
	styled,
	TextField,
	Typography,
} from '@mui/material';
import ColorPicker from './input/ColorPicker';
import {
	LayerConfig,
	useLayerByUuid,
	setLayerInMapConfig,
} from '../../../stores/map.store';
import { MlGeoJsonLayerProps } from '../../../components/MlGeoJsonLayer/MlGeoJsonLayer';

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

const mapPropKeyToFormInputType: { [key: string]: string } = {
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

const inputPropsByPropKey: { [key: string]: { [propKey: string]: number | string } } = {
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
	layerUuid: string;
	mapId: string;
}

function LayerPropertyForm(props: LayerPropertyFormProps) {
	const key = useRef(Math.round(Math.random() * 10000000000));
	const layer = useLayerByUuid(props.mapId, props.layerUuid);

	const paintProps = useMemo(() => {
		if ((layer?.config as MlGeoJsonLayerProps | undefined)?.options?.paint) {
			return (layer?.config as MlGeoJsonLayerProps | undefined)?.options?.paint;
		}
		return {};
	}, [(layer?.config as MlGeoJsonLayerProps | undefined)?.options?.paint]);

	const updatePaintProp = useCallback(
(propKey: keyof paintPropsType, value: number | string) => {
			const updatedLayer = {
				...layer,
				config: {
					...layer?.config,
					options: {
						...(layer?.config as MlGeoJsonLayerProps | undefined)?.options,
						paint: {
							...(layer?.config as MlGeoJsonLayerProps | undefined)?.options?.paint,
							[propKey]: value,
						},
					},
				},
			} as LayerConfig;

			setLayerInMapConfig(props.mapId, updatedLayer);
		},
		[layer, props.mapId]
	);

	const getFormInputByType = useCallback(
(formKey: keyof paintPropsType) => {
			if (
				paintProps?.[formKey] &&
				mapPropKeyToFormInputTypeKeys.indexOf(formKey) !== -1 &&
				(typeof paintProps[formKey] === 'number' || typeof paintProps[formKey] === 'string')
			) {
				const label = (
<Typography id={formKey + '_label'} gutterBottom>
						{formKey}
					</Typography>
				);
				switch (mapPropKeyToFormInputType[formKey]) {
					case 'slider':
						return (
<React.Fragment key={formKey}>
								{label}
								<Slider
									{...(inputPropsByPropKey[formKey] as SliderProps)}
									value={paintProps[formKey] as number | number[] | undefined}
									valueLabelDisplay="auto"
									onChange={(_ev: Event, value: number | number[]) => {
										if (value && typeof value === 'number') {
											updatePaintProp(formKey, value);
										}
									}}
								/>
							</React.Fragment>
						);
						break;
					case 'numberfield':
						return (
<React.Fragment key={formKey}>
								{label}
								<TextField
									inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
									value={paintProps[formKey]}
									onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
										if (ev?.target?.value) {
											updatePaintProp(formKey, parseInt(ev.target.value));
										}
									}}
								/>
							</React.Fragment>
						);
						break;
					case 'colorpicker':
						return (
<React.Fragment key={formKey}>
								{label}
								<Box sx={{ '& > div': { width: 'initial !important' } }}>
									<ColorPicker
										key={formKey}
										value={paintProps[formKey] as string}
										onChange={(value: string) => {
											updatePaintProp(formKey, value);
										}}
									/>
								</Box>
							</React.Fragment>
						);
						break;
				}
			}
			return null;
		},
		[paintProps, updatePaintProp]
	);

	return (
<>
			<PaperStyled>
				<ListItem key={key.current + '_paintPropForm'}>
					<BoxStyled>
						{paintProps &&
							Object.keys(paintProps).map((el: string) =>
								getFormInputByType(el as keyof paintPropsType)
							)}
					</BoxStyled>
				</ListItem>
			</PaperStyled>
		</>
	);
}
export default React.memo(LayerPropertyForm);
