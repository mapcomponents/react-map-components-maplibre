import React, { useRef, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import useLayer from '../../hooks/useLayer';
import useMap from '../../hooks/useMap';

interface MlImageMarkerLayerProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	/**
	 * The layerId of an existing layer this layer should be rendered visually beneath
	 * https://maplibre.org/maplibre-gl-js-docs/api/map/#map#addlayer - see "beforeId" property
	 */
	insertBeforeLayer?: string;
	/**
	 * Id of the layer that will be added by this component to the maplibre-gl instance
	 */
	layerId?: string;
	/**
	 * Id of the image that will be added by this component to the maplibre-gl instance
	 */
	imageId?: string;
	/**
	 * Path or URL to a supported raster image
	 */
	imgSrc?: string;
	/**
	 * Javascript object that is passed the addLayer command as first parameter.
	 */
	options?: any;
}

const MlImageMarkerLayer = (props: MlImageMarkerLayerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const imageIdRef = useRef(props.imageId || 'img_' + uuidv4());
	const layerId = useRef(props.layerId || 'MlImageMarkerLayer-' + mapHook.componentId);

	useLayer({
		geojson: props.options.source.data,
		layerId: layerId.current,
		options: {
			type: 'symbol',
			layout: {
				...props.options.layout,
				'icon-image': imageIdRef.current,
			},
			paint: {
				...props.options.paint,
			},
		},
	});

	const createImage = (
		mapHook: ReturnType<typeof useMap>,
		props: MlImageMarkerLayerProps,
		callback?: () => void
	) => {
		if (!mapHook.map) {
			return;
		}

		if (props.imgSrc && !mapHook.map.map.hasImage(imageIdRef.current)) {
			mapHook.map.map.loadImage(props.imgSrc, function (error, image) {
				if (error) throw error;

				if (!mapHook.map || mapHook.map.map.hasImage(imageIdRef.current)) return;

				mapHook.map.addImage(
					imageIdRef.current,
					image as unknown as ImageData,
					mapHook.componentId
				);

				if (typeof callback === 'function') {
					callback();
				}
			});
		} else {
			if (typeof callback === 'function') {
				callback();
			}
		}
	};

	useEffect(() => {
		if (!mapHook.map || mapHook.map?.map.getLayer(layerId.current)) return;

		if (props.imgSrc) {
			createImage(mapHook, props);
		}
	}, [props, mapHook]);

	return <></>;
};

export default MlImageMarkerLayer;
