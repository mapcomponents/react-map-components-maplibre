import React, { useRef, useEffect, useState, useMemo } from 'react';
import Sidebar from '../../../ui_components/Sidebar';
import {
	TextField,
	Select,
	Typography,
	Slider,
	Stack,
	FormControl,
	MenuItem,
	Checkbox,
	InputLabel,
	OutlinedInput,
	ListItemText,
} from '@mui/material';
import { ColorPicker } from 'mui-color';
import MlGeoJsonLayer from '../MlGeoJsonLayer';
import useMap from '../../../hooks/useMap';

const streetNames = [
	'Show all',
	'In der Sürst',
	'Münsterplatz',
	'Poststraße',
	'Mauspfad',
	'Remiglustraße',
	'Windeckstraße',
];
const types = ['line', 'fill', 'circle'];
const marks = [
	{
		value: 0,
		label: '0%',
	},
	{
		value: 0.25,
		label: '25%',
	},
	{
		value: 0.5,
		label: '50%',
	},
	{
		value: 0.75,
		label: '75%',
	},
	{
		value: 1,
		label: '100%',
	},
];
const widthMarks = [
	{
		value: 0,
		label: '0',
	},
	{
		value: 5,
		label: '5',
	},
	{
		value: 10,
		label: '10',
	},
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

const LineStyler = (props) => {
	const [color, setColor] = useState('#2485C1');
	const [opacity, setOpacity] = useState(0.8);
	const [featuresToShow, setFeaturesToShow] = useState(['Show all']);
	const [lineWidth, setLineWidth] = useState(5);

	var showIndex = featuresToShow.length;

	const storyGeoJson = useMemo(() => {
		if (featuresToShow[0] === 'Show all') {
			return props.geojson;
		}
		return {
			type: 'FeatureCollection',
			features: props.geojson.features.filter((item) => {
				for (var i = 0; i < featuresToShow.length; i++) {
					if (item.properties.name === featuresToShow[i]) {
						return item;
					}
				}
			}),
		};
	}, [featuresToShow, props.geojson]);

	const mapHook = useMap({ mapId: "map_1", waitForLayer: "Linestring" });

	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setFeaturesToShow(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
		console.log(featuresToShow);
	};

	const handleColorChange = (e) => {
		setColor(`#${e.hex}`);
	};

	useEffect(() => {
		mapHook.map?.map.setCenter([7.099301807798469, 50.734214410085684]);
		mapHook.map?.map.setZoom(16.5);
	}, [mapHook.map]);

	return (
		<>
			<Sidebar>
				<Stack paddingTop={5} spacing={3} direction="column" sx={{ mb: 1 }} alignItems="left">
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
						onChange={(e) => {
							setOpacity(e.target.value);
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
						onChange={(e) => {
							setLineWidth(e.target.value);
						}}
					/>
				</Stack>
			</Sidebar>

			<MlGeoJsonLayer
				geojson={storyGeoJson}
				layerId={'Linestring'}
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
