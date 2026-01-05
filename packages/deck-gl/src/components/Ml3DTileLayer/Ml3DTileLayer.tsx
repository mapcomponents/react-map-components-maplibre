import { useEffect, useMemo, useRef } from 'react';
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
	const { mapId, ...Ml3DTileProps } = props;
	const mapHook = useMap({ mapId: mapId });
	const deckGlHook = useDeckGl();

	const initializedRef = useRef(false);
	const tile3dLayer = useMemo(() => {
		if (!Ml3DTileProps.data) return null;
		else
			return new Tile3DLayer({
				...Ml3DTileProps,
			});
	}, [
		Ml3DTileProps.data,
		Ml3DTileProps.id,
		Ml3DTileProps.pickable,
		Ml3DTileProps.onTileLoad,
		Ml3DTileProps.onTileUnload,
		Ml3DTileProps.loadOptions,
		Ml3DTileProps.loaders,
		Ml3DTileProps.visible,
		Ml3DTileProps.opacity,
		Ml3DTileProps.pointSize,
		Ml3DTileProps.beforeId,
	]);

	useEffect(() => {
		if (!mapHook.map || initializedRef.current) return;
		initializedRef.current = true;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		deckGlHook.addLayer(tile3dLayer);

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			tile3dLayer && deckGlHook.removeLayer(tile3dLayer);
			initializedRef.current = false;
		};
	}, [mapHook.map]);

	return <></>;
};

export default Ml3DTileLayer;
