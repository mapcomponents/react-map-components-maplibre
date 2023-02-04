import React, { useRef, useEffect, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import MapContext from '../../contexts/MapContext';
import { v4 as uuidv4 } from 'uuid';
import useMapState from '../../hooks/useMapState';
import MapLibreGlWrapper from '../MapLibreMap/lib/MapLibreGlWrapper';

export interface MapState {
	lat?: number;
	lng?: number;
	zoom?: number;
	bearing?: number;
	pitch?: number;
	layers?: {
		visible: boolean;
		id: string;
	}[];
}

const getCurrentUrlParameters = (): MapState => {
	const currentParams = Object.fromEntries(new URLSearchParams(window.location.search));
	currentParams.layers = JSON.parse(currentParams?.layers ? currentParams.layers : '[]');

	return currentParams;
};

const initialUrlParams = getCurrentUrlParameters();

/**
 * TODO: Add short & useful description
 *
 * @param {object} props
 * @param {string} props.mapId Id of the target MapLibre instance in mapContext
 *
 * @component
 */

export interface MlShareMapStateProps {
	//
	mapId?: string;
	idPrefix?: string;
	active?: boolean;
}

export interface LayerStatesInterface {
	//
	[key: string]: boolean;
}

const MlShareMapState = (props: MlShareMapStateProps) => {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	const mapContext = useContext(MapContext);
	const initializedRef = useRef(false);
	const mapRef = useRef<MapLibreGlWrapper | undefined>();
	const [map, setMap] = useState<MapLibreGlWrapper | undefined>(undefined);
	const layersFromUrlParamsRef = useRef({});
	const componentId = useRef((props.idPrefix ? props.idPrefix : 'MlShareMapState-') + uuidv4());
	const mapState = useMapState({
		watch: {
			viewport: false,
			layers: true,
			sources: false,
		},
		filter: {
			includeBaseLayers: false,
		},
	});

	const allStatesRestoredRef = useRef(false);
	const layerStatesRestored = useRef<LayerStatesInterface>();
	const restoredStatesRef = useRef({
		viewport: {
			center: false,
			bearing: false,
			pitch: false,
			zoom: false,
		},
		layers: {
			...layersFromUrlParamsRef,
		},
	});

	// initial URL-Params
	const mapStateRef = useRef<MapState>({});

	const refreshUrlParameters = useCallback(() => {
		if (!props.active) return;

		const mapLayers = [];
		for (const x in mapState.layers) {
			mapLayers.push({
				id: mapState.layers[x]?.id,
				type: mapState.layers[x]?.type,
				visible: mapState.layers[x]?.visible,
			});
		}
		refreshMapState();
		const urlParams = new URLSearchParams({
			...(getCurrentUrlParameters() as Record<string, string>),
			...(mapStateRef.current as Record<string, string>),
			layers: JSON.stringify(mapLayers),
		});
		JSON.parse(Object.fromEntries(urlParams).layers).forEach((el: { id: number }) => {
			// is iD a number?
			layersFromUrlParamsRef.current[el.id] = false;
		});

		const currentParams = new URLSearchParams(window.location.search);
		if (urlParams.toString() !== currentParams.toString()) {
			window.history.pushState(
				{ ...mapStateRef.current },
				document.title,
				'?' + urlParams.toString()
			);
		}
	}, [mapState.layers, props.active]);

	useEffect(() => {
		const _componentId = componentId.current;

		mapStateRef.current = getCurrentUrlParameters();

		return () => {
			// This is the cleanup function, it is called when this react component is removed from react-dom
			// try to remove anything this component has added to the MapLibre-gl instance
			// e.g.: remove the layer
			// mapContext.getMap(props.mapId).removeLayer(layerRef.current);
			// check for the existence of map.style before calling getLayer or getSource

			if (mapRef.current) {
				mapRef.current.cleanup(_componentId);
				mapRef.current = undefined;
			}
			initializedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (!mapRef.current) return;

		refreshUrlParameters();
	}, [refreshUrlParameters]);

	useEffect(() => {
		if (!mapRef.current) return;

		const _refreshUrlParameters = refreshUrlParameters;

		mapRef.current.on('moveend', _refreshUrlParameters, componentId.current);

		return () => {
			mapRef.current?.map.off('moveend', _refreshUrlParameters);
		};
	}, [refreshUrlParameters, map]);

	useEffect(() => {
		if (!mapContext?.mapExists?.(props.mapId) || initializedRef.current) return;
		// the MapLibre-gl instance (mapContext.getMap(props.mapId)) is accessible here
		// initialize the layer and add it to the MapLibre-gl instance or do something else with it
		initializedRef.current = true;
		mapRef.current = mapContext.getMap(props.mapId);
		setMap(mapRef.current);
		if (mapStateRef.current.lat && mapStateRef.current.lng) {
			restoreViewportState();
		}
	}, [mapContext.mapIds, mapContext, props.mapId, props.active]);

	useEffect(() => {
		if (!mapState?.layers?.length) return;

		if (typeof layerStatesRestored.current === 'undefined') {
			layerStatesRestored.current = undefined;
			initialUrlParams?.layers?.forEach((layer: { id: string }) => {
				if (layerStatesRestored.current?.[layer.id]) {
					layerStatesRestored.current[layer.id] = false;
				}
			});
		}

		for (const key in layerStatesRestored.current) {
			let _allDone = true;
			if (layerStatesRestored.current[key] === false) {
				_allDone = false;
			}
			if (_allDone) {
				return;
			}
		}

		if (initialUrlParams.layers) {
			initialUrlParams.layers.forEach((layer) => {
				if (
					mapRef.current?.map.getLayer(layer.id) && //number oder str?
					layerStatesRestored.current?.[layer.id] === false
				) {
					layerStatesRestored.current[layer.id] = true;
					mapRef.current.map
						?.getLayer(layer.id)
						?.setLayoutProperty('visibility', layer.visible ? 'visible' : 'none');
				}
			});
		}
	}, [mapState.layers, props.mapId, props.active]);

	useEffect(() => {
		if (!map) return;
		if (!mapState.layers) return;

		if (!props.active) {
			map.cleanup(componentId.current);
		}
	}, [props.active, map, mapState.layers]);

	//ist .current?.map. richtig?

	const refreshMapState = () => {
		mapStateRef.current.lat = mapRef.current?.map.getCenter().lat;
		mapStateRef.current.lng = mapRef.current?.map.getCenter().lng;
		mapStateRef.current.zoom = mapRef.current?.map.getZoom();
		mapStateRef.current.bearing = mapRef.current?.map.getBearing();
		mapStateRef.current.pitch = mapRef.current?.map.getPitch();
	};

	const restoreViewportState = () => {
		if (!restoredStatesRef.current.viewport.center) {
			restoredStatesRef.current.viewport.center = true;

			if (mapStateRef.current.lng && mapStateRef.current.lat) {
				mapRef.current?.map.setCenter([mapStateRef.current.lng, mapStateRef.current.lat]);
			}
			if (mapStateRef.current.zoom) {
				mapRef.current?.map.setZoom(mapStateRef.current.zoom);
			}
			if (mapStateRef.current.bearing) {
				mapRef.current?.map.setBearing(mapStateRef.current.bearing);
			}
			if (mapStateRef.current.pitch) {
				mapRef.current?.map.setPitch(mapStateRef.current.pitch);
			}
		}

		allStatesRestoredRef.current = true;
	};

	window.onpopstate = (event) => {
		if (event.state && event.state.lng && event.state.lat && event.state.zoom) {
			mapRef.current?.map.easeTo({
				// so möglich?
				zoom: event.state.zoom,
				center: [event.state.lng, event.state.lat],
			});
		}
	};

	return <></>;
};;

MlShareMapState.defaultProps = {
	mapId: undefined,
};

MlShareMapState.propTypes = {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId: PropTypes.string,
};
export default MlShareMapState;
