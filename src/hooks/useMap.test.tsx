import React, { useState } from 'react';
import { MapComponentsProvider } from '../contexts/MapContext';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import { render, screen } from '@testing-library/react';

import useMap from './useMap';

const UseMapTestComponent = () => {
	const mapHook = useMap();

	return <>{mapHook.map && 'Map is ready'}</>;
};

const TestComponent = () => {
	const [includeComponent, setIncludeComponent] = useState(true);

	return (
		<>
			<button
				className="toggle_includeComponent"
				data-testid="toggle_includeComponent"
				onClick={() => {
					setIncludeComponent(!includeComponent);
				}}
			>
				toggle
			</button>
			<div className="useMapContainer" data-testid="useMapContainer">
				{includeComponent && <UseMapTestComponent />}
			</div>
			<MapLibreMap />
		</>
	);
};

describe('useMap hook', () => {
	it('should retrieve a MapLibre instance even if no attributes are passed', async () => {
		render(
			<MapComponentsProvider>
				<TestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('useMapContainer').innerHTML).toEqual('Map is ready');
	});
});
