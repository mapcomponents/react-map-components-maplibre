import React, { useMemo } from 'react';
import { IconButton, styled } from '@mui/material';
import {
	ArrowCircleDown as ArrowCircleDownIcon,
	ArrowCircleUp as ArrowCircleUpIcon,
	CenterFocusWeak as CenterLayerIcon,
} from '@mui/icons-material';
import LayerListItem from './LayerListItem';
import MlGeoJsonLayer from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import MlWmsLoader from '../../components/MlWmsLoader/MlWmsLoader';
import MlOrderLayers from '../../components/MlOrderLayers/MlOrderLayers';
import { MlGeoJsonLayerProps } from '../../components/MlGeoJsonLayer/MlGeoJsonLayer';
import { MlWmsLoaderProps } from '../../components/MlWmsLoader/MlWmsLoader';
import MlVectorTileLayer, {
	MlVectorTileLayerProps,
} from '../../components/MlVectorTileLayer/MlVectorTileLayer';
import useLayerContext from '../../hooks/useLayerContext';
import { LayerConfig, wmsConfig } from '../../contexts/LayerContext';
import {
	closestCenter,
	DndContext,
	useSensor,
	PointerSensor,
	MouseSensor,
	useSensors,
	UniqueIdentifier,
	DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import useMap from '../../hooks/useMap';
import { bbox } from '@turf/turf';
import { LngLatBoundsLike, FitBoundsOptions } from 'maplibre-gl';
import { Feature, FeatureCollection } from 'geojson';

const IconButtonStyled = styled(IconButton)({
	padding: '4px',
	marginTop: '-3px',
	background: 'none',
	'&:hover': {
		background: 'none',
	},
});

export interface LayerListItemFactoryProps {
	mapId?: string;
	layers: LayerConfig[];
	setLayers?: (layers: LayerConfig[] | ((state: LayerConfig[]) => LayerConfig[])) => void;
	insertBeforeLayer?: string;
	sortable?: boolean;
	fitBoundsOptions?: FitBoundsOptions;
}

function LayerListItemFactory(props: LayerListItemFactoryProps) {
	const layerContext = useLayerContext();
	const mapHook = useMap({ mapId: undefined });

	//useCallback Hook
	function fitLayer(layer: LayerConfig) {
		const layerSource =
			layer.id && mapHook.map?.getLayer(layer.id)?.source
				? mapHook.map?.getLayer(layer.id)?.source
				: undefined;

		let _bbox: LngLatBoundsLike | null = null;
		switch (layer.type) {
			case 'geojson':
				if (layer.config?.geojson) {
					mapHook.map?.fitBounds(
						bbox(layer.config?.geojson) as LngLatBoundsLike,
						props.fitBoundsOptions
					);
				} else {
					if (!layerSource) {
						return;
					}
					const _geojson = {
						type: 'FeatureCollection',
						features: mapHook.map?.querySourceFeatures(layerSource) as Feature[],
					};

					if ((_geojson as FeatureCollection).features.length === 0) {
						mapHook.map?.zoomTo(1);
						_geojson.features = mapHook.map?.querySourceFeatures(layerSource) as Feature[];
					}

					_bbox = bbox(_geojson as FeatureCollection) as LngLatBoundsLike;
				}
				break;
			case 'vt':
				console.log('vt');
				break;
			case 'wms':
				_bbox = (layer?.config as wmsConfig)?.config?.layers?.[0]
					?.EX_GeographicBoundingBox as LngLatBoundsLike;
				break;

			default:
				return;
		}
		if (_bbox) {
			mapHook.map?.fitBounds(_bbox, props.fitBoundsOptions);
		}
	}

	const orderLayers = useMemo(() => {
		const layerIds = [
			'order-background',
			...[...layerContext.layers].map((_el, idx) => 'content_order_' + idx),
			'order-labels',
		];

		return layerIds.reverse();
	}, [layerContext.layers]);

	const layers: LayerConfig[] = useMemo(() => {
		if (props.layers) return props.layers;
		if (layerContext?.layers) return layerContext.layers;
		return [];
	}, [props.layers, layerContext.layers]);

	const setLayers: (arg1: LayerConfig[] | ((arg: LayerConfig[]) => void)) => void = useMemo(() => {
		if (props.setLayers) return props.setLayers;
		return layerContext.setLayers;
	}, [props.setLayers, layerContext.setLayers]);
	const pointerSensor = useSensor(PointerSensor, {
		activationConstraint: {
			distance: 5,
		},
	});
	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 5,
		},
	});
	const sensors = useSensors(mouseSensor, pointerSensor);

	function dragEnd(event: DragEndEvent) {
		const dragLayerId = event.active.id;
		const dragLayerNewPosition = event.over?.data?.current?.sortable.index;
		layerContext.moveLayer(String(dragLayerId), () => dragLayerNewPosition);
	}

	return (
		<>
			<MlOrderLayers layerIds={orderLayers} insertBeforeLayer="_background" />
			{layerContext?.symbolLayers?.length > 0 && (
				<LayerListItem
					key={'background_labels'}
					layerComponent={
						<MlVectorTileLayer
							{...layerContext.vtLayerConfig}
							layers={layerContext.symbolLayers}
							mapId={props?.mapId}
							insertBeforeLayer={'order-labels'}
						/>
					}
					setLayerState={(state: MlVectorTileLayerProps) =>
						layerContext.setSymbolLayers(state?.layers)
					}
					visible={true}
					configurable={true}
					type="layer"
					name="Labels"
				/>
			)}

			<DndContext
				collisionDetection={closestCenter}
				sensors={sensors}
				onDragEnd={(event) => dragEnd(event)}
				modifiers={[restrictToVerticalAxis]}
			>
				<SortableContext
					items={layers as { id: UniqueIdentifier }[]}
					strategy={verticalListSortingStrategy}
				>
					{[...layers].map((layer: LayerConfig, idx: number) => {
						if (!layer?.id) return null;

						switch (layer.type) {
							case 'geojson':
								return (
									<LayerListItem
										key={layer.id}
										layerId={layer.id}
										sortable={props.sortable}
										name={layer?.name || layer?.config?.type + ' layer' || 'unnamed layer'}
										layerComponent={
											<MlGeoJsonLayer
												{...layer.config}
												mapId={props?.mapId}
												layerId={layer.id}
												insertBeforeLayer={'content_order_' + (layers.length - 1 - idx)}
											/>
										}
										buttons={
											<>
												<IconButtonStyled
													disabled={idx === layers.length - 1}
													onClick={() => {
														layerContext.moveDown(layer.id || '');
													}}
												>
													<ArrowCircleDownIcon />
												</IconButtonStyled>
												<IconButtonStyled
													disabled={idx === 0}
													onClick={() => {
														layerContext.moveUp(layer.id || '');
													}}
												>
													<ArrowCircleUpIcon />
												</IconButtonStyled>
												<IconButtonStyled onClick={() => fitLayer(layer)}>
													<CenterLayerIcon />
												</IconButtonStyled>
											</>
										}
										setLayerState={(layerConfig: MlGeoJsonLayerProps | false) =>
											setLayers?.((current: LayerConfig[]) => {
												const _layers = [...current];
												if (layerConfig === false) {
													_layers.splice(idx, 1);
												} else {
													_layers[idx].config = layerConfig;
												}

												return _layers;
											})
										}
										configurable={true}
										showDeleteButton={true}
									/>
								);
							case 'wms':
								return (
									<>
										<MlWmsLoader
											{...(layer.config as unknown as MlWmsLoaderProps)}
											key={layer.id}
											layerId={layer.id}
											sortable={props.sortable}
											mapId={props?.mapId}
											insertBeforeLayer={'content_order_' + (layers.length - 1 - idx)}
											onConfigChange={(layerConfig) => {
												setLayers?.((current: LayerConfig[]) => {
													const _layers = [...current];
													if (layerConfig === false) {
														_layers.splice(idx, 1);
													} else {
														(_layers[idx].config as MlWmsLoaderProps).config = layerConfig;
													}
													return _layers;
												});
											}}
											featureInfoActive={layer?.config?.featureInfoActive || false}
											setFeatureInfoActive={(updateFunction) => {
												setLayers?.((current: LayerConfig[]) => {
													const _layers = [...current];
													if (typeof updateFunction === 'function') {
														(_layers[idx].config as MlWmsLoaderProps).featureInfoActive =
															updateFunction(
																(_layers[idx].config as MlWmsLoaderProps)?.featureInfoActive ||
																	false
															);
													}
													return _layers;
												});
											}}
											showDeleteButton={true}
											buttons={
												<>
													<IconButtonStyled
														disabled={idx === layers.length - 1}
														onClick={() => {
															layerContext.moveDown(layer.id || '');
														}}
													>
														<ArrowCircleDownIcon />
													</IconButtonStyled>
													<IconButtonStyled
														disabled={idx === 0}
														onClick={() => {
															layerContext.moveUp(layer.id || '');
														}}
													>
														<ArrowCircleUpIcon />
													</IconButtonStyled>
													<IconButtonStyled onClick={() => fitLayer(layer)}>
														<CenterLayerIcon />
													</IconButtonStyled>
												</>
											}
										/>
									</>
								);
							case 'vt':
								return (
									<React.Fragment key={layer?.id + '_listItem'}>
										<LayerListItem
											key={layer.id}
											name={layer?.name || layer?.type + ' layer' || 'unnamed layer'}
											layerComponent={
												<MlVectorTileLayer
													layers={layer?.config?.layers || []}
													key={layer.id}
													mapId={layer?.config.mapId}
													sourceOptions={layer?.config?.sourceOptions}
													layerId={layer.id}
													url={layer?.config?.url}
												/>
											}
											buttons={
												<>
													<IconButtonStyled
														key={layer.id + '_button1'}
														disabled={idx === layers.length - 1}
														onClick={() => {
															layerContext.moveDown(layer.id || '');
														}}
													>
														<ArrowCircleDownIcon />
													</IconButtonStyled>
													<IconButtonStyled
														key={layer.id + '_button2'}
														disabled={idx === 0}
														onClick={() => {
															layerContext.moveUp(layer.id || '');
														}}
													>
														<ArrowCircleUpIcon />
													</IconButtonStyled>
													<IconButtonStyled onClick={() => fitLayer(layer)}>
														<CenterLayerIcon />
													</IconButtonStyled>
												</>
											}
											setLayerState={(layerConfig: MlVectorTileLayerProps | false) =>
												setLayers?.((current: LayerConfig[]) => {
													const _layers = [...current];
													if (layerConfig === false) {
														_layers.splice(idx, 1);
													} else {
														_layers[idx].config = layerConfig;
													}

													return _layers;
												})
											}
											configurable={true}
											showDeleteButton={true}
										/>
									</React.Fragment>
								);
							default:
								return null;
						}
					})}
					{layerContext?.backgroundLayers?.length > 0 && (
						<LayerListItem
							key={'background_geometry'}
							layerComponent={
								<MlVectorTileLayer
									{...layerContext.vtLayerConfig}
									layers={layerContext.backgroundLayers}
									mapId={props?.mapId}
									insertBeforeLayer={'order-background'}
								/>
							}
							setLayerState={(state: MlVectorTileLayerProps) => {
								layerContext.setBackgroundLayers(state?.layers);
							}}
							visible={true}
							configurable={true}
							type="layer"
							name="Background"
						/>
					)}
				</SortableContext>
			</DndContext>
		</>
	);
}

LayerListItemFactory.defaultProps = {
	mapId: undefined,
};

export default LayerListItemFactory;
