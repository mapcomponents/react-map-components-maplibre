import { useEffect, useMemo } from 'react';
import LayerTree from './LayerTree';
import Sidebar from '../Sidebar';
import MapContextDecorator from '../../decorators/MapContextDecorator';
import sample_polygon_1 from './assets/sample_polygon_1.json';
import sample_points_inside_polygon from './assets/sample_points_inside_polygon.json';
import { FeatureCollection } from 'geojson';
import {
	MapState,
	MapConfig,
	LayerConfig,
	LayerOrderItem,
	setMapConfig,
	useMapStore,
} from '../../stores/map.store';
import { Button, Stack, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const storyoptions = {
	title: 'UiComponents/LayerTree',
	component: LayerTree,
	argTypes: {},
	decorators: MapContextDecorator,
};
export default storyoptions;

// --- Helpers for generating large layer trees ---

const colors = [
	'#e6194b',
	'#3cb44b',
	'#ffe119',
	'#4363d8',
	'#f58231',
	'#911eb4',
	'#42d4f4',
	'#f032e6',
	'#bfef45',
	'#fabed4',
	'#469990',
	'#dcbeff',
	'#9A6324',
	'#800000',
	'#aaffc3',
	'#808000',
	'#ffd8b1',
	'#000075',
	'#a9a9a9',
	'#000000',
];

function generateGeojsonLayer(
	name: string,
	colorIndex: number
): { layer: GeojsonLayerConfig; uuid: string } {
	const uuid = uuidv4();
	return {
		uuid,
		layer: {
			type: 'geojson' as const,
			uuid,
			name,
			configurable: true,
			config: {
				type: 'circle',
				geojson: sample_points_inside_polygon as FeatureCollection,
				options: {
					paint: {
						'circle-color': colors[colorIndex % colors.length],
						'circle-radius': 4 + (colorIndex % 6),
					},
				},
			},
		},
	};
}

type GeojsonLayerConfig = Extract<LayerConfig, { type: 'geojson' }>;

function generateVtLayer(name: string): {
	layer: Extract<LayerConfig, { type: 'vt' }>;
	uuid: string;
} {
	const uuid = uuidv4();
	return {
		uuid,
		layer: {
			type: 'vt' as const,
			uuid,
			name,
			visible: true,
			config: {
				layers: [
					{
						id: uuidv4(),
						type: 'fill',
						'source-layer': 'water',
						source: 'openmaptiles',
						layout: { visibility: 'visible' },
						paint: { 'fill-color': '#0905f5', 'fill-opacity': 0.3 },
						maxzoom: 20,
					},
					{
						id: uuidv4(),
						type: 'fill',
						'source-layer': 'building',
						source: 'openmaptiles',
						layout: { visibility: 'none' },
						paint: { 'fill-color': '#717875' },
						maxzoom: 20,
					},
				],
				sourceOptions: {
					type: 'vector',
					minzoom: 0,
					tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf'],
				},
			},
		},
	};
}

function generateWmsLayer(name: string): {
	layer: Extract<LayerConfig, { type: 'wms' }>;
	uuid: string;
} {
	const uuid = uuidv4();
	return {
		uuid,
		layer: {
			type: 'wms' as const,
			uuid,
			name,
			config: {
				url: 'https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme',
				urlParameters: { layers: 'nw_uraufnahme_rw' },
			},
		},
	};
}

// --- Story: Multiple Layer Types ---

const LayerTreeMultipleLayertypes = () => {
	const demoData: MapState = useMemo(
		() => ({
			mapConfigs: {
				mapConfig1: {
					name: 'Demo Map',
					mapProps: { center: [7.0851268, 50.73884], zoom: 12 },
					layers: [
						{
							type: 'folder',
							uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
							name: 'layers in a folder',
							visible: true,
						},
						{
							type: 'geojson',
							uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523',
							name: 'Example Point Layer',
							configurable: true,
							config: { geojson: sample_points_inside_polygon as FeatureCollection },
						},
						{
							type: 'vt',
							uuid: '346ced38-142c-4b57-8193-d689ffc7dfc2',
							name: 'Vector Layer',
							visible: true,
							config: {
								layers: [
									{
										id: '7feaa47a-f667-49ee-9780-312eabaa872b',
										type: 'fill',
										'source-layer': 'water',
										source: 'openmaptiles',
										layout: { visibility: 'visible' },
										paint: { 'fill-color': '#0905f5', 'fill-opacity': 0.5 },
										maxzoom: 20,
									},
									{
										id: '346ced38-142c-4b57-8193-d689ffc7dfc2',
										type: 'fill',
										'source-layer': 'building',
										source: 'openmaptiles',
										layout: { visibility: 'none' },
										paint: { 'fill-color': '#717875' },
										maxzoom: 20,
									},
								],
								sourceOptions: {
									type: 'vector',
									minzoom: 0,
									tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf'],
								},
							},
						},
						{
							type: 'wms',
							uuid: '0e8cd91b-bd49-419d-a19a-5b15dec17542',
							name: 'Example WMS Layer',
							config: {
								url: 'https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme',
								urlParameters: { layers: 'nw_uraufnahme_rw' },
							},
						},
					],
					layerOrder: [
						{
							uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
							layers: [
								{ uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523' },
								{ uuid: '346ced38-142c-4b57-8193-d689ffc7dfc2' },
								{ uuid: '0e8cd91b-bd49-419d-a19a-5b15dec17542' },
							],
						},
					],
				},
			},
		}),
		[]
	);

	useEffect(() => {
		setMapConfig('mapConfig1', demoData.mapConfigs['mapConfig1']);
	}, [demoData]);

	return (
		<>
			<Sidebar open={true}>
				<Typography variant="h5">Example Layertree</Typography>
				<LayerTree
					mapConfigKey="mapConfig1"
					selectStyleButton
					addLayerButton
				/>
			</Sidebar>
		</>
	);
};
export const LayerTreeMultipleLayertypesExample: any = LayerTreeMultipleLayertypes.bind({});
LayerTreeMultipleLayertypesExample.parameters = {};
LayerTreeMultipleLayertypesExample.args = {};

// --- Story: Multiple Layer Trees ---

const MultipleLayerTrees: any = () => {
	const demoData: MapState = useMemo(
		() => ({
			mapConfigs: {
				mapConfig1: {
					name: 'Demo Map',
					mapProps: { center: [7.0851268, 50.73884], zoom: 12 },
					layers: [
						{
							type: 'folder',
							uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
							name: 'layers in a folder',
							visible: true,
							config: undefined,
						},
						{
							type: 'geojson',
							uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523',
							name: 'Example Point Layer',
							configurable: true,
							config: {
								type: 'circle',
								geojson: sample_points_inside_polygon as FeatureCollection,
								options: { paint: { 'circle-color': 'blue', 'circle-radius': 5 } },
							},
						},
						{
							type: 'geojson',
							uuid: '0587c0ed-aaa0-4315-bb77-a40937a684d7',
							name: 'Example Polygon Layer',
							configurable: true,
							config: {
								geojson: sample_polygon_1 as FeatureCollection,
								options: { paint: { 'fill-color': 'red' } },
							},
						},
					],
					layerOrder: [
						{
							uuid: 'acd3d99f-2f82-40a5-a5c9-f303d54f5606',
							layers: [
								{ uuid: 'fec837fa-1d5d-432b-89c2-b416c9773523' },
								{ uuid: '0587c0ed-aaa0-4315-bb77-a40937a684d7' },
							],
						},
					],
				},
			},
		}),
		[]
	);

	useEffect(() => {
		setMapConfig('mapConfig1', demoData.mapConfigs['mapConfig1']);
	}, [demoData]);

	return (
		<>
			<Sidebar open={true}>
				<Typography variant="h5">Layertree 1</Typography>
				<LayerTree mapConfigKey="mapConfig1" />
				<Typography variant="h5">Layertree 2</Typography>
				<LayerTree mapConfigKey="mapConfig1" />
			</Sidebar>
		</>
	);
};
export const MultipleLayertreesExample = MultipleLayerTrees.bind({});
MultipleLayertreesExample.parameters = {};
MultipleLayertreesExample.args = {};

// --- Story: Large Layer Tree (100+ layers) ---

const LargeLayerTree = () => {
	const mapConfig: MapConfig = useMemo(() => {
		const allLayers: LayerConfig[] = [];
		const layerOrder: LayerOrderItem[] = [];

		const folderCount = 5;
		const layersPerFolder = 6; // 5 folders x 6 = 30 layers + 5 folders = 35 total

		for (let f = 0; f < folderCount; f++) {
			const folderUuid = uuidv4();
			const folderChildren: LayerOrderItem[] = [];

			allLayers.push({
				type: 'folder',
				uuid: folderUuid,
				name: `Folder ${f + 1}`,
				visible: true,
			});

			for (let l = 0; l < layersPerFolder; l++) {
				const layerIndex = f * layersPerFolder + l;
				const mod = layerIndex % 3;

				if (mod === 0) {
					const { layer, uuid } = generateGeojsonLayer(`GeoJSON ${f + 1}-${l + 1}`, layerIndex);
					allLayers.push(layer);
					folderChildren.push({ uuid });
				} else if (mod === 1) {
					const { layer, uuid } = generateVtLayer(`VectorTile ${f + 1}-${l + 1}`);
					allLayers.push(layer);
					folderChildren.push({ uuid });
				} else {
					const { layer, uuid } = generateWmsLayer(`WMS ${f + 1}-${l + 1}`);
					allLayers.push(layer);
					folderChildren.push({ uuid });
				}
			}

			layerOrder.push({ uuid: folderUuid, layers: folderChildren });
		}

		return {
			name: 'Large Demo Map',
			mapProps: { center: [7.0851268, 50.73884] as [number, number], zoom: 12 },
			layers: allLayers,
			layerOrder,
		};
	}, []);

	useEffect(() => {
		setMapConfig('largeConfig', mapConfig);
	}, [mapConfig]);

	return (
		<>
			<Sidebar open={true}>
				<Typography variant="h5">Large LayerTree ({mapConfig.layers.length} layers)</Typography>
				<LayerTree mapConfigKey="largeConfig" />
			</Sidebar>
		</>
	);
};
export const LargeLayerTreeExample: any = LargeLayerTree.bind({});
LargeLayerTreeExample.parameters = {};
LargeLayerTreeExample.args = {};

// --- Story: Deeply Nested Folders ---

const DeeplyNestedFolders = () => {
	const mapConfig: MapConfig = useMemo(() => {
		const allLayers: LayerConfig[] = [];

		// Build a 4-level deep hierarchy
		function buildLevel(depth: number, prefix: string): LayerOrderItem {
			const folderUuid = uuidv4();
			allLayers.push({
				type: 'folder',
				uuid: folderUuid,
				name: `${prefix} (depth ${depth})`,
				visible: true,
			});

			const children: LayerOrderItem[] = [];

			// Add 2 leaf layers
			for (let i = 0; i < 2; i++) {
				const { layer, uuid } = generateGeojsonLayer(`${prefix} Layer ${i + 1}`, depth * 2 + i);
				allLayers.push(layer);
				children.push({ uuid });
			}

			// Recurse if not at max depth
			if (depth < 3) {
				for (let s = 0; s < 2; s++) {
					children.push(buildLevel(depth + 1, `${prefix}.${s + 1}`));
				}
			}

			return { uuid: folderUuid, layers: children };
		}

		const layerOrder: LayerOrderItem[] = [buildLevel(1, 'Root A'), buildLevel(1, 'Root B')];

		return {
			name: 'Nested Demo Map',
			mapProps: { center: [7.0851268, 50.73884] as [number, number], zoom: 12 },
			layers: allLayers,
			layerOrder,
		};
	}, []);

	useEffect(() => {
		setMapConfig('nestedConfig', mapConfig);
	}, [mapConfig]);

	return (
		<>
			<Sidebar open={true}>
				<Typography variant="h5">
					Deeply Nested Folders ({mapConfig.layers.length} items)
				</Typography>
				<LayerTree mapConfigKey="nestedConfig" />
			</Sidebar>
		</>
	);
};
export const DeeplyNestedFoldersExample: any = DeeplyNestedFolders.bind({});
DeeplyNestedFoldersExample.parameters = {};
DeeplyNestedFoldersExample.args = {};

// --- Story: Dynamic Layer CRUD ---

const DynamicLayerCRUD = () => {
	useEffect(() => {
		setMapConfig('dynamicConfig', {
			name: 'Dynamic Map',
			mapProps: { center: [7.0851268, 50.73884], zoom: 12 },
			layers: [
				{
					type: 'folder',
					uuid: 'dynamic-root-folder',
					name: 'Dynamic Layers',
					visible: true,
				},
			],
			layerOrder: [{ uuid: 'dynamic-root-folder', layers: [] }],
		});
	}, []);

	const addRandomLayer = () => {
		const state = useMapStore.getState();
		const mapConfig = state.mapConfigs['dynamicConfig'];
		if (!mapConfig) return;

		const rand = Math.random();
		let newLayer: LayerConfig;
		let newUuid: string;

		if (rand < 0.5) {
			const { layer, uuid } = generateGeojsonLayer(
				`Dynamic GeoJSON ${Date.now().toString(36)}`,
				Math.floor(Math.random() * 20)
			);
			newLayer = layer;
			newUuid = uuid;
		} else if (rand < 0.8) {
			const { layer, uuid } = generateVtLayer(`Dynamic VT ${Date.now().toString(36)}`);
			newLayer = layer;
			newUuid = uuid;
		} else {
			const { layer, uuid } = generateWmsLayer(`Dynamic WMS ${Date.now().toString(36)}`);
			newLayer = layer;
			newUuid = uuid;
		}

		const newLayers = [...mapConfig.layers, newLayer];
		const newLayerOrder = JSON.parse(JSON.stringify(mapConfig.layerOrder)) as LayerOrderItem[];

		// Add to first folder
		if (newLayerOrder[0]?.layers) {
			newLayerOrder[0].layers.push({ uuid: newUuid });
		}

		setMapConfig('dynamicConfig', {
			...mapConfig,
			layers: newLayers,
			layerOrder: newLayerOrder,
		});
	};

	return (
		<>
			<Sidebar open={true}>
				<Typography variant="h5">Dynamic Layer CRUD</Typography>
				<Stack direction="row" spacing={1} sx={{ mb: 2, px: 1 }}>
					<Button variant="contained" size="small" onClick={addRandomLayer}>
						Add Random Layer
					</Button>
				</Stack>
				<LayerTree mapConfigKey="dynamicConfig" />
			</Sidebar>
		</>
	);
};
export const DynamicLayerCRUDExample: any = DynamicLayerCRUD.bind({});
DynamicLayerCRUDExample.parameters = {};
DynamicLayerCRUDExample.args = {};
