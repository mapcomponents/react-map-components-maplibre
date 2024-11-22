import React, { useState, useMemo, useRef, useEffect } from 'react';
import Sidebar from '../../../ui_components/Sidebar';
import {
	Select,
	Typography,
	Slider,
	Stack,
	FormControl,
	MenuItem,
	Checkbox,
	ListItemText,
	SelectChangeEvent,
} from '@mui/material';
import ColorPicker from '../../../ui_components/ColorPicker/ColorPicker';
import MlGeoJsonLayer from '../MlGeoJsonLayer';
import {GeoJSON, FeatureCollection} from 'geojson';
import useMap from '../../../hooks/useMap';

interface LineStylerProps {
	geojson: GeoJSON;
	openSidebar: boolean;
	setOpenSidebar: (open: boolean) => void;
}

interface Mark {
	value: number;
	label: string;
}

const streetNames: string[] = [
	'Show all',
	'In der Sürst',
	'Münsterplatz',
	'Poststraße',
	'Mauspfad',
	'Remiglustraße',
	'Windeckstraße',
];

const marks: Mark[] = [
	{ value: 0, label: '0%' },
	{ value: 0.25, label: '25%' },
	{ value: 0.5, label: '50%' },
	{ value: 0.75, label: '75%' },
	{ value: 1, label: '100%' },
];

const widthMarks: Mark[] = [
	{ value: 0, label: '0' },
	{ value: 5, label: '5' },
	{ value: 10, label: '10' },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const LineStyler: React.FC<LineStylerProps> = ({ geojson, openSidebar, setOpenSidebar }) => {
	const [color, setColor] = useState<string>('#2485C1');
	const [opacity, setOpacity] = useState<number>(0.8);
	const [featuresToShow, setFeaturesToShow] = useState<string[]>(['Show all']);
	const [lineWidth, setLineWidth] = useState<number>(5);

	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [7.100175528281227, 50.73487992742369], zoom: 15.5 });
	}, [mapHook.map]);

	const storyGeoJson = useMemo(() => {
		if (featuresToShow.includes('Show all')) {
			return geojson;
		}
		return {
			type: 'FeatureCollection',
			features: (geojson as FeatureCollection).features.filter((item) =>
				featuresToShow.includes(item?.properties?.name)
			),
		};
	}, [featuresToShow, geojson]);

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		setFeaturesToShow(
			typeof event.target.value === 'string'
				? event.target.value.split(',')
				: (event.target.value as string[])
		);
	};

	const handleColorChange = (value: string) => {
		setColor(value);
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name="GeoJson Layer">
				<Stack paddingTop={5} spacing={3} direction="column" sx={{ mb: 15 }} alignItems="left">
					<Typography>Feature to show:</Typography>

					<FormControl>
						<Select
							id="demo-multiple-checkbox"
							multiple
							native={false}
							value={featuresToShow}
							onChange={handleChange}
							renderValue={(selected) => selected.join(', ')}
							MenuProps={MenuProps}
						>
							{streetNames?.map((name) => (
								<MenuItem key={name} value={name}>
									<Checkbox checked={featuresToShow.indexOf(name || 'Show All') > -1} />
									<ListItemText primary={name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Typography>Display color:</Typography>
					<ColorPicker value={color} onChange={handleColorChange} />

					<Typography>Opacity:</Typography>
					<Slider
						value={opacity}
						aria-label="Default"
						max={1}
						min={0}
						step={0.1}
						marks={marks}
						onChange={(_e, v) => {
							setOpacity(v as number);
						}}
					/>
					<Typography paddingTop={4}>Stroke:</Typography>
					<Slider
						value={lineWidth}
						aria-label="Default"
						max={10}
						min={0}
						step={1}
						marks={widthMarks}
						onChange={(_e, v) => {
							setLineWidth(v as number);
						}}
					/>
				</Stack>
			</Sidebar>

			<MlGeoJsonLayer
				geojson={storyGeoJson as GeoJSON.FeatureCollection}
				layerId="Linestring"
				type="line"
				defaultPaintOverrides={{
					line: {
						'line-color': color,
						'line-opacity': opacity,
						'line-width': lineWidth,
					},
				}}
			/>
		</>
	);
};

export default LineStyler;
