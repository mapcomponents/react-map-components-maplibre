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
				onClick={() => {
					setMapIsVisible(!mapIsVisible);
				}}
			>
				toggle mapIsVisible
			</button>
			<div className="map_count">{mapContext.mapIds.length}</div>

			{!props.mapId && mapIsVisible && <MapLibreMap />}
			{props.mapId && (
				<>
					<div className="map_1_exists">{mapContext.getMap(props.mapId) ? 'true' : 'false'}</div>
					{mapIsVisible && <MapLibreMap mapId={props.mapId} />}
				</>
			)}
		</>
	);
};

describe('<MapLibreMap>', () => {
	it('should register an anonymous maplibre object to mapContext', async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapLibreMapTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByText('1')).toHaveClass('map_count');
	});

	it('should remove an anonymous maplibre object from mapContext', async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapLibreMapTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByText('1')).toHaveClass('map_count');

		await userEvent.click(screen.getByRole("button", { name: /toggle mapIsVisible/i }));

		expect(screen.getByText('0')).toHaveClass('map_count');
	});

	it("should register a maplibre object with the id 'map_1' to mapContext", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapLibreMapTestComponent mapId="map_1" />
			</MapComponentsProvider>
		);

		expect(screen.getByText(true)).toHaveClass('map_1_exists');
	});

	it("should remove a maplibre object with the id 'map_1' to mapContext", async () => {
		const wrapper = render(
			<MapComponentsProvider>
				<MapLibreMapTestComponent mapId="map_1" />
			</MapComponentsProvider>
		);

		expect(screen.getByText(true)).toHaveClass('map_1_exists');

		await userEvent.click(screen.getByRole("button", { name: /toggle mapIsVisible/i }));

		expect(screen.getByText(false)).toHaveClass('map_1_exists');

	});
});
