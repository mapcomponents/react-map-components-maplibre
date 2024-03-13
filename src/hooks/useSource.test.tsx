/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';
import { mount } from 'enzyme';
import { MapComponentsProvider } from '../contexts/MapContext';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import { waitFor } from '@testing-library/react';

import useMap from './useMap';
import useSource from './useSource';
import useLayer, { useLayerProps } from './useLayer'

const UseSourceTestComponent = () => {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	useSource({
		sourceId: 'geojson-source',
		source: {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [],
			},
		},
	});

	return <></>;
};

const UseLayerTestComponent = (props:Partial<useLayerProps>) => {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	useLayer({
		layerId: props.layerId || 'TestComponent',
		options: {
			source: 'geojson-source',
			type: 'fill',
			...props.options,
		} as useLayerProps["options"],
		insertBeforeLayer: props.insertBeforeLayer,
		onHover: props.onHover,
		onClick: props.onClick,
		onLeave: props.onLeave,
	});

	return <></>;
};

const sourceAddEventHandler = jest.fn();
const layerAddEventHandler = jest.fn();

const TestComponent = () => {
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
			{includeComponent && <UseSourceTestComponent />}
			<MapLibreMap />
		</>
	);
};

describe('useSource hook', () => {
	it("should fire a 'addsource' event in MapLibreGlWrapper", async () => {

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent />
			</MapComponentsProvider>
		);

		wrapper.find('.toggle_includeComponent').simulate('click');
		//@ts-ignore
		await waitFor(() => expect(sourceAddEventHandler).toHaveBeenCalledTimes(1));
		wrapper.find('.toggle_includeComponent').simulate('click');
		wrapper.find('.toggle_includeComponent').simulate('click');
		//@ts-ignore
		await waitFor(() => expect(sourceAddEventHandler).toHaveBeenCalledTimes(2));
	});

	it("should fire a 'addlayer' event in MapLibreGlWrapper", async () => {

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent />
				<UseLayerTestComponent />
			</MapComponentsProvider>
		);

		wrapper.find('.toggle_includeComponent').simulate('click');
		//@ts-ignore
		await waitFor(() => expect(layerAddEventHandler).toHaveBeenCalledTimes(1));
	});
});
