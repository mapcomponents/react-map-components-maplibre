import React, { useContext, useEffect, useState } from 'react';
import {
	Cancelable,
	FlyToOptions,
	LayerSpecification,
	RequestParameters,
	ResponseCallback,
	StyleSpecification,
	VectorSourceSpecification,
} from 'maplibre-gl';
import { Box, Button } from '@mui/material';

import { mbTilesProtocolHandler } from '../../protocol_handlers/mbtiles';
import { CSVProtocolHandler } from '../../protocol_handlers/csv';
import { TopojsonProtocolHandler } from '../../protocol_handlers/topojson';
import { OSMProtocolHandler } from '../../protocol_handlers/osm';
import { XMLProtocolHandler } from '../../protocol_handlers/xml';
import { csvOptions } from 'csv2geojson';
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
import { MlVectorTileLayerProps } from '../../components/MlVectorTileLayer/MlVectorTileLayer';

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
	options?: csvOptions | osm2geojson.Options;
	insertBeforeLayer?: string;
	sourceOptions?: VectorSourceSpecification;
	layers?: LayerSpecification[];
}

const Template = (props: TemplateProps) => {
	const mapHook = useMap({ mapId: undefined });

	const [openSidebar, setOpenSidebar] = useState(true);
	const layerContext = useContext(LayerContext);

	//  An optional encoded options object can be added after a '?' sign at the end of the url.
	//  Handlers that support options are:
	// -OSM Handler Options: https://github.com/tibetty/osm2geojson-lite#osm2geojsonosm-opts
	// -CSV Handler Options: https://github.com/mapbox/csv2geojson/blob/gh-pages/README.md
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
	}, []);

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
	}, [mapHook.map]);

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
					</>
				}
			/>

			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
				<AddLayerButton
					onComplete={(config) => layerContext.setLayers((current) => [...current, config])}
					layerTypes={[props.protocol]}
				/>
				<Box sx={{ height: '35%' }}>
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

export const MbTiles = Template.bind({});
MbTiles.parameters = {};
MbTiles.args = {
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
};

export const CSVOrTSV = Template.bind({});
CSVOrTSV.parameters = {};
CSVOrTSV.args = {
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
};

export const CSVWithOptions = Template.bind({});
CSVWithOptions.parameters = {};
CSVWithOptions.args = {
	protocol: 'csv',
	handler: CSVProtocolHandler,
	sourceId: 'fromCSV-Source',
	filePath: 'csv/gemany_100_postcodes.csv',
	options: { latfield: 'Axe-y', lonfield: 'Axe-x', delimiter: ':' },
	type: 'circle',
	paint: {
		'circle-color': '#009EE0',
		'circle-radius': 10,
	},
	flyTo: { center: [10.147049, 50.871231], zoom: 6, speed: 2 },
};

export const OSM = Template.bind({});
OSM.parameters = {};
OSM.args = {
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
};

export const GPX = Template.bind({});
GPX.parameters = {};
GPX.args = {
	protocol: 'gpx',
	handler: XMLProtocolHandler,
	sourceId: 'fromGPX-Source',
	filePath: 'gpx/santiago.gpx',
	flyTo: { center: [-5.100251, 42.887371], zoom: 7, speed: 3 },
};

export const KML = Template.bind({});
KML.parameters = {};
KML.args = {
	protocol: 'kml',
	handler: XMLProtocolHandler,
	sourceId: 'fromKML-Source',
	filePath: 'kml/cape_may.kml',
	flyTo: { center: [-74.82832, 39.093526], zoom: 9, speed: 2 },
};

export const TCX = Template.bind({});
TCX.parameters = {};
TCX.args = {
	protocol: 'tcx',
	handler: XMLProtocolHandler,
	sourceId: 'fromTCX-Source',
	filePath: 'tcx/example.tcx',
	flyTo: { center: [32.711545, 34.844962], zoom: 9, speed: 3 },
};

export const Topojson = Template.bind({});
Topojson.parameters = {};
Topojson.args = {
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
};
