import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import React, { useMemo, useState } from 'react';
import getDefaulLayerTypeByGeometry from '../../components/MlGeoJsonLayer/util/getDefaultLayerTypeByGeometry';
import LayerPropertyForm from './util/LayerPropertyForm';
import getDefaultPaintPropsByType from '../../components/MlGeoJsonLayer/util/getDefaultPaintPropsByType';
import LayerListFolder from './LayerListFolder';
import { LayerSpecification } from 'maplibre-gl';
import LayerListItemVectorLayer from './util/LayerListItemVectorLayer';
import { useEffect } from 'react';

type Props = {
	layerComponent: JSX.Element;
	visible: boolean;
	configurable: boolean;
	type?: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';
	name: string;
	description?: string;
	setLayerState?: (state: unknown) => void;
};

function LayerListItem({
	layerComponent,
	visible,
	type,
	name,
	description,
	configurable,
	setLayerState,
}: Props) {
	const [localVisible, setLocalVisible] = useState(true);
	const [paintPropsFormVisible, setPaintPropsFormVisible] = useState(false);

	// this state variable is used for layer components that provide a paint attribute
	const [paintProps, setPaintProps] = useState(
		layerComponent?.props?.paint ||
			getDefaultPaintPropsByType(
				layerComponent?.props?.type || getDefaulLayerTypeByGeometry(layerComponent.props.geojson)
			)
	);
	// this state variable is only used for MlVectoTileLayer components
	const [layers, setLayers] = useState(layerComponent?.props?.layers);

	const _visible = useMemo(() => {
		if (!visible) {
			return false;
		}
		return localVisible;
	}, [visible, localVisible]);

	useEffect(() => {
		if (!setLayerState || !layers) return;
		const state = { ...layerComponent?.props };
		state.layers = layers.map((el: LayerSpecification) => {
			if (el.layout) {
				el.layout['visibility'] = _visible ? 'visible' : 'none';
			} else {
				el.layout = { visibility: _visible ? 'visible' : 'none' };
			}
			return el;
		});
		setLayerState(state);
	}, [_visible, setLayerState, layers]);

	useEffect(() => {
		if (!setLayerState || !paintProps) return;

		setLayerState({ ...layerComponent.props, paint: paintProps });
	}, [paintProps, setLayerState]);

	const _layerComponent = useMemo(() => {
		if (layerComponent && type === 'layer') {
			if (layerComponent?.props?.layers) {

				return React.cloneElement(layerComponent, {
					...layerComponent?.props,
					layers: layerComponent?.props?.layers,
				});
			} else {
				return React.cloneElement(layerComponent, {
					layout: {
						visibility: _visible ? 'visible' : 'none',
					},
					...(setLayerState ? {} : { paint: paintProps }),
				});
			}
		}
		return <></>;
	}, [type, layerComponent, paintProps, layers, _visible, layerComponent?.props?.layers]);

	const layerType = useMemo(() => {
		if (layerComponent && type === 'layer') {
			if (layerComponent.props.type) {
				return layerComponent.props.type;
			}
			if (layerComponent.props.geojson) {
				return getDefaulLayerTypeByGeometry(layerComponent.props.geojson);
			}
		}

		return undefined;
	}, [layerComponent]);

	return (
		<>
			{!layers && (
				<ListItem
					sx={{
						paddingRight: configurable ? '56px' : 0,
						paddingLeft: 0,
						paddingTop: 0,
						paddingBottom: '4px',
					}}
					secondaryAction={
						configurable ? (
							<IconButton
								edge="end"
								aria-label="comments"
								onClick={() => {
									setPaintPropsFormVisible((current) => {
										return !current;
									});
								}}
								sx={{ padding: '4px', marginTop: '-3px' }}
							>
								<TuneIcon />
							</IconButton>
						) : undefined
					}
				>
					<ListItemIcon sx={{ minWidth: '30px' }}>
						<Checkbox
							disabled={!visible}
							checked={localVisible}
							sx={{ padding: 0 }}
							onClick={() => {
								setLocalVisible((val) => !val);
							}}
						/>
					</ListItemIcon>
					<ListItemText
						primary={name}
						primaryTypographyProps={{ sx: { fontSize: '0.9rem' } }}
						secondary={description}
						secondaryTypographyProps={{ sx: { fontSize: '0.7rem' } }}
					/>
				</ListItem>
			)}
			{_layerComponent}
			{!layers && configurable && paintPropsFormVisible && (
				<LayerPropertyForm
					paintProps={paintProps}
					setPaintProps={setPaintProps}
					layerType={layerType}
				/>
			)}

			{layerComponent?.props?.layers && (
				<LayerListFolder visible={localVisible} setVisible={setLocalVisible} name={name}>
					{layerComponent?.props?.layers?.map?.((el: LayerSpecification, idx: number) => (
						<LayerListItemVectorLayer
							vtProps={layerComponent?.props}
							setVtProps={setLayerState}
							id={'' + idx}
							key={'' + idx}
						/>
					))}
				</LayerListFolder>
			)}
		</>
	);
}

LayerListItem.defaultProps = {
	type: 'layer',
	visible: true,
};

export default LayerListItem;
