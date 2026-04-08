import { useEffect } from 'react';
import { mount } from '@cypress/react';
import { expect } from 'chai';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { MapComponentsProvider } from '../../index';
import MapLibreMap from '../../components/MapLibreMap/MapLibreMap';
import getTheme from '../MapcomponentsTheme';
import LayerTree from './LayerTree';
import useMapStore, {
	setMapConfig,
	MapConfig,
	LayerConfig,
	updateStyle,
} from '../../stores/map.store';
import { STYLE_LAYER_UUIDS } from './styleLayerUuids';

// ---------------------------------------------------------------------------
// Test fixtures — deterministic UUIDs so selectors are stable across runs
// ---------------------------------------------------------------------------

const GEOJSON_UUID = 'test-geojson-uuid';
const VT_UUID = 'test-vt-uuid';
const VT_SUB1_ID = 'test-vt-sub1';
const VT_SUB2_ID = 'test-vt-sub2';
const WMS_UUID = 'test-wms-uuid';
const FOLDER_UUID = 'test-folder-uuid';
const MAP_CONFIG_KEY = 'cypress-test-map';

const SAMPLE_GEOJSON = {
	type: 'FeatureCollection' as const,
	features: [
		{
			type: 'Feature' as const,
			geometry: { type: 'Point' as const, coordinates: [7.0851268, 50.73884] },
			properties: {},
		},
	],
};

function buildTestMapConfig(): MapConfig {
	return {
		name: 'Cypress Test Map',
		mapProps: { center: [7.0851268, 50.73884], zoom: 12 },
		layers: [
			{
				type: 'folder',
				uuid: FOLDER_UUID,
				name: 'Test Folder',
				visible: true,
			},
			{
				type: 'geojson',
				uuid: GEOJSON_UUID,
				name: 'Test GeoJSON',
				config: {
					geojson: SAMPLE_GEOJSON,
					options: {
						paint: { 'circle-color': 'red', 'circle-radius': 5 },
						layout: { visibility: 'visible' },
					},
				},
			},
			{
				type: 'vt',
				uuid: VT_UUID,
				name: 'Test VT',
				visible: true,
				config: {
					url: 'https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf',
					layers: [
						{
							id: VT_SUB1_ID,
							type: 'fill',
							'source-layer': 'water',
							source: 'openmaptiles',
							layout: { visibility: 'visible' },
							paint: { 'fill-color': '#0905f5', 'fill-opacity': 0.5 },
							maxzoom: 20,
						},
						{
							id: VT_SUB2_ID,
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
						tiles: ['https://wms.wheregroup.com/tileserver/tile/world-0-14/{z}/{x}/{y}.pbf'],
					},
				},
			},
			{
				type: 'wms',
				uuid: WMS_UUID,
				name: 'Test WMS',
				config: {
					url: 'https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme',
					urlParameters: { layers: 'nw_uraufnahme_rw' },
					visible: true,
				},
			},
		] as LayerConfig[],
		layerOrder: [
			{
				uuid: FOLDER_UUID,
				layers: [
					{ uuid: GEOJSON_UUID },
					{ uuid: VT_UUID },
					{ uuid: WMS_UUID },
				],
			},
		],
	};
}

// ---------------------------------------------------------------------------
// Test wrapper component
// ---------------------------------------------------------------------------

function TestWrapper() {
	useEffect(() => {
		setMapConfig(MAP_CONFIG_KEY, buildTestMapConfig());
		// Expose store on window for assertions
		(window as any).__mapStore = useMapStore;
		return () => {
			useMapStore.getState().removeMapConfig(MAP_CONFIG_KEY);
		};
	}, []);

	return (
		<div style={{ display: 'flex', width: '100%', height: '600px' }}>
			<div style={{ width: '300px', height: '100%', overflow: 'auto', background: '#fff', zIndex: 10, position: 'relative' }}>
				<LayerTree mapId={MAP_CONFIG_KEY} />
			</div>
			<div style={{ flex: 1, position: 'relative' }}>
				<MapLibreMap
					options={{
						zoom: 12,
						style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
						center: [7.0851268, 50.73884],
					}}
					mapId="map_1"
				/>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wait for _map to exist and be fully loaded. Returns the map instance. */
function waitForMapLoad() {
	return cy
		.window({ timeout: 30000 })
		.should((win) => expect((win as any)._map).to.exist)
		.then((win) => {
			const map = (win as any)._map;
			return new Cypress.Promise<any>((resolve) => {
				if (map.loaded()) {
					resolve(map);
				} else {
					map.once('load', () => resolve(map));
				}
			});
		});
}

/** Assert the visibility of a layer in the MapLibre style. */
function assertMapLayerVisibility(
	map: any,
	layerId: string,
	expected: 'visible' | 'none'
) {
	const layer = map.getStyle()?.layers?.find((l: any) => l.id === layerId);
	if (!layer) throw new Error(`layer "${layerId}" should exist in style`);
	const actual = map.getLayoutProperty(layerId, 'visibility') ?? 'visible';
	expect(actual, `visibility of "${layerId}"`).to.equal(expected);
}

/** Get the current store state from the window. */
function getStoreState() {
	return cy.window().then((win) => (win as any).__mapStore.getState());
}

// ---------------------------------------------------------------------------
// Mounting helper
// ---------------------------------------------------------------------------

function mountTestWrapper() {
	const theme = getTheme('light');
	mount(
		<MapComponentsProvider>
			<MUIThemeProvider theme={theme}>
				<TestWrapper />
			</MUIThemeProvider>
		</MapComponentsProvider>
	);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('LayerTree — checkbox visibility', () => {
	beforeEach(() => {
		// Clean slate for store between tests
		cy.window().then((win) => {
			if ((win as any).__mapStore) {
				(win as any).__mapStore.getState().removeMapConfig(MAP_CONFIG_KEY);
			}
		});
	});

	// -------------------------------------------------------------------------
	// Store unit: toggle visibility state
	// -------------------------------------------------------------------------

	describe('Store: toggle visibility state', () => {
		it('toggles geojson layer visibility in store', () => {
			// Directly test store logic without map
			cy.window().then(() => {
				useMapStore.setState({ mapConfigs: {} });
				setMapConfig(MAP_CONFIG_KEY, buildTestMapConfig());

				const before = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const geojson = before._layerIndex?.get(GEOJSON_UUID) as any;
				expect(geojson.config.options.layout.visibility).to.equal('visible');

				// Simulate toggle off
				useMapStore.getState().setLayerInMapConfig(MAP_CONFIG_KEY, {
					...geojson,
					config: {
						...geojson.config,
						options: {
							...geojson.config.options,
							layout: { ...geojson.config.options.layout, visibility: 'none' },
						},
					},
				});

				const after = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const updated = after._layerIndex?.get(GEOJSON_UUID) as any;
				expect(updated.config.options.layout.visibility).to.equal('none');
			});
		});

		it('toggles VT layer visible flag in store', () => {
			cy.window().then(() => {
				useMapStore.setState({ mapConfigs: {} });
				setMapConfig(MAP_CONFIG_KEY, buildTestMapConfig());

				const before = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const vt = before._layerIndex?.get(VT_UUID) as any;
				expect(vt.visible).to.equal(true);

				useMapStore.getState().setLayerInMapConfig(MAP_CONFIG_KEY, {
					...vt,
					visible: false,
				});

				const after = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const updated = after._layerIndex?.get(VT_UUID) as any;
				expect(updated.visible).to.equal(false);
			});
		});

		it('toggles WMS visible flag in store', () => {
			cy.window().then(() => {
				useMapStore.setState({ mapConfigs: {} });
				setMapConfig(MAP_CONFIG_KEY, buildTestMapConfig());

				const before = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const wms = before._layerIndex?.get(WMS_UUID) as any;
				expect(wms.config.visible).to.equal(true);

				useMapStore.getState().setLayerInMapConfig(MAP_CONFIG_KEY, {
					...wms,
					config: { ...wms.config, visible: false },
					visible: false,
				});

				const after = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const updated = after._layerIndex?.get(WMS_UUID) as any;
				expect(updated.config.visible).to.equal(false);
			});
		});

		it('setMasterVisible false on folder sets masterVisible on all children', () => {
			cy.window().then(() => {
				useMapStore.setState({ mapConfigs: {} });
				setMapConfig(MAP_CONFIG_KEY, buildTestMapConfig());

				useMapStore.getState().setMasterVisible(MAP_CONFIG_KEY, FOLDER_UUID, false);

				const state = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const geojson = state._layerIndex?.get(GEOJSON_UUID) as any;
				const vt = state._layerIndex?.get(VT_UUID) as any;
				const wms = state._layerIndex?.get(WMS_UUID) as any;

				expect(geojson.masterVisible).to.equal(false);
				expect(vt.masterVisible).to.equal(false);
				expect(wms.masterVisible).to.equal(false);

				// VT sublayers also get masterVisible
				vt.config.layers.forEach((sl: any) => {
					expect(sl.masterVisible).to.equal(false);
				});
			});
		});

		it('setMasterVisible false on VT layer sets masterVisible on its sublayers', () => {
			cy.window().then(() => {
				useMapStore.setState({ mapConfigs: {} });
				setMapConfig(MAP_CONFIG_KEY, buildTestMapConfig());

				useMapStore.getState().setMasterVisible(MAP_CONFIG_KEY, VT_UUID, false);

				const state = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const vt = state._layerIndex?.get(VT_UUID) as any;
				vt.config.layers.forEach((sl: any) => {
					expect(sl.masterVisible).to.equal(false);
				});
			});
		});

		it('folder visible state toggles correctly', () => {
			cy.window().then(() => {
				useMapStore.setState({ mapConfigs: {} });
				setMapConfig(MAP_CONFIG_KEY, buildTestMapConfig());

				const before = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const folder = before._layerIndex?.get(FOLDER_UUID) as any;
				expect(folder.visible).to.equal(true);

				// Toggle off
				useMapStore.getState().setLayerInMapConfig(MAP_CONFIG_KEY, {
					...folder,
					visible: false,
				});

				const after = useMapStore.getState().mapConfigs[MAP_CONFIG_KEY];
				const updated = after._layerIndex?.get(FOLDER_UUID) as any;
				expect(updated.visible).to.equal(false);
			});
		});
	});

	// -------------------------------------------------------------------------
	// UI + Map integration: checkbox clicks affect map style
	// -------------------------------------------------------------------------

	describe('UI: checkbox clicks update LayerTree state', () => {
		it('geojson checkbox renders checked initially', () => {
			mountTestWrapper();
			cy.get(`[data-testid="layer-checkbox-${GEOJSON_UUID}"] input`, { timeout: 10000 }).should(
				'be.checked'
			);
		});

		it('geojson checkbox unchecks and re-checks on click', () => {
			mountTestWrapper();
			const checkbox = () => cy.get(`[data-testid="layer-checkbox-${GEOJSON_UUID}"] input`, { timeout: 10000 });

			checkbox().should('be.checked');
			// Click to uncheck
			cy.get(`[data-testid="layer-checkbox-${GEOJSON_UUID}"]`).click();
			checkbox().should('not.be.checked');
			// Click to re-check
			cy.get(`[data-testid="layer-checkbox-${GEOJSON_UUID}"]`).click();
			checkbox().should('be.checked');
		});

		it('geojson checkbox click updates store visibility', () => {
			mountTestWrapper();
			cy.get(`[data-testid="layer-checkbox-${GEOJSON_UUID}"]`, { timeout: 10000 }).click();

			getStoreState().then((state: any) => {
				const layer = state.mapConfigs[MAP_CONFIG_KEY]?._layerIndex?.get(GEOJSON_UUID) as any;
				expect(layer.config.options.layout.visibility).to.equal('none');
			});
		});

		it('VT parent checkbox unchecks and updates store', () => {
			mountTestWrapper();
			// VT layer needs folder to be open first (VT is inside the folder)
			cy.get(`[data-testid="layer-checkbox-${VT_UUID}"] input`, { timeout: 10000 }).should(
				'be.checked'
			);
			cy.get(`[data-testid="layer-checkbox-${VT_UUID}"]`).click();

			getStoreState().then((state: any) => {
				const layer = state.mapConfigs[MAP_CONFIG_KEY]?._layerIndex?.get(VT_UUID) as any;
				expect(layer.visible).to.equal(false);
			});
		});

		it('WMS checkbox unchecks and updates store', () => {
			mountTestWrapper();
			cy.get(`[data-testid="layer-checkbox-${WMS_UUID}"] input`, { timeout: 10000 }).should(
				'be.checked'
			);
			cy.get(`[data-testid="layer-checkbox-${WMS_UUID}"]`).click();

			getStoreState().then((state: any) => {
				const layer = state.mapConfigs[MAP_CONFIG_KEY]?._layerIndex?.get(WMS_UUID) as any;
				expect(layer.config.visible).to.equal(false);
			});
		});

		it('folder checkbox unchecks all children (masterVisible=false)', () => {
			mountTestWrapper();
			cy.get(`[data-testid="layer-checkbox-${FOLDER_UUID}"] input`, { timeout: 10000 }).should(
				'be.checked'
			);
			cy.get(`[data-testid="layer-checkbox-${FOLDER_UUID}"]`).click();

			getStoreState().then((state: any) => {
				const mc = state.mapConfigs[MAP_CONFIG_KEY];
				const geojson = mc._layerIndex?.get(GEOJSON_UUID) as any;
				const vt = mc._layerIndex?.get(VT_UUID) as any;
				const wms = mc._layerIndex?.get(WMS_UUID) as any;
				expect(geojson.masterVisible).to.equal(false);
				expect(vt.masterVisible).to.equal(false);
				expect(wms.masterVisible).to.equal(false);
			});
		});

		it('folder checkbox re-enables children on second click', () => {
			mountTestWrapper();
			cy.get(`[data-testid="layer-checkbox-${FOLDER_UUID}"]`, { timeout: 10000 }).click();
			cy.get(`[data-testid="layer-checkbox-${FOLDER_UUID}"]`).click();

			getStoreState().then((state: any) => {
				const mc = state.mapConfigs[MAP_CONFIG_KEY];
				const geojson = mc._layerIndex?.get(GEOJSON_UUID) as any;
				const vt = mc._layerIndex?.get(VT_UUID) as any;
				const wms = mc._layerIndex?.get(WMS_UUID) as any;
				// masterVisible should be true after re-enabling
				expect(geojson.masterVisible).to.not.equal(false);
				expect(vt.masterVisible).to.not.equal(false);
				expect(wms.masterVisible).to.not.equal(false);
			});
		});

		it('child layer checkbox is disabled when folder masterVisible is false', () => {
			mountTestWrapper();
			// Disable folder
			cy.get(`[data-testid="layer-checkbox-${FOLDER_UUID}"]`, { timeout: 10000 }).click();

			// Children's checkboxes should be visually disabled
			cy.get(`[data-testid="layer-checkbox-${GEOJSON_UUID}"] input`).should('be.disabled');
			cy.get(`[data-testid="layer-checkbox-${WMS_UUID}"] input`).should('be.disabled');
		});
	});

	// -------------------------------------------------------------------------
	// Map integration: MapLayerRenderer reflects store state in map style
	// -------------------------------------------------------------------------

	describe('Map integration: MapLayerRenderer re-renders on visibility change', () => {
		it('geojson layer is visible on map initially', () => {
			mountTestWrapper();
			waitForMapLoad().then((map) => {
				cy.wrap(map).should((m: any) => {
					const layer = m.getStyle()?.layers?.find((l: any) => l.id === GEOJSON_UUID);
					if (!layer) throw new Error(`geojson layer "${GEOJSON_UUID}" should exist in map style`);
				});
			});
		});

		it('geojson layer becomes invisible on map after checkbox click', () => {
			mountTestWrapper();
			waitForMapLoad().then(() => {
				// Click the checkbox to hide the layer
				cy.get(`[data-testid="layer-checkbox-${GEOJSON_UUID}"]`, { timeout: 10000 }).click();

				// The map layer's visibility should update
				cy.window().should((win) => {
					const map = (win as any)._map;
					assertMapLayerVisibility(map, GEOJSON_UUID, 'none');
				});
			});
		});

		it('geojson layer becomes visible again after second click', () => {
			mountTestWrapper();
			waitForMapLoad().then(() => {
				cy.get(`[data-testid="layer-checkbox-${GEOJSON_UUID}"]`, { timeout: 10000 }).click();

				// Wait for hide to take effect
				cy.window().should((win) => {
					assertMapLayerVisibility((win as any)._map, GEOJSON_UUID, 'none');
				});

				// Click again to re-show
				cy.get(`[data-testid="layer-checkbox-${GEOJSON_UUID}"]`).click();

				cy.window().should((win) => {
					assertMapLayerVisibility((win as any)._map, GEOJSON_UUID, 'visible');
				});
			});
		});

		it('folder masterVisible false hides children on map', () => {
			mountTestWrapper();
			waitForMapLoad().then(() => {
				cy.get(`[data-testid="layer-checkbox-${FOLDER_UUID}"]`, { timeout: 10000 }).click();

				cy.window().should((win) => {
					const map = (win as any)._map;
					// Geojson should be hidden because masterVisible=false overrides layout.visibility
					assertMapLayerVisibility(map, GEOJSON_UUID, 'none');
				});
			});
		});

		it('folder masterVisible true restores children on map', () => {
			mountTestWrapper();
			waitForMapLoad().then(() => {
				// Hide folder
				cy.get(`[data-testid="layer-checkbox-${FOLDER_UUID}"]`, { timeout: 10000 }).click();

				cy.window().should((win) => {
					assertMapLayerVisibility((win as any)._map, GEOJSON_UUID, 'none');
				});

				// Re-enable folder
				cy.get(`[data-testid="layer-checkbox-${FOLDER_UUID}"]`).click();

				cy.window().should((win) => {
					assertMapLayerVisibility((win as any)._map, GEOJSON_UUID, 'visible');
				});
			});
		});
	});
});

// ---------------------------------------------------------------------------
// Layer order tests — verifies MapLayerRenderer stacking zones
// ---------------------------------------------------------------------------

const ORDER_GEOJSON_UUID = 'order-test-geojson';
const ORDER_VT_UUID = 'order-test-vt';
const ORDER_VT_SUB1 = 'order-test-vt-sub1';
const ORDER_VT_SUB2 = 'order-test-vt-sub2';
const ORDER_WMS_UUID = 'order-test-wms';
const ORDER_MAP_KEY = 'order-test-map';

// Minimal fake style with background + symbol layers to trigger the three-zone
// ordering inside MapLayerRenderer.
const FAKE_STYLE_BG_LAYER_ID = 'fake-bg-fill';
const FAKE_STYLE_LABEL_LAYER_ID = 'fake-label-symbol';

const FAKE_STYLE = {
	version: 8 as const,
	name: 'FakeStyle',
	sources: {
		fakesource: {
			type: 'vector' as const,
			tiles: ['https://example.com/{z}/{x}/{y}.pbf'],
		},
	},
	layers: [
		{
			id: FAKE_STYLE_BG_LAYER_ID,
			type: 'fill',
			source: 'fakesource',
			'source-layer': 'water',
			paint: { 'fill-color': '#aad3df' },
		},
		{
			id: FAKE_STYLE_LABEL_LAYER_ID,
			type: 'symbol',
			source: 'fakesource',
			'source-layer': 'place',
			layout: { 'text-field': '{name}' },
		},
	],
};

function buildOrderTestConfig(): MapConfig {
	return {
		name: 'Order Test Map',
		mapProps: { center: [7.0851268, 50.73884], zoom: 12 },
		layers: [
			{
				type: 'geojson',
				uuid: ORDER_GEOJSON_UUID,
				name: 'Test GeoJSON',
				config: {
					type: 'circle',
					geojson: {
						type: 'FeatureCollection',
						features: [
							{
								type: 'Feature',
								geometry: { type: 'Point', coordinates: [7.0851268, 50.73884] },
								properties: {},
							},
						],
					},
					options: {
						paint: { 'circle-color': 'red', 'circle-radius': 5 },
						layout: { visibility: 'visible' },
					},
				},
			},
		] as LayerConfig[],
		layerOrder: [{ uuid: ORDER_GEOJSON_UUID }],
	};
}

/** Wrapper component that sets up the store, then triggers updateStyle. */
function OrderTestWrapper() {
	useEffect(() => {
		// 1. Set the map config with custom layers
		setMapConfig(ORDER_MAP_KEY, buildOrderTestConfig());

		// 2. After a tick, apply the fake style (simulates SelectStyleButton)
		const timer = setTimeout(() => {
			updateStyle(ORDER_MAP_KEY, FAKE_STYLE as any);
		}, 500);

		(window as any).__mapStore = useMapStore;

		return () => {
			clearTimeout(timer);
			useMapStore.getState().removeMapConfig(ORDER_MAP_KEY);
		};
	}, []);

	return (
		<div style={{ display: 'flex', width: '100%', height: '600px' }}>
			<div style={{ width: '300px', height: '100%', overflow: 'auto', background: '#fff', zIndex: 10, position: 'relative' }}>
				<LayerTree mapId={ORDER_MAP_KEY} />
			</div>
			<div style={{ flex: 1, position: 'relative' }}>
				<MapLibreMap
					options={{
						zoom: 12,
						style: {
							version: 8,
							name: 'blank',
							sources: {},
							layers: [{ id: 'bg', type: 'background', paint: { 'background-color': '#fff' } }],
						},
						center: [7.0851268, 50.73884],
					}}
					mapId="map_1"
				/>
			</div>
		</div>
	);
}

function mountOrderTest() {
	const theme = getTheme('light');
	mount(
		<MapComponentsProvider>
			<MUIThemeProvider theme={theme}>
				<OrderTestWrapper />
			</MUIThemeProvider>
		</MapComponentsProvider>
	);
}

/**
 * Return the array of layer ids from the MapLibre style, bottom to top.
 */
function getMapLayerIds(map: any): string[] {
	return (map.getStyle()?.layers ?? []).map((l: any) => l.id);
}

/**
 * Assert `a` appears at a higher visual position than `b` in the MapLibre
 * layer stack (i.e. `a` has a larger index).
 */
function assertAbove(layerIds: string[], a: string, b: string) {
	const idxA = layerIds.indexOf(a);
	const idxB = layerIds.indexOf(b);
	if (idxA === -1) throw new Error(`layer "${a}" not found in stack`);
	if (idxB === -1) throw new Error(`layer "${b}" not found in stack`);
	expect(idxA, `"${a}" should be above "${b}" (idx ${idxA} > ${idxB})`).to.be.greaterThan(idxB);
}

describe('Layer order — MapLayerRenderer stacking zones', () => {
	beforeEach(() => {
		cy.window().then((win) => {
			if ((win as any).__mapStore) {
				(win as any).__mapStore.getState().removeMapConfig(ORDER_MAP_KEY);
			}
		});
	});

	it('custom geojson layer exists on the map', () => {
		mountOrderTest();

		// Wait for the map to be ready and the geojson layer to appear
		cy.window({ timeout: 30000 })
			.should((win) => {
				const map = (win as any)._map;
				expect(map, 'map should exist').to.exist;
				expect(map.getLayer(ORDER_GEOJSON_UUID), `layer ${ORDER_GEOJSON_UUID} should exist`).to.exist;
			});
	});

	it('after style applied: custom layer is between order-labels and order-background', () => {
		mountOrderTest();

		// Wait for the style to be applied — the store will have style layer UUIDs
		cy.window({ timeout: 30000 })
			.should((win) => {
				const state = (win as any).__mapStore.getState();
				const mc = state.mapConfigs[ORDER_MAP_KEY];
				// Style must have been applied (labels VT exists)
				expect(mc?._layerIndex?.get(STYLE_LAYER_UUIDS.labelsVt), 'labels VT in store').to.exist;
			});

		// Give the reorder effect + idle time to settle
		cy.wait(2000);

		cy.window().should((win) => {
			const map = (win as any)._map;
			const ids = getMapLayerIds(map);

			// The custom geojson layer should exist
			expect(ids).to.include(ORDER_GEOJSON_UUID);

			// Boundary markers should exist
			expect(ids).to.include('order-labels');
			expect(ids).to.include('order-background');

			// Custom layer must be ABOVE order-background
			assertAbove(ids, ORDER_GEOJSON_UUID, 'order-background');

			// Custom layer must be BELOW order-labels
			assertAbove(ids, 'order-labels', ORDER_GEOJSON_UUID);
		});
	});

	it('after style applied: label style layers are above order-labels', () => {
		mountOrderTest();

		cy.window({ timeout: 30000 })
			.should((win) => {
				const state = (win as any).__mapStore.getState();
				const mc = state.mapConfigs[ORDER_MAP_KEY];
				expect(mc?._layerIndex?.get(STYLE_LAYER_UUIDS.labelsVt)).to.exist;
			});

		cy.wait(2000);

		cy.window().should((win) => {
			const map = (win as any)._map;
			const ids = getMapLayerIds(map);

			// If the fake label layer exists on the map, it should be
			// above order-labels.
			if (ids.includes(FAKE_STYLE_LABEL_LAYER_ID)) {
				assertAbove(ids, FAKE_STYLE_LABEL_LAYER_ID, 'order-labels');
			}
		});
	});

	it('after style applied: background style layers are below order-background', () => {
		mountOrderTest();

		cy.window({ timeout: 30000 })
			.should((win) => {
				const state = (win as any).__mapStore.getState();
				const mc = state.mapConfigs[ORDER_MAP_KEY];
				expect(mc?._layerIndex?.get(STYLE_LAYER_UUIDS.bgVt)).to.exist;
			});

		cy.wait(2000);

		cy.window().should((win) => {
			const map = (win as any)._map;
			const ids = getMapLayerIds(map);

			// If the fake bg layer exists on the map, it should be
			// below order-background.
			if (ids.includes(FAKE_STYLE_BG_LAYER_ID)) {
				assertAbove(ids, 'order-background', FAKE_STYLE_BG_LAYER_ID);
			}
		});
	});

	it('logs the full MapLibre layer stack for debugging', () => {
		mountOrderTest();

		cy.window({ timeout: 30000 })
			.should((win) => {
				const state = (win as any).__mapStore.getState();
				const mc = state.mapConfigs[ORDER_MAP_KEY];
				expect(mc?._layerIndex?.get(STYLE_LAYER_UUIDS.labelsVt)).to.exist;
			});

		cy.wait(3000);

		cy.window().then((win) => {
			const map = (win as any)._map;
			const ids = getMapLayerIds(map);
			cy.log('MapLibre layer stack (bottom → top):');
			ids.forEach((id: string, i: number) => {
				cy.log(`  [${i}] ${id}`);
			});

			// Also log the store order
			const state = (win as any).__mapStore.getState();
			const mc = state.mapConfigs[ORDER_MAP_KEY];
			cy.log('Store layerOrder UUIDs:');
			const walk = (items: any[], depth = 0) => {
				for (const item of items) {
					const cfg = mc._layerIndex?.get(item.uuid);
					cy.log(`  ${'  '.repeat(depth)}${item.uuid} (${cfg?.type ?? '?'}) ${cfg?.name ?? ''}`);
					if (item.layers) walk(item.layers, depth + 1);
				}
			};
			if (mc?.layerOrder) walk(mc.layerOrder);
		});
	});
});
