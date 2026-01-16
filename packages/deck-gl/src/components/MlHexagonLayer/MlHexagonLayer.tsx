import { useEffect, useMemo } from 'react';
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
	elevationRange: [30, 75],
	elevationScale: 1,
	extruded: true,
	coverage: 0.9,
	autoHighlight: false,
	material: { ambient: 0.6, diffuse: 0.5, shininess: 10 },
	radius: 16,
	transitions: { elevationScale: 1500 },
	_filterData: null,
	colorRange: [
		[1, 152, 189, 125],
		[73, 227, 206, 150],
		[216, 254, 181, 175],
		[254, 237, 177, 200],
		[254, 173, 84, 225],
		[209, 55, 78, 255],
	],
};

const MlHexagonLayer = (props: MlHexagonMapProps) => {
	const deckGlHook = useDeckGl();

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	props = {
		...defaultProps,
		...props,
	};

	const { mapId, ...HexagonLayerProps } = props;

	const mapHook = useMap({
		mapId: mapId,
		waitForLayer: HexagonLayerProps.beforeId,
	});

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
		deckGlHook.addLayer(hexagonLayer);

		return () => {
			deckGlHook.removeLayer(hexagonLayer);
		};
	}, [mapHook.map, hexagonLayer]);

	return <></>;
};

export default MlHexagonLayer;
