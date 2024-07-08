import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { Feature, FeatureCollection, Geometry, GeometryCollection } from '@turf/turf';
import { DataDrivenPropertyValueSpecification, SymbolLayerSpecification } from 'maplibre-gl';
import { Typography, Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MlGeoJsonLayer, { MlGeoJsonLayerProps } from './MlGeoJsonLayer';

import sample_geojson_1 from './assets/sample_1.json';
import sample_geojson_2 from './assets/sample_2.json';
import wgLocations from './assets/wg_locations.json';
import earthquakes from './assets/earthquake.json';
import wgMarker from './assets/wgMarker.png';

import LineStyler from './story_utils/MlGeoJsonLayer.lineStyler';
import PolygonStyler from './story_utils/MlGeoJsonLayer.polygonStyler';

import TopToolbar from '../../ui_components/TopToolbar';
import useMap from '../../hooks/useMap';
import useAddProtocol from '../../hooks/useAddProtocol/useAddProtocol';
import geoJsonDecorator from '../../decorators/GeoJsonMapDecorator';
import { OSMProtocolHandler } from '../../protocol_handlers/osm';

const storyoptions = {
	title: 'MapComponents/MlGeoJsonLayer',
	component: MlGeoJsonLayer,
	argTypes: {},
	decorators: geoJsonDecorator,
};
export default storyoptions;

interface TemplateProps {
	geojson: Feature<Geometry | GeometryCollection>;
	mapId: string;
	type: string;
	openSidebar?: boolean;
	setOpenSidebar?: Dispatch<SetStateAction<boolean>>;
	title?: string;
}

const configTitles = {
	circle: 'WhereGroup locations by number of employees',
	symbol: 'WhereGroup locations by number of employees',
	heatmap: 'Earthquakes by magnitude in Alaska',
	polygon: 'Parks&Squares in Bonn',
};

const CircleTemplate = (props: MlGeoJsonLayerProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	const [selected, setSelected] = useState();

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [10.251805123900311, 51.11826171422632], zoom: 5 });
	}, [mapHook.map]);

	return (
		<>
			<MlGeoJsonLayer
				geojson={props.geojson}
				layerId="Circle"
				type="circle"
				options={{
					paint: {
						'circle-radius': {
							property: 'Mitarbeitende',
							stops: [
								[3, 6],
								[26, 35],
							],
						} as DataDrivenPropertyValueSpecification<number>,
						'circle-color': '#009EE0',
					},
				}}
				onClick={(ev: any) => {
					if (ev.features?.[0].properties.Standort === selected) {
						setSelected(undefined);
					} else {
						setSelected(ev.features[0].properties.Standort);
					}
				}}
				labelOptions={{
					minzoom: 5,
					maxzoom: 18,
				}}
			/>
		</>
	);
};

const OsmProtocolSourceDemo = () => {
	const mapHook = useMap({
		mapId: undefined,
	});

	useAddProtocol({
		protocol: 'osm',
		handler: OSMProtocolHandler,
	});

	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map?.jumpTo({ center: [2.651811, 39.571309], zoom: 16.5 });
	}, [mapHook.map]);

	return (
		<>
			<MlGeoJsonLayer
				type="line"
				defaultPaintOverrides={{
					line: {
						'line-color': '#009EE0',
						'line-width': 6,
					},
				}}
				options={{
					source: {
						type: 'geojson',
						data: `osm://osm/palma.osm?completeFeature=true&allFeatures=false&renderTagged=false&excludeWay=false&suppressWay=false`,
					},
				}}
				labelProp="name"
				labelOptions={{
					paint: {
						'text-color': '#ff0000',
					},
					minzoom: 5,
					maxzoom: 18,
				}}
			/>
		</>
	);
};

const LabelSbDemo = () => {
	const mapHook = useMap({
		mapId: undefined,
	});

	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map.map.flyTo({ center: [10.251805123900311, 51.11826171422632], zoom: 5 });
	}, [mapHook.map]);

	return (
		<>
			<MlGeoJsonLayer
				type="circle"
				geojson={wgLocations as FeatureCollection}
				options={{
					paint: {
						'circle-radius': {
							property: 'Mitarbeitende',
							stops: [
								[3, 6],
								[26, 35],
							],
						} as DataDrivenPropertyValueSpecification<number>,
						'circle-color': '#009EE0',
					},
				}}
				labelProp="Mitarbeitende"
				labelOptions={{
					minzoom: 5,
					maxzoom: 18,
				}}
			/>
		</>
	);
};

const LineTemplate = (props: TemplateProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [7.100175528281227, 50.73487992742369], zoom: 16 });
	}, [mapHook.map]);

	return (
		<>
			<MlGeoJsonLayer
				geojson={props.geojson}
				layerId="Linestring"
				type="line"
				defaultPaintOverrides={{
					line: {
						'line-color': '#2485C1',
						'line-opacity': 0.8,
						'line-width': 6,
					},
				}}
			/>
		</>
	);
};

const PolygonTemplate = (props: TemplateProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [7.105175528281227, 50.73348799274236], zoom: 15.5 });
	}, [mapHook.map]);

	return (
		<>
			<MlGeoJsonLayer
				geojson={props.geojson}
				layerId="Polygon"
				type="fill"
				defaultPaintOverrides={{
					fill: { 'fill-color': '#2485C1', 'fill-opacity': 0.8 },
				}}
			/>
		</>
	);
};

const HeatmapTemplate = (props: MlGeoJsonLayerProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [-150.4048, 63.1224], zoom: 3 });
	}, [mapHook.map]);

	return (
		<>
			<MlGeoJsonLayer
				geojson={props.geojson}
				type="heatmap"
				options={{
					// paint examples copied from https://maplibre.org/maplibre-gl-js-docs/example/heatmap-layer/
					paint: {
						// Increase the heatmap weight based on frequency and property magnitude
						'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
						// Increase the heatmap color weight by zoom level
						// heatmap-intensity is a multiplier on top of heatmap-weight
						'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
						// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
						// Begin color ramp at 0-stop with a 0-transparancy color
						// to create a blur-like effect.
						'heatmap-color': [
							'interpolate',
							['linear'],
							['heatmap-density'],
							0,
							'rgba(33,102,172,0)',
							0.2,
							'rgb(255,255,0)',
							0.4,
							'rgb(255,200,10)',
							0.6,
							'rgb(255,140,20)',
							0.8,
							'rgb(220,80,30)',
							1,
							'rgb(255,10,40)',
						],
						// Adjust the heatmap radius by zoom level
						'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
						// Transition from heatmap to circle layer by zoom level
						'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
					},
				}}
			/>
		</>
	);
};

const SymbolTemplate = (props: MlGeoJsonLayerProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [10.251805123900311, 51.11826171422632], zoom: 5 });
	}, [mapHook.map]);

	mapHook.map?.loadImage(wgMarker).then(function (res) {
		if (!res?.data) {
			console.log('image WG Marker could not be loaded');
			return;
		}
		mapHook.map?.addImage('wgLogo', res.data);
	});

	return (
		<>
			<MlGeoJsonLayer
				geojson={props.geojson}
				layerId="Symbol"
				type="symbol"
				options={
					{
						layout: {
							'icon-image': 'wgLogo',
							'icon-size': {
								property: 'Mitarbeitende',
								stops: [
									[3, 0.06],
									[26, 0.2],
								],
							},
						},
					} as SymbolLayerSpecification
				}
			/>
		</>
	);
};

const Template = (props: MlGeoJsonLayerProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [7.105175528281227, 50.73348799274236], zoom: 15.5 });
	}, [mapHook.map]);

	return (
		<>
			<MlGeoJsonLayer
				geojson={props.geojson}
				type={props.type}
				defaultPaintOverrides={{
					fill: {
						'fill-color': 'blue',
					},
					circle: {
						'circle-color': 'red',
					},
					line: {
						'line-color': 'black',
					},
				}}
			/>
		</>
	);
};
const catalogueTemplate = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const [selectedLayer, setSelectedLayer] = useState<string>('circle');

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLayerSelect = (layer: string) => {
		setSelectedLayer(layer);
	};

	return (
		<>
			<TopToolbar
				unmovableButtons={
					<>
						<Typography variant="h6" color={'ButtonText'} marginRight={'20px'}>
							{configTitles[selectedLayer]}
						</Typography>
						{(selectedLayer === 'polygon' || selectedLayer === 'line') && (
							<Button
								variant={openSidebar ? 'contained' : 'outlined'}
								sx={{ marginRight: '10px' }}
								onClick={() => setOpenSidebar(!openSidebar)}
							>
								Layer options
							</Button>
						)}
						<Button
							id="basic-button"
							variant="contained"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							Example Configs
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem onClick={() => handleLayerSelect('circle')}>Circle Configuration</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('line')}>Line Configuration</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('polygon')}>
								Polygon Configuration
							</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('heatmap')}>
								Heatmap Configuration
							</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('symbol')}>Symbol Configuration</MenuItem>
							<MenuItem onClick={() => handleLayerSelect('default')}>
								Default Paint Overrides
							</MenuItem>
						</Menu>
					</>
				}
			/>

			{selectedLayer === 'circle' && <CircleTemplate geojson={Circle.args.geojson} />}
			{selectedLayer === 'line' && (
				<LineStyler
					openSidebar={openSidebar}
					setOpenSidebar={setOpenSidebar}
					geojson={Linestring.args.geojson}
				/>
			)}
			{selectedLayer === 'polygon' && (
				<PolygonStyler
					openSidebar={openSidebar}
					setOpenSidebar={setOpenSidebar}
					geojson={Polygon.args.geojson}
				/>
			)}
			{selectedLayer === 'heatmap' && <HeatmapTemplate geojson={HeatMap.args.geojson} />}
			{selectedLayer === 'symbol' && <SymbolTemplate geojson={Symbol.args.geojson} />}
			{selectedLayer === 'default' && <Template geojson={DefaultPaintOverrides.args.geojson} />}
		</>
	);
};

export const Circle = CircleTemplate.bind({});
Circle.parameters = {};
Circle.args = {
	geojson: wgLocations,
	title: 'WhereGroup locations by number of employees',
};

export const OsmProtocol = OsmProtocolSourceDemo.bind({});
OsmProtocol.parameters = {};
OsmProtocol.args = {};

export const Label = LabelSbDemo.bind({});
Label.parameters = {};
Label.args = {};

export const Linestring = LineTemplate.bind({});
Linestring.parameters = {};
Linestring.args = {
	geojson: sample_geojson_2,
};

export const Polygon = PolygonTemplate.bind({});
Polygon.parameters = {};
Polygon.args = {
	geojson: sample_geojson_1,
	title: 'Parks & Squares in Bonn',
};

export const HeatMap = HeatmapTemplate.bind({});
HeatMap.parameters = {};
HeatMap.args = {
	geojson: earthquakes,
	title: 'Earthquakes by magnitude in Alaska',
};

export const Symbol = SymbolTemplate.bind({});
Symbol.parameters = {};
Symbol.args = {
	geojson: wgLocations,
	title: 'WhereGroup locations by number of employees',
};

export const DefaultPaintOverrides = Template.bind({});
DefaultPaintOverrides.parameters = {};
DefaultPaintOverrides.args = { geojson: sample_geojson_1, type: 'fill' };

export const CatalogueDemo = catalogueTemplate.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {};
