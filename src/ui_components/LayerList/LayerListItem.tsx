import { Button, Checkbox, IconButton, ListItem, ListItemIcon, ListItemText, SxProps } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import React, { useMemo, useRef, useState } from 'react';
import getDefaulLayerTypeByGeometry from '../../components/MlGeoJsonLayer/util/getDefaultLayerTypeByGeometry';
import LayerPropertyForm from './util/LayerPropertyForm';
import getDefaultPaintPropsByType from '../../components/MlGeoJsonLayer/util/getDefaultPaintPropsByType';
import LayerListFolder from './LayerListFolder';
import { LayerSpecification } from 'maplibre-gl';
import LayerListItemVectorLayer from './util/LayerListItemVectorLayer';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../ConfirmDialog';

type Props = {
	layerComponent: JSX.Element;
	visible: boolean;
	configurable: boolean;
	type?: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';
	name: string;
	description?: string;
	setLayerState?: (state: unknown) => void;
	showDeleteButton?: boolean;
	listItemSx?: SxProps;
	buttons?: JSX.Element;
};

function LayerListItem({
	layerComponent,
	visible,
	type,
	name,
	description,
	configurable,
	setLayerState,
	...props
}: Props) {
	const [localVisible, setLocalVisible] = useState(true);
	const [paintPropsFormVisible, setPaintPropsFormVisible] = useState(false);
	const [showDeletionConfirmationDialog, setShowDeletionConfirmationDialog] = useState(false);
	const deletedRef = useRef<boolean>(false);
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
		switch (layerComponent.type.name) {
			case 'MlWmsLayer':
				break;
			case 'MlVectorTileLayer':
				if (layerComponent?.props?.layers && !deletedRef.current) {
					state.layers = layerComponent?.props?.layers.map((el: LayerSpecification) => {
						if (el.layout) {
							el.layout['visibility'] = _visible ? 'visible' : 'none';
						} else {
							el.layout = { visibility: _visible ? 'visible' : 'none' };
						}
						return el;
					});
					console.log('setLayerState', state.layers);
					setLayerState(state);
				}
				break;
			case 'MlGeoJsonLayer':
				break;
			default:
				break;
		}
	}, [_visible, setLayerState, layerComponent]);

	useEffect(() => {
		if (!setLayerState || deletedRef.current || !paintProps || layerComponent?.props?.layers)
			return;

		if (JSON.stringify(paintProps) === JSON.stringify(layerComponent.props?.paint)) return;

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
	}, [type, layerComponent, paintProps, _visible, layerComponent?.props?.layers, setLayerState]);

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
						...props.listItemSx
					}}
					secondaryAction={
						configurable && Object.keys(paintProps)?.length > 0 ? (
							<>
								<IconButton
									edge={props.showDeleteButton ? false : 'end'}
									aria-label="visibility"
									onClick={() => {
										setPaintPropsFormVisible((current) => {
											return !current;
										});
									}}
									sx={{
										padding: '4px',
										marginTop: '-3px',
										...(props.showDeleteButton ? { marginRight: '4px' } : {}),
									}}
								>
									<TuneIcon />
								</IconButton>
								{props?.buttons}
								{props.showDeleteButton && (
									<>
										<IconButton
											edge="end"
											aria-label="delete"
											onClick={() => {
												if (typeof setLayerState === 'function') {
													setShowDeletionConfirmationDialog(true);
												}
											}}
											sx={{
												padding: '4px',
												marginTop: '-3px',
											}}
										>
											<DeleteIcon />
										</IconButton>
										{showDeletionConfirmationDialog && (
											<ConfirmDialog
												open={showDeletionConfirmationDialog}
												onConfirm={() => {
													if (typeof setLayerState === 'function') {
														deletedRef.current = true;
														setLayerState(false);
														setShowDeletionConfirmationDialog(false);
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
					<ListItemText variant="layerlist" primary={name} secondary={description} primaryTypographyProps={{overflow:'hidden'}} />
				</ListItem>
			)}
			{_layerComponent}
			{!layerComponent?.props?.layers &&
				Object.keys(paintProps).length > 0 &&
				configurable &&
				paintPropsFormVisible && (
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
	showDeleteButton: false,
	buttons: <></>,
};

export default LayerListItem;
