import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import React, { useMemo, useRef, useState } from 'react';
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
	const visibleRef = useRef<boolean>(visible);

	// this state variable is used for layer components that provide a paint attribute
	const [paintProps, setPaintProps] = useState(
		layerComponent?.props?.paint ||
			getDefaultPaintPropsByType(
				layerComponent?.props?.type || getDefaulLayerTypeByGeometry(layerComponent.props.geojson)
			)
	);

	const _visible = useMemo(() => {
		if (!visible) {
			return false;
		}
		return localVisible;
	}, [visible, localVisible]);

	useEffect(() => {
		if (!setLayerState || !layerComponent?.props?.layers || _visible === visibleRef.current) return;

		visibleRef.current = _visible;

		const state = { ...layerComponent?.props };
		if (layerComponent?.props?.layers) {
			state.layers = layerComponent?.props?.layers.map((el: LayerSpecification) => {
				if (el.layout) {
					el.layout['visibility'] = _visible ? 'visible' : 'none';
				} else {
					el.layout = { visibility: _visible ? 'visible' : 'none' };
				}
				return el;
			});
		}
		setLayerState(state);
	}, [_visible, setLayerState, layerComponent?.props?.layers]);

	useEffect(() => {
		if (!setLayerState || !paintProps) return;

		if(JSON.stringify(paintProps) === JSON.stringify(layerComponent.props?.paint))return;

		setLayerState({ ...layerComponent.props, paint: paintProps });
	}, [paintProps, setLayerState, layerComponent.props?.paint]);

	const _layerComponent = useMemo(() => {
		if (layerComponent && type === 'layer') {
			switch (layerComponent.type.name) {
				case 'MlWmsLayer':
					return React.cloneElement(layerComponent, {
						...layerComponent?.props,
						visible: _visible,
					});
					break;
				case 'MlVectorTileLayer':
					return React.cloneElement(layerComponent, {
						...layerComponent?.props,
						layers: layerComponent?.props?.layers,
					});
					break;
				default:
				case 'MlGeoJsonLayer':
					return React.cloneElement(layerComponent, {
						layout: {
							visibility: _visible ? 'visible' : 'none',
						},
						...(setLayerState ? {} : { paint: paintProps }),
					});
					break;
			}
		}
		return <></>;
	}, [type, layerComponent, paintProps, _visible, layerComponent?.props?.layers]);

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
			{!layerComponent?.props?.layers && (
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
					 	variant="layerlist"
						primary={name}
						secondary={description}
					/>
				</ListItem>
			)}
			{_layerComponent}
			{!layerComponent?.props?.layers && configurable && paintPropsFormVisible && (
				<LayerPropertyForm
					paintProps={paintProps}
					setPaintProps={setPaintProps}
					layerType={layerType}
				/>
			)}

			{layerComponent?.props?.layers && (
				<LayerListFolder visible={localVisible} setVisible={setLocalVisible} name={name}>
					{layerComponent?.props?.layers?.map?.((_el: LayerSpecification, idx: number) => (
						<LayerListItemVectorLayer
							vtProps={layerComponent?.props}
							setVtProps={setLayerState}
							id={'' + idx}
							key={'' + idx}
							visibleMaster={_visible}
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
