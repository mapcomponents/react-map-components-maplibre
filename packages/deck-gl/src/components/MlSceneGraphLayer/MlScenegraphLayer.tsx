import { ScenegraphLayer, ScenegraphLayerProps } from '@deck.gl/mesh-layers';
import { useEffect, useMemo } from 'react';
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

	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.beforeId,
	});
	const deckGlHook = useDeckGl();
	const scenegraphLayer = useMemo(
		() => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { mapId, beforeId, ...ScenegraphLayerProps } = props;
			return new ScenegraphLayer({
				...ScenegraphLayerProps,
			})
		},
		[props]
	);

	useEffect(() => {
		if (!mapHook.map || !scenegraphLayer) return;

		deckGlHook.addLayer(scenegraphLayer);

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			scenegraphLayer && deckGlHook.removeLayer(scenegraphLayer);
		};
	}, [mapHook.map, scenegraphLayer]);
	return <></>;
};

export default MlScenegraphLayer;
