import React, { useState, useMemo, useRef, useEffect } from 'react';
import Sidebar from '../../../ui_components/Sidebar';
import { Select, Typography, Slider, Stack, MenuItem, FormControl } from '@mui/material';
import ColorPicker from '../../../ui_components/ColorPicker/ColorPicker';
import MlGeoJsonLayer from '../MlGeoJsonLayer';
import useMap from '../../../hooks/useMap';
import {FeatureCollection, Feature} from 'geojson';
interface PolygonStylerProps {
	geojson: FeatureCollection;
	openSidebar: boolean;
	setOpenSidebar: (open: boolean) => void;
}

interface Mark {
	value: number;
	label: string;
}

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

const PolygonStyler: React.FC<PolygonStylerProps> = ({ geojson, openSidebar, setOpenSidebar }) => {
	const [color, setColor] = useState<string>('#2485C1');
	const [opacity, setOpacity] = useState<number>(0.8);
	const [featureToShow, setFeatureToShow] = useState<string>('Show all');
	const [geomType, setGeomType] = useState<'fill' | 'circle' | 'line'>('fill');
	const [lineWidth, setLineWidth] = useState<number>(6);

	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [7.100175528281227, 50.73487992742369], zoom: 16 });
	}, [mapHook.map]);

	const storyGeoJson = useMemo(() => {
		if (featureToShow === 'Show all') {
			return geojson;
		}
		return {
			type: 'FeatureCollection',
			features: geojson.features.filter(
				(item: Feature) => item.properties?.name === featureToShow
			),
		};
	}, [featureToShow, geojson]);

	const handleColorChange = (value: string) => {
		setColor(value);
	};

	return (
		<>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'GeoJson Layer Polygon'}>
				<Stack paddingTop={5} spacing={3} direction="column" sx={{ mb: 15 }} alignItems="left">
					<FormControl>
						<Typography>Geometry type:</Typography>
						<Select
							value={geomType}
							onChange={(e) => {
								setGeomType(e.target.value as 'fill' | 'circle' | 'line');
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
						onChange={(e, v) => {
							setOpacity(v as number);
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
						onChange={(_e, v) => {
							setLineWidth(v as number);
						}}
						disabled={geomType !== 'line'}
					/>
				</Stack>
			</Sidebar>

			<MlGeoJsonLayer
				geojson={storyGeoJson as FeatureCollection}
				defaultPaintOverrides={{
					fill: { 'fill-color': color, 'fill-opacity': opacity },
					circle: { 'circle-color': color, 'circle-opacity': opacity },
					line: { 'line-color': color, 'line-opacity': opacity, 'line-width': lineWidth },
				}}
				type={geomType}
			/>
		</>
	);
};

export default PolygonStyler;
