import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

export const uuid_regex = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';

// ---------------------------------------------------------------------------
// Realistic MapLibre-GL mock
// ---------------------------------------------------------------------------
// • Maintains real layer/source state so tests can assert on map.__layers
//   directly without DOM scraping.
// • Tracks every method call: map.__calls.addLayer → [{ args, ts }, …]
//   map.__calls.count('addLayer')   – how many times it was called
//   map.__calls.allArgs('addLayer') – [[arg0, arg1], …] for each call
//   map.__calls.elapsed('addLayer') – ms between first and last call
//   map.__calls.reset()             – clear all logs
// • map.__reset() resets layers/sources/listeners AND call logs.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Global mock registration
// ---------------------------------------------------------------------------

/** Returns the mock map instance created by the most recent `new Map()` call. */
export function getMockMap() { return globalThis.__mockMapInstance || null; }

// ---------------------------------------------------------------------------
// mockMapLibreMethods — legacy compatibility export
// ---------------------------------------------------------------------------
// Old tests import this and assert on mockMapLibreMethods.on.toHaveBeenCalledTimes().
// We keep it as an object of jest.fn()s and re-wire them onto the live map
// instance whenever a new Map() is constructed, so calls on the map are
// also recorded on these shared stubs.
export const mockMapLibreMethods = {
	on:            jest.fn(),
	off:           jest.fn(),
	addControl:    jest.fn(),
	removeControl: jest.fn(),
	fitBounds:     jest.fn(),
	hasControl:    jest.fn(() => true),
};

// prefix with `mock` so jest.mock factory can reference it
function mockCreateMapInstance() {
	const _layers = [];   // [{ id, type, paint, layout, source, … }]
	const _sources = {};  // { [id]: sourceDef }
	const _listeners = {};       // map-level event listeners
	const _styleListeners = {};  // style-level event listeners

	// Compatibility arrays: old tests read `map.layers` / `map.sources` as flat
	// id-arrays directly on the map object. The wrapper copies own-enumerable
	// properties from the raw map at init, so these must be real arrays that
	// we keep in sync (splice/push) rather than getters.
	const _layerIds = [];   // kept in sync with _layers
	const _sourceIds = [];  // kept in sync with _sources

	// ── call tracker ───────────────────────────────────────────────────────
	const _logs = {};
	function _record(method, args) {
		if (!_logs[method]) _logs[method] = [];
		_logs[method].push({ args: Array.from(args), ts: Date.now() });
	}
	const __calls = new Proxy({}, {
		get(_, prop) {
			if (prop === 'reset')    return () => { Object.keys(_logs).forEach((k) => delete _logs[k]); };
			if (prop === 'count')    return (m) => (_logs[m] || []).length;
			if (prop === 'allArgs')  return (m) => (_logs[m] || []).map((c) => c.args);
			if (prop === 'elapsed')  return (m) => {
				const c = _logs[m];
				return (!c || c.length < 2) ? 0 : c[c.length - 1].ts - c[0].ts;
			};
			return _logs[prop] || [];
		},
	});

	function _layerIdx(id) { return _layers.findIndex((l) => l.id === id); }
	function _getLayer(id)  { return _layers.find((l) => l.id === id) || null; }

	// ── map.style ──────────────────────────────────────────────────────────
	// _order is kept as a live array (same reference) so getRawLayerOrder()
	// in useOrderReconciler can read it directly without allocating a clone.
	const style = {
		_order: _layerIds,   // live reference — same array as _layerIds
		get _layers() { return Object.fromEntries(_layers.map((l) => [l.id, l])); },
		get sourceCaches() {
			return Object.fromEntries(Object.keys(_sources).map((k) => [k, {}]));
		},
		addLayer(spec, beforeId) {
			_record('style.addLayer', arguments);
			if (_getLayer(spec.id)) return;
			const idx = beforeId != null ? _layerIdx(beforeId) : -1;
			const insertAt = idx === -1 ? _layers.length : idx;
			_layers.splice(insertAt, 0, { ...spec });
			_layerIds.splice(insertAt, 0, spec.id);
		},
		removeLayer(id) {
			_record('style.removeLayer', arguments);
			const i = _layerIdx(id);
			if (i !== -1) { _layers.splice(i, 1); _layerIds.splice(i, 1); }
		},
		getLayer: (id) => _getLayer(id),
		moveLayer(id, beforeId) {
			_record('style.moveLayer', arguments);
			const i = _layerIdx(id); if (i === -1) return;
			const [layer] = _layers.splice(i, 1);
			_layerIds.splice(i, 1);
			const j = beforeId != null ? _layerIdx(beforeId) : -1;
			const insertAt = j === -1 ? _layers.length : j;
			_layers.splice(insertAt, 0, layer);
			_layerIds.splice(insertAt, 0, layer.id);
		},
		addSource(id, def) {
			_record('style.addSource', arguments);
			_sources[id] = def;
			if (!_sourceIds.includes(id)) _sourceIds.push(id);
		},
		removeSource(id) {
			_record('style.removeSource', arguments);
			delete _sources[id];
			const si = _sourceIds.indexOf(id);
			if (si !== -1) _sourceIds.splice(si, 1);
		},
		getSource: (id) => _sources[id] || null,
		setGlyphs(g)  { _record('style.setGlyphs', arguments);  style._glyphs = g; },
		setSprite(s)  { _record('style.setSprite', arguments);  style._sprite = s; },
		setPaintProperty(lid, prop, val) {
			_record('style.setPaintProperty', arguments);
			const l = _getLayer(lid); if (!l) return;
			l.paint = l.paint || {}; l.paint[prop] = val;
		},
		setLayoutProperty(lid, prop, val) {
			_record('style.setLayoutProperty', arguments);
			const l = _getLayer(lid); if (!l) return;
			l.layout = l.layout || {}; l.layout[prop] = val;
		},
		getPaintProperty:  (lid, p) => _getLayer(lid)?.paint?.[p],
		getLayoutProperty: (lid, p) => _getLayer(lid)?.layout?.[p],
		listImages: () => [],
		removeImage(id) { _record('style.removeImage', arguments); },
		on(ev, fn) {
			_styleListeners[ev] = _styleListeners[ev] || []; _styleListeners[ev].push(fn);
		},
		off(ev, fn) {
			if (_styleListeners[ev])
				_styleListeners[ev] = _styleListeners[ev].filter((h) => h !== fn);
		},
		fire(ev, d) { (_styleListeners[ev] || []).forEach((h) => h(d)); },
	};

	// ── map (public API) ───────────────────────────────────────────────────
	const map = {
		style,
		getStyle() {
			return { layers: _layers.map((l) => ({ ...l })), sources: { ..._sources } };
		},
		addLayer(spec, beforeId) {
			_record('addLayer', arguments);
			style.addLayer(spec, beforeId);
			// Compat: old mock pushed layer.id into sources when source was an inline object
			if (spec.source && typeof spec.source === 'object' && !_sourceIds.includes(spec.id)) {
				_sourceIds.push(spec.id);
				_sources[spec.id] = spec.source;
			}
			map._fireSelf('data', { dataType: 'style' });
		},
		removeLayer(id)   {
			_record('removeLayer', arguments);
			style.removeLayer(id);
			// Compat: if this layer had an inline source registered under its id, remove it
			const si = _sourceIds.indexOf(id);
			if (si !== -1 && _sources[id] && typeof _sources[id] === 'object') {
				_sourceIds.splice(si, 1);
				delete _sources[id];
			}
		},
		getLayer:  (id)  => style.getLayer(id),
		moveLayer(id, beforeId) {
			_record('moveLayer', arguments); style.moveLayer(id, beforeId);
		},
		addSource(id, def) {
			_record('addSource', arguments);
			_sources[id] = def;
			if (!_sourceIds.includes(id)) _sourceIds.push(id);
		},
		removeSource(id) {
			_record('removeSource', arguments);
			delete _sources[id];
			const si = _sourceIds.indexOf(id);
			if (si !== -1) _sourceIds.splice(si, 1);
		},
		getSource(id) {
			return _sources[id] ? { ..._sources[id], setData: jest.fn() } : null;
		},
		setPaintProperty(lid, p, v) {
			_record('setPaintProperty', arguments); style.setPaintProperty(lid, p, v);
		},
		setLayoutProperty(lid, p, v) {
			_record('setLayoutProperty', arguments); style.setLayoutProperty(lid, p, v);
		},
		getPaintProperty:  (lid, p) => style.getPaintProperty(lid, p),
		getLayoutProperty: (lid, p) => style.getLayoutProperty(lid, p),
		setLayerZoomRange: jest.fn(),
		addImage:  jest.fn(), loadImage: jest.fn(), removeImage: jest.fn(),
		hasImage:  jest.fn(() => false),
		project:   jest.fn(() => ({ x: 0, y: 0 })),
		setZoom:   jest.fn(), setPitch: jest.fn(), setCenter: jest.fn(),
		getCenter: jest.fn(() => ({ lng: 0, lat: 0 })),
		getZoom:   jest.fn(() => 10),
		getBearing: jest.fn(() => 0),
		getPitch:  jest.fn(() => 0),
		fitBounds: jest.fn(), remove: jest.fn(),
		addControl(ctrl, pos) {
			_record('addControl', arguments);
			globalThis.__mockMapLibreMethods?.addControl?.(ctrl, pos);
		},
		removeControl(ctrl) {
			_record('removeControl', arguments);
			globalThis.__mockMapLibreMethods?.removeControl?.(ctrl);
		},
		hasControl: jest.fn(() => true),
		getCanvas:    () => document.createElement('canvas'),
		getContainer: () => ({ style: {} }),
		on(ev, fn) {
			_record('on', arguments);
			globalThis.__mockMapLibreMethods?.on?.(ev, fn);  // compat call tracking
			_listeners[ev] = _listeners[ev] || []; _listeners[ev].push(fn);
		},
		off(ev, fn) {
			globalThis.__mockMapLibreMethods?.off?.(ev, fn); // compat call tracking
			if (_listeners[ev])
				_listeners[ev] = _listeners[ev].filter((h) => h !== fn);
		},
		once(ev, fn) {
			_record('once', arguments);
			// Fire synchronously so MapLibreMap registers itself in the same
			// microtask — old tests rely on the map being available immediately.
			if (ev === 'load') {
				fn();
			} else {
				const w = (...a) => { fn(...a); map.off(ev, w); };
				_listeners[ev] = _listeners[ev] || []; _listeners[ev].push(w);
			}
		},
		_fireSelf(ev, d) { (_listeners[ev] || []).forEach((h) => h(d)); },
		_update: jest.fn(),

		// ── Compatibility shims for old tests ─────────────────────────
		// Old tests read `map.layers` / `map.sources` as flat id-arrays.
		// These are live arrays kept in sync with _layers/_sources so the
		// wrapper's addNativeMaplibreFunctionsAndProps() copies the same
		// reference and old tests keep working without modification.
		layers: _layerIds,
		sources: _sourceIds,

		// ── Test inspector API ─────────────────────────────────────────
		get __layers() { return _layers; },
		get __sources() { return _sources; },
		__calls,
		__reset() {
			_layers.length = 0;
			_layerIds.length = 0;
			_sourceIds.length = 0;
			Object.keys(_sources).forEach((k) => delete _sources[k]);
			Object.keys(_listeners).forEach((k)      => delete _listeners[k]);
			Object.keys(_styleListeners).forEach((k) => delete _styleListeners[k]);
			__calls.reset();
			map._update.mockClear();
		},
	};
	return map;
}

jest.mock('maplibre-gl/dist/maplibre-gl', () => {
	const originalModule = jest.requireActual('maplibre-gl/dist/maplibre-gl');
	return {
		...originalModule,
		GeolocateControl: jest.fn(),
		NavigationControl: jest.fn(),
		Map: function (options) {
			const instance = mockCreateMapInstance();
			instance._options = options;
			globalThis.__mockMapInstance = instance;
			// Wire the shared mockMapLibreMethods stubs so old tests can assert on them.
			// We store them on globalThis so the instance's on/off can delegate.
			if (globalThis.__mockMapLibreMethods) {
				globalThis.__mockMapLibreMethods.on.mockClear();
				globalThis.__mockMapLibreMethods.off.mockClear();
				globalThis.__mockMapLibreMethods.addControl.mockClear();
				globalThis.__mockMapLibreMethods.removeControl.mockClear();
				globalThis.__mockMapLibreMethods.fitBounds.mockClear();
			}
			return instance;
		},
	};
});

// ---------------------------------------------------------------------------
// Browser API stubs
// ---------------------------------------------------------------------------
window.URL.createObjectURL = function () {};
window.HTMLCanvasElement.prototype.getContext = () => {};

global.ResizeObserver = class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
};

// Register mockMapLibreMethods on globalThis so the map instance on/off can
// forward calls to it. resetMocks:true in jest config resets all jest.fn()
// implementations before each test, so we restore them here too.
beforeEach(() => {
	globalThis.__mockMapLibreMethods = mockMapLibreMethods;
	mockMapLibreMethods.on.mockClear();
	mockMapLibreMethods.off.mockClear();
	mockMapLibreMethods.addControl.mockClear();
	mockMapLibreMethods.removeControl.mockClear();
	mockMapLibreMethods.fitBounds.mockClear();
	// Restore the default implementation that resetMocks:true strips away
	mockMapLibreMethods.hasControl.mockReturnValue(true);
});
