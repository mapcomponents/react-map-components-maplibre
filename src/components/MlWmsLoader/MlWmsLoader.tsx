import React, { useRef, useEffect, useContext, useCallback, useState, useMemo } from 'react';

import MapContext from '../../contexts/MapContext';
import { v4 as uuidv4 } from 'uuid';

import MlWmsLayer from '../MlWmsLayer/MlWmsLayer';
import MlMarker from '../MlMarker/MlMarker';
import useWms, { useWmsProps } from '../../hooks/useWms';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { LngLat } from 'maplibre-gl';
import MapLibreGlWrapper from '../MapLibreMap/lib/MapLibreGlWrapper';
import { Layer2, Layer3 } from 'wms-capabilities';
import { useWmsReturnType } from '../../hooks/useWms';

const originShift = (2 * Math.PI * 6378137) / 2.0;
const lngLatToMeters = function (lnglat: LngLat, accuracy = { enable: true, decimal: 1 }) {
	const lng = lnglat.lng;
	const lat = lnglat.lat;
	let x = (lng * originShift) / 180.0;
	let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360.0)) / (Math.PI / 180.0);
	y = (y * originShift) / 180.0;
	if (accuracy.enable) {
		x = Number(x.toFixed(accuracy.decimal));
		y = Number(y.toFixed(accuracy.decimal));
	}
	return [x, y];
};

export interface MlWmsLoaderProps {
	/**
	 * WMS URL
	 */
	url: string;
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId: string;
	/**
	 * URL parameters that will be used in the getCapabilities request
	 */
	urlParameters?: useWmsProps['urlParameters'];
	/**
	 * URL parameters that will be added when requesting WMS capabilities
	 */
	wmsUrlParameters?: { [key: string]: string };
	lngLat?: LngLat;
	idPrefix?: string;
}

export type LayerType = {
	visible: boolean;
	Name: string;
	Attribution?: { Title: string };
} & Omit<Layer2, 'Layer'> &
	Partial<Pick<Layer2, 'Layer'>>;
/**
 * Loads a WMS getCapabilities xml document and adds a MlWmsLayer component for each layer that is
 * offered by the WMS.
 *
 * TODO: EaseTo the extend offered by the WMS in a zoom level that is supported
 *
 * @component
 */
const MlWmsLoader = (props: MlWmsLoaderProps) => {
	// Use a useRef hook to reference the layer object to be able to access it later inside useEffect hooks
	const mapContext: MapContextType = useContext(MapContext);
	const { capabilities, error, setUrl, getFeatureInfoUrl, wmsUrl }: useWmsReturnType = useWms({
		urlParameters: props.urlParameters,
	});

	const initializedRef = useRef(false);
	const mapRef = useRef<MapLibreGlWrapper>();
	const componentId = useRef((props.idPrefix ? props.idPrefix : 'MlWmsLoader-') + uuidv4());
	const [layers, setLayers] = useState<Array<LayerType>>([]);

	const [featureInfoLngLat, setFeatureInfoLngLat] = useState<
		{ lng: number; lat: number } | undefined
	>();
	const [featureInfoContent, setFeatureInfoContent] = useState<string | undefined>(undefined);

	useEffect(() => {
		const _componentId = componentId.current;

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
		if (!initializedRef.current) return;

		setUrl(props.url);
	}, [props.url]);

	const attribution = useMemo(() => {
		return layers
			.filter((el) => el.visible && el?.Attribution?.Title)
			.map((el) => el?.Attribution?.Title)
			.filter((value, index, self) => self.indexOf(value) === index)
			.join(' ');
	}, [layers]);

	const getFeatureInfo = useCallback(
		(ev) => {
			if (!mapRef.current) return;
			setFeatureInfoLngLat(undefined);
			setFeatureInfoContent(undefined);
			const _bounds = mapRef.current.map.getBounds();
			const _sw = lngLatToMeters(_bounds._sw);
			const _ne = lngLatToMeters(_bounds._ne);
			const bbox = [_sw[0], _sw[1], _ne[0], _ne[1]];
			const _getFeatureInfoUrlParams = {
				REQUEST: 'GetFeatureInfo',

				BBOX: bbox.join(','),
				SERVICE: 'WMS',
				INFO_FORMAT:
					capabilities?.Capability?.Request?.GetFeatureInfo.Format.indexOf('text/html') !== -1
						? 'text/html'
						: 'text/plain',
				FEATURE_COUNT: '10',
				LAYERS: layers
					.map((layer: LayerType) => (layer.visible && layer.queryable ? layer.Title : undefined))
					.filter((n) => n),
				QUERY_LAYERS: layers
					.map((layer: LayerType) => (layer.visible && layer.queryable ? layer.Title : undefined))
					.filter((n) => n),
				WIDTH: mapRef.current?.map._container.clientWidth,
				HEIGHT: mapRef.current?.map._container.clientHeight,
				srs: 'EPSG:3857',
				CRS: 'EPSG:3857',
				version: '1.3.0',
				X: ev.point.x,
				Y: ev.point.y,
				I: ev.point.x,
				J: ev.point.y,
				buffer: '50',
			};

			let _gfiUrl: string | undefined = getFeatureInfoUrl;
			let _gfiUrlParts;
			if (_gfiUrl?.indexOf?.('?') !== -1) {
				_gfiUrlParts = props.url.split('?');
				_gfiUrl = _gfiUrlParts[0];
			}
			const _urlParamsFromUrl = new URLSearchParams(_gfiUrlParts?.[1]);

			const urlParamsObj = {
				...Object.fromEntries(_urlParamsFromUrl),
				..._getFeatureInfoUrlParams,
			};
			// create URLSearchParams object to assemble the URL Parameters
			// "as any" can be removed once the URLSearchParams ts spec is fixed
			const urlParams = new URLSearchParams(urlParamsObj as unknown as Record<string, string>);

			fetch(props.url + '?' + urlParams.toString())
				.then((res) => {
					if (!res.ok) {
						throw new Error('FeatureInfo could not be fetched');
					}
					return res.text();
				})
				.then((text) => {
					setFeatureInfoLngLat(ev.lngLat);
					setFeatureInfoContent(text);
				})
				.catch((error) => console.log(error));
		},
		[capabilities, getFeatureInfoUrl]
	);

	useEffect(() => {
		if (!mapRef.current) return;

		const _getFeatureInfo = getFeatureInfo;

		mapRef.current.on('click', _getFeatureInfo, componentId.current);
		return () => {
			mapRef.current?.map.off?.('click', _getFeatureInfo);
		};
	}, [getFeatureInfo]);

	useEffect(() => {
		if (!capabilities?.Service) return;

		if (capabilities?.Capability?.Layer?.CRS?.indexOf?.('EPSG:3857') === -1) {
			console.log(
				'MlWmsLoader (' + capabilities.Service.Title + '): No WGS 84/Pseudo-Mercator support'
			);
		} else {
			console.log(
				'MlWmsLoader (' + capabilities.Service.Title + '): WGS 84/Pseudo-Mercator supported'
			);

			let _LatLonBoundingBox: Array<number> = [];

			// collect aueriable Layer2 layers
			let _layers: LayerType[] = capabilities?.Capability?.Layer?.Layer.filter(
				(el) => el.CRS.length
			).map((layer: Layer2 & { Name: string }, idx: number) => {
				if (idx === 0) {
					_LatLonBoundingBox = layer.EX_GeographicBoundingBox;
				}
				return {
					visible: capabilities?.Capability?.Layer?.Layer?.length > 2 ? idx > 1 : true,
					Attribution: { Title: '' },
					...layer,
				};
			});

			// collect aueriable Layer3 layers
			capabilities?.Capability?.Layer?.Layer.forEach((el) => {
				const tmpLayers = el?.Layer?.filter((el) => el.CRS.length).map(
					(layer: Layer3, idx: number) => {
						if (idx === 0) {
							_LatLonBoundingBox = layer.EX_GeographicBoundingBox;
						}
						return {
							visible: false,
							Attribution: { Title: '' },
							...layer,
						};
					}
				);

				if (tmpLayers) {
					_layers = [..._layers, ...tmpLayers];
				}
			});

			setLayers(_layers);

			// zoom to extent of first layer
			if (mapRef.current && _LatLonBoundingBox.length > 3) {
				mapRef.current.map.fitBounds([
					[_LatLonBoundingBox[0], _LatLonBoundingBox[1]],
					[_LatLonBoundingBox[2], _LatLonBoundingBox[3]],
				]);
			}
		}
	}, [capabilities]);

	useEffect(() => {
		if (!mapContext?.mapExists?.(props.mapId) || initializedRef.current) return;
		// the MapLibre-gl instance (mapContext.map) is accessible here
		// initialize the layer and add it to the MapLibre-gl instance or do something else with it
		initializedRef.current = true;
		mapRef.current = mapContext.getMap(props.mapId);
		setUrl(props.url);
	}, [mapContext.mapIds, mapContext, props.mapId, props.url]);

	return (
		<>
			{error && <p>{error}</p>}
			<h3 key="title">{capabilities?.Service?.Title}</h3>
			<List dense key="layers">
				{wmsUrl &&
					layers?.map?.((layer, idx) => {
						return layer?.Name ? (
							<ListItem
								key={layer.Name + idx}
								secondaryAction={
									<IconButton
										edge="end"
										aria-label="toggle visibility"
										onClick={() => {
											const _layers: Array<LayerType> = [...layers];
											_layers[idx].visible = !_layers[idx].visible;
											setLayers([..._layers]);
										}}
									>
										{layers[idx].visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
									</IconButton>
								}
							>
								<ListItemText primary={layer?.Title} />
							</ListItem>
						) : (
							<></>
						);
					})}
			</List>
			{wmsUrl && layers?.length && (
				<MlWmsLayer
					key={componentId.current}
					url={wmsUrl}
					attribution={attribution}
					urlParameters={{
						...props.wmsUrlParameters,
						layers: layers
							?.filter?.((layer) => layer.visible)
							.map((el) => el.Name)
							.reverse()
							.join(','),
					}}
				/>
			)}

			<p key="description" style={{ fontSize: '.7em' }}>
				{capabilities?.Capability?.Layer?.['Abstract']}
			</p>

			{featureInfoLngLat && <MlMarker {...featureInfoLngLat} content={featureInfoContent} />}
		</>
	);
};

MlWmsLoader.defaultProps = {
	url: '',
	urlParameters: {
		SERVICE: 'WMS',
		VERSION: '1.3.0',
		REQUEST: 'GetCapabilities',
	},
	wmsUrlParameters: {
		TRANSPARENT: 'TRUE',
	},
};

export default MlWmsLoader;
