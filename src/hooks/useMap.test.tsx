import React, {  useState } from 'react';
import { mount } from 'enzyme';
import  { MapComponentsProvider } from '../contexts/MapContext';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';

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
				onClick={() => {
					setIncludeComponent(!includeComponent);
				}}
			>
				toggle
			</button>
			<div className="useMapContainer">
				{includeComponent && <UseMapTestComponent />}
			</div>
			<MapLibreMap />
		</>
	);
};

describe('useMap hook', () => {
	it("should retrieve a MapLibre instance even if no attributes are passed", async () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent />
			</MapComponentsProvider>
		);

		
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(wrapper.find('.useMapContainer').text()).toEqual("Map is ready");
	});
});
