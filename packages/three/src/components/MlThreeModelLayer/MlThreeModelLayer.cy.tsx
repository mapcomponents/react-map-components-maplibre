import React, { useEffect } from 'react';
import { MapComponentsProvider, MapLibreMap, useMap } from '@mapcomponents/react-maplibre';
import { ThreeProvider } from '../ThreeProvider';
import MlThreeModelLayer from './MlThreeModelLayer';

const MapExposer = () => {
	const { map } = useMap({ mapId: 'map_1' });
	useEffect(() => {
		if (map) {
			(window as any)._map = map;
		}
	}, [map]);
	return null;
};

const TestComponent = ({ onDone }: { onDone: () => void }) => {
	return (
		<MapComponentsProvider>
			<MapExposer />
			<ThreeProvider id="three-provider" mapId="map_1">
				<MlThreeModelLayer
					url="assets/3D/godzilla_simple.glb"
					mapPosition={[13.404954, 52.520008]}
					scale={10}
					onDone={onDone}
				/>
			</ThreeProvider>
			<MapLibreMap
				options={{
					style: { version: 8, sources: {}, layers: [] },
					center: [13.404954, 52.520008],
					zoom: 15,
					pitch: 60,
				}}
				mapId="map_1"
			/>
		</MapComponentsProvider>
	);
};

describe('<MlThreeModelLayer />', () => {
	it('renders', () => {
		const onDoneSpy = cy.spy().as('onDoneSpy');
		cy.mount(<TestComponent onDone={onDoneSpy} />);

		// Wait for map to load
		cy.get('.maplibregl-canvas').should('exist');

		// Wait for the model to load first (this confirms map and three provider are working)
		cy.get('@onDoneSpy', { timeout: 15000 }).should('have.been.called');

		// Check if map instance is available and has the custom layer
		cy.window().should('have.property', '_map');
		cy.window().then((win: any) => {
			const map = win._map;
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			expect(map).to.exist;
			// Check for the layer added by ThreeProvider
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			expect(map.getLayer('three-provider')).to.exist;
		});
	});
});
