import React, { useState } from 'react';
import { mount } from 'enzyme';
import { MapComponentsProvider } from '../contexts/MapContext';
import MapLibreMap from '../components/MapLibreMap/MapLibreMap';
import { waitFor } from '@testing-library/react';
import { mockMapLibreMethods } from '../setupTests';

import useLayer from './useLayer';

const UseLayerTestComponent = (props) => {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	useLayer({
		mapId: props.mapId,
		layerId: props.layerId || 'TestComponent',
		geojson: {
			type: 'FeatureCollection',
			name: 'testcollection',
			features: [],
		},
		options: {
			paint: props.paint,
			layout: props.layout || {},
			type: props.type,
			...props.options,
		},
		insertBeforeLayer: props.insertBeforeLayer,
		onHover: props.onHover,
		onClick: props.onClick,
		onLeave: props.onLeave,
	});

	return <></>;
};

const TestComponent = (props) => {
	const [includeComponent, setIncludeComponent] = useState(true);
	const [testType, setTestType] = useState('line');

	return (
		<>
			<button
				className="change_testType"
				onClick={() => {
					setTestType('circle');
				}}
			>
				change type
			</button>
			<button
				className="toggle_includeComponent"
				onClick={() => {
					setIncludeComponent(!includeComponent);
				}}
			>
				toggle
			</button>
			{includeComponent && <UseLayerTestComponent {...props} type={testType} />}
			<MapLibreMap />
		</>
	);
};

describe('useLayer hook', () => {
	it("should register 1 event listener 'hover' to the maplibre instance", async () => {
		var testAttributes = {
			onHover: () => {},
		};

		mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		// MapLibreGlWrapper now subscribes to 4 events events on its own
		// useLayer always subscribes to 'styledata' to watch whether its representation within the maplibre instance has been removed
		await waitFor(() => expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(6));
	});
	it("should deregister 1 event listener 'hover' to the maplibre instance", async () => {
		var testAttributes = {
			onHover: () => {},
		};

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		wrapper.find('.toggle_includeComponent').simulate('click');

		// useLayer always subscribes to 'styledata' to watch whether its representation within the maplibre instance has been removed
		await waitFor(() => expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(2));
	});
	it("should register 1 event listener 'leave' to the maplibre instance", async () => {
		var testAttributes = {
			onLeave: () => {},
		};

		mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		// MapLibreGlWrapper now subscribes to 4 events events on its own
		// useLayer always subscribes to 'styledata' to watch whether its representation within the maplibre instance has been removed
		await waitFor(() => expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(6));
	});
	it("should deregister 1 event listener 'leave' to the maplibre instance", async () => {
		var testAttributes = {
			onLeave: () => {},
		};

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		wrapper.find('.toggle_includeComponent').simulate('click');

		// useLayer always subscribes to 'styledata' to watch whether its representation within the maplibre instance has been removed
		await waitFor(() => expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(2));
	});

	it("should register 1 event listener 'click' to the maplibre instance", async () => {
		var testAttributes = {
			onClick: () => {},
		};

		mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		// MapLibreGlWrapper now subscribes to 4 events events on its own
		// useLayer always subscribes to 'styledata' to watch whether its representation within the maplibre instance has been removed
		await waitFor(() => expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(6));
	});
	it("should deregister 1 event listener 'click' to the maplibre instance", async () => {
		var testAttributes = {
			onClick: () => {},
		};

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		wrapper.find('.toggle_includeComponent').simulate('click');

		// useLayer always subscribes to 'styledata' to watch whether its representation within the maplibre instance has been removed
		await waitFor(() => expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(2));
	});

	// if props.type is changed during runtime the hook needs to remove existing additions to the maplibre instance and reinitialize its representation in the maplibre instance
	it("should deregister 1 event listener 'hover' to the maplibre instance if type is changed during component runtime", async () => {
		var testAttributes = {
			onHover: () => {},
		};

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		wrapper.find('.change_testType').simulate('click');

		// styledata event is not removed in this case as only the event handler is changed during runtime without removing the component
		await waitFor(() => expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(1));
	});
	it("should deregister 1 event listener 'leave' to the maplibre instance if type is changed during component runtime", async () => {
		var testAttributes = {
			onLeave: () => {},
		};

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		wrapper.find('.change_testType').simulate('click');

		// styledata event is not removed in this case as only the event handler is changed during runtime without removing the component
		await waitFor(() => expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(1));
	});
	it("should deregister 1 event listener 'click' to the maplibre instance if type is changed during component runtime", async () => {
		var testAttributes = {
			onClick: () => {},
		};

		const wrapper = mount(
			<MapComponentsProvider>
				<TestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		wrapper.find('.change_testType').simulate('click');

		// styledata event is not removed in this case as only the event handler is changed during runtime without removing the component
		await waitFor(() => expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(1));
	});
});
