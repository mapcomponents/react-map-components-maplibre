import React, {  useEffect,  useCallback, useState, useMemo } from 'react';


import MlWmsLayer from '../MlWmsLayer/MlWmsLayer';
import MlMarker from '../MlMarker/MlMarker';
import useWms, { useWmsProps } from '../../hooks/useWms';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { LngLat,  MapMouseEvent } from 'maplibre-gl';
import { Layer2, Layer3 } from 'wms-capabilities';
import { useWmsReturnType } from '../../hooks/useWms';
import useMap from '../../hooks/useMap';
import { Box, Checkbox, ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

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
	const { capabilities, error, setUrl, getFeatureInfoUrl, wmsUrl }: useWmsReturnType = useWms({
		urlParameters: props.urlParameters,
	});
	const [open, setOpen] = useState(false);
	const [visible, setVisible] = useState(true);

	const mapHook = useMap({mapId:props?.mapId});
	const [layers, setLayers] = useState<Array<LayerType>>([]);

	const [featureInfoLngLat, setFeatureInfoLngLat] = useState<
		{ lng: number; lat: number } | undefined
	>();
	const [featureInfoContent, setFeatureInfoContent] = useState<string | undefined>(undefined);

	useEffect(() => {

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
		// eslint-disable-next-line @typescript-eslint/ban-types
		(ev:(MapMouseEvent & Object)) => {
			if (!mapHook.map) return;
			setFeatureInfoLngLat(undefined);
			setFeatureInfoContent(undefined);
			const _bounds = mapHook.map.getBounds();
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
					.map((layer: LayerType) => (layer.visible && layer.queryable ? layer.Name : undefined))
					.filter((n) => n),
				QUERY_LAYERS: layers
					.map((layer: LayerType) => (layer.visible && layer.queryable ? layer.Name : undefined))
					.filter((n) => n),
				WIDTH: mapHook?.map._container.clientWidth,
				HEIGHT: mapHook?.map._container.clientHeight,
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
		[capabilities, getFeatureInfoUrl, props, mapHook, layers]
	);

	useEffect(() => {
		if (!mapHook.map) return;

		const _getFeatureInfo = getFeatureInfo;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: ts appears not to consider overloads
		mapHook.map.map.on('click', _getFeatureInfo);
		return () => {
			mapHook.map?.map.off?.('click', _getFeatureInfo);
		};
	}, [getFeatureInfo, mapHook.map]);

	useEffect(() => {
		if (!capabilities?.Service) return;

		if (
			capabilities?.Capability?.Layer?.CRS?.indexOf?.('EPSG:3857') === -1 &&
			capabilities?.Capability?.Layer?.CRS?.indexOf?.('CRS:84') === -1
		) {
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
				(el) => !el.Layer?.length
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
			if (mapHook?.map && _LatLonBoundingBox.length > 3) {
				mapHook?.map.fitBounds([
					[_LatLonBoundingBox[0], _LatLonBoundingBox[1]],
					[_LatLonBoundingBox[2], _LatLonBoundingBox[3]],
				]);
			}
		}
	}, [capabilities, mapHook.map]);

	useEffect(() => {
		setUrl(props.url);
	}, [props.url]);

	return (
		<>
			{error && <p>{error}</p>}
			{wmsUrl && (
				<>
					<ListItem
						secondaryAction={
							<IconButton
								sx={{ padding: '4px', marginTop: '-3px' }}
								edge="end"
								aria-label="open"
								onClick={() => setOpen(!open)}
							>
								{open ? <ExpandLess /> : <ExpandMore />}
							</IconButton>
						}
						sx={{
							paddingRight: 0,
							paddingLeft: 0,
							paddingTop: 0,
							paddingBottom: '4px',
						}}
					>
						<ListItemIcon sx={{ minWidth: '30px' }}>
							<Checkbox
								sx={{ padding: 0 }}
								checked={visible}
								onClick={() => {
									setVisible((val) => !val);
								}}
							/>
						</ListItemIcon>
						<ListItemText primary={capabilities?.Service?.Title} />
					</ListItem>
					<Box sx={{ display: open ? 'block' : 'none' }}>
						<List dense component="div" disablePadding sx={{ paddingLeft: '18px' }}>
							{wmsUrl &&
								layers?.map?.((layer, idx) => {
									return layer?.Name ? (
										<ListItem key={layer.Name + idx}>
											<ListItemIcon sx={{ minWidth: '30px' }}>
												<Checkbox
													checked={layer.visible}
													sx={{ padding: 0 }}
													onClick={() => {
														const _layers: Array<LayerType> = [...layers];
														_layers[idx].visible = !_layers[idx].visible;
														setLayers([..._layers]);
													}}
												/>
											</ListItemIcon>
											<ListItemText primary={layer?.Title} />
										</ListItem>
									) : (
										<></>
									);
								})}
						</List>
						{wmsUrl && layers?.length && (
							<MlWmsLayer
								key={mapHook.componentId}
								url={wmsUrl}
								attribution={attribution}
								visible={visible}
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
					</Box>
				</>
			)}
		</>
	);
};
//<p key="description" style={{ fontSize: '.7em' }}>
//	{capabilities?.Capability?.Layer?.['Abstract']}
//</p>
//{featureInfoLngLat && <MlMarker {...featureInfoLngLat} content={featureInfoContent} />}

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
