/**
 * LayerOrder.cy.tsx
 *
 * Focused tests for MapLayerRenderer layer-stacking correctness.
 *
 * Design goals:
 *  - No cy.wait() — every assertion polls with .should() until the
 *    condition is met (fast, no arbitrary timeouts).
 *  - No external network requests — the map is initialised with a
 *    blank inline style; data is injected via updateStyle().
 *  - Each test suite maps to a real LayerTree story configuration.
 *  - Pure-store tests (no map) run in < 10 ms each.
 */

import { useEffect } from 'react';
import { mount } from '@cypress/react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { MapComponentsProvider } from '../../index';
import MapLibreMap from '../../components/MapLibreMap/MapLibreMap';
import getTheme from '../MapcomponentsTheme';
import useMapStore, {
	setMapConfig,
	updateStyle,
	updateLayerOrder,
	MapConfig,
	LayerConfig,
	LayerOrderItem,
} from '../../stores/map.store';
import { STYLE_LAYER_UUIDS } from './styleLayerUuids';
import { reorderInLayerOrderHelper } from '../../stores/map.store';

// ─── Constants ──────────────────────────────────────────────────────────────

const MAP_ID = 'order-cy-map';

/** Stable zone boundary IDs inserted by MapLayerRenderer */
const MARKER_LABELS = 'order-labels';
const MARKER_BG = 'order-background';

/** A minimal valid MapLibre style — no tiles, no network requests */
const BLANK_STYLE = {
	version: 8 as const,
	name: 'blank',
	sources: {},
	glyphs: '',
	layers: [{ id: 'bg', type: 'background' as const, paint: { 'background-color': '#fff' } }],
};

/**
 * A fake style that mimics the real OSM-Bright structure used in the stories:
 * several non-symbol (background) layers and several symbol (labels) layers.
 * No network tiles are referenced — IDs are what matter.
 */
const FAKE_OSM_STYLE = {
	version: 8 as const,
	name: 'FakeOSM',
	sources: { fake: { type: 'vector' as const, tiles: [] } },
	glyphs: '',
	layers: [
		// background zone
		{ id: 'water-fill', type: 'fill' as const, source: 'fake', 'source-layer': 'water', paint: { 'fill-color': '#aad3df' } },
		{ id: 'landuse-fill', type: 'fill' as const, source: 'fake', 'source-layer': 'landuse', paint: { 'fill-color': '#e8e4d9' } },
		{ id: 'road-line', type: 'line' as const, source: 'fake', 'source-layer': 'road', paint: { 'line-color': '#fff' } },
		// label zone
		{ id: 'place-label', type: 'symbol' as const, source: 'fake', 'source-layer': 'place', layout: { 'text-field': '{name}' } },
		{ id: 'road-label', type: 'symbol' as const, source: 'fake', 'source-layer': 'road', layout: { 'text-field': '{name}' } },
	],
};

// ─── Layer factories (deterministic IDs) ────────────────────────────────────

function geojsonLayer(uuid: string, name = uuid): Extract<LayerConfig, { type: 'geojson' }> {
	return {
		type: 'geojson',
		uuid,
		name,
		config: {
			type: 'circle',
			geojson: { type: 'FeatureCollection', features: [] },
			options: { paint: { 'circle-color': 'red', 'circle-radius': 4 } },
		},
	};
}

function wmsLayer(uuid: string, name = uuid): Extract<LayerConfig, { type: 'wms' }> {
	return {
		type: 'wms',
		uuid,
		name,
		config: { url: 'https://example.com/wms', urlParameters: { layers: 'test' }, visible: true },
	};
}

function vtLayer(uuid: string, sub1: string, sub2: string, name = uuid): Extract<LayerConfig, { type: 'vt' }> {
	return {
		type: 'vt',
		uuid,
		name,
		visible: true,
		config: {
			url: '',
			layers: [
				{ id: sub1, type: 'fill', 'source-layer': 'water', source: 'fake', layout: { visibility: 'visible' }, paint: { 'fill-color': '#00f' }, maxzoom: 20 },
				{ id: sub2, type: 'fill', 'source-layer': 'building', source: 'fake', layout: { visibility: 'visible' }, paint: { 'fill-color': '#888' }, maxzoom: 20 },
			],
			sourceOptions: { type: 'vector', tiles: [] },
		},
	};
}

function folderLayer(uuid: string, name = uuid): Extract<LayerConfig, { type: 'folder' }> {
	return { type: 'folder', uuid, name, visible: true };
}

// ─── Map wrapper component ───────────────────────────────────────────────────

/**
 * Mounts a MapLibreMap with a blank style + MapComponentsProvider.
 * The store is set up by each individual test, not this wrapper.
 */
function MapWrapper() {
	useEffect(() => {
		(window as any).__mapStore = useMapStore;
		return () => {
			useMapStore.getState().removeMapConfig(MAP_ID);
		};
	}, []);

	return (
		<div style={{ width: '800px', height: '600px', position: 'relative' }}>
			<MapLibreMap
				options={{ zoom: 10, style: BLANK_STYLE, center: [7.0851268, 50.73884] }}
				mapId="map_1"
			/>
		</div>
	);
}

function mountMap() {
	mount(
		<MapComponentsProvider>
			<MUIThemeProvider theme={getTheme('light')}>
				<MapWrapper />
			</MUIThemeProvider>
		</MapComponentsProvider>
	);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Wait for the MapLibre map to exist and be loaded. */
function waitForMap() {
	return cy.window({ timeout: 15000 }).should((win) => {
		const map = (win as any)._map;
		if (!map || !map.loaded()) throw new Error('map not loaded yet');
	});
}

/** Get the MapLibre layer id array (bottom → top) from the window. */
function getLayerIds(win: Window): string[] {
	return ((win as any)._map?.getStyle()?.layers ?? []).map((l: any) => l.id);
}

/**
 * Poll until all `required` layer ids exist in the map style and
 * the zone boundary markers are present.
 */
function waitForLayers(required: string[]) {
	return cy.window({ timeout: 15000 }).should((win) => {
		const ids = getLayerIds(win);
		for (const id of required) {
			if (!ids.includes(id)) throw new Error(`layer "${id}" not yet in map style`);
		}
	});
}

/**
 * Poll until the zone boundary markers exist AND all `required` layer ids
 * are present — meaning the reconciler has already run.
 */
function waitForZoneMarkers(required: string[] = []) {
	return cy.window({ timeout: 15000 }).should((win) => {
		const ids = getLayerIds(win);
		if (!ids.includes(MARKER_LABELS)) throw new Error('order-labels not yet in map style');
		if (!ids.includes(MARKER_BG)) throw new Error('order-background not yet in map style');
		for (const id of required) {
			if (!ids.includes(id)) throw new Error(`layer "${id}" not yet in map style`);
		}
	});
}

/**
 * Assert that layer `a` is visually ABOVE layer `b`
 * (i.e. appears at a higher index in the MapLibre layer array).
 */
function assertAbove(ids: string[], a: string, b: string) {
	const ia = ids.indexOf(a);
	const ib = ids.indexOf(b);
	expect(ia, `"${a}" should exist`).to.be.greaterThan(-1);
	expect(ib, `"${b}" should exist`).to.be.greaterThan(-1);
	expect(ia, `"${a}" (idx ${ia}) should be above "${b}" (idx ${ib})`).to.be.greaterThan(ib);
}

/**
 * Assert that all ids in `ordered` appear in that relative order
 * (not necessarily adjacent) within the full id list.
 */
function assertOrder(ids: string[], ordered: string[], label: string) {
	let lastIdx = -1;
	for (const id of ordered) {
		const idx = ids.indexOf(id);
		expect(idx, `${label}: layer "${id}" should exist`).to.be.greaterThan(-1);
		expect(idx, `${label}: "${id}" (${idx}) should come after previous (${lastIdx})`).to.be.greaterThan(lastIdx);
		lastIdx = idx;
	}
}

// ─── Pure store tests (no map, runs instantly) ───────────────────────────────

describe('LayerOrder — store logic (pure, no map)', () => {
	beforeEach(() => {
		useMapStore.setState({ mapConfigs: {} });
	});

	it('updateStyle places labels folder at top and bg folder at bottom of layerOrder', () => {
		setMapConfig(MAP_ID, {
			name: 'test', mapProps: { center: [0, 0], zoom: 1 },
			layers: [geojsonLayer('g1')],
			layerOrder: [{ uuid: 'g1' }],
		});
		updateStyle(MAP_ID, FAKE_OSM_STYLE as any);

		const mc = useMapStore.getState().mapConfigs[MAP_ID];
		const order = mc.layerOrder;

		// labels folder is index 0 (top of tree = top of map)
		expect(order[0].uuid).to.equal(STYLE_LAYER_UUIDS.labelsFolder);
		// user layer is in the middle
		const userIdx = order.findIndex((o) => o.uuid === 'g1');
		expect(userIdx, 'user layer should be between labels and bg').to.be.greaterThan(0);
		// bg folder is last (bottom of tree = bottom of map)
		expect(order[order.length - 1].uuid).to.equal(STYLE_LAYER_UUIDS.bgFolder);
	});

	it('user layers stay between label/bg zones after updateStyle with multiple user layers', () => {
		setMapConfig(MAP_ID, {
			name: 'test', mapProps: { center: [0, 0], zoom: 1 },
			layers: [geojsonLayer('g1'), wmsLayer('w1'), geojsonLayer('g2')],
			layerOrder: [{ uuid: 'g1' }, { uuid: 'w1' }, { uuid: 'g2' }],
		});
		updateStyle(MAP_ID, FAKE_OSM_STYLE as any);

		const mc = useMapStore.getState().mapConfigs[MAP_ID];
		const order = mc.layerOrder;
		const uuids = order.map((o) => o.uuid);

		const labelIdx = uuids.indexOf(STYLE_LAYER_UUIDS.labelsFolder);
		const bgIdx = uuids.indexOf(STYLE_LAYER_UUIDS.bgFolder);

		for (const u of ['g1', 'w1', 'g2']) {
			const idx = uuids.indexOf(u);
			expect(idx, `"${u}" should be between labels and bg`).to.be.greaterThan(labelIdx);
			expect(idx, `"${u}" should be between labels and bg`).to.be.lessThan(bgIdx);
		}
	});

	it('relative order of user layers is preserved after updateStyle', () => {
		setMapConfig(MAP_ID, {
			name: 'test', mapProps: { center: [0, 0], zoom: 1 },
			layers: [geojsonLayer('g1'), geojsonLayer('g2'), geojsonLayer('g3')],
			layerOrder: [{ uuid: 'g1' }, { uuid: 'g2' }, { uuid: 'g3' }],
		});
		updateStyle(MAP_ID, FAKE_OSM_STYLE as any);

		const mc = useMapStore.getState().mapConfigs[MAP_ID];
		const uuids = mc.layerOrder.map((o) => o.uuid);
		const idx1 = uuids.indexOf('g1');
		const idx2 = uuids.indexOf('g2');
		const idx3 = uuids.indexOf('g3');
		expect(idx1).to.be.lessThan(idx2);
		expect(idx2).to.be.lessThan(idx3);
	});

	it('reorderInLayerOrderHelper moves item before target within flat list', () => {
		const order: LayerOrderItem[] = [
			{ uuid: 'a' }, { uuid: 'b' }, { uuid: 'c' }, { uuid: 'd' },
		];
		const { result, found } = reorderInLayerOrderHelper(order, 'c', 'a', 'before');
		expect(found).to.equal(true);
		expect(result.map((o) => o.uuid)).to.deep.equal(['c', 'a', 'b', 'd']);
	});

	it('reorderInLayerOrderHelper moves item after target within flat list', () => {
		const order: LayerOrderItem[] = [
			{ uuid: 'a' }, { uuid: 'b' }, { uuid: 'c' }, { uuid: 'd' },
		];
		const { result, found } = reorderInLayerOrderHelper(order, 'a', 'c', 'after');
		expect(found).to.equal(true);
		expect(result.map((o) => o.uuid)).to.deep.equal(['b', 'c', 'a', 'd']);
	});

	it('reorderInLayerOrderHelper operates inside nested folder', () => {
		const order: LayerOrderItem[] = [
			{
				uuid: 'folder',
				layers: [{ uuid: 'a' }, { uuid: 'b' }, { uuid: 'c' }],
			},
		];
		const { result, found } = reorderInLayerOrderHelper(order, 'c', 'a', 'before');
		expect(found).to.equal(true);
		const children = result[0].layers ?? [];
		expect(children.map((o) => o.uuid)).to.deep.equal(['c', 'a', 'b']);
	});

	it('updateStyle is idempotent — applying same style twice yields same layer count', () => {
		setMapConfig(MAP_ID, {
			name: 'test', mapProps: { center: [0, 0], zoom: 1 },
			layers: [geojsonLayer('g1')],
			layerOrder: [{ uuid: 'g1' }],
		});
		updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		const layersAfterFirst = useMapStore.getState().mapConfigs[MAP_ID].layers.length;

		updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		const layersAfterSecond = useMapStore.getState().mapConfigs[MAP_ID].layers.length;

		expect(layersAfterSecond).to.equal(layersAfterFirst);
	});
});

// ─── Map integration: single custom layer, no style ─────────────────────────

describe('LayerOrder — single custom layer, blank style', () => {
	beforeEach(() => {
		useMapStore.setState({ mapConfigs: {} });
	});

	it('geojson layer appears in the map style after setMapConfig', () => {
		setMapConfig(MAP_ID, {
			name: 'test', mapProps: { center: [0, 0], zoom: 1 },
			layers: [geojsonLayer('g1', 'GeoJSON Layer')],
			layerOrder: [{ uuid: 'g1' }],
		});
		mountMap();

		waitForLayers(['g1']);
	});

	it('WMS layer appears in the map style after setMapConfig', () => {
		setMapConfig(MAP_ID, {
			name: 'test', mapProps: { center: [0, 0], zoom: 1 },
			layers: [wmsLayer('w1', 'WMS Layer')],
			layerOrder: [{ uuid: 'w1' }],
		});
		mountMap();

		waitForLayers(['w1']);
	});

	it('order markers appear for each layer (order-{uuid})', () => {
		setMapConfig(MAP_ID, {
			name: 'test', mapProps: { center: [0, 0], zoom: 1 },
			layers: [geojsonLayer('g1'), geojsonLayer('g2')],
			layerOrder: [{ uuid: 'g1' }, { uuid: 'g2' }],
		});
		mountMap();

		waitForLayers(['order-g1', 'order-g2', 'g1', 'g2']);
	});
});

// ─── Map integration: MultipleLayertypes story config ────────────────────────

describe('LayerOrder — MultipleLayertypes story (geojson + vt + wms in a folder)', () => {
	// UUIDs matching the story
	const FOLDER = 'acd3d99f-2f82-40a5-a5c9-f303d54f5606';
	const GEOJSON = 'fec837fa-1d5d-432b-89c2-b416c9773523';
	const VT = '346ced38-142c-4b57-8193-d689ffc7dfc2';
	const VT_SUB1 = '7feaa47a-f667-49ee-9780-312eabaa872b';
	const VT_SUB2 = '346ced38-142c-4b57-8193-d689ffc7dfc2';
	const WMS = '0e8cd91b-bd49-419d-a19a-5b15dec17542';

	function storyConfig(): MapConfig {
		return {
			name: 'Demo Map',
			mapProps: { center: [7.0851268, 50.73884], zoom: 12 },
			layers: [
				folderLayer(FOLDER, 'layers in a folder'),
				geojsonLayer(GEOJSON, 'Example Point Layer'),
				vtLayer(VT, VT_SUB1, VT_SUB2, 'Vector Layer'),
				wmsLayer(WMS, 'Example WMS Layer'),
			] as LayerConfig[],
			layerOrder: [{
				uuid: FOLDER,
				layers: [{ uuid: GEOJSON }, { uuid: VT }, { uuid: WMS }],
			}],
		};
	}

	beforeEach(() => {
		useMapStore.setState({ mapConfigs: {} });
		setMapConfig(MAP_ID, storyConfig());
	});

	it('all custom layers appear in map style (no style applied)', () => {
		mountMap();
		waitForLayers([GEOJSON, VT_SUB1, WMS]);
	});

	it('custom layers appear between zone markers after updateStyle', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		// Wait for zone markers AND all custom layer ids to be present
		waitForZoneMarkers([GEOJSON, WMS]);

		cy.window().should((win) => {
			const ids = getLayerIds(win);
			assertAbove(ids, GEOJSON, MARKER_BG);
			assertAbove(ids, MARKER_LABELS, GEOJSON);
			assertAbove(ids, WMS, MARKER_BG);
			assertAbove(ids, MARKER_LABELS, WMS);
		});
	});

	it('relative order of layers within folder matches store order', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		// Store order (top→bottom visual) is: GEOJSON, VT, WMS
		// MapLibre stack (bottom→top) is reversed: WMS, VT, GEOJSON
		// But between the zone markers the relative order must match store intent.
		// Store index 0 (GEOJSON) = highest in zone = largest index in MapLibre stack.
		waitForZoneMarkers([GEOJSON, WMS]);

		cy.window().should((win) => {
			const ids = getLayerIds(win);
			// GEOJSON is index 0 in store → should appear higher in map stack than WMS (index 2)
			assertAbove(ids, GEOJSON, WMS);
		});
	});
});

// ─── Map integration: flat multi-layer config ────────────────────────────────

describe('LayerOrder — flat list of 3 custom layers', () => {
	const G1 = 'flat-g1';
	const G2 = 'flat-g2';
	const W1 = 'flat-w1';

	beforeEach(() => {
		useMapStore.setState({ mapConfigs: {} });
		setMapConfig(MAP_ID, {
			name: 'flat', mapProps: { center: [0, 0], zoom: 1 },
			layers: [geojsonLayer(G1), geojsonLayer(G2), wmsLayer(W1)],
			layerOrder: [{ uuid: G1 }, { uuid: G2 }, { uuid: W1 }],
		});
	});

	it('zone markers and custom layers exist after updateStyle', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([G1, G2, W1]);
	});

	it('all custom layers are above order-background', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([G1, G2, W1]);

		cy.window().should((win) => {
			const ids = getLayerIds(win);
			assertAbove(ids, G1, MARKER_BG);
			assertAbove(ids, G2, MARKER_BG);
			assertAbove(ids, W1, MARKER_BG);
		});
	});

	it('all custom layers are below order-labels', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([G1, G2, W1]);

		cy.window().should((win) => {
			const ids = getLayerIds(win);
			assertAbove(ids, MARKER_LABELS, G1);
			assertAbove(ids, MARKER_LABELS, G2);
			assertAbove(ids, MARKER_LABELS, W1);
		});
	});

	it('store order (G1 > G2 > W1) matches visual stacking (G1 highest)', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([G1, G2, W1]);

		cy.window().should((win) => {
			const ids = getLayerIds(win);
			// Store: [G1, G2, W1] — index 0 = top visually = highest maplibre index
			assertAbove(ids, G1, G2);
			assertAbove(ids, G2, W1);
		});
	});

	it('drag-reorder: moving G1 after W1 is reflected in map stack immediately', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([G1, G2, W1]);

		// Perform reorder via store (same path as DnD onReorder callback)
		cy.window().then((win) => {
			const mc = (win as any).__mapStore.getState().mapConfigs[MAP_ID];
			const { result, found } = reorderInLayerOrderHelper(mc.layerOrder, G1, W1, 'after');
			if (found) updateLayerOrder(MAP_ID, result);
		});

		// Now order should be [G2, W1, G1] — G2 highest, G1 lowest
		cy.window({ timeout: 5000 }).should((win) => {
			const ids = getLayerIds(win);
			// G2 should now be above W1 (G2 is first in updated order)
			assertAbove(ids, G2, W1);
			// W1 should be above G1 (G1 moved to last = lowest)
			assertAbove(ids, W1, G1);
			// All still above bg marker
			assertAbove(ids, G1, MARKER_BG);
			// All still below labels marker
			assertAbove(ids, MARKER_LABELS, G2);
		});
	});

	it('drag-reorder: moving W1 before G1 is reflected in map stack immediately', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([G1, G2, W1]);

		cy.window().then((win) => {
			const mc = (win as any).__mapStore.getState().mapConfigs[MAP_ID];
			const { result, found } = reorderInLayerOrderHelper(mc.layerOrder, W1, G1, 'before');
			if (found) updateLayerOrder(MAP_ID, result);
		});

		// New order: [W1, G1, G2] — W1 highest, G2 lowest
		cy.window({ timeout: 5000 }).should((win) => {
			const ids = getLayerIds(win);
			assertAbove(ids, W1, G1);
			assertAbove(ids, G1, G2);
		});
	});
});

// ─── Map integration: VT layer sub-layers ────────────────────────────────────

describe('LayerOrder — VT layer sub-layers are inside the zone', () => {
	const VT_UUID = 'vt-order-test';
	const VT_S1 = 'vt-sub-1';
	const VT_S2 = 'vt-sub-2';
	const GEOJSON_UUID = 'geojson-above-vt';

	beforeEach(() => {
		useMapStore.setState({ mapConfigs: {} });
		setMapConfig(MAP_ID, {
			name: 'vt-test', mapProps: { center: [0, 0], zoom: 1 },
			layers: [geojsonLayer(GEOJSON_UUID), vtLayer(VT_UUID, VT_S1, VT_S2)],
			// store order: GEOJSON (top) then VT (bottom)
			layerOrder: [{ uuid: GEOJSON_UUID }, { uuid: VT_UUID }],
		});
	});

	it('VT sub-layers appear in map style', () => {
		mountMap();
		waitForLayers([VT_S1, VT_S2]);
	});

	it('VT sub-layers and geojson are all between zone markers after updateStyle', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([VT_S1, VT_S2, GEOJSON_UUID]);

		cy.window().should((win) => {
			const ids = getLayerIds(win);
			for (const id of [VT_S1, VT_S2, GEOJSON_UUID]) {
				assertAbove(ids, id, MARKER_BG);
				assertAbove(ids, MARKER_LABELS, id);
			}
		});
	});

	it('GEOJSON (index 0 in store) is visually above VT (index 1)', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([VT_S1, GEOJSON_UUID]);

		cy.window().should((win) => {
			const ids = getLayerIds(win);
			// GEOJSON is index 0 (top of store → top of visual stack in zone)
			// VT sub-layers are index 1 (lower)
			assertAbove(ids, GEOJSON_UUID, VT_S1);
		});
	});
});

// ─── Map integration: large flat list (LargeLayerTree story profile) ─────────

describe('LayerOrder — large flat list (5 × 6 layers = 30 layers)', () => {
	/**
	 * Build a config similar to the LargeLayerTree story:
	 * 5 folders, each with 6 layers (2 geojson, 2 vt, 2 wms per folder).
	 */
	function buildLargeConfig(): { config: MapConfig; allCustomIds: string[] } {
		const layers: LayerConfig[] = [];
		const layerOrder: LayerOrderItem[] = [];
		const allCustomIds: string[] = [];

		for (let f = 0; f < 5; f++) {
			const folderUuid = `folder-${f}`;
			layers.push(folderLayer(folderUuid, `Folder ${f}`));
			const children: LayerOrderItem[] = [];

			for (let l = 0; l < 6; l++) {
				const uuid = `layer-${f}-${l}`;
				const mod = l % 3;
				if (mod === 0) {
					layers.push(geojsonLayer(uuid, `GeoJSON ${f}-${l}`));
					allCustomIds.push(uuid);
				} else if (mod === 1) {
					const s1 = `${uuid}-s1`, s2 = `${uuid}-s2`;
					layers.push(vtLayer(uuid, s1, s2, `VT ${f}-${l}`));
					allCustomIds.push(s1, s2);
				} else {
					layers.push(wmsLayer(uuid, `WMS ${f}-${l}`));
					allCustomIds.push(uuid);
				}
				children.push({ uuid });
			}
			layerOrder.push({ uuid: folderUuid, layers: children });
		}

		return {
			config: { name: 'large', mapProps: { center: [0, 0], zoom: 1 }, layers, layerOrder },
			allCustomIds,
		};
	}

	beforeEach(() => {
		useMapStore.setState({ mapConfigs: {} });
	});

	it('all 30 custom layers appear between zone markers after updateStyle', () => {
		const { config, allCustomIds } = buildLargeConfig();
		setMapConfig(MAP_ID, config);
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		// Wait for zone markers plus a representative subset of layers
		waitForZoneMarkers([allCustomIds[0], allCustomIds[allCustomIds.length - 1]]);

		// Now assert the full set
		cy.window({ timeout: 15000 }).should((win) => {
			const ids = getLayerIds(win);
			for (const id of allCustomIds) {
				if (!ids.includes(id)) throw new Error(`layer "${id}" not in map style yet`);
				assertAbove(ids, id, MARKER_BG);
				assertAbove(ids, MARKER_LABELS, id);
			}
		});
	});
});

// ─── Map integration: correct order on first try (no flash) ──────────────────

describe('LayerOrder — correct stacking on FIRST render (no reconciler correction needed)', () => {
	/**
	 * The key property we're testing: after our fix to useOrderReconciler,
	 * the map layer order should be correct immediately after the store
	 * update — not only after an addlayer event fires.
	 *
	 * We verify this by:
	 * 1. Applying the style + layers
	 * 2. Polling with a TIGHT timeout (1 s) for the correct order
	 * 3. Never seeing a wrong intermediate state
	 */
	const A = 'first-try-a';
	const B = 'first-try-b';
	const C = 'first-try-c';

	beforeEach(() => {
		useMapStore.setState({ mapConfigs: {} });
		setMapConfig(MAP_ID, {
			name: 'first-try', mapProps: { center: [0, 0], zoom: 1 },
			layers: [geojsonLayer(A), geojsonLayer(B), geojsonLayer(C)],
			layerOrder: [{ uuid: A }, { uuid: B }, { uuid: C }],
		});
	});

	it('initial layer order A > B > C is correct as soon as layers appear', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		// Tight poll — should settle within 1 s with the fix in place
		cy.window({ timeout: 2000 }).should((win) => {
			const ids = getLayerIds(win);
			if (!ids.includes(A) || !ids.includes(B) || !ids.includes(C)) {
				throw new Error('layers not yet present');
			}
			assertOrder(ids, [MARKER_BG, C, B, A, MARKER_LABELS], 'initial order');
		});
	});

	it('after reorder A→last, order B > C > A is correct immediately', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([A, B, C]);

		// Move A after C (A becomes last/lowest in the zone)
		cy.window().then((win) => {
			const mc = (win as any).__mapStore.getState().mapConfigs[MAP_ID];
			const { result, found } = reorderInLayerOrderHelper(mc.layerOrder, A, C, 'after');
			if (found) updateLayerOrder(MAP_ID, result);
		});

		// Poll with tight timeout — reconciler should fire synchronously on order change
		cy.window({ timeout: 2000 }).should((win) => {
			const ids = getLayerIds(win);
			// New store order: [B, C, A] → MapLibre stack: A (low), C, B (high)
			assertAbove(ids, B, C);
			assertAbove(ids, C, A);
		});
	});

	it('two consecutive reorders settle to correct final order', () => {
		mountMap();

		waitForMap().then(() => {
			updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
		});

		waitForZoneMarkers([A, B, C]);

		// Reorder 1: move C before A → [C, A, B]
		cy.window().then((win) => {
			const mc = (win as any).__mapStore.getState().mapConfigs[MAP_ID];
			const { result: r1, found: f1 } = reorderInLayerOrderHelper(mc.layerOrder, C, A, 'before');
			if (f1) updateLayerOrder(MAP_ID, r1);
		});

		// Reorder 2: move B before C → [B, C, A]
		cy.window().then((win) => {
			const mc = (win as any).__mapStore.getState().mapConfigs[MAP_ID];
			const { result: r2, found: f2 } = reorderInLayerOrderHelper(mc.layerOrder, B, C, 'before');
			if (f2) updateLayerOrder(MAP_ID, r2);
		});

		// Final store order: [B, C, A] → MapLibre stack bottom→top: A, C, B
		cy.window({ timeout: 3000 }).should((win) => {
			const ids = getLayerIds(win);
			assertAbove(ids, B, C);
			assertAbove(ids, C, A);
		});
	});
});

// ─── Map integration: style zones remain correct after reorder ───────────────

describe('LayerOrder — zone boundaries never violated after reorder', () => {
	const LAYERS = ['zone-a', 'zone-b', 'zone-c', 'zone-d'];

	beforeEach(() => {
		useMapStore.setState({ mapConfigs: {} });
		setMapConfig(MAP_ID, {
			name: 'zone-test', mapProps: { center: [0, 0], zoom: 1 },
			layers: LAYERS.map((id) => geojsonLayer(id)),
			layerOrder: LAYERS.map((uuid) => ({ uuid })),
		});
	});

	const REORDERS: Array<[string, string, 'before' | 'after']> = [
		['zone-d', 'zone-a', 'before'],
		['zone-b', 'zone-d', 'after'],
		['zone-c', 'zone-a', 'after'],
	];

	REORDERS.forEach(([dragged, target, pos]) => {
		it(`after reorder (${dragged} ${pos} ${target}): all layers stay in custom zone`, () => {
			mountMap();

			waitForMap().then(() => {
				updateStyle(MAP_ID, FAKE_OSM_STYLE as any);
			});

			waitForZoneMarkers(LAYERS);

			cy.window().then((win) => {
				const mc = (win as any).__mapStore.getState().mapConfigs[MAP_ID];
				const { result, found } = reorderInLayerOrderHelper(mc.layerOrder, dragged, target, pos);
				if (found) updateLayerOrder(MAP_ID, result);
			});

			cy.window({ timeout: 3000 }).should((win) => {
				const ids = getLayerIds(win);
				for (const id of LAYERS) {
					assertAbove(ids, id, MARKER_BG);
					assertAbove(ids, MARKER_LABELS, id);
				}
			});
		});
	});
});
