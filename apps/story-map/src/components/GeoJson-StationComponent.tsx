import { MlGeoJsonLayer } from '@mapcomponents/react-maplibre';
import area from '../assets/area.json';
import lines from '../assets/lines.json';
import points from '../assets/points.json';

function GeoJsonStationComponent() {
	return (
		<>
			<MlGeoJsonLayer
				mapId={'map_1'}
				geojson={area}
				type="fill"
				options={{
					paint: {
						'fill-color': '#ffae00',
						'fill-opacity': 1,
					},
				}}
			/>
			<MlGeoJsonLayer
				mapId={'map_1'}
				geojson={lines}
				type="line"
				options={{
					paint: {
						'line-color': '#006fff',
						'line-opacity': 1,
					},
				}}
			/>
			<MlGeoJsonLayer
				mapId={'map_1'}
				geojson={points}
				type="circle"
				options={{
					paint: {
						'circle-color': '#73ff00',
						'circle-opacity': 1,
					},
				}}
			/>
		</>
	);
}

export default GeoJsonStationComponent;
