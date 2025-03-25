import React, { useContext } from "react";
import MapContext from "./MapContext";
import { MapComponentsProvider } from "./MapContext";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';

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
	it("should add an anonymous map object to mapContext", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getAllByText('undefined').find(element => element.classList.contains('typeof_map')));
		expect(screen.getAllByText('0').find(element => element.classList.contains('map_count')));

		await userEvent.click(screen.getAllByRole("button", { name: /set anonymous map/i }).find(element => element.classList.contains("set_anonymous_map")));

		expect(screen.getAllByText('object').find(element => element.classList.contains('typeof_map')));
		expect(screen.getAllByText('1').find(element => element.classList.contains('map_count')));
	});
});

describe("MapComponentsProvider.getMap", () => {
	it("should return the map object referenced by mapContext.map if no parameters are passed", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getAllByText('false').find(element => element.classList.contains('get_anonymous_map')));

		await userEvent.click(screen.getByRole("button", { name: /set anonymous map/i }));

		expect(screen.getAllByText('true').find(element => element.classList.contains('get_anonymous_map')));
	});
});

describe("MapComponentsProvider.mapExists", () => {
	it("should return true if an anonymous map object has been set using setMap", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getAllByText('undefined').find(element => element.classList.contain('typeof_map')));
		expect(screen.getAllByText('0').find(element => element.classList.contain('map_count')));
		expect(screen.getAllByText('false').find(element => element.classList.contains('get_anonymous_map')));

		await userEvent.click(screen.getByRole("button", { name: /set anonymous map/i }));

		expect(screen.getAllByText('object').find(element => element.classList.contain('typeof_map')));
		expect(screen.getAllByText('1').find(element => element.classList.contain('map_count')));
		expect(screen.getAllByText('true').find(element => element.classList.contains('get_anonymous_map')));
	});

	it("should return true if a map object has been registered using registerMap", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));
		expect(screen.getAllByText('false').find(element => element.classList.contains('.anonymous_map_found')));

		await userEvent.click(screen.getAllByText('set map_1').find(button => button.classList.contains('register_map_1')));

		expect(screen.getAllByText('true').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('map_1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));
		expect(screen.getAllByText('true').find(element => element.classList.contains('.anonymous_map_found')));
	});
});

describe("MapComponentsProvider.registerMap", () => {
	it("should register a map object with the id map_1 to mapContext", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));

		await userEvent.click(screen.getAllByText('set map_1').find(button => button.classList.contains('register_map_1')));

		expect(screen.getAllByText('true').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('map_1').find(element => element.classList.contains('.map_1_id')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));
	});

	it("should register a map object with the id map_1 and another on with the id map_2 to mapContext", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));
		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_2_found')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_2_id_position_in_map_ids')));

		await userEvent.click(screen.getAllByText('set map_1').find(button => button.classList.contains('register_map_1')));
		await userEvent.click(screen.getAllByText('set map_2').find(button => button.classList.contains('register_map_2')));

		expect(screen.getAllByText('true').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('map_1').find(element => element.classList.contains('.map_1_id')));
		expect(screen.getAllByText('0').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));
		expect(screen.getAllByText('true').find(element => element.classList.contains('.map_2_found')));
		expect(screen.getAllByText('map_2').find(element => element.classList.contains('.map_2_id')));
		expect(screen.getAllByText('0').find(element => element.classList.contains('.map_2_id_position_in_map_ids')));
	});
});

describe("MapComponentsProvider.removeMap", () => {
	it("should remove an anonymous map object from mapContext", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getAllByText("undefined").find(element => element.classList.contains('typeof_map')));
		expect(screen.getAllByText("0").find(element => element.classList.contains('map_count')));

		await userEvent.click(screen.getAllByRole("button", { name: /set anonymous map/i }).find(element => element.classList.contains("set_anonymous_map")));

		expect(screen.getAllByText("object").find(element => element.classList.contains('typeof_map')));
		expect(screen.getAllByText("1").find(element => element.classList.contains('map_count')));

		await userEvent.click(screen.getAllByRole("button", { name: /set anonymous map/i }).find(element => element.classList.contains("remove_anonymous_map")));

		expect(screen.getAllByText("undefined").find(element => element.classList.contains('typeof_map')));
		expect(screen.getAllByText("0").find(element => element.classList.contains('map_count')));
	});

	it("should remove a map object with the id map_1 from mapContext", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));

		await userEvent.click(screen.getAllByText('set map_1').find(button => button.classList.contains('register_map_1')));


		expect(screen.getAllByText('true').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('map_1').find(element => element.classList.contains('.map_1_id')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));

		await userEvent.click(screen.getAllByText('set map_1').find(button => button.classList.contains('remove_map_1')));

		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('').find(element => element.classList.contains('.map_1_id')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));
	});

	it("should remove a map object with the id map_1 and another on with the id map_2 from mapContext", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));
		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_2_found')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_2_id_position_in_map_ids')));

		await userEvent.click(screen.getAllByText('set map_1').find(button => button.classList.contains('register_map_1')));
		await userEvent.click(screen.getAllByText('set map_2').find(button => button.classList.contains('register_map_2')));

		expect(screen.getAllByText('true').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('map_1').find(element => element.classList.contains('.map_1_id')));
		expect(screen.getAllByText('0').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));
		expect(screen.getAllByText('true').find(element => element.classList.contains('.map_2_found')));
		expect(screen.getAllByText('map_2').find(element => element.classList.contains('.map_2_id')));
		expect(screen.getAllByText('0').find(element => element.classList.contains('.map_2_id_position_in_map_ids')));

		await userEvent.click(screen.getAllByText('set map_1').find(button => button.classList.contains('remove_map_1')));
		await userEvent.click(screen.getAllByText('set map_2').find(button => button.classList.contains('remove_map_2')));

		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_1_found')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_1_id_position_in_map_ids')));
		expect(screen.getAllByText('false').find(element => element.classList.contains('.map_2_found')));
		expect(screen.getAllByText('-1').find(element => element.classList.contains('.map_2_id_position_in_map_ids')));
	});
});
