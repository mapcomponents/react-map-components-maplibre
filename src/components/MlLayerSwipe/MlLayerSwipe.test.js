import MlLayerSwipe from './MlLayerSwipe';
import React, { useContext, useState } from 'react';
import MapContext, { MapComponentsProvider } from '../../contexts/MapContext';
import MapLibreMap from './../MapLibreMap/MapLibreMap';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';

// Mapbox sync-move mockup
var mockSyncMoveMethods = {
	cleanup: jest.fn(),
};

jest.mock('@mapbox/mapbox-gl-sync-move', () => {
	const originalModule = jest.requireActual('@mapbox/mapbox-gl-sync-move');
	return {
		__esModule: true,
		...originalModule,
		default: () => mockSyncMoveMethods.cleanup,
	};
});

const TestComponent = () => {
	const [layerVisible, setLayerVisible] = useState(true);
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const mapContext = useContext(MapContext);

	return (
		<>
			<MapLibreMap mapId="map_1" data-testid="map_1" />
			<MapLibreMap mapId="map_2" data-testid="map_2" />

			{layerVisible && <MlLayerSwipe map1Id="map_1" map2Id="map_2" />}

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
		</>
	);
};


describe('<MlLayerSwipe/>', () => {
	//it("should add a MlLayerSwipe Component to that calls syncMaps with both available MapLibre instances once", async () => {
	//	const spy = jest.spyOn(syncMoveObj, "syncMove");
	//	const wrapper = createWrapper(TestComponent);

	//	expect(spy).toHaveBeenCalledTimes(1);
	//});

	it('should call the syncMaps cleanup function once when it is removed from reactDOM', async () => {
		render(
			<MapComponentsProvider>
				<TestComponent />
			</MapComponentsProvider>
		);
		//expect(syncMove).toHaveBeenCalledTimes(1);

		await userEvent.click(screen.getByTestId('toggle_layer_visible'))

		//TODO: Fix cleanup test
		expect(mockSyncMoveMethods.cleanup).toHaveBeenCalledTimes(1);
	});
});
