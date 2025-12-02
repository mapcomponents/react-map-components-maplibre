import React, { useContext, useState } from 'react';
import { MapComponentsProvider, MapContext } from '../index';
import MapLibreMap from './../components/MapLibreMap/MapLibreMap';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const sourceRemovalTest = (
	ComponentName,
	Component,
	regexLayerNameTest,
	humanReadableLayerName,
	beforeWrapperInit,
	afterWrapperInit
) => {
	const TestComponent = () => {
		const [layerVisible, setLayerVisible] = useState(true);
		const [refreshTrigger, setRefreshTrigger] = useState(0);
		const mapContext = useContext(MapContext);

		return (
			<>
				<MapLibreMap />

				{layerVisible && Component}

				<button
					className="toggle_layer_visible"
					data-testid="toggle_layer_visible"
					onClick={() => {
						setLayerVisible(!layerVisible);
					}}
				>
					toggle layer visible
				</button>
				<button
					className="trigger_refresh"
					data-testid="trigger_refresh"
					onClick={() => {
						setRefreshTrigger(refreshTrigger + 1);
					}}
				>
					refresh
				</button>
				<div className="sources_json" data-testid="sources_json">
					{mapContext.map && refreshTrigger && JSON.stringify(mapContext.map.map.sources)}
				</div>
			</>
		);
	};

	const createWrapper = () =>
		render(
			<MapComponentsProvider>
				<TestComponent />
			</MapComponentsProvider>
		);

	describe(ComponentName, () => {
		it(
			"should add a Source with the id '" + humanReadableLayerName + "' to the MapLibre instance",
			async () => {
				if (typeof beforeWrapperInit === 'function') {
					await beforeWrapperInit();
				}

				createWrapper();

				if (typeof afterWrapperInit === 'function') {
					await afterWrapperInit();
				}

				await userEvent.click(screen.getByTestId('trigger_refresh'));

				expect(regexLayerNameTest.test(screen.getByTestId('sources_json').innerHTML)).toEqual(true);
			}
		);

		it(
			"should remove a Source with the id '" +
				humanReadableLayerName +
				"' from the MapLibre instance",
			async () => {
				if (typeof beforeWrapperInit === 'function') {
					await beforeWrapperInit();
				}

				createWrapper();

				if (typeof afterWrapperInit === 'function') {
					await afterWrapperInit();
				}

				await userEvent.click(screen.getByTestId('trigger_refresh'));

				expect(regexLayerNameTest.test(screen.getByTestId('sources_json').innerHTML)).toEqual(true);

				await userEvent.click(screen.getByTestId('toggle_layer_visible'));
				await userEvent.click(screen.getByTestId('trigger_refresh'));

				expect(regexLayerNameTest.test(screen.getByTestId('sources_json').innerHTML)).toEqual(
					false
				);
			}
		);
	});
};

export default sourceRemovalTest;
