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
import useMap from '../../hooks/useMap';
import { bbox } from '@turf/turf';
import { LngLatBoundsLike, FitBoundsOptions, GeoJSONSource } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';


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
	fitBoundsOptions?: FitBoundsOptions;
}

function LayerListItemFactory(props: LayerListItemFactoryProps) {
	const layerContext = useLayerContext();
	const mapHook = useMap({ mapId: undefined });
	

	function fitLayer(layer: LayerConfig) {
		const layerSource = layer.id && mapHook.map?.getLayer(layer.id)?.source ? mapHook.map?.getLayer(layer.id).source : undefined;

	
	switch (layer.type) {
			case 'geojson':

			if (!layerSource) {
				return;
			}
			
			const geojson = layerSource && (mapHook.map?.getSource(layerSource) as GeoJSONSource)._data;
			let _geojson = layerSource && {
				type: 'FeatureCollection',
				features: mapHook.map?.querySourceFeatures(layerSource),
			};
				if((_geojson as FeatureCollection).features.length === 0){
					mapHook.map?.zoomTo(1);
				}
				mapHook.map?.fitBounds(
					typeof geojson === 'string'
						? (bbox(_geojson) as LngLatBoundsLike)
						: (bbox(geojson) as LngLatBoundsLike),
					props.fitBoundsOptions
				);

			case 'vt':
				console.log('vt');
			
				case 'wms':
					console.log(layer.config)
					const wmsBbox: LngLatBoundsLike = (layer.config as wmsConfig).config.layers[0].EX_GeographicBoundingBox as LngLatBoundsLike;
					mapHook.map?.fitBounds(wmsBbox)
									

			default:
				return;
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
			{[...layers].map((layer: LayerConfig, idx: number) => {
				if (!layer?.id) return null;

				switch (layer.type) {
					case 'geojson':
						return (
							<React.Fragment key={layer?.id + '_listItem'}>
								<LayerListItem
									key={layer.id}
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
							</React.Fragment>
						);
					case 'wms':

						return (
							<React.Fragment key={layer?.id + '_listItem'}>
								<MlWmsLoader
									{...layer.config as unknown as MlWmsLoaderProps }
									key={layer.id}
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
														(_layers[idx].config as MlWmsLoaderProps)?.featureInfoActive || false
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
							</React.Fragment>
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
						console.log('no match');
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
		</>
	);
}

LayerListItemFactory.defaultProps = {
	mapId: undefined,
};

export default LayerListItemFactory;
