import React, { useState } from 'react';
import { mount } from 'enzyme';
import { MapComponentsProvider } from '../contexts/MapContext';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';

import useSource from './useLayer';

const UseSourceTestComponent = (props) => {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	useSource({
		mapId: props.mapId,
		sourceId: 'geojson-source',
		source: {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				name: 'testcollection',
				features: [],
			},
		},
	});

	return <></>;
};

const TestComponent = (props) => {
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
			{includeComponent && <UseSourceTestComponent {...props} type={testType} />}
			<MapLibreMap />
		</>
	);
};

describe('useSource hook', () => {
	it("should fire a 'addsource' event in MapLibreGlWrapper", async () => {
		var testAttributes = {
			on: {
				addsource: () => {},
			},
		};

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		wrapper.find('.toggle_includeComponent').simulate('click');
	});
});
