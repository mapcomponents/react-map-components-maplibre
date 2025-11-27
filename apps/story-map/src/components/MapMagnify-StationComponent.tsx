import { MlLayer, MlLayerMagnify, MlWmsLayer, useMap } from '@mapcomponents/react-maplibre';
import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import { cogProtocol } from '@geomatico/maplibre-cog-protocol';

interface MapMagnifyStationComponentProps {
	showMapMagnify: boolean;
}

export default function MapMagnifyStationComponent(props: MapMagnifyStationComponentProps) {
	const mapHook = useMap();

	useEffect(() => {
		maplibregl.addProtocol('cog', cogProtocol);

		mapHook.map?.addSource('Test_OldMap', {
			url: 'cog://http://localhost:5173/OldMap_COG.tif',
			type: 'raster',
			tileSize: 256,
			minzoom: 13,
		});
	}, [mapHook.map]);

	return (
		<>
			{props.showMapMagnify ? (
				<>
					<MlWmsLayer
						url="https://www.wms.nrw.de/geobasis/wms_nw_uraufnahme"
						urlParameters={{
							layers: 'nw_uraufnahme_rw',
						}}
						sourceOptions={{
							type: 'raster',
							minzoom: 13,
							maxzoom: 20,
						}}
						mapId={'map_2'}
					/>
					<MlLayerMagnify
						map1Id={'map_1'}
						map2Id={'map_2'}
						magnifierStyle={{ border: '2px solid grey' }}
						magnifierRadius={200}
					/>
				</>
			) : (
				<MlLayer
					options={{
						id: 'oldmap-cog-layer',
						type: 'raster',
						source: 'Test_OldMap',
					}}
				/>
			)}
		</>
	);
}
