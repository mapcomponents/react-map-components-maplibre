import React, { useEffect, useState } from 'react';

import useAddProtocol from './useAddProtocol';

import mapContextDecorator from '../../decorators/LowZoomDecorator';
import MlVectorTileLayer from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import { LayerSpecification } from 'maplibre-gl';
import { mbTilesProtocolHandler } from '../../protocol_handlers/mbtiles';
//import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
//import { FeatureCollection } from '@turf/turf';
import { CSVProtocolHandler } from '../../protocol_handlers/csv';
import useMap from '../useMap';
import { Zoom } from '@mui/material';
import MlLayer from 'src/components/MlLayer/MlLayer';
import maplibregl from 'maplibre-gl';

const storyoptions = {
	title: 'hooks/useAddProtocol',
	component: useAddProtocol,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const csvTemplate = () => {
	const mapHook = useMap({ mapId: undefined });

	useAddProtocol({
		protocol: 'csv',
		handler: CSVProtocolHandler,
	});

	useEffect(() => {
		mapHook.map?.flyTo({ center: [-74.856923, 39.050793], zoom: 10, speed: 2 });
		// mapHook.map?.addLayer({
		// 	id: '000test',
		// 	type: 'circle',
		// 	source: 'csv://csv/restaurants.csv',
		// 	//'source-layer': 'restaurants',
		// 	minzoom: 0,
		// 	maxzoom: 20,
		// 	paint: {
		// 		'circle-color': 'yellow',
		// 		'circle-radius': 20,
		// 	},
		// });
	}, [mapHook.map]);

	return <>
	<MlVectorTileLayer
				mapId={'map_1'}
				url={'csv://csv/restaurants.csv'}
				layers={
					[
						{
							id: 'restaurants',
							type: 'circle',
							'source-layer': 'restaurants',
							layout: {},
							paint: { 'circle-color': 'yellow','circle-radius': 20, },
						},
					] as unknown as LayerSpecification[]
				}
				
				sourceOptions={{
					type: 'vector',
					minzoom: 4,
					maxzoom: 18,
				}}
			/>
	</>;
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

export const CSV = csvTemplate.bind({});
CSV.parameters = {};
CSV.args = {};
