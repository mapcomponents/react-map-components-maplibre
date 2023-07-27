import React, { useEffect } from 'react';

import useAddProtocol from './useAddProtocol';

import mapContextDecorator from '../../decorators/LowZoomDecorator';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import { Cancelable, LayerSpecification, LngLatLike, RequestParameters, ResponseCallback } from 'maplibre-gl';
import { mbTilesProtocolHandler } from '../../protocol_handlers/mbtiles';
import { CSVProtocolHandler } from '../../protocol_handlers/csv';
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
	protocol: string,
	handler: (requestParameters: RequestParameters, callback: ResponseCallback<any>) => Cancelable,
	sourceId: string ;
	filePath: string;
	type: 'circle' | 'line' | 'fill';
	paint: LayerSpecification['paint'];
	center: LngLatLike;
}

const geojsonTemplate = (props: geojsonTemplateProps) => {
	const mapHook = useMap({ mapId: undefined });

	useAddProtocol({
		protocol: props.protocol,
		handler: props.handler,
	});

	useEffect(() => {
		mapHook.map?.addSource(props.sourceId, { type: 'geojson', data:  props.protocol + '://' + props.filePath });
		mapHook.map?.flyTo({ center: props.center, zoom: 13, speed: 2 });
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
	center: [-74.914516, 38.935759]
};
