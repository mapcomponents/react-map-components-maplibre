import React, { useEffect } from 'react';

import useAddProtocol from './useAddProtocol';

import mapContextDecorator from '../../decorators/LowZoomDecorator';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import {
	Cancelable,
	FlyToOptions,
	LayerSpecification,
	RequestParameters,
	ResponseCallback,
} from 'maplibre-gl';
import { mbTilesProtocolHandler } from '../../protocol_handlers/mbtiles';
import { CSVProtocolHandler } from '../../protocol_handlers/csv';
import { TopojsonProtocolHandler } from '../../protocol_handlers/topojson';
import { OSMProtocolHandler } from '../../protocol_handlers/osm';
import {GPXProtocolHandler} from '../../protocol_handlers/gpx';

import useMap from '../useMap';
import MlLayer from '../../components/MlLayer/MlLayer';

const storyoptions = {
	title: 'hooks/useAddProtocol',
	component: useAddProtocol,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

interface geojsonTemplateProps {
	protocol: string;
	handler: (requestParameters: RequestParameters, callback: ResponseCallback<any>) => Cancelable;
	sourceId: string;
	filePath: string;
	type: 'circle' | 'line' | 'fill';
	paint: LayerSpecification['paint'];
	flyTo: FlyToOptions;
}

const geojsonTemplate = (props: geojsonTemplateProps) => {
	const mapHook = useMap({ mapId: undefined });

	useAddProtocol({
		protocol: props.protocol,
		handler: props.handler,
	});

	useEffect(() => {
		mapHook.map?.addSource(props.sourceId, {
			type: 'geojson',
			data: props.protocol + '://' + props.filePath,
		});
		if (props.flyTo) {
			mapHook.map?.flyTo(props.flyTo as FlyToOptions);
		}
	}, [mapHook.map]);

	return (
		<>
			<MlLayer
				layerId={'UseAddProtocolLayer'}
				options={{
					type: props.type,
					source: props.sourceId,
					//source: { type: 'geojson', data: props.protocol + '://' + props.filePath, attribution: 'mapComponents'},
					paint: props.paint,
				}}
				insertBeforeLayer={'waterway-name'}
			/>
		</>
	);
};

const Template = () => {
	useAddProtocol({
		protocol: 'mbtiles',
		handler: mbTilesProtocolHandler,
	});

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
		</>
	);
};

export const MbTiles = Template.bind({});
MbTiles.parameters = {};
MbTiles.args = {};

export const CSVOrTSV = geojsonTemplate.bind({});
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

export const OSM = geojsonTemplate.bind({});
OSM.parameters = {};
OSM.args = {
	protocol: 'osm',
	handler: OSMProtocolHandler,
	sourceId: 'fromOSM-Source',
	filePath: 'osm/palma.osm',
	type: 'line',
	paint: { 'line-color': '#009EE0', 'line-width': 3 },
	flyTo: { center: [2.651811, 39.571309], zoom: 15.5, speed: 4 },
}; 

export const GPX = geojsonTemplate.bind({});
GPX.parameters = {};
GPX.args = {
	protocol: 'gpx',
	handler: GPXProtocolHandler,
	sourceId: 'fromGPX-Source',
	filePath: 'gpx/santiago.gpx',
	type: 'line',
	paint: { 'line-color': '#009EE0', 'line-width': 3 },
	flyTo: { center: [-5.100251, 42.887371], zoom: 7, speed: 3 },
}; 

export const Topojson = geojsonTemplate.bind({});
Topojson.parameters = {};
Topojson.args = {
	protocol: 'topojson',
	handler: TopojsonProtocolHandler,
	sourceId: 'fromTopoJson-Source',
	filePath: 'topojson/usa.topojson',
	type: 'line',
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
