import React, { useContext, useState } from 'react';
import MapContext, { MapComponentsProvider } from '../../contexts/MapContext';
import MapLibreMap from './MapLibreMap';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const MapLibreMapTestComponent = (props) => {
	const mapContext = useContext(MapContext);
	const [mapIsVisible, setMapIsVisible] = useState(true);

	return (
		<>
			<button
				className="toggle_map_is_visible"
				data-testid="toggle_map_visible"
				onClick={() => {
					setMapIsVisible(!mapIsVisible);
				}}
			>
				toggle mapIsVisible
			</button>
			<div className="map_count" data-testid="map_count">
				{mapContext.mapIds.length}
			</div>

			{!props.mapId && mapIsVisible && <MapLibreMap />}
			{props.mapId && (
				<>
					<div className="map_1_exists" data-testid="map_1_exists">
						{mapContext.getMap(props.mapId) ? 'true' : 'false'}
					</div>
					{mapIsVisible && <MapLibreMap mapId={props.mapId} />}
				</>
			)}
		</>
	);
};

describe('<MapLibreMap>', () => {
	it('should register an anonymous maplibre object to mapContext', async () => {
		render(
			<MapComponentsProvider>
				<MapLibreMapTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('map_count').innerHTML).toEqual('1');
	});

	it('should remove an anonymous maplibre object from mapContext', async () => {
		render(
			<MapComponentsProvider>
				<MapLibreMapTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('map_count').innerHTML).toEqual('1');

		await userEvent.click(screen.getByTestId('toggle_map_visible'));

		expect(screen.getByTestId('map_count').innerHTML).toEqual('0');
	});

	it("should register a maplibre object with the id 'map_1' to mapContext", async () => {
		render(
			<MapComponentsProvider>
				<MapLibreMapTestComponent mapId="map_1" />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('map_1_exists').innerHTML).toEqual('true');
	});

	it("should remove a maplibre object with the id 'map_1' to mapContext", async () => {
		render(
			<MapComponentsProvider>
				<MapLibreMapTestComponent mapId="map_1" />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('map_1_exists').innerHTML).toEqual('true');

		await userEvent.click(screen.getByTestId('toggle_map_visible'));

		expect(screen.getByTestId('map_1_exists').innerHTML).toEqual('false');
	});
});
