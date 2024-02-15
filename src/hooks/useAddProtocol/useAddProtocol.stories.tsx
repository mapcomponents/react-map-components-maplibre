import React, { useContext, useEffect, useState } from 'react';
import {
	Cancelable,
	FlyToOptions,
	JumpToOptions,
	LayerSpecification,
	RequestParameters,
	ResponseCallback,
	StyleSpecification,
	VectorSourceSpecification,
} from 'maplibre-gl';
import { Box, Button, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

import { mbTilesProtocolHandler } from '../../protocol_handlers/mbtiles';
import { CSVProtocolHandler } from '../../protocol_handlers/csv';
import { TopojsonProtocolHandler } from '../../protocol_handlers/topojson';
import { OSMProtocolHandler } from '../../protocol_handlers/osm';
import { XMLProtocolHandler } from '../../protocol_handlers/xml';
import useAddProtocol from './useAddProtocol';
import EmptyMapDecorator from '../../decorators/EmptyMapDecorator';
import useMap from '../useMap';
import TopToolbar from '../../ui_components/TopToolbar';
import Sidebar from '../../ui_components/Sidebar';
import AddLayerButton from '../../ui_components/AddLayerButton/AddLayerButton';
import LayerContext from '../../contexts/LayerContext';
import LayerList from '../../ui_components/LayerList/LayerList';
import LayerListItemFactory from '../../ui_components/LayerList/LayerListItemFactory';
import bright from '../../omt_styles/bright';
import DemoDescriptions from '../../ui_components/DemoDescriptions';
import protocolDescriptions from './utils/useAddProtocolTexts.json';
import { MlGeoJsonLayerProps } from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import MlVectorTileLayer, {
	MlVectorTileLayerProps,
} from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import { csvOptions } from '../../protocol_handlers/csv2geojson';
import MlLayer from '../../components/MlLayer/MlLayer';
import { useLayerProps } from '../useLayer';
import useSource from '../useSource';

const storyoptions = {
	title: 'hooks/useAddProtocol',
	component: useAddProtocol,
	argTypes: {},
	decorators: EmptyMapDecorator,
};
export default storyoptions;

interface TemplateProps {
	protocol: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handler: (requestParameters: RequestParameters, callback: ResponseCallback<any>) => Cancelable;
	sourceId: string;
	filePath: string;
	type?: 'circle' | 'line' | 'fill';
	paint?: LayerSpecification['paint'];
	flyTo?: FlyToOptions;
	options?: csvOptions;
	insertBeforeLayer?: string;
	sourceOptions?: VectorSourceSpecification;
	layers?: LayerSpecification[];
}
const BackgroundLayers = () => {
	const layerContext = useContext(LayerContext);
	useEffect(() => {
		layerContext.updateStyle(bright as StyleSpecification);
	}, []);

	return (
		<div style={{ display: 'none' }}>
			<LayerList>
				<LayerListItemFactory
					layers={layerContext.layers}
					setLayers={layerContext.setLayers}
					insertBeforeLayer="useAddProtocolLayer"
					fitBoundsOptions={{ padding: { top: 50, bottom: 50, left: 25, right: 25 } }}
				/>
			</LayerList>
		</div>
	);
};

const MbtilesTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	useAddProtocol({
		protocol: 'mbtiles',
		handler: mbTilesProtocolHandler,
	});

	useEffect(() => {
		if (!mapHook.map) return;

		mapHook.map?.setZoom(0);
	}, [mapHook.map]);

	return (
		<>
			<MlVectorTileLayer
				mapId={'map_1'}
				url={'mbtiles://mbtiles/countries.mbtiles/{z}/{x}/{y}'}
				layers={
					[
						{
							id: 'countries',
							type: 'fill',
							'source-layer': 'countries',
							layout: {},
							paint: { 'fill-color': '#f9a5f5', 'fill-opacity': 0.5 },
						},
					] as unknown as LayerSpecification[]
				}
				insertBeforeLayer={'waterway-name'}
				sourceOptions={{
					type: 'vector',
					minzoom: 0,
					maxzoom: 1,
				}}
			/>

			<BackgroundLayers />
		</>
	);
};
export const MbTiles = MbtilesTemplate.bind({});
MbTiles.parameters = {
	name: 'MBTiles',
};
MbTiles.args = {};

const CsvTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	//  An optional encoded options object can be added after a '?' sign at the end of the url.
	//  Handlers that support options are:
	// -CSV/TSV Handler Options: https://github.com/mapbox/csv2geojson/blob/gh-pages/README.md

	useAddProtocol({
		protocol: 'csv',
		handler: CSVProtocolHandler,
	});

	useEffect(() => {
		if (!mapHook.map?.getSource('csv-source')) {
			mapHook.map?.addSource('csv-source', {
				type: 'geojson',
				data: `csv://csv/restaurants.csv`,
			});
		}
		mapHook.map?.jumpTo({ center: [-74.914516, 38.935759], zoom: 13 } as JumpToOptions);
	}, [mapHook.map]);

	return (
		<>
			<MlLayer
				layerId={'UseAddProtocolLayer'}
				options={
					{
						type: 'circle',
						source: 'csv-source',
						paint: {
							'circle-color': '#009EE0',
							'circle-stroke-color': '#F0f0f0',
							'circle-stroke-width': 2,
							'circle-radius': 18,
						},
					} as useLayerProps['options']
				}
				insertBeforeLayer={'waterway-name'}
			/>

			<BackgroundLayers />
		</>
	);
};

export const CSVOrTSV = CsvTemplate.bind({});
CSVOrTSV.parameters = {};
CSVOrTSV.args = {};

const CsvOptionsTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	//  An optional encoded options object can be added after a '?' sign at the end of the url.
	//  Handlers that support options are:
	// -CSV/TSV Handler Options: https://github.com/mapbox/csv2geojson/blob/gh-pages/README.md

	useAddProtocol({
		protocol: 'csv',
		handler: CSVProtocolHandler,
	});

	useEffect(() => {
		if (!mapHook.map?.getSource('csv-source')) {
			const options = '?latfield=Axe-y&lonfield=Axe-x&delimiter=:';

			mapHook.map?.addSource('csv-source', {
				type: 'geojson',
				data: `csv://csv/gemany_100_postcodes.csv${options}`,
			});
		}
		mapHook.map?.jumpTo({ center: [10.147049, 50.871231], zoom: 6, speed: 2 } as JumpToOptions);
	}, [mapHook.map]);

	return (
		<>
			<MlLayer
				layerId={'UseAddProtocolLayer'}
				options={
					{
						type: 'circle',
						source: 'csv-source',
						paint: {
							'circle-color': '#009EE0',
							'circle-stroke-color': '#F0f0f0',
							'circle-stroke-width': 2,
							'circle-radius': 18,
						},
					} as useLayerProps['options']
				}
				insertBeforeLayer={'waterway-name'}
			/>

			<BackgroundLayers />
		</>
	);
};
export const CSVWithOptions = CsvOptionsTemplate.bind({});
CSVWithOptions.parameters = {};
CSVWithOptions.args = {};

const OsmTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	//  An optional encoded options object can be added after a '?' sign at the end of the url.
	//  Handlers that support options are:
	// -OSM Handler Options: https://github.com/tibetty/osm2geojson-lite#osm2geojsonosm-opts

	useAddProtocol({
		protocol: 'osm',
		handler: OSMProtocolHandler,
	});

	useSource({
		sourceId: 'osm-source',
		source: {
			type: 'geojson',
			data: `osm://osm/palma.osm?completeFeature=true&allFeatures=false&renderTagged=false&excludeWay=false&suppressWay=false`,
		},
	});

	useEffect(() => {
		if (!mapHook.map?.getSource('osm-source')) {
			//mapHook.map?.addSource('osm-source', {
			//	type: 'geojson',
			//	data: `osm://osm/palma.osm${options}`,
			//});
		}
		mapHook.map?.jumpTo({ center: [2.651811, 39.571309], zoom: 16.5 } as JumpToOptions);
	}, [mapHook.map]);

	return (
		<>
			<MlLayer
				layerId={'UseAddProtocolLayer'}
				options={
					{
						type: 'line',
						source: 'osm-source',
						paint: {
							'line-color': '#9a00ff',
						},
					} as useLayerProps['options']
				}
				insertBeforeLayer={'waterway-name'}
			/>

			<BackgroundLayers />
		</>
	);
};

export const OSM = OsmTemplate.bind({});
OSM.parameters = {};
OSM.args = {};

const GpxTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	useAddProtocol({
		protocol: 'gpx',
		handler: XMLProtocolHandler,
	});

	useEffect(() => {
		if (!mapHook.map?.getSource('gpx-source')) {
			mapHook.map?.addSource('gpx-source', {
				type: 'geojson',
				data: `gpx://gpx/santiago.gpx`,
			});
		}
		mapHook.map?.jumpTo({ center: [-5.100251, 42.887371], zoom: 7 } as JumpToOptions);
	}, [mapHook.map]);

	return (
		<>
			<MlLayer
				layerId={'UseAddProtocolLayer'}
				options={
					{
						type: 'circle',
						source: 'gpx-source',
						paint: {
							'circle-color': '#45ff33',
							'circle-stroke-color': '#259913',
							'circle-stroke-width': 1,
							'circle-radius': 2,
						},
					} as useLayerProps['options']
				}
				insertBeforeLayer={'waterway-name'}
			/>

			<BackgroundLayers />
		</>
	);
};

export const GPX = GpxTemplate.bind({});
GPX.parameters = {};
GPX.args = {};

const KmlTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	useAddProtocol({
		protocol: 'kml',
		handler: XMLProtocolHandler,
	});

	useEffect(() => {
		if (!mapHook.map?.getSource('kml-source')) {
			mapHook.map?.addSource('kml-source', {
				type: 'geojson',
				data: `kml://kml/cape_may.kml`,
			});
		}
		mapHook.map?.jumpTo({ center: [-74.82832, 39.093526], zoom: 9 } as JumpToOptions);
	}, [mapHook.map]);

	return (
		<>
			<MlLayer
				layerId={'UseAddProtocolLayer'}
				options={
					{
						type: 'circle',
						source: 'kml-source',
						paint: {
							'circle-color': '#ff4533',
							'circle-stroke-color': '#992513',
							'circle-stroke-width': 1,
							'circle-radius': 2,
						},
					} as useLayerProps['options']
				}
				insertBeforeLayer={'waterway-name'}
			/>

			<BackgroundLayers />
		</>
	);
};

export const KML = KmlTemplate.bind({});
KML.parameters = {};
KML.args = {
	protocol: 'kml',
	handler: XMLProtocolHandler,
	sourceId: 'fromKML-Source',
	filePath: 'kml/cape_may.kml',
	flyTo: { center: [-74.82832, 39.093526], zoom: 9, speed: 2 },
};

const TcxTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	useAddProtocol({
		protocol: 'tcx',
		handler: XMLProtocolHandler,
	});

	useEffect(() => {
		if (!mapHook.map?.getSource('kml-source')) {
			mapHook.map?.addSource('tcx-source', {
				type: 'geojson',
				data: `tcx://tcx/example.tcx`,
			});
		}
		mapHook.map?.jumpTo({ center: [32.711545, 34.844962], zoom: 9 } as JumpToOptions);
	}, [mapHook.map]);

	return (
		<>
			<MlLayer
				layerId={'UseAddProtocolLayer'}
				options={
					{
						type: 'circle',
						source: 'tcx-source',
						paint: {
							'circle-color': '#ff45fa',
							'circle-stroke-color': '#992578',
							'circle-stroke-width': 1,
							'circle-radius': 2,
						},
					} as useLayerProps['options']
				}
				insertBeforeLayer={'waterway-name'}
			/>

			<BackgroundLayers />
		</>
	);
};
export const TCX = TcxTemplate.bind({});
TCX.parameters = {};
TCX.args = {};

const TopojsonTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	useAddProtocol({
		protocol: 'topojson',
		handler: TopojsonProtocolHandler,
	});

	useEffect(() => {
		if (!mapHook.map?.getSource('topojson-source')) {
			mapHook.map?.addSource('topojson-source', {
				type: 'geojson',
				data: `topojson://topojson/usa.topojson`,
			});
		}
		mapHook.map?.jumpTo({ center: [-99.110122, 39.827183], zoom: 4 } as JumpToOptions);
	}, [mapHook.map]);

	return (
		<>
			<MlLayer
				layerId={'UseAddProtocolLayer'}
				options={
					{
						type: 'line',
						source: 'topojson-source',
						paint: {
							'line-color': [
								'match',
								['get', 'fromObject'],
								'land',
								'#111111',
								'states',
								'#009EE0',
								'counties',
								'#747577',
								'white', // otherwise
							],
							'line-width': [
								'match',
								['get', 'fromObject'],
								'land',
								3,
								'states',
								2,
								'counties',
								1,
								1, // otherwise
							],
						},
					} as useLayerProps['options']
				}
				insertBeforeLayer={'waterway-name'}
			/>

			<BackgroundLayers />
		</>
	);
};

export const Topojson = TopojsonTemplate.bind({});
Topojson.parameters = {};
Topojson.args = {};

const currentProps = {
	mbtiles: {
		protocol: 'mbtiles',
		handler: mbTilesProtocolHandler,
		sourceID: 'fromMBTile-source',
		filePath: 'mbtiles/countries.mbtiles',
		type: 'fill',
		layers: [
			{
				id: 'countries',
				type: 'fill',
				'source-layer': 'countries',
				layout: {},
				paint: { 'fill-color': '#f9a5f5', 'fill-opacity': 0.5 },
			},
		],
		insertBeforeLayer: 'waterway-name',
		sourceOptions: {
			type: 'vector',
			minzoom: 0,
			maxzoom: 1,
		},
		flyTo: { center: [10.147049, 50.871231], zoom: 2, speed: 2 },
	},
	csv: {
		protocol: 'csv',
		handler: CSVProtocolHandler,
		sourceId: 'fromCSV-Source',
		filePath: 'csv/restaurants.csv',
		type: 'circle',
		paint: {
			'circle-color': '#009EE0',
			'circle-stroke-color': '#F0f0f0',
			'circle-stroke-width': 2,
			'circle-radius': 18,
		},
		flyTo: { center: [-74.914516, 38.935759], zoom: 13, speed: 2 },
	},
	csvWithOptions: {
		protocol: 'csv',
		handler: CSVProtocolHandler,
		sourceId: 'fromCSV-options-Source',
		filePath: 'csv/gemany_100_postcodes.csv',
		options: { latfield: 'Axe-y', lonfield: 'Axe-x', delimiter: ':' },
		type: 'circle',
		paint: {
			'circle-color': '#009EE0',
			'circle-radius': 10,
		},
		flyTo: { center: [10.147049, 50.871231], zoom: 6, speed: 2 },
	},
	osm: {
		protocol: 'osm',
		handler: OSMProtocolHandler,
		sourceId: 'fromOSM-Source',
		filePath: 'osm/palma.osm',
		options: {
			completeFeature: true,
			allFeatures: false,
			renderTagged: false,
			excludeWay: false,
			suppressWay: false,
		},
		flyTo: { center: [2.651811, 39.571309], zoom: 15.5, speed: 4 },
	},
	gpx: {
		protocol: 'gpx',
		handler: XMLProtocolHandler,
		sourceId: 'fromGPX-Source',
		filePath: 'gpx/santiago.gpx',
		flyTo: { center: [-5.100251, 42.887371], zoom: 7, speed: 3 },
	},
	kml: {
		protocol: 'kml',
		handler: XMLProtocolHandler,
		sourceId: 'fromKML-Source',
		filePath: 'kml/cape_may.kml',
		flyTo: { center: [-74.82832, 39.093526], zoom: 9, speed: 2 },
	},
	tcx: {
		protocol: 'tcx',
		handler: XMLProtocolHandler,
		sourceId: 'fromTCX-Source',
		filePath: 'tcx/example.tcx',
		flyTo: { center: [32.711545, 34.844962], zoom: 9, speed: 3 },
	},
	topojson: {
		protocol: 'topojson',
		handler: TopojsonProtocolHandler,
		sourceId: 'fromTopoJson-Source',
		filePath: 'topojson/usa.topojson',
		paint: {
			'line-color': [
				'match',
				['get', 'fromObject'],
				'land',
				'#111111',
				'states',
				'#009EE0',
				'counties',
				'#747577',
				'white', // otherwise
			],
			'line-width': [
				'match',
				['get', 'fromObject'],
				'land',
				3,
				'states',
				2,
				'counties',
				1,
				1, // otherwise
			],
		},
		flyTo: { center: [-99.110122, 39.827183], zoom: 4, speed: 2 },
	},
};

const CatalogueTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	const [openSidebar, setOpenSidebar] = useState(true);
	const layerContext = useContext(LayerContext);
	const [currentDemo, setCurrentDemo] = useState<string>('csv');
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const props: TemplateProps = currentProps[currentDemo];

	const optionsURL = '?' + new URLSearchParams(props.options as string).toString();

	useAddProtocol({
		protocol: props.protocol,
		handler: props.handler,
	});

	useEffect(() => {
		layerContext.updateStyle(bright as StyleSpecification);

		layerContext.setLayers([
			props.protocol === 'mbtiles'
				? {
						type: 'vt',
						name: 'useAddProtocolLayer',
						config: {
							layerId: 'useAddProtocolLayer',
							url: props.protocol + '://' + props.filePath + '/{z}/{x}/{y}',
							layers: props.layers,
							insertBeforeLayer: props.insertBeforeLayer,
							sourceOptions: props.sourceOptions,
						} as MlVectorTileLayerProps,
				  }
				: {
						type: 'geojson',
						name: 'useAddProtocolLayer',
						config: {
							layerId: 'useAddProtocolLayer',
							type: props.type || 'line',
							options: {
								source: props.sourceId,
							},
							paint: props.paint,
						} as MlGeoJsonLayerProps,
				  },
		]);
	}, [currentDemo]);

	useEffect(() => {
		if (!mapHook.map?.getSource(props.sourceId) && props.protocol !== 'mbtiles') {
			mapHook.map?.addSource(props.sourceId, {
				type: 'geojson',
				data: props.protocol + '://' + props.filePath + optionsURL,
			});
		}

		if (props.flyTo) {
			mapHook.map?.flyTo(props.flyTo as FlyToOptions);
		}
	}, [mapHook.map, currentDemo]);

	return (
		<>
			<TopToolbar
				buttons={
					<>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Sidebar
						</Button>

						<Button
							id="basic-button"
							variant="contained"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
								setAnchorEl(event.currentTarget);
							}}
						>
							Example Configs
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={() => setAnchorEl(null)}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							{Object.keys(currentProps).map((el) => (
								<MenuItem onClick={() => setCurrentDemo(el)} key={el} selected={el === currentDemo}>
									{el}
								</MenuItem>
							))}
						</Menu>
					</>
				}
			/>

			<Sidebar
				open={openSidebar}
				setOpen={setOpenSidebar}
				name={props.protocol.toUpperCase() + ' demo'}
			>
				<Tooltip title={'add a new' + props.protocol + ' to the map'}>
					<AddLayerButton
						onComplete={(config) => layerContext.setLayers((current) => [...current, config])}
						layerTypes={[props.protocol]}
					/>
				</Tooltip>

				<Box sx={{ height: '35%' }}>
					<Typography variant="h6">{'Layers'}</Typography>
					<LayerList>
						<LayerListItemFactory
							layers={layerContext.layers}
							setLayers={layerContext.setLayers}
							insertBeforeLayer="useAddProtocolLayer"
							fitBoundsOptions={{ padding: { top: 50, bottom: 50, left: 25, right: 25 } }}
						/>
					</LayerList>
				</Box>

				<DemoDescriptions
					json={protocolDescriptions}
					section={props.protocol}
					title={'About this demo: '}
				/>
			</Sidebar>
		</>
	);
};

export const CatalogueDemo = CatalogueTemplate.bind({});
