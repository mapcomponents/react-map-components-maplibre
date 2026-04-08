import {
	useMapStore,
	getLayerByUuid,
	extractUuidsFromLayerOrder,
	moveInLayerOrderHelper,
	MapConfig,
	LayerConfig,
	LayerOrderItem,
} from './map.store';

// Reset store between tests
beforeEach(() => {
	useMapStore.setState({ mapConfigs: {} });
});

const sampleMapConfig: MapConfig = {
	name: 'Test Map',
	mapProps: { center: [7.0851268, 50.73884], zoom: 12 },
	layers: [
		{
			type: 'folder',
			uuid: 'folder-1',
			name: 'Test Folder',
			visible: true,
		},
		{
			type: 'geojson',
			uuid: 'geojson-1',
			name: 'Test GeoJSON',
			config: {
				geojson: { type: 'FeatureCollection', features: [] },
				options: {
					paint: { 'circle-color': 'red', 'circle-radius': 5 },
					layout: { visibility: 'visible' },
				},
			},
		},
		{
			type: 'vt',
			uuid: 'vt-1',
			name: 'Test VT',
			visible: true,
			config: {
				layers: [
					{
						id: 'vt-sublayer-1',
						type: 'fill',
						'source-layer': 'water',
						source: 'openmaptiles',
						layout: { visibility: 'visible' },
						paint: { 'fill-color': '#0905f5' },
					},
					{
						id: 'vt-sublayer-2',
						type: 'fill',
						'source-layer': 'building',
						source: 'openmaptiles',
						layout: { visibility: 'none' },
						paint: { 'fill-color': '#717875' },
					},
				],
				sourceOptions: {
					type: 'vector',
					tiles: ['https://example.com/{z}/{x}/{y}.pbf'],
				},
			},
		},
		{
			type: 'wms',
			uuid: 'wms-1',
			name: 'Test WMS',
			config: {
				url: 'https://example.com/wms',
				urlParameters: { layers: 'test_layer' },
			},
		},
	],
	layerOrder: [
		{
			uuid: 'folder-1',
			layers: [{ uuid: 'geojson-1' }, { uuid: 'vt-1' }, { uuid: 'wms-1' }],
		},
	],
};

describe('map.store - Zustand', () => {
	describe('setMapConfig', () => {
		it('should add a new mapConfig', () => {
			const { setMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const state = useMapStore.getState();
			expect(state.mapConfigs['testKey']).toBeDefined();
			expect(state.mapConfigs['testKey'].name).toBe('Test Map');
			expect(state.mapConfigs['testKey'].layers).toHaveLength(4);
		});

		it('should overwrite an existing mapConfig', () => {
			const { setMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);
			setMapConfig('testKey', { ...sampleMapConfig, name: 'Updated Map' });

			const state = useMapStore.getState();
			expect(state.mapConfigs['testKey'].name).toBe('Updated Map');
		});

		it('should support multiple mapConfigs', () => {
			const { setMapConfig } = useMapStore.getState();
			setMapConfig('key1', sampleMapConfig);
			setMapConfig('key2', { ...sampleMapConfig, name: 'Second Map' });

			const state = useMapStore.getState();
			expect(Object.keys(state.mapConfigs)).toHaveLength(2);
			expect(state.mapConfigs['key1'].name).toBe('Test Map');
			expect(state.mapConfigs['key2'].name).toBe('Second Map');
		});
	});

	describe('removeMapConfig', () => {
		it('should remove a mapConfig by key', () => {
			const { setMapConfig, removeMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);
			removeMapConfig('testKey');

			const state = useMapStore.getState();
			expect(state.mapConfigs['testKey']).toBeUndefined();
		});

		it('should not affect other mapConfigs', () => {
			const { setMapConfig, removeMapConfig } = useMapStore.getState();
			setMapConfig('key1', sampleMapConfig);
			setMapConfig('key2', { ...sampleMapConfig, name: 'Other' });
			removeMapConfig('key1');

			const state = useMapStore.getState();
			expect(state.mapConfigs['key1']).toBeUndefined();
			expect(state.mapConfigs['key2']).toBeDefined();
		});
	});

	describe('setLayerInMapConfig', () => {
		it('should update an existing layer by uuid', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const updatedLayer: LayerConfig = {
				type: 'geojson',
				uuid: 'geojson-1',
				name: 'Updated GeoJSON',
				config: {
					geojson: { type: 'FeatureCollection', features: [] },
					options: {
						paint: { 'circle-color': 'blue', 'circle-radius': 10 },
					},
				},
			};
			setLayerInMapConfig('testKey', updatedLayer);

			const state = useMapStore.getState();
			const layer = state.mapConfigs['testKey'].layers.find((l) => l.uuid === 'geojson-1');
			expect(layer?.name).toBe('Updated GeoJSON');
		});

		it('should not modify other layers', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const updatedLayer: LayerConfig = {
				type: 'geojson',
				uuid: 'geojson-1',
				name: 'Updated',
				config: {
					geojson: { type: 'FeatureCollection', features: [] },
				},
			};
			setLayerInMapConfig('testKey', updatedLayer);

			const state = useMapStore.getState();
			expect(state.mapConfigs['testKey'].layers.find((l) => l.uuid === 'vt-1')?.name).toBe(
				'Test VT'
			);
		});

		it('should do nothing if mapConfigKey does not exist', () => {
			const { setLayerInMapConfig } = useMapStore.getState();
			const stateBefore = useMapStore.getState();
			setLayerInMapConfig('nonexistent', {
				type: 'geojson',
				uuid: 'x',
				name: 'x',
				config: { geojson: { type: 'FeatureCollection', features: [] } },
			});
			const stateAfter = useMapStore.getState();
			expect(stateAfter.mapConfigs).toEqual(stateBefore.mapConfigs);
		});
	});

	describe('removeLayerFromMapConfig', () => {
		it('should remove a layer and its layerOrder entry', () => {
			const { setMapConfig, removeLayerFromMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			removeLayerFromMapConfig('testKey', 'geojson-1');

			const state = useMapStore.getState();
			const mc = state.mapConfigs['testKey'];
			expect(mc.layers.find((l) => l.uuid === 'geojson-1')).toBeUndefined();

			// Check layerOrder no longer has geojson-1
			const folderOrder = mc.layerOrder.find((lo) => lo.uuid === 'folder-1');
			const childUuids = folderOrder?.layers?.map((l) => l.uuid) || [];
			expect(childUuids).not.toContain('geojson-1');
		});

		it('should not remove other layers', () => {
			const { setMapConfig, removeLayerFromMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			removeLayerFromMapConfig('testKey', 'geojson-1');

			const state = useMapStore.getState();
			expect(state.mapConfigs['testKey'].layers.find((l) => l.uuid === 'vt-1')).toBeDefined();
			expect(state.mapConfigs['testKey'].layers.find((l) => l.uuid === 'wms-1')).toBeDefined();
		});
	});

	describe('updateLayerOrder', () => {
		it('should replace the layerOrder array', () => {
			const { setMapConfig, updateLayerOrder } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const newOrder: LayerOrderItem[] = [
				{
					uuid: 'folder-1',
					layers: [{ uuid: 'wms-1' }, { uuid: 'geojson-1' }, { uuid: 'vt-1' }],
				},
			];
			updateLayerOrder('testKey', newOrder);

			const state = useMapStore.getState();
			const mc = state.mapConfigs['testKey'];
			expect(mc.layerOrder[0].layers?.[0].uuid).toBe('wms-1');
			expect(mc.layerOrder[0].layers?.[1].uuid).toBe('geojson-1');
			expect(mc.layerOrder[0].layers?.[2].uuid).toBe('vt-1');
		});
	});

	describe('setMasterVisible', () => {
		it('should set masterVisible on all children of a folder', () => {
			const { setMapConfig, setMasterVisible } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			setMasterVisible('testKey', 'folder-1', false);

			const state = useMapStore.getState();
			const mc = state.mapConfigs['testKey'];

			const geojsonLayer = mc.layers.find((l) => l.uuid === 'geojson-1');
			expect(geojsonLayer?.masterVisible).toBe(false);

			const vtLayer = mc.layers.find((l) => l.uuid === 'vt-1');
			expect(vtLayer?.masterVisible).toBe(false);

			const wmsLayer = mc.layers.find((l) => l.uuid === 'wms-1');
			expect(wmsLayer?.masterVisible).toBe(false);
		});

		it('should set masterVisible on VT sublayers', () => {
			const { setMapConfig, setMasterVisible } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			setMasterVisible('testKey', 'folder-1', false);

			const state = useMapStore.getState();
			const vtLayer = state.mapConfigs['testKey'].layers.find((l) => l.uuid === 'vt-1');
			if (vtLayer?.type === 'vt') {
				vtLayer.config.layers.forEach((subLayer) => {
					expect(subLayer.masterVisible).toBe(false);
				});
			}
		});

		it('should set masterVisible on a standalone VT layer sublayers', () => {
			const { setMapConfig, setMasterVisible } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			setMasterVisible('testKey', 'vt-1', false);

			const state = useMapStore.getState();
			const vtLayer = state.mapConfigs['testKey'].layers.find((l) => l.uuid === 'vt-1');
			if (vtLayer?.type === 'vt') {
				vtLayer.config.layers.forEach((subLayer) => {
					expect(subLayer.masterVisible).toBe(false);
				});
			}
		});

		it('should toggle masterVisible back to true', () => {
			const { setMapConfig, setMasterVisible } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			setMasterVisible('testKey', 'folder-1', false);
			setMasterVisible('testKey', 'folder-1', true);

			const state = useMapStore.getState();
			const mc = state.mapConfigs['testKey'];
			const geojsonLayer = mc.layers.find((l) => l.uuid === 'geojson-1');
			expect(geojsonLayer?.masterVisible).toBe(true);
		});
	});

	describe('getLayerByUuid (non-hook selector)', () => {
		it('should find a layer by uuid across all mapConfigs', () => {
			const { setMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const state = useMapStore.getState();
			const found = getLayerByUuid(state, 'geojson-1');
			expect(found).toBeDefined();
			expect(found?.name).toBe('Test GeoJSON');
		});

		it('should return null if uuid not found', () => {
			const { setMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const state = useMapStore.getState();
			const found = getLayerByUuid(state, 'nonexistent');
			expect(found).toBeNull();
		});
	});

	describe('extractUuidsFromLayerOrder (non-hook selector)', () => {
		it('should return all uuids from a nested layerOrder', () => {
			const { setMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const state = useMapStore.getState();
			const uuids = extractUuidsFromLayerOrder(state, 'testKey');
			expect(uuids).toContain('folder-1');
			expect(uuids).toContain('geojson-1');
			expect(uuids).toContain('vt-1');
			expect(uuids).toContain('wms-1');
			expect(uuids).toHaveLength(4);
		});

		it('should return empty array for nonexistent mapConfig', () => {
			const state = useMapStore.getState();
			const uuids = extractUuidsFromLayerOrder(state, 'nonexistent');
			expect(uuids).toEqual([]);
		});
	});

	describe('_layerIndex (O(1) lookup index)', () => {
		it('should be auto-built by setMapConfig when omitted', () => {
			const { setMapConfig } = useMapStore.getState();
			// sampleMapConfig does NOT have _layerIndex — it should be auto-built
			setMapConfig('testKey', sampleMapConfig);

			const state = useMapStore.getState();
			const mc = state.mapConfigs['testKey'];
			expect(mc._layerIndex).toBeDefined();
			expect(mc._layerIndex?.size).toBe(4);
		});

		it('should provide O(1) uuid lookup matching the layers array', () => {
			const { setMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const state = useMapStore.getState();
			const mc = state.mapConfigs['testKey'];

			expect(mc._layerIndex?.get('geojson-1')?.name).toBe('Test GeoJSON');
			expect(mc._layerIndex?.get('vt-1')?.name).toBe('Test VT');
			expect(mc._layerIndex?.get('folder-1')?.name).toBe('Test Folder');
			expect(mc._layerIndex?.get('wms-1')?.name).toBe('Test WMS');
			expect(mc._layerIndex?.get('nonexistent')).toBeUndefined();
		});

		it('should be updated after setLayerInMapConfig', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const updatedLayer: LayerConfig = {
				type: 'geojson',
				uuid: 'geojson-1',
				name: 'Updated GeoJSON',
				config: {
					geojson: { type: 'FeatureCollection', features: [] },
					options: {
						paint: { 'circle-color': 'blue', 'circle-radius': 10 },
					},
				},
			};
			setLayerInMapConfig('testKey', updatedLayer);

			const state = useMapStore.getState();
			const mc = state.mapConfigs['testKey'];
			expect(mc._layerIndex?.get('geojson-1')?.name).toBe('Updated GeoJSON');
			// Other entries unchanged
			expect(mc._layerIndex?.get('vt-1')?.name).toBe('Test VT');
		});

		it('should be updated after removeLayerFromMapConfig', () => {
			const { setMapConfig, removeLayerFromMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			removeLayerFromMapConfig('testKey', 'geojson-1');

			const state = useMapStore.getState();
			const mc = state.mapConfigs['testKey'];
			expect(mc._layerIndex?.has('geojson-1')).toBe(false);
			expect(mc._layerIndex?.size).toBe(3);
		});

		it('should skip update when same reference is passed to setLayerInMapConfig', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const stateBefore = useMapStore.getState();
			const existingLayer = stateBefore.mapConfigs['testKey']._layerIndex?.get('geojson-1');
			if (existingLayer) {
				// Pass the exact same reference — should be a no-op
				setLayerInMapConfig('testKey', existingLayer);
			}
			const stateAfter = useMapStore.getState();
			// Same state object — no mutation happened
			expect(stateAfter).toBe(stateBefore);
		});
	});

	describe('moveInLayerOrderHelper (structural sharing)', () => {
		it('should move a layer down in a flat list', () => {
			const items: LayerOrderItem[] = [
				{ uuid: 'a' },
				{ uuid: 'b' },
				{ uuid: 'c' },
			];
			const { result, found } = moveInLayerOrderHelper(items, 'a', (i) => i + 1);
			expect(found).toBe(true);
			expect(result.map((r) => r.uuid)).toEqual(['b', 'a', 'c']);
		});

		it('should move a layer up in a flat list', () => {
			const items: LayerOrderItem[] = [
				{ uuid: 'a' },
				{ uuid: 'b' },
				{ uuid: 'c' },
			];
			const { result, found } = moveInLayerOrderHelper(items, 'c', (i) => i - 1);
			expect(found).toBe(true);
			expect(result.map((r) => r.uuid)).toEqual(['a', 'c', 'b']);
		});

		it('should move a layer within a nested folder', () => {
			const items: LayerOrderItem[] = [
				{
					uuid: 'folder',
					layers: [{ uuid: 'a' }, { uuid: 'b' }, { uuid: 'c' }],
				},
			];
			const { result, found } = moveInLayerOrderHelper(items, 'b', (i) => i + 1);
			expect(found).toBe(true);
			expect(result[0].layers?.map((r) => r.uuid)).toEqual(['a', 'c', 'b']);
			// Structural sharing: top-level item is a new object, but the uuid is the same
			expect(result[0].uuid).toBe('folder');
		});

		it('should return same array if move is out of bounds', () => {
			const items: LayerOrderItem[] = [{ uuid: 'a' }, { uuid: 'b' }];
			const { result, found } = moveInLayerOrderHelper(items, 'a', (i) => i - 1);
			expect(found).toBe(true);
			expect(result).toBe(items); // same reference — no mutation
		});

		it('should return found=false if uuid not found', () => {
			const items: LayerOrderItem[] = [{ uuid: 'a' }, { uuid: 'b' }];
			const { result, found } = moveInLayerOrderHelper(items, 'nonexistent', (i) => i + 1);
			expect(found).toBe(false);
			expect(result).toBe(items); // same reference
		});
	});

	// ---------------------------------------------------------------------------
	// Toggle visibility flows (simulates what LayerTreeListItem does)
	// ---------------------------------------------------------------------------

	describe('toggleVisible — geojson layer', () => {
		it('sets layout.visibility to none when toggled off', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			// Simulate toggle off
			const before = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('geojson-1') as LayerConfig;
			expect(before?.type).toBe('geojson');
			if (before.type !== 'geojson') return;

			const updated = {
				...before,
				config: {
					...before.config,
					options: {
						...before.config.options,
						layout: { ...before.config.options?.layout, visibility: 'none' as const },
					},
				},
			};
			setLayerInMapConfig('testKey', updated);

			const state = useMapStore.getState();
			const layer = state.mapConfigs['testKey']._layerIndex?.get('geojson-1');
			expect(layer?.type).toBe('geojson');
			if (layer?.type !== 'geojson') return;
			expect(layer.config.options?.layout?.visibility).toBe('none');
		});

		it('sets layout.visibility back to visible when toggled on', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			// First hide
			const layer0 = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('geojson-1') as LayerConfig;
			if (layer0.type !== 'geojson') return;
			setLayerInMapConfig('testKey', {
				...layer0,
				config: {
					...layer0.config,
					options: { ...layer0.config.options, layout: { visibility: 'none' as const } },
				},
			});

			// Then show
			const layer1 = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('geojson-1') as LayerConfig;
			if (layer1.type !== 'geojson') return;
			setLayerInMapConfig('testKey', {
				...layer1,
				config: {
					...layer1.config,
					options: { ...layer1.config.options, layout: { visibility: 'visible' as const } },
				},
			});

			const final = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('geojson-1');
			if (final?.type !== 'geojson') return;
			expect(final.config.options?.layout?.visibility).toBe('visible');
		});

		it('masterVisible=false makes geojson invisible regardless of layout.visibility', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			// Layer is visible by layout but masterVisible is false (from folder disable)
			const layer = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('geojson-1') as LayerConfig;
			if (layer.type !== 'geojson') return;
			setLayerInMapConfig('testKey', { ...layer, masterVisible: false });

			const updated = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('geojson-1');
			expect(updated?.masterVisible).toBe(false);
			// layout.visibility is still 'visible' — MapLayerRenderer uses masterVisible to override
			if (updated?.type === 'geojson') {
				expect(updated.config.options?.layout?.visibility).toBe('visible');
			}
		});
	});

	describe('toggleVisible — VT layer', () => {
		it('sets visible=false on VT parent when toggled off (no specific sublayer)', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const layer = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('vt-1') as LayerConfig;
			if (layer.type !== 'vt') return;

			// Toggle whole VT layer off (specificLayerId = '')
			setLayerInMapConfig('testKey', {
				...layer,
				visible: false,
				config: { ...layer.config, layers: layer.config.layers },
			});

			const updated = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('vt-1');
			expect(updated?.type).toBe('vt');
			if (updated?.type === 'vt') {
				expect(updated.visible).toBe(false);
			}
		});

		it('toggles a single VT sublayer visibility', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const layer = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('vt-1') as LayerConfig;
			if (layer.type !== 'vt') return;

			// Toggle sublayer 1 (vt-sublayer-1) off
			const updatedSubLayers = layer.config.layers.map((sl) => {
				if (sl.id === 'vt-sublayer-1') {
					return { ...sl, layout: { ...sl.layout, visibility: 'none' as const } };
				}
				return sl;
			});
			setLayerInMapConfig('testKey', {
				...layer,
				config: { ...layer.config, layers: updatedSubLayers },
			});

			const updated = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('vt-1');
			if (updated?.type === 'vt') {
				const sub1 = updated.config.layers.find((l) => l.id === 'vt-sublayer-1');
				const sub2 = updated.config.layers.find((l) => l.id === 'vt-sublayer-2');
				expect(sub1?.layout?.visibility).toBe('none');
				// sub2 was already 'none' — unchanged
				expect(sub2?.layout?.visibility).toBe('none');
			}
		});
	});

	describe('toggleVisible — WMS layer', () => {
		it('sets config.visible=false when toggled off', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const layer = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('wms-1') as LayerConfig;
			if (layer.type !== 'wms') return;

			setLayerInMapConfig('testKey', {
				...layer,
				visible: false,
				config: { ...layer.config, visible: false },
			});

			const updated = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('wms-1');
			if (updated?.type === 'wms') {
				expect(updated.config?.visible).toBe(false);
			}
		});

		it('sets config.visible=true when toggled on', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const layer = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('wms-1') as LayerConfig;
			if (layer.type !== 'wms') return;

			// First off, then on
			setLayerInMapConfig('testKey', { ...layer, visible: false, config: { ...layer.config, visible: false } });
			const off = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('wms-1');
			if (off?.type === 'wms') expect(off.config?.visible).toBe(false);

			const layerOff = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('wms-1') as LayerConfig;
			if (layerOff.type !== 'wms') return;
			setLayerInMapConfig('testKey', { ...layerOff, visible: true, config: { ...layerOff.config, visible: true } });

			const on = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('wms-1');
			if (on?.type === 'wms') expect(on.config?.visible).toBe(true);
		});
	});

	describe('toggleVisible — folder', () => {
		it('sets folder.visible=false when toggled off', () => {
			const { setMapConfig, setLayerInMapConfig } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const folder = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('folder-1') as LayerConfig;
			if (folder.type !== 'folder') return;
			expect(folder.visible).toBe(true);

			setLayerInMapConfig('testKey', { ...folder, visible: false });

			const updated = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('folder-1');
			expect(updated?.type).toBe('folder');
			if (updated?.type === 'folder') expect(updated.visible).toBe(false);
		});

		it('folder toggle off + setMasterVisible propagates to all children', () => {
			const { setMapConfig, setLayerInMapConfig, setMasterVisible } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const folder = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('folder-1') as LayerConfig;
			if (folder.type !== 'folder') return;

			// Simulate what LayerTreeListItem.handleToggleVisibility does:
			// 1. Toggle folder visible
			setLayerInMapConfig('testKey', { ...folder, visible: false });
			// 2. Call setMasterVisible on the folder uuid
			setMasterVisible('testKey', 'folder-1', false);

			const state = useMapStore.getState().mapConfigs['testKey'];
			const updatedFolder = state._layerIndex?.get('folder-1');
			const geojson = state._layerIndex?.get('geojson-1');
			const vt = state._layerIndex?.get('vt-1');
			const wms = state._layerIndex?.get('wms-1');

			if (updatedFolder?.type === 'folder') expect(updatedFolder.visible).toBe(false);
			expect(geojson?.masterVisible).toBe(false);
			expect(vt?.masterVisible).toBe(false);
			expect(wms?.masterVisible).toBe(false);
		});

		it('folder toggle on + setMasterVisible re-enables all children', () => {
			const { setMapConfig, setLayerInMapConfig, setMasterVisible } = useMapStore.getState();
			setMapConfig('testKey', sampleMapConfig);

			const folder = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('folder-1') as LayerConfig;
			if (folder.type !== 'folder') return;

			// Disable
			setLayerInMapConfig('testKey', { ...folder, visible: false });
			setMasterVisible('testKey', 'folder-1', false);

			// Re-enable
			const folderOff = useMapStore.getState().mapConfigs['testKey']._layerIndex?.get('folder-1') as LayerConfig;
			if (folderOff.type !== 'folder') return;
			setLayerInMapConfig('testKey', { ...folderOff, visible: true });
			setMasterVisible('testKey', 'folder-1', true);

			const state = useMapStore.getState().mapConfigs['testKey'];
			const geojson = state._layerIndex?.get('geojson-1');
			const vt = state._layerIndex?.get('vt-1');
			const wms = state._layerIndex?.get('wms-1');

			expect(geojson?.masterVisible).toBe(true);
			expect(vt?.masterVisible).toBe(true);
			expect(wms?.masterVisible).toBe(true);
		});
	});
});
