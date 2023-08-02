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
import { XMLProtocolHandler } from '../../protocol_handlers/xml';
import { csvOptions } from 'csv2geojson';

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
	type?: 'circle' | 'line' | 'fill';
	paint?: LayerSpecification['paint'];
	flyTo?: FlyToOptions;

	options?: /**
	 * CSV Handler Options:
 		 -lat        the name of the latitude column
 		 -lon        the name of the longitude column
 		 -line       whether or not to output points as a LineString  [default: false]
 		 -delimiter  the type of delimiter                            [default: ","]
 		 -numeric-fields comma separated list of fields to convert to numbers
	 */
	| csvOptions
		/**
	*  OSM Handler Options:
  		 - `completeFeature/allFeatures`:  the default value is `false`. When it's set to `true`, the returned geojson will include all elements that meet the specified conditions in `FeatureCollection` format; otherwise, only the bare geometry of the first `relation` element will be returned.
  		 - `renderTagged`: the default value is `false`. When it's set to `true`, the returned geojson will include all elements with tags (i.e., tagged) until `suppressWay` changes its behavior a bit; otherwise only the unreferenced ones get returned.
   		 - `suppressWay/excludeWay`: the default value is `true`. When it's set to `true`, the returned `FeatureCollection` will exclude all referenced `way`s even though they are tagged; otherwise the features of those `way`s will be included in the resulted result as well.
	 */
		| osm2geojson.Options;
}

const geojsonTemplate = (props: geojsonTemplateProps) => {
	const mapHook = useMap({ mapId: undefined });
	const optionsURL = '?' + new URLSearchParams(props.options as string).toString();

	useAddProtocol({
		protocol: props.protocol,
		handler: props.handler,
	});

	useEffect(() => {
		mapHook.map?.addSource(props.sourceId, {
			type: 'geojson',
			
	/*
	 The url is expected to have the following Format: 
			[protocol]://[filePath -extension included-]		
		Example: 'csv://csv/restaurants.csv'
	 An optional encoded options object can be added after a '?' sign at the end of the url. Handler that support options are: 
	 -OSM Handler Options:
  		 -- `completeFeature/allFeatures`:  the default value is `false`. When it's set to `true`, the returned geojson will include all elements that meet the specified conditions in `FeatureCollection` format; otherwise, only the bare geometry of the first `relation` element will be returned.
  		 -- `renderTagged`: the default value is `false`. When it's set to `true`, the returned geojson will include all elements with tags (i.e., tagged) until `suppressWay` changes its behavior a bit; otherwise only the unreferenced ones get returned.
   		 -- `suppressWay/excludeWay`: the default value is `true`. When it's set to `true`, the returned `FeatureCollection` will exclude all referenced `way`s even though they are tagged; otherwise the features of those `way`s will be included in the resulted result as well.
		
	-CSV Handler Options:
 		--lat        the name of the latitude column
 		--lon        the name of the longitude column
 		--line       whether or not to output points as a LineString  [default: false]
 		--delimiter  the type of delimiter                            [default: ","]
 		--numeric-fields comma separated list of fields to convert to numbers
	 */
			data: props.protocol + '://' + props.filePath + optionsURL,
		});
		if (props.flyTo) {
			mapHook.map?.flyTo(props.flyTo as FlyToOptions);
		}
	}, [mapHook.map]);

	return (
		<>
			<MlLayer
				layerId={'useAddProtocolLayer'}
				options={{
					type: props.type || 'line',
					source: props.sourceId,
					//source: { type: 'geojson', data: props.protocol + '://' + props.filePath, attribution: 'mapComponents'},
					paint: props.paint || { 'line-color': '#009EE0', 'line-width': 3 },
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

export const CSVWithOptions = geojsonTemplate.bind({});
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

export const OSM = geojsonTemplate.bind({});
OSM.parameters = {};
OSM.args = {
	protocol: 'osm',
	handler: OSMProtocolHandler,
	sourceId: 'fromOSM-Source',
	filePath: 'osm/palma.osm',

	flyTo: { center: [2.651811, 39.571309], zoom: 15.5, speed: 4 },
};

export const GPX = geojsonTemplate.bind({});
GPX.parameters = {};
GPX.args = {
	protocol: 'gpx',
	handler: XMLProtocolHandler,
	sourceId: 'fromGPX-Source',
	filePath: 'gpx/santiago.gpx',
	flyTo: { center: [-5.100251, 42.887371], zoom: 7, speed: 3 },
};

export const KML = geojsonTemplate.bind({});
KML.parameters = {};
KML.args = {
	protocol: 'kml',
	handler: XMLProtocolHandler,
	sourceId: 'fromKML-Source',
	filePath: 'kml/cape_may.kml',
	flyTo: { center: [-74.82832, 39.093526], zoom: 9, speed: 2 },
};

export const TCX = geojsonTemplate.bind({});
TCX.parameters = {};
TCX.args = {
	protocol: 'tcx',
	handler: XMLProtocolHandler,
	sourceId: 'fromTCX-Source',
	filePath: 'tcx/biking.tcx',
	flyTo: { center: [-73.96879, 40.77958], zoom: 16, speed: 3 },
};

export const Topojson = geojsonTemplate.bind({});
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
