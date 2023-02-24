import React, { useContext, useEffect, useMemo, useRef } from 'react';
import useMap from '../../hooks/useMap';
import DeckGlContext from '../../contexts/DeckGlContext';
import { HexagonLayer, HexagonLayerProps } from '@deck.gl/aggregation-layers/typed';
import SimpleDataContext from '../../contexts/SimpleDataContext';
import useDeckGl from '../../contexts/useDeckGl';

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
	const deckGlHook = useDeckGl();
	const simpleDataContext = useContext(SimpleDataContext) as DataType;
	const layerOpacity = 0.8;
	const specularColor: [number, number, number] = [51, 51, 51];
	const getColorRange: (layerOpacity: number) => [number, number, number, number][] = (
		layerOpacity: number
	) => [
		[1, 152, 189, Math.round(80 * layerOpacity)],
		[73, 227, 206, Math.round(90 * layerOpacity)],
		[216, 254, 181, Math.round(100 * layerOpacity)],
		[254, 237, 177, Math.round(110 * layerOpacity)],
		[254, 173, 84, Math.round(120 * layerOpacity)],
		[209, 55, 78, Math.round(150 * layerOpacity)],
	];
	const elevationRange: [number, number] = [30, 75];

	const deckGlLayerProps = useMemo(() => {
		return {
			id: 'deckgl-layer',

			data: simpleDataContext.data ? simpleDataContext.data.features : [],
			type: HexagonLayer,
			colorRange: getColorRange(layerOpacity),
			coverage: 0.9,
			elevationRange: elevationRange,
			elevationScale: 10,
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
				specularColor: specularColor,
			},
			transitions: {
				elevationScale: 1500,
			},
			getColorValue: (points: any[]) => {
				const elVal = points.reduce((acc, point) => {
					if (!point?.properties && point.source.properties)
						return acc < point.source.properties.dba ? point.source.properties.dba : acc;
					return acc < point.properties.dba ? point.properties.dba : acc;
				}, -Infinity);
				return Math.round(elVal);
			},
			getElevationValue: (points: any): number => {
				const elVal = points.reduce((acc: any, point: any) => {
					if (!point.properties && point.source.properties)
						return acc < point.source.properties.dba ? point.source.properties.dba : acc;
					return acc < point.properties.dba ? point.properties.dba : acc;
				}, -Infinity);
				return Math.round(elVal);
			},
			_filterData: null,
		};
	}, [simpleDataContext.data]);

	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});
	const initializedRef = useRef(false);

	// add deckGl Layer
	useEffect(() => {
		if (
			!mapHook.map ||
			(initializedRef.current && !deckGlContext.deckGl && !simpleDataContext.data)
		)
			return;
		initializedRef.current = true;

		mapHook.map.map.setCenter([7.132122000552613, 50.716405378037706]);
		const hexagonLayer = new HexagonLayer({ ...deckGlLayerProps } as unknown as HexagonLayerProps);
		deckGlHook.addLayer(hexagonLayer);
		//const deckHook = useDeckGl()
		//deckHook.addDeckGlLayer([
		//	new HexagonLayer({
		//				...deckGlLayerProps,
		//			}
		//])

		if (deckGlContext.deckGl) {
			//const deckGlHook = useDeckGl();
			//	deckGlHook.addDeckGlLayer();
			//	deckGlContext.deckGl.setProps({
			//		layers: [
			//			new HexagonLayer({
			//				...deckGlLayerProps,
			//			}),
			//		],
			//	});
		}

		return () => {
			deckGlHook.removeLayer(hexagonLayer);
		};
	}, [mapHook.map, deckGlContext.deckGl, props.mapId, deckGlLayerProps]);

	return <></>;
};

MlNoiseMap.defaultProps = {
	mapId: undefined,
};
export default MlNoiseMap;
