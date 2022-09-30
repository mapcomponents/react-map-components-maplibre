import React, { useRef, useEffect, useState, useMemo } from 'react';
import Sidebar from '../../../ui_components/Sidebar';
import { TextField, Select, Typography, Slider, Stack, MenuItem, FormControl } from '@mui/material';
import { ColorPicker } from 'mui-color';
import MlGeoJsonLayer from '../MlGeoJsonLayer';

const FeatureNames = () => {
	const names = ['Show all', 'Hofgarten', 'Stadtgarten', 'Opernplatz', 'Keiserplatz'];
	return names.map((item) => {
		return (
			<>
				<MenuItem value={item} key={item}> {item} </MenuItem>
			</>
		);
	});
};

//const types = ['line', 'fill', 'circle'];
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

const PolygonStyler = (props) => {
	const [color, setColor] = useState('#2485C1');
	const [opacity, setOpacity] = useState(0.8);
	const [featureToShow, setFeatureToShow] = useState('Show all');
	const [geomType, setGeomType] = useState('fill');

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

   const handleTypeChange = (e) => {
	setGeomType(e.target.value)
   } 

   const hadleFeatureChange = (e) => {
	console.log(e.target.value);
	setFeatureToShow(e.target.value)
   }


	return (
		<>
			<Sidebar>
				<Stack paddingTop={5} spacing={3} direction="column" sx={{ mb: 1 }} alignItems="left">
					<FormControl>
						<Typography>Geometry type:</Typography>
						<Select
							value={geomType}
							onClick={ 
								(e) => {
								setGeomType(e.target.innerText);
								console.log('show= ' + geomType);
						}}
						>
							<MenuItem value={"fill"} key={1}> fill </MenuItem>
							<MenuItem value={"circle"} key={2}> circle </MenuItem>
							<MenuItem value={"line"} key={3}> line </MenuItem>
						</Select>
					</FormControl>
					<Typography>Feature to show:</Typography>
					<Select
						value={featureToShow}
						onClick={hadleFeatureChange}
					>
						<FeatureNames />
					</Select>

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
					},
				}}
				type={geomType}
			/>
		</>
	);
};

export default PolygonStyler;
