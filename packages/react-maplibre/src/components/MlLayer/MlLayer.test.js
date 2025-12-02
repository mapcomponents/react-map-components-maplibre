import React, { useContext, useState } from 'react';
import MapContext, { MapComponentsProvider } from '../../contexts/MapContext';
import MapLibreMap from './../MapLibreMap/MapLibreMap';
import MlLayer from './MlLayer';
import { render, screen } from '@testing-library/react';
import { uuid_regex } from '../../setupTests';
import userEvent from '@testing-library/user-event';

const MlLayerTestComponent = () => {
	const [layerVisible, setLayerVisible] = useState(true);
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const mapContext = useContext(MapContext);

	return (
		<>
			<MapLibreMap />

			{layerVisible && (
				<MlLayer
					options={{
						source: {
							type: 'geojson',
							data: {},
						},
					}}
				/>
			)}

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
				{mapContext.map && refreshTrigger && JSON.stringify(mapContext.map.layers)}
			</div>
			<div className="sources_json" data-testid="sources_json">
				{mapContext.map && refreshTrigger && JSON.stringify(mapContext.map.sources)}
			</div>
		</>
	);
};

const createWrapper = () =>
	render(
		<MapComponentsProvider>
			<MlLayerTestComponent />
		</MapComponentsProvider>
	);

describe('<MlLayer>', () => {
	it("should add a Layer with the id 'MlLayer-{uuid}' to the MapLibre instance", async () => {
		createWrapper();

		await userEvent.click(screen.getByTestId('trigger_refresh'));

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(
				screen.getByTestId('layers_json').innerHTML
			)
		).toEqual(true);
	});

	it("should remove a Layer with the id 'MlLayer-{uuid}' from the MapLibre instance", async () => {
		createWrapper();

		await userEvent.click(screen.getByTestId('trigger_refresh'));

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(
				screen.getByTestId('layers_json').innerHTML
			)
		).toEqual(true);

		await userEvent.click(screen.getByTestId('toggle_layer_visible'));
		await userEvent.click(screen.getByTestId('trigger_refresh'));

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(
				screen.getByTestId('layers_json').innerHTML
			)
		).toEqual(false);
	});

	it("should add a Source with the id 'MlLayer-{uuid}' to the MapLibre instance", async () => {
		createWrapper();

		await userEvent.click(screen.getByTestId('trigger_refresh'));

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(
				screen.getByTestId('sources_json').innerHTML
			)
		).toEqual(true);
	});

	it("should remove a Source with the id 'MlLayer-{uuid}' from the MapLibre instance", async () => {
		createWrapper();

		await userEvent.click(screen.getByTestId('trigger_refresh'));

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(
				screen.getByTestId('sources_json').innerHTML
			)
		).toEqual(true);

		await userEvent.click(screen.getByTestId('toggle_layer_visible'));
		await userEvent.click(screen.getByTestId('trigger_refresh'));

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(
				screen.getByTestId('sources_json').innerHTML
			)
		).toEqual(false);
	});
});
