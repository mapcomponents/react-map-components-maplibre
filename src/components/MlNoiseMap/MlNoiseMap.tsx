import React, { useRef, useEffect, useContext } from 'react';
import useMap from '../../hooks/useMap';
import DeckGlContext from '../../contexts/DeckGlContext';
import hexa from '../../../public/assets/3D/hexa.json';
import { HexagonLayer } from '@deck.gl/aggregation-layers/typed';

export interface MlNoiseMapProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance to help specify the layer order
	 * This layer will be visually beneath the layer with the "insertBeforeLayer" id.
	 */
	insertBeforeLayer?: string;
}

const MlNoiseMap = (props: MlNoiseMapProps) => {
	const deckGlContext = useContext(DeckGlContext);
	const deckGlLayerProps = {
		id: 'deckgl-noise-layer',
		data: hexa,
		type: HexagonLayer,
		elevationScale: 0.3,
		extruded: true,
		autoHighlight: true,
		getPosition: (d: any) => {
			return d.coordinates;
		},
		pickable: true,
		radius: 16,
		upperPercentile: 100,
		material: {
			ambient: 0.8,
			diffuse: 0.5,
			shininess: 20,
			specularColor: [51, 51, 51],
		},
		transitions: {
			elevationScale: 1500,
		},
	};

	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const initializedRef = useRef(false);

	// add deckGl Layer
	useEffect(() => {
		if (
			!mapHook.map ||
			!deckGlContext.deckGl ||
			(deckGlContext.deckGl && mapHook.map && initializedRef.current)
		)
			return;

		mapHook.map.map.setCenter([7.132122000552613, 50.716405378037706]);
		initializedRef.current = true;

		deckGlContext.deckGl.setProps({
			layers: [
				new HexagonLayer({
					deckGlLayerProps,
				}),
			],
		});
	}, [mapHook.map]);

	return <></>;
};

MlNoiseMap.defaultProps = {
	mapId: undefined,
};
export default MlNoiseMap;
