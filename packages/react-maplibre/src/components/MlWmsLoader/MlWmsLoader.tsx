import React, { useCallback, useEffect, useMemo, useState } from 'react';

import MlWmsLayer from '../MlWmsLayer/MlWmsLayer';
import MlMarker from '../MlMarker/MlMarker';
import useWms, { useWmsReturnType } from '../../hooks/useWms';

import InfoIcon from '@mui/icons-material/Info';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { MapMouseEvent } from 'maplibre-gl';
import useMap from '../../hooks/useMap';
import { Box, Checkbox, ListItemIcon, Snackbar } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../../ui_components/ConfirmDialog';

import * as turf from '@turf/turf';
import SortableContainer from '../../ui_components/LayerList/util/SortableContainer';
import { normalizeWmsParams } from '../../utils/wmsUtils';

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
	url?: string;
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	layerId?: string;
	insertBeforeLayer?: string;
	/**
	 * Base URL parameters that will be used for all WMS requests (GetCapabilities, GetMap, GetFeatureInfo)
	 */
	baseUrlParameters?: { [key: string]: string };
	/**
	 * URL parameters specific to GetCapabilities requests
	 */
	getCapabilitiesUrlParameters?: { [key: string]: string };
	/**
	 * URL parameters specific to GetMap requests
	 */
	getMapUrlParameters?: { [key: string]: string };
	/**
	 * URL parameters specific to GetFeatureInfo requests
	 */
	getFeatureInfoUrlParameters?: { [key: string]: string };
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
	 * Callback function that is called after the featureInfoRequest has succeeded
	 */
	featureInfoSuccess?: (content: string, lngLat: { lng: number; lat: number }) => void;
	/**
	 * If true, displays a marker at the feature info location
	 */
	featureInfoMarkerEnabled?: boolean;
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
	buttons?: React.JSX.Element;
	sortable?: boolean;
	/**
	 * Array of layer Names (IDs) that should be visible at start. If not provided, default visibility logic applies.
	 */
	visibleLayersAtStart?: string[];
	/**
	 * If true, renders the layer list UI. If false, only the WMS layer is rendered without UI controls.
	 */
	showLayerList?: boolean;
}

export interface WmsLayer {
	Name?: string;
	Title?: string;
	Abstract?: string;
	KeywordList?: string[];
	CRS?: string | string[];
	SRS?: string | string[];
	EX_GeographicBoundingBox?: number[];
	LatLonBoundingBox?: number[];
	BoundingBox?: any[];
	Dimension?: any;
	Attribution?: { Title: string; OnlineResource?: string; LogoURL?: any };
	AuthorityURL?: any[];
	Identifier?: any[];
	MetadataURL?: any[];
	DataURL?: any[];
	FeatureListURL?: any[];
	Style?: any[];
	MinScaleDenominator?: number;
	MaxScaleDenominator?: number;
	Layer?: WmsLayer[];
	queryable?: boolean;
	opaque?: boolean;
	noSubsets?: boolean;
	fixedWidth?: number;
	fixedHeight?: number;
}

export type LayerType = {
	visible: boolean;
	Name: string;
	Attribution?: { Title: string };
} & Omit<WmsLayer, 'Layer' | 'CRS'> &
	Partial<Pick<WmsLayer, 'Layer'>>;

const defaultProps = {
	mapId: undefined,
	url: '',
	featureInfoEnabled: true,
	featureInfoMarkerEnabled: true,
	zoomToExtent: false,
	showDeleteButton: false,
	showLayerList: true,
};

const defaultBaseUrlParameters = {
	SERVICE: 'WMS',
	VERSION: '1.3.0',
};

const defaultGetCapabilitiesUrlParameters = {};

const defaultGetMapUrlParameters = {
	TRANSPARENT: 'TRUE',
};

const defaultGetFeatureInfoUrlParameters = {
	FEATURE_COUNT: '10',
	STYLES: '',
	WIDTH: '100',
	HEIGHT: '100',
	SRS: 'EPSG:3857',
	CRS: 'EPSG:3857',
	X: '50',
	Y: '50',
	I: '50',
	J: '50',
};

/**
 * Loads a WMS getCapabilities xml document and adds a MlWmsLayer component for each layer that is
 * offered by the WMS.
 *
 * @component
 */
const MlWmsLoader = (props: MlWmsLoaderProps) => {
	// Merge defaults with props using useMemo for stable references
	// The dependencies are the prop objects - if consumers pass inline objects,
	// they should memoize them. This follows standard React patterns.
	const baseUrlParameters = useMemo(
		() => ({ ...defaultBaseUrlParameters, ...props.baseUrlParameters }),
		[props.baseUrlParameters]
	);
	const getCapabilitiesUrlParameters = useMemo(
		() => ({ ...defaultGetCapabilitiesUrlParameters, ...props.getCapabilitiesUrlParameters }),
		[props.getCapabilitiesUrlParameters]
	);
	const getMapUrlParameters = useMemo(
		() => ({ ...defaultGetMapUrlParameters, ...props.getMapUrlParameters }),
		[props.getMapUrlParameters]
	);
	const getFeatureInfoUrlParameters = useMemo(
		() => ({ ...defaultGetFeatureInfoUrlParameters, ...props.getFeatureInfoUrlParameters }),
		[props.getFeatureInfoUrlParameters]
	);

	// Apply simple defaults via destructuring
	const {
		mapId = defaultProps.mapId,
		url = defaultProps.url,
		featureInfoEnabled = defaultProps.featureInfoEnabled,
		featureInfoMarkerEnabled = defaultProps.featureInfoMarkerEnabled,
		zoomToExtent = defaultProps.zoomToExtent,
		showDeleteButton = defaultProps.showDeleteButton,
		showLayerList = defaultProps.showLayerList,
	} = props;

	const capabilitiesUrlParameters = useMemo(
		() => ({
			...baseUrlParameters,
			...getCapabilitiesUrlParameters,
			REQUEST: 'GetCapabilities',
		}),
		[baseUrlParameters, getCapabilitiesUrlParameters]
	);

	const {
		capabilities: _capabilities,
		error,
		setUrl,
		getFeatureInfoUrl: _getFeatureInfoUrl,
		wmsUrl: _wmsUrl,
	}: useWmsReturnType = useWms({
		urlParameters: capabilitiesUrlParameters,
	});

	const [open, setOpen] = useState(props?.config?.open || false);
	const [visible, setVisible] = useState<boolean>(props?.config?.visible || true);
	const [showDeletionConfirmationDialog, setShowDeletionConfirmationDialog] = useState(false);

	const mapHook = useMap({ mapId });
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
			.filter(
				(value: string | undefined, index: number, self: (string | undefined)[]) =>
					self.indexOf(value) === index
			)
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

			// First, determine what CRS/SRS will be used in the final request
			let _gfiUrl: string | undefined = getFeatureInfoUrl;
			let _gfiUrlParts;
			if (_gfiUrl?.indexOf?.('?') !== -1) {
				_gfiUrlParts = props?.url?.split('?') || props?.config?.wmsUrl?.split('?');
				_gfiUrl = _gfiUrlParts?.[0];
			}
			const _urlParamsFromUrl = new URLSearchParams(_gfiUrlParts?.[1]);

			// Build a temporary params object to determine the effective CRS
			const tempParams = {
				...normalizeWmsParams(defaultBaseUrlParameters),
				...normalizeWmsParams(defaultGetFeatureInfoUrlParameters),
				...normalizeWmsParams(_urlParamsFromUrl, (key) => key.toUpperCase() !== 'REQUEST'),
				...normalizeWmsParams(baseUrlParameters),
				...normalizeWmsParams(getFeatureInfoUrlParameters),
			};

			// Get the effective CRS (prefer CRS over SRS for WMS 1.3.0)
			const crsValue = tempParams.CRS || tempParams.SRS || 'EPSG:3857';
			const effectiveCrs = String(crsValue).toUpperCase();

			// Calculate the bbox in the appropriate coordinate system
			const unprojected = mapHook.map.unproject([ev.point.x, ev.point.y]);
			const point = turf.point([unprojected.lng, unprojected.lat]);
			const buffered = turf.buffer(point, 50, { units: 'meters' });
			const _bbox = buffered && turf.bbox(buffered);

			let bbox: number[] | undefined;
			if (effectiveCrs === 'EPSG:4326' || effectiveCrs === 'CRS:84') {
				// Use lat/lng coordinates directly for EPSG:4326/CRS:84
				bbox = _bbox ? [..._bbox] : undefined;
			} else {
				// Convert to Web Mercator meters (EPSG:3857)
				if (effectiveCrs !== 'EPSG:3857' && effectiveCrs !== 'EPSG:900913') {
					console.warn(
						`CRS "${effectiveCrs}" not supported for GetFeatureInfo BBOX conversion, using EPSG:3857`
					);
				}
				if (_bbox) {
					const swMercator = turf.toMercator(turf.point([_bbox[0], _bbox[1]]));
					const neMercator = turf.toMercator(turf.point([_bbox[2], _bbox[3]]));
					bbox = [...swMercator.geometry.coordinates, ...neMercator.geometry.coordinates];
				}
			}

			const _getFeatureInfoUrlParams = {
				REQUEST: 'GetFeatureInfo',
				BBOX: bbox?.join(','),
				INFO_FORMAT:
					capabilities?.Capability?.Request?.GetFeatureInfo.Format.indexOf('text/html') !== -1
						? 'text/html'
						: 'text/plain',
				LAYERS: layers
					.map((layer: LayerType) => (layer.visible && layer.queryable ? layer.Name : undefined))
					.filter((n) => n),
				QUERY_LAYERS: layers
					.map((layer: LayerType) => (layer.visible && layer.queryable ? layer.Name : undefined))
					.filter((n) => n),
			};

			const urlParamsObj = {
				...normalizeWmsParams(defaultBaseUrlParameters),
				...normalizeWmsParams(defaultGetFeatureInfoUrlParameters),
				...normalizeWmsParams(_urlParamsFromUrl, (key) => key.toUpperCase() !== 'REQUEST'),
				...normalizeWmsParams(baseUrlParameters),
				..._getFeatureInfoUrlParams,
				...normalizeWmsParams(getFeatureInfoUrlParameters),
			};
			// create URLSearchParams object to assemble the URL Parameters
			// "as any" can be removed once the URLSearchParams ts spec is fixed
			const urlParams = new URLSearchParams(urlParamsObj as unknown as Record<string, string>);

			fetch(_gfiUrl + '?' + urlParams.toString())
				.then((res) => {
					if (!res.ok) {
						throw new Error('FeatureInfo could not be fetched');
					}
					return res.text();
				})
				.then((text) => {
					setFeatureInfoLngLat(ev.lngLat);
					setFeatureInfoContent(text);
					props.featureInfoSuccess?.(text, ev.lngLat);
				})
				.catch((error) => console.log(error));
		},
		[
			capabilities,
			getFeatureInfoUrl,
			props?.url,
			props?.config?.wmsUrl,
			props.featureInfoSuccess,
			mapHook,
			layers,
			baseUrlParameters,
			getFeatureInfoUrlParameters,
		]
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

		let _LatLonBoundingBox: Array<number> = [];

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

			// collect queriable Layer2 layers
			let _layers: LayerType[] = capabilities?.Capability?.Layer?.Layer.filter(
				(el: WmsLayer) => !el.Layer?.length
			).map((layer: WmsLayer, idx: number) => {
				if (idx === 0) {
					_LatLonBoundingBox = layer.EX_GeographicBoundingBox || layer?.LatLonBoundingBox || [];
				}
				const isVisible = props.visibleLayersAtStart
					? props.visibleLayersAtStart.includes(layer.Name || '')
					: true;
				return {
					visible: isVisible,
					Attribution: { Title: '' },
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					...(({ CRS, ..._layer }) => _layer)(layer),
				} as LayerType;
			});

			// collect queriable Layer3 layers
			capabilities?.Capability?.Layer?.Layer.forEach((el: WmsLayer) => {
				const tmpLayers = el?.Layer?.filter((el) => el.CRS?.length).map(
					(layer: WmsLayer, idx: number) => {
						if (idx === 0) {
							_LatLonBoundingBox = layer.EX_GeographicBoundingBox || layer?.LatLonBoundingBox || [];
						}
						const isVisible = props.visibleLayersAtStart
							? props.visibleLayersAtStart.includes(layer.Name || '')
							: true;
						return {
							visible: isVisible,
							Attribution: { Title: '' },
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
							...(({ CRS, ..._layer }) => _layer)(layer),
						} as LayerType;
					}
				);

				if (tmpLayers) {
					_layers = [..._layers, ...tmpLayers];
				}
			});

			setLayers(_layers);

			// zoom to extent of first layer
			if (zoomToExtent && mapHook?.map && _LatLonBoundingBox.length > 3) {
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
					{featureInfoEnabled && (
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
						edge={showDeleteButton ? false : 'end'}
						sx={{
							padding: '4px',
							marginTop: '-3px',
							...(showDeleteButton ? { marginRight: '4px' } : {}),
						}}
						aria-label="open"
						onClick={() => setOpen((current) => !current)}
					>
						{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
					</IconButton>
					{showDeleteButton && (
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
					{showLayerList && (
						<>
							{props.sortable && <SortableContainer>{listContent}</SortableContainer>}
							{!props.sortable && listContent}
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
							</Box>
						</>
					)}
					{wmsUrl && layers?.length && (
						<MlWmsLayer
							key={mapHook.componentId}
							layerId={props.layerId || mapHook.componentId}
							url={wmsUrl}
							attribution={attribution}
							visible={visible}
							urlParameters={{
								...baseUrlParameters,
								...getMapUrlParameters,
								layers: layers
									?.filter?.((layer) => layer.visible)
									.map((el) => el.Name)
									.reverse()
									.join(','),
							}}
							insertBeforeLayer={props?.insertBeforeLayer}
						/>
					)}

					{featureInfoEnabled && featureInfoMarkerEnabled && featureInfoLngLat && (
						<MlMarker {...featureInfoLngLat} content={featureInfoContent} />
					)}
				</>
			)}
		</>
	);
};

export default MlWmsLoader;
