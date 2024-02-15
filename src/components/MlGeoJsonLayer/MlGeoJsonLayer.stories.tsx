import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import MlGeoJsonLayer from './MlGeoJsonLayer';
import TopToolbar from '../../ui_components/TopToolbar';
import useMap from '../../hooks/useMap';
import geoJsonDecorator from '../../decorators/GeoJsonMapDecorator';
import PolygonStyler from './story_utils/MlGeoJsonLayer.polygonStyler';
import LineStyler from './story_utils/MlGeoJsonLayer.lineStyler';
import HeatMapStyler from './story_utils/MlGeojsonLayerHeatMapStyler';
import sample_geojson_1 from './assets/sample_1.json';
import sample_geojson_2 from './assets/sample_2.json';
import earthquakes from './assets/earthquake.json';
import wgLocations from './assets/wg_locations.json';
import { Feature, FeatureCollection, Geometry, GeometryCollection } from '@turf/turf';
import { MlGeoJsonLayerProps } from './MlGeoJsonLayer';
import CircleMapStyler from './story_utils/MlGeojsonLayerCircleStyler';
import { Typography, Button } from '@mui/material';
import wgMarker from './assets/wgMarker.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DataDrivenPropertyValueSpecification } from 'maplibre-gl';
import useAddProtocol from '../../hooks/useAddProtocol/useAddProtocol';
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
			<MlGeoJsonLayer {...props} />
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
			<LineStyler {...props} />
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
			<PolygonStyler {...props} />
		</>
	);
};

const CircleTemplate = (props: MlGeoJsonLayerProps) => {
	const mapHook = useMap({
		mapId: undefined,
	});

	const initializedRef = useRef(false);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;

		initializedRef.current = true;
		mapHook.map.map.flyTo({ center: [10.251805123900311, 51.11826171422632], zoom: 5 });
	}, [mapHook.map]);

	if (props.type === 'symbol') {
		mapHook.map?.loadImage(wgMarker, function (error, image: HTMLImageElement) {
			if (error) throw error;
			mapHook.map?.addImage('wgLogo', image);
		});
	}

	return (
		<>
			<CircleMapStyler {...props} />
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
			<HeatMapStyler {...props} />;
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

			{selectedLayer === 'circle' && (
				<CircleTemplate
					geojson={Circle.args.geojson}
					paint={Circle.args.paint}
					type={Circle.args.type}
				/>
			)}
			{selectedLayer === 'line' && (
				<LineTemplate
					openSidebar={openSidebar}
					setOpenSidebar={setOpenSidebar}
					geojson={Linestring.args.geojson}
					type={Linestring.args.type}
					mapId={Linestring.args.mapId}
				/>
			)}
			{selectedLayer === 'polygon' && (
				<PolygonTemplate
					openSidebar={openSidebar}
					setOpenSidebar={setOpenSidebar}
					geojson={Polygon.args.geojson}
					mapId={Polygon.args.mapId}
					type={Polygon.args.type}
				/>
			)}
			{selectedLayer === 'heatmap' && (
				<HeatmapTemplate
					geojson={HeatMap.args.geojson}
					mapId={HeatMap.args.mapId}
					type={HeatMap.args.type}
					options={HeatMap.args.options}
				/>
			)}
			{selectedLayer === 'symbol' && (
				<CircleTemplate
					geojson={Symbol.args.geojson}
					mapId={Symbol.args.mapId}
					type={Symbol.args.type}
					options={Symbol.args.options}
				/>
			)}
			{selectedLayer === 'default' && (
				<Template
					geojson={DefaultPaintOverrides.args.geojson}
					mapId={DefaultPaintOverrides.args.mapId}
					type={DefaultPaintOverrides.args.type}
					options={DefaultPaintOverrides.args.options}
				/>
			)}
		</>
	);
};

export const Circle = CircleTemplate.bind({});
Circle.parameters = {};
Circle.args = {
	geojson: wgLocations,
	title: 'WhereGroup locations by number of employees',
	paint: {
		'circle-radius': {
			property: 'Mitarbeitende',
			stops: [
				[3, 6],
				[26, 35],
			],
		},
		'circle-color': '#009EE0',
	},
	type: 'circle',
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

		mapHook.map?.jumpTo({ center: [2.651811, 39.571309], zoom: 16.5 } as JumpToOptions);
	}, [mapHook.map]);

	return (
		<>
			<MlGeoJsonLayer
				type="line"
				options={{
					source: {
						type: 'geojson',
						data: `osm://osm/palma.osm?completeFeature=true&allFeatures=false&renderTagged=false&excludeWay=false&suppressWay=false`,
					},
					paint: {
						'line-color': '#009EE0',
					},
				}}
				labelProp='name'
				labelOptions={{
					paint:{
						"text-color":'#ff0000'
					},
					minzoom: 5,
					maxzoom: 18,
				}}
			/>
		</>
	);
};

export const OsmProtocol = OsmProtocolSourceDemo.bind({});
OsmProtocol.parameters = {};
OsmProtocol.args = {};

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

export const Label = LabelSbDemo.bind({});
Label.parameters = {};
Label.args = {};

export const Linestring = LineTemplate.bind({});
Linestring.parameters = {};
Linestring.args = {
	geojson: sample_geojson_2,
	type: 'line',
};

export const Polygon = PolygonTemplate.bind({});

Polygon.args = {
	geojson: sample_geojson_1,
	type: 'polygon',
};

export const HeatMap = HeatmapTemplate.bind({});
HeatMap.parameters = {};
HeatMap.args = {
	geojson: earthquakes,
	title: 'Earthquakes by magnitude in Alaska',
	options: {
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
	},
	type: 'heatmap',
};

export const Symbol = CircleTemplate.bind({});
Symbol.parameters = {};
Symbol.args = {
	geojson: wgLocations,
	title: 'WhereGroup locations by number of employees',
	options: {
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
	},
	type: 'symbol',
};

export const DefaultPaintOverrides = Template.bind({});
DefaultPaintOverrides.parameters = {};
DefaultPaintOverrides.args = {
	defaultPaintOverrides: {
		fill: {
			'fill-color': 'blue',
		},
		circle: {
			'circle-color': 'red',
		},
		line: {
			'line-color': 'black',
		},
	},
	geojson: sample_geojson_1,
	type: '',
};
export const CatalogueDemo = catalogueTemplate.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {};
