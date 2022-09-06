import React, { useContext } from "react";
import MapContext from "./MapContext";
import { MapComponentsProvider } from "./MapContext";
import { mount } from "enzyme";

const MapObjectTestBlock = ({ mapId }) => {
	const mapContext = useContext(MapContext);

	return (
		<>
			<button
				className={"register_" + mapId}
				onClick={() => {
					mapContext.registerMap(mapId, { id: mapId });
				}}
			>
				set {mapId}
			</button>
			<button
				className={"remove_" + mapId}
				onClick={() => {
					mapContext.removeMap(mapId);
				}}
			>
				set {mapId}
			</button>
			<div className={mapId + "_found"}>{mapContext.mapExists(mapId) ? "true" : "false"}</div>
			<div className={mapId + "_id"}>
				{mapContext.mapExists(mapId) ? mapContext.getMap(mapId).id : ""}
			</div>
			<div className={mapId + "_id_position_in_map_ids"}>{mapContext.mapIds.indexOf(mapId)}</div>
		</>
	);
};

const MapContextTestComponent = () => {
	const mapContext = useContext(MapContext);

	return (
		<>
			<div className="map_count">{mapContext.mapIds.length}</div>
			<div className="typeof_map">{typeof mapContext.map}</div>
			<button
				className="set_anonymous_map"
				onClick={() => {
					mapContext.setMap({});
				}}
			>
				set anonymous map
			</button>
			<button
				className="remove_anonymous_map"
				onClick={() => {
					mapContext.removeMap();
				}}
			>
				set anonymous map
			</button>
			<div className="anonymous_map_found">{mapContext.mapExists() ? "true" : "false"}</div>
			<div className="get_anonymous_map">{mapContext.getMap() ? "true" : "false"}</div>

			{["map_1", "map_2"].map((mapId) => (
				<MapObjectTestBlock mapId={mapId} key={mapId} />
			))}
		</>
	);
};

describe("MapComponentsProvider.setMap", () => {
	it("should add an anonymous map object to mapContext", () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(wrapper.find(".typeof_map").text()).toEqual("undefined");
		expect(wrapper.find(".map_count").text()).toEqual("0");

		wrapper.find(".set_anonymous_map").simulate("click");

		expect(wrapper.find(".typeof_map").text()).toEqual("object");
		expect(wrapper.find(".map_count").text()).toEqual("1");
	});
});

describe("MapComponentsProvider.getMap", () => {
	it("should return the map object referenced by mapContext.map if no parameters are passed", () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(wrapper.find(".get_anonymous_map").text()).toEqual("false");

		wrapper.find(".set_anonymous_map").simulate("click");

		expect(wrapper.find(".get_anonymous_map").text()).toEqual("true");
	});
});

describe("MapComponentsProvider.mapExists", () => {
	it("should return true if an anonymous map object has been set using setMap", () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(wrapper.find(".typeof_map").text()).toEqual("undefined");
		expect(wrapper.find(".map_count").text()).toEqual("0");
		expect(wrapper.find(".anonymous_map_found").text()).toEqual("false");

		wrapper.find(".set_anonymous_map").simulate("click");

		expect(wrapper.find(".typeof_map").text()).toEqual("object");
		expect(wrapper.find(".map_count").text()).toEqual("1");
		expect(wrapper.find(".anonymous_map_found").text()).toEqual("true");
	});

	it("should return true if a map object has been registered using registerMap", () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(wrapper.find(".map_1_found").text()).toEqual("false");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).toEqual("-1");
		expect(wrapper.find(".anonymous_map_found").text()).toEqual("false");

		wrapper.find(".register_map_1").simulate("click");

		expect(wrapper.find(".map_1_found").text()).toEqual("true");
		expect(wrapper.find(".map_1_id").text()).toEqual("map_1");
		expect(wrapper.find(".anonymous_map_found").text()).toEqual("true");
	});
});

describe("MapComponentsProvider.registerMap", () => {
	it("should register a map object with the id map_1 to mapContext", () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(wrapper.find(".map_1_found").text()).toEqual("false");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).toEqual("-1");

		wrapper.find(".register_map_1").simulate("click");

		expect(wrapper.find(".map_1_found").text()).toEqual("true");
		expect(wrapper.find(".map_1_id").text()).toEqual("map_1");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).not.toEqual("-1");
	});

	it("should register a map object with the id map_1 and another on with the id map_2 to mapContext", () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(wrapper.find(".map_1_found").text()).toEqual("false");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).toEqual("-1");
		expect(wrapper.find(".map_2_found").text()).toEqual("false");
		expect(wrapper.find(".map_2_id_position_in_map_ids").text()).toEqual("-1");

		wrapper.find(".register_map_1").simulate("click");
		wrapper.find(".register_map_2").simulate("click");

		expect(wrapper.find(".map_1_found").text()).toEqual("true");
		expect(wrapper.find(".map_1_id").text()).toEqual("map_1");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).not.toEqual("-1");
		expect(wrapper.find(".map_2_found").text()).toEqual("true");
		expect(wrapper.find(".map_2_id").text()).toEqual("map_2");
		expect(wrapper.find(".map_2_id_position_in_map_ids").text()).not.toEqual("-1");
	});
});

describe("MapComponentsProvider.removeMap", () => {
	it("should remove an anonymous map object from mapContext", () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(wrapper.find(".typeof_map").text()).toEqual("undefined");
		expect(wrapper.find(".map_count").text()).toEqual("0");

		wrapper.find(".set_anonymous_map").simulate("click");

		expect(wrapper.find(".typeof_map").text()).toEqual("object");
		expect(wrapper.find(".map_count").text()).toEqual("1");

		wrapper.find(".remove_anonymous_map").simulate("click");

		expect(wrapper.find(".typeof_map").text()).toEqual("undefined");
		expect(wrapper.find(".map_count").text()).toEqual("0");
	});

	it("should remove a map object with the id map_1 from mapContext", () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(wrapper.find(".map_1_found").text()).toEqual("false");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).toEqual("-1");

		wrapper.find(".register_map_1").simulate("click");

		expect(wrapper.find(".map_1_found").text()).toEqual("true");
		expect(wrapper.find(".map_1_id").text()).toEqual("map_1");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).not.toEqual("-1");

		wrapper.find(".remove_map_1").simulate("click");

		expect(wrapper.find(".map_1_found").text()).toEqual("false");
		expect(wrapper.find(".map_1_id").text()).toEqual("");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).toEqual("-1");
	});

	it("should remove a map object with the id map_1 and another on with the id map_2 from mapContext", () => {
		const wrapper = mount(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(wrapper.find(".map_1_found").text()).toEqual("false");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).toEqual("-1");
		expect(wrapper.find(".map_2_found").text()).toEqual("false");
		expect(wrapper.find(".map_2_id_position_in_map_ids").text()).toEqual("-1");

		wrapper.find(".register_map_1").simulate("click");
		wrapper.find(".register_map_2").simulate("click");

		expect(wrapper.find(".map_1_found").text()).toEqual("true");
		expect(wrapper.find(".map_1_id").text()).toEqual("map_1");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).not.toEqual("-1");
		expect(wrapper.find(".map_2_found").text()).toEqual("true");
		expect(wrapper.find(".map_2_id").text()).toEqual("map_2");
		expect(wrapper.find(".map_2_id_position_in_map_ids").text()).not.toEqual("-1");

		wrapper.find(".remove_map_1").simulate("click");
		wrapper.find(".remove_map_2").simulate("click");

		expect(wrapper.find(".map_1_found").text()).toEqual("false");
		expect(wrapper.find(".map_1_id").text()).toEqual("");
		expect(wrapper.find(".map_1_id_position_in_map_ids").text()).toEqual("-1");
		expect(wrapper.find(".map_2_found").text()).toEqual("false");
		expect(wrapper.find(".map_2_id").text()).toEqual("");
		expect(wrapper.find(".map_2_id_position_in_map_ids").text()).toEqual("-1");
	});
});
