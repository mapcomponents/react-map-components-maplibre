import React, { useContext } from 'react';
import MapContext, { MapComponentsProvider } from './MapContext';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const MapObjectTestBlock = ({ mapId }) => {
	const mapContext = useContext(MapContext);

	return (
		<>
			<button
				className={'register_' + mapId}
				data-testid={'register_' + mapId}
				onClick={() => {
					mapContext.registerMap(mapId, { id: mapId });
				}}
			>
				set {mapId}
			</button>
			<button
				className={'remove_' + mapId}
				data-testid={'remove_' + mapId}
				onClick={() => {
					mapContext.removeMap(mapId);
				}}
			>
				set {mapId}
			</button>
			<div className={mapId + '_found'} data-testid={mapId + '_found'}>
				{mapContext.mapExists(mapId) ? 'true' : 'false'}
			</div>
			<div className={mapId + '_id'} data-testid={mapId + '_id'}>
				{mapContext.mapExists(mapId) ? mapContext.getMap(mapId).id : ''}
			</div>
			<div
				className={mapId + '_id_position_in_map_ids'}
				data-testid={mapId + '_id_position_in_map_ids'}
			>
				{mapContext.mapIds.indexOf(mapId)}
			</div>
		</>
	);
};

const MapContextTestComponent = () => {
	const mapContext = useContext(MapContext);

	return (
		<>
			<div className="map_count" data-testid="map_count">
				{mapContext.mapIds.length}
			</div>
			<div className="typeof_map" data-testid="typeof_map">
				{typeof mapContext.map}
			</div>
			<button
				className="set_anonymous_map"
				data-testid="set_anonymous_map"
				onClick={() => {
					mapContext.setMap({});
				}}
			>
				set anonymous map
			</button>
			<button
				className="remove_anonymous_map"
				data-testid="remove_anonymous_map"
				onClick={() => {
					mapContext.removeMap();
				}}
			>
				set anonymous map
			</button>
			<div className="anonymous_map_found" data-testid="anonymous_map_found">
				{mapContext.mapExists() ? 'true' : 'false'}
			</div>
			<div className="get_anonymous_map" data-testid="get_anonymous_map">
				{mapContext.getMap() ? 'true' : 'false'}
			</div>

			{['map_1', 'map_2'].map((mapId) => (
				<MapObjectTestBlock mapId={mapId} key={mapId} />
			))}
		</>
	);
};

describe('MapComponentsProvider.setMap', () => {
	it('should add an anonymous map object to mapContext', async () => {
		render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('typeof_map').innerHTML).toEqual('undefined');
		expect(screen.getByTestId('map_count').innerHTML).toEqual('0');

		await userEvent.click(screen.getByTestId('set_anonymous_map'));

		expect(screen.getByTestId('typeof_map').innerHTML).toEqual('object');
		expect(screen.getByTestId('map_count').innerHTML).toEqual('1');
	});
});

describe('MapComponentsProvider.getMap', () => {
	it('should return the map object referenced by mapContext.map if no parameters are passed', async () => {
		render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('get_anonymous_map').innerHTML).toEqual('false');

		await userEvent.click(screen.getByTestId('set_anonymous_map'));

		expect(screen.getByTestId('get_anonymous_map').innerHTML).toEqual('true');
	});
});

describe('MapComponentsProvider.mapExists', () => {
	it('should return true if an anonymous map object has been set using setMap', async () => {
		render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('typeof_map').innerHTML).toEqual('undefined');
		expect(screen.getByTestId('map_count').innerHTML).toEqual('0');
		expect(screen.getByTestId('get_anonymous_map').innerHTML).toEqual('false');

		await userEvent.click(screen.getByTestId('set_anonymous_map'));

		expect(screen.getByTestId('typeof_map').innerHTML).toEqual('object');
		expect(screen.getByTestId('map_count').innerHTML).toEqual('1');
		expect(screen.getByTestId('get_anonymous_map').innerHTML).toEqual('true');
	});

	it('should return true if a map object has been registered using registerMap', async () => {
		render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).toEqual('-1');
		expect(screen.getByTestId('anonymous_map_found').innerHTML).toEqual('false');

		await userEvent.click(screen.getByTestId('register_map_1'));

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('true');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).toEqual('0');
		expect(screen.getByTestId('anonymous_map_found').innerHTML).toEqual('true');
	});
});

describe('MapComponentsProvider.registerMap', () => {
	it('should register a map object with the id map_1 to mapContext', async () => {
		render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML);

		await userEvent.click(screen.getByTestId('register_map_1'));

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('true');
		expect(screen.getByTestId('map_1_id').innerHTML).toEqual('map_1');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).not.toEqual('-1');
	});

	it('should register a map object with the id map_1 and another on with the id map_2 to mapContext', async () => {
		render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).toEqual('-1');
		expect(screen.getByTestId('map_2_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_2_id_position_in_map_ids').innerHTML).toEqual('-1');

		await userEvent.click(screen.getByTestId('register_map_1'));
		await userEvent.click(screen.getByTestId('register_map_2'));

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('true');
		expect(screen.getByTestId('map_1_id').innerHTML).toEqual('map_1');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).not.toEqual('-1');
		expect(screen.getByTestId('map_2_found').innerHTML).toEqual('true');
		expect(screen.getByTestId('map_2_id').innerHTML).toEqual('map_2');
		expect(screen.getByTestId('map_2_id_position_in_map_ids').innerHTML).not.toEqual('-1');
	});
});

describe('MapComponentsProvider.removeMap', () => {
	it('should remove an anonymous map object from mapContext', async () => {
		render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('typeof_map').innerHTML).toEqual('undefined');
		expect(screen.getByTestId('map_count').innerHTML).toEqual('0');

		await userEvent.click(screen.getByTestId('set_anonymous_map'));

		expect(screen.getByTestId('typeof_map').innerHTML).toEqual('object');
		expect(screen.getByTestId('map_count').innerHTML).toEqual('1');

		await userEvent.click(screen.getByTestId('remove_anonymous_map'));

		expect(screen.getByTestId('typeof_map').innerHTML).toEqual('undefined');
		expect(screen.getByTestId('map_count').innerHTML).toEqual('0');
	});

	it('should remove a map object with the id map_1 from mapContext', async () => {
		render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).toEqual('-1');

		await userEvent.click(screen.getByTestId('register_map_1'));

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('true');
		expect(screen.getByTestId('map_1_id').innerHTML).toEqual('map_1');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).not.toEqual('-1');

		await userEvent.click(screen.getByTestId('remove_map_1'));

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_1_id').innerHTML).toEqual('');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).toEqual('-1');
	});

	it('should remove a map object with the id map_1 and another on with the id map_2 from mapContext', async () => {
		render(
			<MapComponentsProvider>
				<MapContextTestComponent />
			</MapComponentsProvider>
		);

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).toEqual('-1');
		expect(screen.getByTestId('map_2_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_2_id_position_in_map_ids').innerHTML).toEqual('-1');

		await userEvent.click(screen.getByTestId('register_map_1'));
		await userEvent.click(screen.getByTestId('register_map_2'));

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('true');
		expect(screen.getByTestId('map_1_id').innerHTML).toEqual('map_1');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).not.toEqual('-1');
		expect(screen.getByTestId('map_2_found').innerHTML).toEqual('true');
		expect(screen.getByTestId('map_2_id').innerHTML).toEqual('map_2');
		expect(screen.getByTestId('map_2_id_position_in_map_ids').innerHTML).not.toEqual('-1');

		await userEvent.click(screen.getByTestId('remove_map_1'));
		await userEvent.click(screen.getByTestId('remove_map_2'));

		expect(screen.getByTestId('map_1_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_1_id_position_in_map_ids').innerHTML).toEqual('-1');
		expect(screen.getByTestId('map_2_found').innerHTML).toEqual('false');
		expect(screen.getByTestId('map_2_id_position_in_map_ids').innerHTML).toEqual('-1');
	});
});
