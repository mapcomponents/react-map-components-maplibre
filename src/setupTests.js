/* eslint-disable no-undef */
import 'jest-enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

import { configure } from 'enzyme';

var uuid_regex = '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}';
export { uuid_regex };

// MapLibre-gl mockup
var mockMapLibreMethods = {
	on: jest.fn(),
	off: jest.fn(),
	addControl: jest.fn(),
	removeControl: jest.fn(),
	fitBounds: jest.fn(),
	hasControl: jest.fn(() => true),
	getCanvas: () => document.createElement('canvas'),
	getContainer: () => ({
		style: {},
	}),
};
export { mockMapLibreMethods };

jest.mock('maplibre-gl/dist/maplibre-gl', () => {
	const originalModule = jest.requireActual('maplibre-gl/dist/maplibre-gl');

	return {
		...originalModule,
		GeolocateControl: jest.fn(),
		Map: function () {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			var self = this;
			this.layers = [];
			this.sources = [];
			this.style = { sourceCaches: {} };

			let styleFunctions = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				addSource: (id, source) => {
					if (typeof id.id !== 'undefined') {
						self.sources.push(id);
						self.style.sourceCaches[id] = {};
					} else if (typeof id !== 'undefined') {
						self.sources.push(id);
					}
				},
				getSource: (id) => {
					if (self.sources.indexOf(id) !== -1) {
						return { setData: jest.fn() };
					}
					return false;
				},
				removeSource: (id) => {
					const sourcePosition = self.sources.indexOf(id);
					if (sourcePosition !== -1) {
						self.sources.splice(sourcePosition, 1);
						delete self.style.sourceCaches[id];
					}
				},
				addLayer: (layer) => {
					if (typeof layer.id !== 'undefined') {
						self.layers.push(layer.id);
						if (typeof layer.source !== 'undefined' && typeof layer.source === 'object') {
							self.sources.push(layer.id);
						}
					}
				},
				getLayer: (id) => {
					if (self.layers.indexOf(id) !== -1) {
						return {};
					}
					return false;
				},
				removeLayer: (id) => {
					const layerPosition = self.layers.indexOf(id);
					if (layerPosition !== -1) {
						self.layers.splice(layerPosition, 1);
					}
				},
			};

			return {
				...styleFunctions,
				once: (eventName, callback) => {
					callback();
				},
				remove: jest.fn(),
				setLayerZoomRange: jest.fn(),
				setLayoutProperty: jest.fn(),
				addImage: jest.fn(),
				loadImage: jest.fn(),
				removeImage: jest.fn(),
				hasImage: jest.fn(),
				project: jest.fn(),
				setZoom: jest.fn(),
				setPitch: jest.fn(),
				setCenter: jest.fn(),
				style: { ...styleFunctions, '_layers': this.layers },
				layers: this.layers,
				sources: this.sources,
				_update: jest.fn(),
				...mockMapLibreMethods,
			};
		},
		NavigationControl: jest.fn(),
	};
});

configure({ adapter: new Adapter() });

window.URL.createObjectURL = function () {};
window.HTMLCanvasElement.prototype.getContext = () => {};
