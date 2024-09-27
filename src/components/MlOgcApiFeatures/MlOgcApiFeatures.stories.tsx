import React, { useEffect, useRef, useState } from 'react';
import MapContextDecorator from '../../decorators/MapContextDecorator';
import MlOgcApiFeatures, {
	MlOgcApiFeaturesProps,
	OgcApiFeaturesParamsTypes,
} from './MlOgcApiFeatures';
import useMap from '../../hooks/useMap';
import TopToolbar from '../../ui_components/TopToolbar';
import Button from '@mui/material/Button';
import Sidebar from '../../ui_components/Sidebar';
import { FormControl, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import ColorPicker from '../../ui_components/ColorPicker/ColorPicker';

const storyoptions = {
	title: 'MapComponents/MlOgcApiFeatures',
	component: MlOgcApiFeatures,
	argTypes: {},
	decorators: MapContextDecorator,
};
export default storyoptions;

const PointTemplate = (props: MlOgcApiFeaturesProps) => {
	const [showLayer, setShowLayer] = useState(true);
	const mapHook = useMap({
		mapId: props.mapId,
	});
	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
		mapHook.map.map.jumpTo({ center: [7.100175528281227, 50.73487992742369], zoom: 8 });
	}, [mapHook.map]);

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						color="primary"
						variant={showLayer ? 'contained' : 'outlined'}
						onClick={() => setShowLayer(!showLayer)}
					>
						OGC API Feature Points
					</Button>
				}
			/>
			<MlOgcApiFeatures
				visible={showLayer}
				ogcApiUrl={props.ogcApiUrl}
				mapId={props.mapId}
				ogcApiFeatureParams={props.ogcApiFeatureParams}
				reloadFeaturesOnMapMove={true}
			></MlOgcApiFeatures>
		</>
	);
};
export const Point = PointTemplate.bind({});
Point.parameters = {};
Point.args = {
	ogcApiUrl: 'https://geo.kreis-viersen.de/ows/osm-daten/wfs3/collections/hoflaeden_nrw/items.json',
	mapId: 'map_1',
	ogcApiFeatureParams: {
		limit: 100,
	} as OgcApiFeaturesParamsTypes,
};

const OGCLoaderTemplate = (props: MlOgcApiFeaturesProps) => {
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

	const [openSidebar, setOpenSidebar] = useState(true);
	const [color, setColor] = useState<string>('#0E8A0E');
	const [opacity, setOpacity] = useState<number>(0.8);
	const [geomType, setGeomType] = useState<'fill' | 'circle' | 'line'>('fill');
	const [lineWidth, setLineWidth] = useState<number>(6);
	const [ogcApiUrl, setOgcApiUrl] = useState(
		'https://demo.ldproxy.net/vineyards/collections/vineyards/items?f=json&limit=100&region=Rheinhessen'
	);
	const mapHook = useMap({
		mapId: props.mapId,
	});
	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
		mapHook.map.map.jumpTo({ center: [8.1186, 49.8487], zoom: 10 });
	}, [mapHook.map]);
	const handleColorChange = (value: string) => {
		setColor(value);
	};

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<Button
						color="primary"
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
					>
						OGC API Feature Loader
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'OGC API Feature Loader'}>
				<FormControl fullWidth sx={{ marginTop: '10px' }}>
					<TextField
						label="OGC API Features URL"
						variant="standard"
						value={ogcApiUrl}
						onChange={(ev) => setOgcApiUrl(ev.target.value)}
						sx={{ marginBottom: '10px' }}
					/>
				</FormControl>

				<Typography variant={'h5'}>Style Feature</Typography>
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
					onChange={(_, v) => {
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
					disabled={geomType !== 'line'}
				/>
			</Sidebar>
			{
				//only render if valid url
				(() => {
					try {
						return !!new URL(ogcApiUrl);
					} catch {
						return false;
					}
				})() && (
					<MlOgcApiFeatures
						ogcApiUrl={new URL(ogcApiUrl)}
						mapId={props.mapId}
						defaultPaintOverrides={{
							fill: { 'fill-color': color, 'fill-opacity': opacity },
							circle: { 'circle-color': color, 'circle-opacity': opacity },
							line: { 'line-color': color, 'line-opacity': opacity, 'line-width': lineWidth },
						}}
						type={geomType}
					></MlOgcApiFeatures>
				)
			}
		</>
	);
};
export const OgcApiLoader = OGCLoaderTemplate.bind({});
OgcApiLoader.parameters = {};
OgcApiLoader.args = {
	mapId: 'map_1',
};
