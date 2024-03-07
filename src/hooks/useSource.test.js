import React, { useState, useEffect } from 'react';
import { mount } from 'enzyme';
import { MapComponentsProvider } from '../contexts/MapContext';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import { waitFor } from '@testing-library/react';

import useMap from './useMap';
import useSource from './useSource';
import useLayer from './useLayer'

const UseSourceTestComponent = (props) => {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	useSource({
		mapId: props.mapId,
		sourceId: 'geojson-source',
		source: {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				name: 'testcollection',
				features: [],
			},
		},
	});

	return <></>;
};

const UseLayerTestComponent = (props) => {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	useLayer({
		mapId: props.mapId,
		layerId: props.layerId || 'TestComponent',
		options: {
			source: 'geojson-source',
			paint: props.paint,
			layout: props.layout || {},
			type: 'fill',
			...props.options,
		},
		insertBeforeLayer: props.insertBeforeLayer,
		onHover: props.onHover,
		onClick: props.onClick,
		onLeave: props.onLeave,
	});

	return <></>;
};

const sourceAddEventHandler = jest.fn();
const layerAddEventHandler = jest.fn();

const TestComponent = (props) => {
	const mapHook = useMap();

	const [includeComponent, setIncludeComponent] = useState(false);

	useEffect(() => {
		if(!mapHook.map) return;

		mapHook.map.wrapper.on('addsource', sourceAddEventHandler)
		mapHook.map.wrapper.on('addlayer', layerAddEventHandler)
	}, [mapHook.map])

	return (
		<>
			<button
				className="toggle_includeComponent"
				onClick={() => {
					setIncludeComponent(!includeComponent);
				}}
			>
				toggle
			</button>
			{includeComponent && <UseSourceTestComponent {...props} />}
			<MapLibreMap />
		</>
	);
};

describe('useSource hook', () => {
	it("should fire a 'addsource' event in MapLibreGlWrapper", async () => {
		var testAttributes = {
			on: {
				addsource: () => {},
			},
		};

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		wrapper.find('.toggle_includeComponent').simulate('click');
		await waitFor(() => expect(sourceAddEventHandler).toHaveBeenCalledTimes(1));
		wrapper.find('.toggle_includeComponent').simulate('click');
		wrapper.find('.toggle_includeComponent').simulate('click');
		await waitFor(() => expect(sourceAddEventHandler).toHaveBeenCalledTimes(2));
	});

	it("should fire a 'addlayer' event in MapLibreGlWrapper", async () => {
		var testAttributes = {
			on: {
				addsource: () => {},
			},
		};

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
				<UseLayerTestComponent />
			</MapComponentsProvider>
		);

		wrapper.find('.toggle_includeComponent').simulate('click');
		await waitFor(() => expect(layerAddEventHandler).toHaveBeenCalledTimes(1));
	});
});
