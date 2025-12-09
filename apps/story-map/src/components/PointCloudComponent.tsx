import { useEffect, useRef } from 'react';
import { useMap } from '@mapcomponents/react-maplibre';
import { useDeckGl } from '@mapcomponents/deck-gl';
import { Tile3DLayer } from "@deck.gl/geo-layers";

const PointCloudComponent = () => {
	const mapHook = useMap({mapId: 'map_1'});
	const deckGlHook = useDeckGl();

	const initializedRef = useRef(false);

	useEffect(() => {
		if (
			!mapHook.map ||
			(initializedRef.current)
		) return;
		initializedRef.current = true;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const pointcloudLayer = new Tile3DLayer({
			id: "pointcloud_Tileset",
			data: 'tileset/tileset.json',

			pointSize: 1.5,
		});

		deckGlHook.addLayer(pointcloudLayer);

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			pointcloudLayer && deckGlHook.removeLayer(pointcloudLayer);
			initializedRef.current = false;
		};
	}, [mapHook.map]);

	return (
		<>
		</>
	);
};

export default PointCloudComponent;
