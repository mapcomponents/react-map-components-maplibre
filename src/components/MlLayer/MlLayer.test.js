import React, { useContext, useState } from "react";
import { mount, configure } from "enzyme";
import { waitFor } from "@testing-library/react";
import MapContext, { MapComponentsProvider } from "../../contexts/MapContext";
import MapLibreMap from "./../MapLibreMap/MapLibreMap";
import MlLayer from "./MlLayer";

import { uuid_regex } from "../../setupTests";

const MlLayerTestComponent = (props) => {
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
							type: "geojson",
							data: {},
						},
					}}
				/>
			)}

			<button
				className="toggle_layer_visible"
				onClick={() => {
					setLayerVisible(!layerVisible);
				}}
			>
				toggle layer visible
			</button>
			<button
				className="trigger_refresh"
				onClick={() => {
					setRefreshTrigger(refreshTrigger + 1);
				}}
			>
				refresh
			</button>
			<div className="layers_json">
				{mapContext.map && refreshTrigger && JSON.stringify(mapContext.map.layers)}
			</div>
			<div className="sources_json">
				{mapContext.map && refreshTrigger && JSON.stringify(mapContext.map.sources)}
			</div>
		</>
	);
};

const createWrapper = () =>
	mount(
		<MapComponentsProvider>
			<MlLayerTestComponent />
		</MapComponentsProvider>
	);

describe("<MlLayer>", () => {
	it("should add a Layer with the id 'MlLayer-{uuid}' to the MapLibre instance", async () => {
		const wrapper = createWrapper();

		wrapper.find(".trigger_refresh").simulate("click");

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(wrapper.find(".layers_json").text())
		).toEqual(true);
	});

	it("should remove a Layer with the id 'MlLayer-{uuid}' from the MapLibre instance", async () => {
		const wrapper = createWrapper();

		wrapper.find(".trigger_refresh").simulate("click");

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(wrapper.find(".layers_json").text())
		).toEqual(true);

		wrapper.find(".toggle_layer_visible").simulate("click");
		wrapper.find(".trigger_refresh").simulate("click");

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(wrapper.find(".layers_json").text())
		).toEqual(false);
	});

	it("should add a Source with the id 'MlLayer-{uuid}' to the MapLibre instance", async () => {
		const wrapper = createWrapper();

		wrapper.find(".trigger_refresh").simulate("click");

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(wrapper.find(".sources_json").text())
		).toEqual(true);
	});

	it("should remove a Source with the id 'MlLayer-{uuid}' from the MapLibre instance", async () => {
		const wrapper = createWrapper();

		wrapper.find(".trigger_refresh").simulate("click");

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(wrapper.find(".sources_json").text())
		).toEqual(true);

		wrapper.find(".toggle_layer_visible").simulate("click");
		wrapper.find(".trigger_refresh").simulate("click");

		expect(
			new RegExp('^.*"MlLayer-' + uuid_regex + '".*$').test(wrapper.find(".sources_json").text())
		).toEqual(false);
	});
});
