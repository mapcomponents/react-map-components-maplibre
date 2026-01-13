import { ScenegraphLayer, ScenegraphLayerProps } from '@deck.gl/mesh-layers';
import { useEffect, useMemo, useRef } from 'react';
import { useMap } from '@mapcomponents/react-maplibre';
import useDeckGl from '../../hooks/useDeckGl';

export interface MlScenegraphLayerProps extends ScenegraphLayerProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "beforeId" id.
	 */
	beforeId?: string;
}

const MlScenegraphLayer = (props: MlScenegraphLayerProps) => {
	const initializedRef = useRef(false);

	const { mapId, ...ScenegraphLayerProps } = props;

	const mapHook = useMap({
		mapId: mapId,
		waitForLayer: ScenegraphLayerProps.beforeId,
	});
	const deckGlHook = useDeckGl();
	const scenegraphLayer = useMemo(
		() =>
			new ScenegraphLayer({
				...ScenegraphLayerProps,
			}),
		[ScenegraphLayerProps]
	);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;

		deckGlHook.addLayer(scenegraphLayer);

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			scenegraphLayer && deckGlHook.removeLayer(scenegraphLayer);
			initializedRef.current = false;
		};
	}, [mapHook.map]);
	return <></>;
};

export default MlScenegraphLayer
