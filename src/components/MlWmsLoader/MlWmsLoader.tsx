import React, { useEffect, useCallback, useState, useMemo } from 'react';

import MlWmsLayer from '../MlWmsLayer/MlWmsLayer';
import MlMarker from '../MlMarker/MlMarker';
import useWms, { useWmsProps } from '../../hooks/useWms';

import InfoIcon from '@mui/icons-material/Info';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { LngLat, MapMouseEvent } from 'maplibre-gl';
import { Layer2, Layer3 } from 'wms-capabilities';
import { useWmsReturnType } from '../../hooks/useWms';
import useMap from '../../hooks/useMap';
import { Box, Checkbox, ListItemIcon, Snackbar } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../../ui_components/ConfirmDialog';

import * as turf from '@turf/turf';
import SortableContainer from '../../ui_components/LayerList/util/SortableContainer';

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

export interface WmsConfig {
	/**
	 * The URL to use for the getFeatureInfo request
	 */
	getFeatureInfoUrl: useWmsReturnType['getFeatureInfoUrl'];
	/**
	 * The URL of the WMS service
	 */
	wmsUrl: useWmsReturnType['wmsUrl'];
	/**
	 * The layers to display on the map
	 */
	layers: LayerType[];
	/**
	 * If true, the WMS layer is visible
	 */
	visible: boolean;
	/**
	 * If true, the WMS layer is open
	 */
	open: boolean;
	/**
	 * The name of the WMS layer
	 */
	name?: string;
}

export interface MlWmsLoaderProps {
	/**
	 * WMS URL
	 */
	url: string;
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	layerId?: string;
	insertBeforeLayer?: string;
	/**
	 * URL parameters that will be used in the getCapabilities request
	 */
	urlParameters?: useWmsProps['urlParameters'];
	/**
	 * URL parameters that will be added when requesting WMS capabilities
	 */
	wmsUrlParameters?: { [key: string]: string };
	/**
	 * If true, zooms to the extent of the WMS layer after loading the getCapabilities response
	 */
	zoomToExtent?: boolean;
	/**
	 * The name of the ListItem element representing the WmsLoader
	 */
	name?: string;
	/**
	 * If true, enables the feature info functionality
	 */
	featureInfoEnabled?: boolean;
	/**
	 * If true, the feature info functionality is active
	 */
	featureInfoActive?: boolean;
	/**
	 * A function to set the feature info active state
	 */
	setFeatureInfoActive?: (val: boolean | ((current: boolean) => boolean)) => void;
	/**
	 * The WMS configuration object
	 */
	config?: WmsConfig;
	/**
	 * A function to handle changes to the WMS configuration
	 */
	onConfigChange?: (config: WmsConfig | false) => void;
	/**
	 * A function to update a LayerType config array that is passed to this component at props.config.layers
	 */
	setLayers?: (layers: LayerType[]) => void;
	/**
	 * If true, shows the delete button for the WMSLoader
	 */
	showDeleteButton?: boolean;
	/**
	 * Custom buttons to display for the WMSLoader
	 */
	buttons?: JSX.Element;
	sortable?: boolean;
}

export type LayerType = {
	visible: boolean;
	Name: string;
	Attribution?: { Title: string };
} & Omit<Layer2, 'Layer' | 'CRS'> &
	Partial<Pick<Layer2, 'Layer'>>;
/**
 * Loads a WMS getCapabilities xml document and adds a MlWmsLayer component for each layer that is
 * offered by the WMS.
 *
 * @component
 */
const MlWmsLoader = (props: MlWmsLoaderProps) => {

	const {
		capabilities: _capabilities,
		error,
		setUrl,
		getFeatureInfoUrl: _getFeatureInfoUrl,
		wmsUrl: _wmsUrl,
	}: useWmsReturnType = useWms({
		urlParameters: props.urlParameters,
	});
	const [open, setOpen] = useState(props?.config?.open || false);
	const [visible, setVisible] = useState<boolean>(props?.config?.visible || true);
	const [showDeletionConfirmationDialog, setShowDeletionConfirmationDialog] = useState(false);

	const mapHook = useMap({ mapId: props?.mapId });
	const [_layers, _setLayers] = useState<Array<LayerType>>(props?.config?.layers || []);

	const [featureInfoEventsEnabled, setFeatureInfoEventsEnabled] = useState<boolean>(false);
	const [featureInfoLngLat, setFeatureInfoLngLat] = useState<
		{ lng: number; lat: number } | undefined
	>();
	const [featureInfoContent, setFeatureInfoContent] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (props.config) return;
		setUrl(props.url);
	}, [props.url]);

	const wmsUrl = useMemo(() => {
		return props?.config?.wmsUrl || _wmsUrl;
	}, [props?.config?.wmsUrl, _wmsUrl]);

	const getFeatureInfoUrl = useMemo(() => {
		return props?.config?.getFeatureInfoUrl || _getFeatureInfoUrl;
	}, [props?.config?.getFeatureInfoUrl, _getFeatureInfoUrl]);

	const capabilities = useMemo(() => {
		return _capabilities;
	}, [_capabilities]);

	const name = useMemo(() => {
		return props?.name || props?.config?.name || capabilities?.Service?.Title;
	}, [props?.name, props?.config?.name, capabilities?.Service?.Title]);

	const layers = useMemo(() => {
		if (!props?.setLayers) return _layers;
		return props?.config?.layers || _layers;
	}, [props?.config?.layers, _layers]);

	const setLayers = useMemo(() => {
		return props?.setLayers || _setLayers;
	}, [props?.setLayers, _setLayers]);

	useEffect(() => {
		props?.onConfigChange?.({
			layers,
			//capabilities,
			getFeatureInfoUrl,
			wmsUrl,
			visible,
			open,
			name,
		});
	}, [layers, capabilities, getFeatureInfoUrl, wmsUrl, visible, open, name]);

	const attribution = useMemo(() => {
		return layers
			.filter((el: LayerType) => el.visible && el?.Attribution?.Title)
			.map((el: LayerType) => el?.Attribution?.Title)
			.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index)
			.join(' ');
	}, [layers]);

	const resetFeatureInfo = function () {
		setFeatureInfoLngLat(undefined);
		setFeatureInfoContent(undefined);
	};

	const getFeatureInfo = useCallback(
		(ev: MapMouseEvent & unknown) => {
			if (!mapHook.map) return;
			resetFeatureInfo();
			const unprojected = mapHook.map.unproject([ev.point.x, ev.point.y]);
			const point = turf.point([unprojected.lng, unprojected.lat]);
			const buffered = turf.buffer(point, 50, { units: 'meters' });
			const _bbox = buffered && turf.bbox(buffered);
			const _sw = _bbox && lngLatToMeters({ lng: _bbox[0], lat: _bbox[1] } as LngLat);
			const _ne = _bbox && lngLatToMeters({ lng: _bbox[2], lat: _bbox[3] } as LngLat);
			const bbox = _sw && _ne && [_sw[0], _sw[1], _ne[0], _ne[1]];
			const _getFeatureInfoUrlParams = {
				REQUEST: 'GetFeatureInfo',

				BBOX: bbox?.join(','),
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
				WIDTH: 100,
				HEIGHT: 100,
				srs: 'EPSG:3857',
				CRS: 'EPSG:3857',
				version: '1.3.0',
				X: 50,
				Y: 50,
				I: 50,
				J: 50,
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

	const _featureInfoEventsEnabled = useMemo(() => {
		return (
			((typeof props?.featureInfoActive !== 'undefined' && props.featureInfoActive) ||
				featureInfoEventsEnabled) &&
			layers?.some((layer) => layer.visible && layer.queryable) &&
			!!mapHook.map
		);
	}, [props?.featureInfoActive, featureInfoEventsEnabled, layers, mapHook.map]);

	useEffect(() => {
		if (!_featureInfoEventsEnabled) {
			resetFeatureInfo();

			return;
		}

		const _getFeatureInfo = getFeatureInfo;

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: ts appears not to consider overloads
		mapHook.map.map.on('click', _getFeatureInfo);
		return () => {
			mapHook.map?.map.off?.('click', _getFeatureInfo);
		};
	}, [_featureInfoEventsEnabled, getFeatureInfo, mapHook.map]);

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

			// collect queriable Layer2 layers
			let _layers: LayerType[] = capabilities?.Capability?.Layer?.Layer.filter(
				(el) => !el.Layer?.length
			).map((layer: Layer2 & { Name: string }, idx: number) => {
				if (idx === 0) {
					_LatLonBoundingBox = layer.EX_GeographicBoundingBox;
				}
				return {
					visible: capabilities?.Capability?.Layer?.Layer?.length > 2 ? idx > 1 : true,
					Attribution: { Title: '' },
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					...(({ CRS, ..._layer }) => _layer)(layer),
				};
			});

			// collect queriable Layer3 layers
			capabilities?.Capability?.Layer?.Layer.forEach((el) => {
				const tmpLayers = el?.Layer?.filter((el) => el.CRS.length).map(
					(layer: Layer3, idx: number) => {
						if (idx === 0) {
							_LatLonBoundingBox = layer.EX_GeographicBoundingBox;
						}
						return {
							visible: false,
							Attribution: { Title: '' },
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							...(({ CRS, ..._layer }) => _layer)(layer),
						};
					}
				);

				if (tmpLayers) {
					_layers = [..._layers, ...tmpLayers];
				}
			});

			setLayers(_layers);

			// zoom to extent of first layer
			if (props.zoomToExtent && mapHook?.map && _LatLonBoundingBox.length > 3) {
				mapHook?.map.fitBounds([
					[_LatLonBoundingBox[0], _LatLonBoundingBox[1]],
					[_LatLonBoundingBox[2], _LatLonBoundingBox[3]],
				]);
			}
		}
	}, [capabilities, mapHook.map]);
	const listContent = (
		<ListItem
			secondaryAction={
				<>
					{props.buttons}
					{props.featureInfoEnabled && (
						<IconButton
							sx={{
								padding: '4px',
								marginTop: '-3px',
								marginRight: '4px',
								background: (theme) => {
									if (!layers?.some((layer) => layer.visible && layer.queryable)) return 'initial';
									if (_featureInfoEventsEnabled) return theme.palette.info.light;
									return theme.palette.grey[300];
								},
							}}
							aria-label="featureinfo"
							onClick={() => {
								if (typeof props?.setFeatureInfoActive === 'function') {
									props.setFeatureInfoActive((current: boolean) => !current);
								} else {
									setFeatureInfoEventsEnabled((current: boolean) => !current);
								}
							}}
							disabled={!layers?.some((layer) => layer.visible && layer.queryable)}
						>
							<InfoIcon />
						</IconButton>
					)}
					<IconButton
						edge={props.showDeleteButton ? false : 'end'}
						sx={{
							padding: '4px',
							marginTop: '-3px',
							...(props.showDeleteButton ? { marginRight: '4px' } : {}),
						}}
						aria-label="open"
						onClick={() => setOpen((current) => !current)}
					>
						{open ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
					{props.showDeleteButton && (
						<>
							<IconButton
								aria-label="delete"
								edge="end"
								onClick={() => {
									if (typeof props.onConfigChange === 'function') {
										setShowDeletionConfirmationDialog(true);
									}
								}}
								sx={{ padding: '4px', marginTop: '-3px' }}
							>
								<DeleteIcon />
							</IconButton>

							{showDeletionConfirmationDialog && (
								<ConfirmDialog
									open={showDeletionConfirmationDialog}
									onConfirm={() => {
										if (typeof props.onConfigChange === 'function') {
											props.onConfigChange(false);
										}
									}}
									onCancel={() => {
										setShowDeletionConfirmationDialog(false);
									}}
									title="Delete layer"
									text="Are you sure you want to delete this layer?"
								/>
							)}
						</>
					)}
				</>
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
			<ListItemText primary={name} variant="layerlist" />
		</ListItem>
	);
	return (
		<>
			{error && (
				<Snackbar>
					<Box>{error}</Box>
				</Snackbar>
			)}
			{wmsUrl && (
				<>
					{props.layerId && props.sortable && (
						<SortableContainer layerId={props.layerId}>{listContent}</SortableContainer>
					)}
					{props.layerId && !props.sortable && (
						listContent
					)}
					<Box sx={{ display: open ? 'block' : 'none' }}>
						<List dense component="div" disablePadding sx={{ paddingLeft: '18px' }}>
							{wmsUrl &&
								layers?.map?.((layer, idx) => {
									return layer?.Name ? (
										<ListItem
											key={layer.Name + idx}
											secondaryAction={<>{layer?.queryable && <InfoIcon />}</>}
										>
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
											<ListItemText primary={layer?.Title} variant="layerlist" />
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
								insertBeforeLayer={props?.insertBeforeLayer}
							/>
						)}
					</Box>

					{props.featureInfoEnabled && featureInfoLngLat && (
						<MlMarker {...featureInfoLngLat} content={featureInfoContent} />
					)}
				</>
			)}
		</>
	);
};
//<p key="description" style={{ fontSize: '.7em' }}>
//	{capabilities?.Capability?.Layer?.['Abstract']}
//</p>

MlWmsLoader.defaultProps = {
	mapId: undefined,
	url: '',
	urlParameters: {
		SERVICE: 'WMS',
		VERSION: '1.3.0',
		REQUEST: 'GetCapabilities',
	},
	wmsUrlParameters: {
		TRANSPARENT: 'TRUE',
	},
	featureInfoEnabled: true,
	zoomToExtent: false,
	showDeleteButton: false,
};

export default MlWmsLoader;
