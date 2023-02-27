import React, { useState, useMemo } from 'react';
import Sidebar from '../../../ui_components/Sidebar';
import { Select, Typography, Slider, Stack, MenuItem, FormControl } from '@mui/material';
import { ColorPicker } from 'mui-color';
import MlGeoJsonLayer from '../MlGeoJsonLayer';
import TopToolbar from '../../../ui_components/TopToolbar';

/*
const FeatureNames = () => {
	const names = ['Show all', 'Hofgarten', 'Stadtgarten', 'Opernplatz', 'Keiserplatz'];
	return names.map((item) => {
		console.log(item);
		return (
			<>
				<MenuItem key={item} value={`"${item}"`}>
					{item}
				</MenuItem>
			</>
		);
	});
};
*/

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

const sidebarSx = {
	top: '64px',
	width: {
		xs: '80%',
		sm: '60%',
		md: '350px',
		lg: '350px',
	},
	boxSizing: 'border-box',
};

const PolygonStyler = (props) => {
	const [color, setColor] = useState('#2485C1');
	const [opacity, setOpacity] = useState(0.8);
	const [featureToShow, setFeatureToShow] = useState('Show all');
	const [geomType, setGeomType] = useState('fill');
	const [lineWidth, setLineWidth] = useState(6);

	const storyGeoJson = useMemo(() => {
		if (featureToShow === 'Show all') {
			return props.geojson;
		}
		return {
			type: 'FeatureCollection',
			features: props.geojson.features.filter((item) => item.properties.name === featureToShow),
		};
	}, [featureToShow, props.geojson]);

	const handleColorChange = (e) => {
		setColor(`#${e.hex}`);
	};
	const [openSidebar, setOpenSidebar] = useState(true);

	return (
		<>
			<TopToolbar
				buttons={
					<MenuItem onClick={() => setOpenSidebar(!openSidebar)}>
						<Typography textAlign="center">GeoJson Layer Polygon</Typography>
					</MenuItem>
				}
			/>
			<Sidebar
				drawerPaperProps={{ sx: sidebarSx }}
				open={openSidebar}
				setOpen={setOpenSidebar}
				name={'GeoJson Layer Polygon'}
			>
				<Stack paddingTop={5} spacing={3} direction="column" sx={{ mb: 15 }} alignItems="left">
					<FormControl>
						<Typography>Geometry type:</Typography>
						<Select
							value={geomType}
							onChange={(e) => {
								setGeomType(e.target.value);
								console.log(e.target.value);
							}}
						>
							<MenuItem value={'fill'} key={1}>
								fill
							</MenuItem>
							<MenuItem value={'circle'} key={2}>
								circle
							</MenuItem>
							<MenuItem value={'line'} key={3}>
								line
							</MenuItem>
						</Select>
					</FormControl>
					<Typography>Feature to show:</Typography>
					<FormControl>
						<Select
							value={featureToShow}
							onChange={(e) => {
								setFeatureToShow(e.target.value);
								console.log(e.target.value);
							}}
						>
							<MenuItem value={'Show all'} key={1}>
								Show all
							</MenuItem>
							<MenuItem value={'Hofgarten'} key={2}>
								Hofgarten
							</MenuItem>
							<MenuItem value={'Stadtgarten'} key={3}>
								Stadtgarten
							</MenuItem>
							<MenuItem value={'Opernplatz'} key={4}>
								Opernplatz
							</MenuItem>
							<MenuItem value={'Keiserplatz'} key={5}>
								Keiserplatz
							</MenuItem>
						</Select>
					</FormControl>
					<Typography>Display color:</Typography>
					<ColorPicker value={color} onChange={handleColorChange} />

					<Typography>Opacity:</Typography>
					<Slider
						defaultValue={1}
						aria-label="Default"
						value={opacity}
						max={1}
						min={0}
						step={0.01}
						marks={marks}
						onChange={(e) => {
							setOpacity(e.target.value);
							console.log(e);
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
						disabled={geomType !== 'line'}
					/>
				</Stack>
			</Sidebar>

			<MlGeoJsonLayer
				geojson={storyGeoJson}
				defaultPaintOverrides={{
					fill: {
						'fill-color': color,
						'fill-opacity': opacity,
					},
					circle: {
						'circle-color': color,
						'circle-opacity': opacity,
					},
					line: {
						'line-color': color,
						'line-opacity': opacity,
						'line-width': lineWidth,
					},
				}}
				type={geomType}
			/>
		</>
	);
};

export default PolygonStyler;
