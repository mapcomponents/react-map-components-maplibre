import React, { useRef, useEffect } from 'react';
import useMap from '../useMap';
import {
	LngLatLike,
	Popup,
	MapEventType,
} from 'maplibre-gl';
import { Feature } from 'geojson';

export interface LayerHoverPopupProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * Id of an existing layer in the mapLibre instance this event will be registered to
	 */
	layerId?: string;
	getPopupContent: (feature: Feature) => string;
}

/**
 * useLayerHoverPopup hook registers a mouseenter event to display feature properties in a MapLibre popup if a feature on the configured layer is hovered
 *
 */
const LayerHoverPopup = (props: LayerHoverPopupProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.layerId,
	});
	const popup = useRef(
		new Popup({
			closeButton: false,
			closeOnClick: true,
		})
	);

	useEffect(() => {
		if (!mapHook.map || !props.layerId) return;
		mapHook.map.on(
			'mouseenter',
			props.layerId,
			(
				e: MapEventType & {
					features?: ({[key:string]:string} & { geometry:{coordinates:[number,number]}})[] | undefined;
					lngLat: { lng: number; lat: number };
				}
			) => {
				if (!mapHook.map) return;
				// Change the cursor style as a UI indicator.

				const coordinates = e?.features?.[0].geometry.coordinates.slice();
				//const description = e.features[0].properties.desc;
				let content = '';
				if (e?.features?.[0] && typeof props.getPopupContent === 'function') {
					content = props.getPopupContent(e.features[0] as unknown as Feature);
				}

				if (coordinates?.[0]) {
					// Ensure that if the map is zoomed out such that multiple
					// copies of the feature are visible, the popup appears
					// over the copy being pointed to.
					while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
						coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
					}

					// Populate the popup and set its coordinates

					// based on the feature found.
					popup.current.setLngLat(coordinates as LngLatLike).setHTML(content).addTo(mapHook.map.map);
				}
			},
			mapHook.componentId
		);
	}, [mapHook.map]);

	return <></>;
};

LayerHoverPopup.defaultProps = {
	mapId: undefined,
};
export default LayerHoverPopup;
