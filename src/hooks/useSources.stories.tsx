import useSource from './useSource';
import React, { useEffect, useState } from 'react';
import useMap from './useMap';
import useMapState from './useMapState';
import useLayer from './useLayer';
import TopToolbar from '../ui_components/TopToolbar';
import Button from '@mui/material/Button';
import MlGeojsonLayerWithSource from '../components/MlGeojsonLayerWithSource/MlGeojsonLayerWithSource';

import mapContextDecoratorHooks from '../decorators/MapContextDecoratorHooks';
import wg_geojson from './assets/pointWG.json';
const vectorUrl =
	'https://wms.wheregroup.com/tileserver/tile/tileserver.php?/europe-0-14/index.json?/europe-0-14/{z}/{x}/{y}.pbf';

const storyoptions: any = {
	title: 'Hooks/useSource',
	component: useSource,
	argTypes: {},
	decorators: mapContextDecoratorHooks,
};
export default storyoptions;

const GeojsonExample = (args: any) => {
	const { source } = useSource({ ...args });

	useLayer({
		mapId: args.mapId,
		layerId: 'layer1',
		options: {
			source: source?.id ? source.id : '',
			type: 'circle',
			paint: {
				'circle-radius': 6,
				'circle-color': 'red',
			},
		},
	});
	useLayer({
		mapId: args.mapId,
		layerId: 'layer2',
		options: {
			source: source?.id ? source.id : '',
			type: 'circle',
			paint: {
				'circle-radius': 4,
				'circle-color': 'green',
			},
		},
	});
	return <></>;
};

const VectorExample = (args: any) => {
	useSource({ ...args });
	const mapHook = useMap({
		mapId: args.mapId,
	});
	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map.addLayer(
			{
				id: 'vector-lineLayer',
				type: 'line',
				source: args.sourceId,
				minzoom: 0,
				maxzoom: 22,
				'source-layer': 'landuse',
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
				},
				paint: { 'line-width': 2, 'line-color': '#ff0000' },
			},
			false,
			mapHook.componentId
		);
		mapHook.map.addLayer(
			{
				id: 'vector-FillLayer',
				type: 'fill',
				source: args.sourceId,
				minzoom: 0,
				maxzoom: 22,
				'source-layer': 'landuse',
				paint: {
					'fill-color': '#32a850',
					'fill-opacity': 0.4,
				},
			},
			false,
			mapHook.componentId
		);
	}, [mapHook.map]);
	return <></>;
};

const RasterExample = (args: any) => {
	useSource({ ...args });
	const mapHook = useMap({
		mapId: args.mapId,
	});
	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map.addLayer(
			{
				id: 'raster-wms',
				type: 'raster',
				source: args.sourceId,
				minzoom: 0,
				maxzoom: 22,
			},
			false,
			mapHook.componentId
		);
	}, [mapHook.map]);
	return <></>;
};

const removeExample = (args: any) => {
	const [sourceStatus, setSourceStatus] = useState(true);
	const [activeSources, setActiveSources] = useState<string[]>([]);
	const mapHook = useMap({
		mapId: args.mapId,
	});

	const mapState = useMapState({
		mapId: args.mapId,
		watch: {
			viewport: false,
			layers: true,
			sources: true,
		},
		filter: {
			includeBaseLayers: false,
		},
	});

	useEffect(() => {
		if (!mapHook.map) {
			return;
		}

		mapHook.map.map.on('sourcedata', () => {
			if (mapHook?.map?.map?.style.sourceCaches) {
				setActiveSources(Object.keys(mapHook?.map?.map?.style.sourceCaches));
			}
		});
	}, [mapHook.map]);

	return (
		<>
			<TopToolbar
				buttons={
					<Button
						color="primary"
						variant={sourceStatus ? 'contained' : 'outlined'}
						onClick={() => setSourceStatus(!sourceStatus)}
					>
						Ml GeoJsonLayer With Source JSX Active?
					</Button>
				}
			/>
			{sourceStatus && <MlGeojsonLayerWithSource></MlGeojsonLayerWithSource>}
			<div
				style={{
					position: 'fixed',
					zIndex: 1290,
					display: 'flex',
					flexWrap: 'wrap',
					top: '62px',
					left: 0,
					right: 0,
					bottom: 0,
					maxHeight: '100VH',
					backgroundColor: 'rgba(80,80,80,.8)',
					padding: '50px',
					fontSize: '20px',
					color: '#51ff09',
					overflow: 'hidden',
					pointerEvents: 'none',
				}}
			>
				{activeSources?.length > 0 && (
					<div>
						Active sources: <br></br> {JSON.stringify(activeSources, null, '  ')}
						<br></br> <br></br> Active layers : {}
						<pre>{JSON.stringify(mapState, null, '  ')}</pre>
					</div>
				)}
			</div>
		</>
	);
};

export const UseGeojsonSourceExample = GeojsonExample.bind({});
UseGeojsonSourceExample.args = {
	mapId: 'map_1',
	sourceId: 'geojson-source',
	source: {
		type: 'geojson',
		data: wg_geojson,
	},
};

export const UseVectorSourceExample = VectorExample.bind({});
UseVectorSourceExample.args = {
	mapId: 'map_1',
	sourceId: 'vector-source',
	source: {
		type: 'vector',
		tiles: [vectorUrl],
		tilesize: 512,
		attribution: '',
	},
};

export const UseRasterSourceExample = RasterExample.bind({});
UseRasterSourceExample.args = {
	mapId: 'map_1',
	sourceId: 'raster-source',
	source: {
		type: 'raster',
		tiles: [
			'https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&width=256&height=256&styles=&layers=nw_uraufnahme_rw',
		],
		tilesize: 256,
		attribution: '',
	},
};

export const RemoveSourceExample = removeExample.bind({});
RemoveSourceExample.args = {
	mapId: 'map_1',
};
