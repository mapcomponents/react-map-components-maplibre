import React, { useRef, useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import useLayer from '../../hooks/useLayer';
import useMap from '../../hooks/useMap';
import { SymbolLayerSpecification } from 'maplibre-gl';
import { Feature, FeatureCollection } from 'geojson';

export interface MlImageMarkerLayerProps {
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
	options?: {
		source?: { type?: string | undefined; data: Feature | FeatureCollection | undefined };
		layout?: SymbolLayerSpecification['layout'];
		paint?: SymbolLayerSpecification['paint'];
	};
}

const MlImageMarkerLayer = (props: MlImageMarkerLayerProps) => {
	const mapHook = useMap({
		mapId: props.mapId,
		waitForLayer: props.insertBeforeLayer,
	});

	const [imageId, setImageId] = useState<string>();
	const imageIdRef = useRef(props.imageId || 'img_' + uuidv4());
	const layerId = useRef(props.layerId || 'MlImageMarkerLayer-' + mapHook.componentId);

	useLayer({
		geojson: props.options?.source?.data,
		layerId: layerId.current,
		options: {
			type: 'symbol',
			layout: {
				...props.options?.layout,
				'icon-image': imageId || imageIdRef.current,
			},
			paint: {
				...props.options?.paint,
			},
		},
	});

	const createImage = (mapHook: ReturnType<typeof useMap>, props: MlImageMarkerLayerProps) => {
		if (!mapHook.map) {
			return;
		}

		if (props.imgSrc && !mapHook.map.map.hasImage(imageIdRef.current)) {
			mapHook.map.map.loadImage(props.imgSrc).then(function (res) {
				if (!res?.data){
					console.log('image ' + props.imgSrc + 'could not be loaded');
					return;
				}

				if (!mapHook.map || mapHook.map.map.hasImage(imageIdRef.current)) return;

				mapHook.map.addImage(
					imageIdRef.current,
					res.data as unknown as ImageData,
					mapHook.componentId
				);

				setImageId(imageIdRef.current);
			});
		}
	};

	useEffect(() => {
		if (!mapHook.map) return;

		if (props.imgSrc) {
			createImage(mapHook, props);
		}
	}, [props, mapHook]);

	return <></>;
};

export default MlImageMarkerLayer;
