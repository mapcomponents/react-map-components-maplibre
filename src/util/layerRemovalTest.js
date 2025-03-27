import React, { useContext, useState } from 'react';
import { MapComponentsProvider, MapContext } from '../index';
import MapLibreMap from './../components/MapLibreMap/MapLibreMap';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const layerRemovalTest = (
	ComponentName,
	Component,
	regexLayerNameTest,
	humanReadableLayerName,
	beforeWrapperInit,
	afterWrapperInit,
	createWrapperFunction
) => {
	const TestComponent = (props) => {
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
				<div className="layers_json" data-testid="layers_json">
					{mapContext.map && refreshTrigger && JSON.stringify(mapContext.map.map.layers)}
				</div>
			</>
		);
	};

	const createWrapper =
		(typeof createWrapperFunction === 'function' && createWrapperFunction) ||
		(() =>
			render(
				<MapComponentsProvider>
					<TestComponent />
				</MapComponentsProvider>
			));

	describe(ComponentName, () => {
		it(
			"should add a Layer with the id '" + humanReadableLayerName + "' to the MapLibre instance",
			async () => {
				if (typeof beforeWrapperInit === 'function') {
					await beforeWrapperInit();
				}

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const wrapper = createWrapper(TestComponent);

				if (typeof afterWrapperInit === 'function') {
					await afterWrapperInit();
				}

				await userEvent.click(screen.getByTestId("trigger_refresh"));

				// debug helper
				//console.log('layer removal test')
				//console.log(wrapper.find(".layers_json").text());
				//console.log(regexLayerNameTest.toString());
				//console.log(regexLayerNameTest.test(wrapper.find(".layers_json").text()));
				expect(regexLayerNameTest.test(screen.getByTestId("layers_json").innerHTML)).toEqual(true);
			}
		);

		it(
			"should remove a Layer with the id '" +
				humanReadableLayerName +
				"' from the MapLibre instance",
			async () => {
				if (typeof beforeWrapperInit === 'function') {
					await beforeWrapperInit();
				}

				const wrapper = createWrapper(TestComponent);

				if (typeof afterWrapperInit === 'function') {
					await afterWrapperInit();
				}

				await userEvent.click(screen.getByTestId("trigger_refresh"));

				expect(regexLayerNameTest.test(screen.getByTestId("layers_json").innerHTML)).toEqual(true);

				await userEvent.click(screen.getByTestId("toggle_layer_visible"));

				await userEvent.click(screen.getByTestId("trigger_refresh"));

				expect(regexLayerNameTest.test(screen.getByTestId("layers_json").innerHTML)).toEqual(false);
			}
		);
	});
};

export default layerRemovalTest;
