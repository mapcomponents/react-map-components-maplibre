import React, { useState, useEffect } from 'react';
import { MapComponentsProvider } from '../contexts/MapContext';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useMap from './useMap';
import useSource from './useSource';
import useLayer, { useLayerProps } from './useLayer';

const UseSourceTestComponent = () => {
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

const UseLayerTestComponent = (props: Partial<useLayerProps>) => {
	useLayer({
		layerId: props.layerId || 'TestComponent',
		options: {
			source: 'geojson-source',
			type: 'fill',
			...props.options,
		} as useLayerProps['options'],
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
		if (!mapHook.map) return;

		mapHook.map.wrapper.on('addsource', sourceAddEventHandler);
		mapHook.map.wrapper.on('addlayer', layerAddEventHandler);
	}, [mapHook.map]);

	return (
		<>
			<button
				className="toggle_includeComponent"
				data-testid="toggle_includeComponent"
				onClick={() => setIncludeComponent(!includeComponent)}
			>
				toggle
			</button>
			{includeComponent && <UseSourceTestComponent />}
			<MapLibreMap />
		</>
	);
};

describe('useSource hook', () => {
	it("should fire an 'addsource' event in MapLibreGlWrapper", async () => {
		render(
			<MapComponentsProvider>
				<TestComponent />
			</MapComponentsProvider>
		);

		await userEvent.click(screen.getByTestId('toggle_includeComponent'));

		await waitFor(() => expect(sourceAddEventHandler).toHaveBeenCalledTimes(1));

		await userEvent.click(screen.getByTestId('toggle_includeComponent'));
		await userEvent.click(screen.getByTestId('toggle_includeComponent'));

		await waitFor(() => expect(sourceAddEventHandler).toHaveBeenCalledTimes(2));
	});

	it("should fire an 'addlayer' event in MapLibreGlWrapper", async () => {
		render(
			<MapComponentsProvider>
				<TestComponent />
				<UseLayerTestComponent />
			</MapComponentsProvider>
		);

		await userEvent.click(screen.getByTestId('toggle_includeComponent'));

		await waitFor(() => expect(layerAddEventHandler).toHaveBeenCalledTimes(1));
	});
});
