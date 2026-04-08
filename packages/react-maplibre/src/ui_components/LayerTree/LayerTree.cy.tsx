import { useEffect } from 'react';
import { mount } from '@cypress/react';
import { expect } from 'chai';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { MapComponentsProvider } from '../../index';
import MapLibreMap from '../../components/MapLibreMap/MapLibreMap';
import getTheme from '../MapcomponentsTheme';
import LayerTree from './LayerTree';
import LayerOnMap from './LayerOnMap';
import useMapStore, {
	setMapConfig,
	MapConfig,
	LayerConfig,
} from '../../stores/map.store';

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
				<LayerTree mapConfigKey={MAP_CONFIG_KEY} />
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
			<LayerOnMap mapConfigKey={MAP_CONFIG_KEY} mapId="map_1" />
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
	// Map integration: LayerOnMap reflects store state in map style
	// -------------------------------------------------------------------------

	describe('Map integration: LayerOnMap re-renders on visibility change', () => {
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
