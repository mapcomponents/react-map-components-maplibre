import React, { useRef, useEffect, useContext, useMemo } from 'react';
import useMap from '../../hooks/useMap';
import DeckGlContext from '../../contexts/DeckGlContext';
import { HexagonLayer } from '@deck.gl/aggregation-layers/typed';
import SimpleDataContext from '../../contexts/SimpleDataContext';

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

	interface DataType {
		data: {
			features: [object];
		};
	}
	const simpleDataContext = useContext(SimpleDataContext) as DataType;
	const deckGlLayerProps = useMemo(() => {
		return {
			id: props.mapId,

			data: simpleDataContext.data ? simpleDataContext.data.features : [],
			type: HexagonLayer,
			elevationScale: 0.3,
			extruded: true,
			autoHighlight: true,
			getPosition: (d: any) => {
				return d.geometry.coordinates;
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
	}, [simpleDataContext.data]);

	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const initializedRef = useRef(false);

	// add deckGl Layer
	useEffect(() => {
		if (!mapHook.map || (initializedRef.current && !deckGlContext.deckGl)) return;
		initializedRef.current = true;

		mapHook.map.map.setCenter([7.132122000552613, 50.716405378037706]);

		if (deckGlContext.deckGl) {
			deckGlContext.deckGl.setProps({
				layers: [
					new HexagonLayer({
						deckGlLayerProps,
					}),
				],
			});
		}

		return () => {
			// cleanup
		};
	}, [mapHook.map, deckGlContext.deckGl, props.mapId]);

	return <></>;
};

MlNoiseMap.defaultProps = {
	mapId: undefined,
};
export default MlNoiseMap;
