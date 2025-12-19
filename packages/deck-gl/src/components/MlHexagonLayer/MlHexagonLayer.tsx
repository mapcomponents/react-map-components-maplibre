import { useEffect, useRef, useMemo } from 'react';
import { HexagonLayer, HexagonLayerProps } from '@deck.gl/aggregation-layers';
import { useMap } from '@mapcomponents/react-maplibre';
import useDeckGl from '../../hooks/useDeckGl';

export interface MlHexagonMapProps extends HexagonLayerProps {
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

const defaultProps = {
	type: HexagonLayer,
	layerOpacity: 0.8,
	specularColor: [51, 51, 51],
	elevationScale: 10,
	extruded: true,
	coverage: 0.9,
	autoHighlight: false,
	material: {
		ambient: 0.8,
		diffuse: 0.5,
		shininess: 20,
	},
	radius: 16,
	transitions: {
		elevationScale: 1500,
	},
	_filterData: null,
};

const MlHexagonLayer = (props: MlHexagonMapProps) => {
	const deckGlHook = useDeckGl();

	props = {
		...defaultProps,
		...props,
	};

	const { mapId, ...HexagonLayerProps } = props;

	const mapHook = useMap({
		mapId: mapId,
		waitForLayer: HexagonLayerProps.beforeId,
	});

	const initializedRef = useRef(false);

	// create deck.gl HexagonLayer once when its props change
	const hexagonLayer = useMemo(() => {
		if (!HexagonLayerProps.data) return null;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return new HexagonLayer({
			...HexagonLayerProps,
		} as unknown as HexagonLayerProps);
	}, [
		HexagonLayerProps.beforeId,
		HexagonLayerProps.data,

		HexagonLayerProps.elevationScale,
		HexagonLayerProps.extruded,
		HexagonLayerProps.coverage,
		HexagonLayerProps.autoHighlight,
		HexagonLayerProps.material,
		HexagonLayerProps.radius,
		HexagonLayerProps.transitions,
	]);

	// add/remove the memoized layer
	useEffect(() => {
		if (!mapHook.map || !hexagonLayer) return;
		initializedRef.current = true;
		deckGlHook.addLayer(hexagonLayer);

		return () => {
			deckGlHook.removeLayer(hexagonLayer);
			initializedRef.current = false;
		};
	}, [mapHook.map, hexagonLayer]);

	return <></>;
};

export default MlHexagonLayer;
