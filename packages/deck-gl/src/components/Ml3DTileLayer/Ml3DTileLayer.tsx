import { useEffect, useMemo } from 'react';
import { useMap } from '@mapcomponents/react-maplibre';
import { Tile3DLayer, Tile3DLayerProps } from '@deck.gl/geo-layers';
import useDeckGl from '../../hooks/useDeckGl';

export interface Ml3DTileLayerProps extends Tile3DLayerProps {
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

const Ml3DTileLayer = (props: Ml3DTileLayerProps) => {
	const mapHook = useMap({ mapId: props.mapId });
	const deckGlHook = useDeckGl();

	const tile3dLayer = useMemo(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { mapId, beforeId, ...Ml3DTileProps } = props;
		if (!Ml3DTileProps.data) return null;
		else
			return new Tile3DLayer({
				...Ml3DTileProps,
			});
	}, [
		props.data,
		props.id,
		props.pickable,
		props.onTileLoad,
		props.onTileUnload,
		props.loadOptions,
		props.loaders,
		props.visible,
		props.opacity,
		props.pointSize,
		props.beforeId,
	]);

	useEffect(() => {
		if (!mapHook.map || !tile3dLayer) return;

		deckGlHook.addLayer(tile3dLayer);

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			tile3dLayer && deckGlHook.removeLayer(tile3dLayer);
		};
	}, [mapHook.map, tile3dLayer]);

	return <></>;
};

export default Ml3DTileLayer;
