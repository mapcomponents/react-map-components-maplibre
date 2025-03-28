import React, {  useState } from "react";
import { waitFor, render, screen } from "@testing-library/react";
import { MapComponentsProvider } from "../../contexts/MapContext";
import MlNavigationCompass from "./MlNavigationCompass";
import MapLibreMap from "./../MapLibreMap/MapLibreMap";
import { mockMapLibreMethods } from "../../setupTests";
import userEvent from '@testing-library/user-event';

jest.mock("@mapbox/mapbox-gl-draw", () => {
	return function () {
		return {
			set: jest.fn(),
		};
	};
});

const MlNavigationCompassTestComponent = (props) => {
	const [componentVisible, setComponentVisible] = useState(true);

	return (
		<>
			<MapLibreMap />

			{componentVisible && <MlNavigationCompass {...props} />}

			<button
				className="toggle_layer_visible"
				data-testid="toggle_layer_visible"
				onClick={() => {
					setComponentVisible(!componentVisible);
				}}
			>
				toggle component
			</button>
		</>
	);
};

let testAttributes = {};

describe("<MlNavigationCompass>", () => {
	it("should register 1 event listener to the maplibre instance", async () => {
		render(
			<MapComponentsProvider>
				<MlNavigationCompassTestComponent {...testAttributes} />
			</MapComponentsProvider>
		);


		// MapLibreGlWrapper now subscribes to "data", "move" events on its own
		await waitFor(() => expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(5));
	});

	it("should deregister 1 event listener to the maplibre instance", async () => {
		render(
			<MapComponentsProvider>
				<MlNavigationCompassTestComponent {...testAttributes} />
			</MapComponentsProvider>
		);

		// MapLibreGlWrapper now subscribes to "data", "move" events on its own
		expect(mockMapLibreMethods.on).toHaveBeenCalledTimes(5);

		await userEvent.click(screen.getByTestId('toggle_layer_visible'))

		expect(mockMapLibreMethods.off).toHaveBeenCalledTimes(2);
	});
});
