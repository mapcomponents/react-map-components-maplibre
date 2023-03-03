import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import useMap from '../../hooks/useMap';
import DeckGlContext from '../../contexts/DeckGlContext';
import { HexagonLayer, HexagonLayerProps } from '@deck.gl/aggregation-layers/typed';
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

	const DATA_URL = 'assets/3D/laerm_points.json';
	const deckGlHook = useDeckGl();
	const [noiseData, setNoiseData] = useState({
		type: '',
		features: [],
	});
	const getJsonData = () => {
		fetch(DATA_URL, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				setNoiseData(json);
			});
	};
	useEffect(() => {
		getJsonData();
	}, []);

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

			data: noiseData ? noiseData.features : [],
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
	}, [noiseData.features]);

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
			noiseData.features.length <= 0 ||
			(initializedRef.current && deckGlContext.deckGl && noiseData.features.length >= 0)
		)
			return;
		initializedRef.current = true;

		const hexagonLayer = new HexagonLayer({
			...deckGlLayerProps,
		} as unknown as HexagonLayerProps);
		deckGlHook.addLayer(hexagonLayer);

		return () => {
			hexagonLayer && deckGlHook.removeLayer(hexagonLayer);
			initializedRef.current = false;
		};
	}, [mapHook.map, deckGlContext.deckGl, props.mapId, deckGlLayerProps]);

	return <></>;
};

MlNoiseMap.defaultProps = {
	mapId: undefined,
};
export default MlNoiseMap;
