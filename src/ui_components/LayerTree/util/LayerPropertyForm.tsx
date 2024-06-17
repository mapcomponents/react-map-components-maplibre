import React, { useRef, useCallback, useMemo } from 'react';
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
	TextField,
	Typography,
	styled,
} from '@mui/material';
import ColorPicker from './input/ColorPicker';
import {
	getLayerByUuid,
	LayerConfig,
	RootState,
	setLayerInMapConfig,
} from '../../../stores/map.store';
import { useDispatch, useSelector } from 'react-redux';
import { MlGeoJsonLayerProps } from 'src/components/MlGeoJsonLayer/MlGeoJsonLayer';

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
	mapConfigKey: string;
}

function LayerPropertyForm(props: LayerPropertyFormProps) {
	const key = useRef(Math.round(Math.random() * 10000000000));
	const layer = getLayerByUuid(
		useSelector((state: RootState) => state.mapConfig),
		props.layerUuid
	);
	const dispatch = useDispatch();

	const paintProps = useMemo(() => {
		if ((layer?.config as MlGeoJsonLayerProps | undefined)?.options?.paint) {
			return (layer?.config as MlGeoJsonLayerProps | undefined)?.options?.paint;
		}
		return {};
	}, [(layer?.config as MlGeoJsonLayerProps | undefined)?.options?.paint]);

	const updatePaintProp = (key: keyof paintPropsType, value: number | string) => {
		const updatedLayer = {
			...layer,
			config: {
				...layer?.config,
				options: {
					...(layer?.config as MlGeoJsonLayerProps | undefined)?.options,
					paint: {
						...(layer?.config as MlGeoJsonLayerProps | undefined)?.options?.paint,
						[key]: value,
					},
				},
			},
		} as LayerConfig;

		dispatch(
			setLayerInMapConfig({
				mapConfigKey: props.mapConfigKey,
				layer: updatedLayer,
			})
		);
	};

	const getFormInputByType = useCallback(
		(key: keyof paintPropsType) => {
			if (
				paintProps?.[key] &&
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
									{...(inputPropsByPropKey[key] as SliderProps)}
									value={paintProps[key] as number | number[] | undefined}
									valueLabelDisplay="auto"
									onChange={(_ev: Event, value: number) => {
										if (value) {
											updatePaintProp(key, value);
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
											updatePaintProp(key, parseInt(ev.target.value));
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
										value={paintProps[key] as string}
										onChange={(value: string) => {
											updatePaintProp(key, value);
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
		[paintProps]
	);

	return (
		<>
			<PaperStyled>
				<ListItem key={key.current + '_paintPropForm'}>
					<BoxStyled>
						{paintProps &&
							Object.keys(paintProps).map((el: keyof paintPropsType) => getFormInputByType(el))}
					</BoxStyled>
				</ListItem>
			</PaperStyled>
		</>
	);
}
export default LayerPropertyForm;
