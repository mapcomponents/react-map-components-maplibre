import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LayerSpecification } from 'maplibre-gl';
import {
	Checkbox,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	SxProps,
	styled,
} from '@mui/material';
import { Delete as DeleteIcon, Tune as TuneIcon } from '@mui/icons-material';
import LayerListFolder from './LayerListFolder';
import LayerPropertyForm from './util/LayerPropertyForm';
import LayerListItemVectorLayer from './util/LayerListItemVectorLayer';
import ConfirmDialog from '../ConfirmDialog';
import getDefaulLayerTypeByGeometry from '../../components/MlGeoJsonLayer/util/getDefaultLayerTypeByGeometry';
import getDefaultPaintPropsByType from '../../components/MlGeoJsonLayer/util/getDefaultPaintPropsByType';

const listItemStyle = (configurable?: boolean) => ({
	paddingRight: configurable ? '56px' : 0,
	paddingLeft: 0,
	paddingTop: 0,
	paddingBottom: '4px',
});
// const ListItemStyle = styled(ListItem)((configurable) => ({
// 	paddingRight: configurable ? '56px' : 0,
// 	paddingLeft: 0,
// 	paddingTop: 0,
// 	paddingBottom: '4px',
// }));
const TuneIconButton = styled(IconButton)((showDeleteButton) => ({
	marginRight: showDeleteButton ? '4px' : '1000px',
	padding: '4px',
	marginTop: '-3px',
}));
const DeleteIconButton = styled(IconButton)({
	padding: '4px',
	marginTop: '-3px',
});

const listItemIconStyle = {
	minWidth: '30px',
};

const checkboxStyle = { padding: 0 };

interface LayerListItemProps {
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
}

function LayerListItem({
	layerComponent,
	visible,
	type,
	name,
	description,
	configurable,
	setLayerState,
	...props
}: LayerListItemProps) {
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
					sx={(listItemStyle(configurable), { ...props.listItemSx })}
					secondaryAction={
						configurable && Object.keys(paintProps)?.length > 0 ? (
							<>
								{props?.buttons}
								<TuneIconButton
									edge={props.showDeleteButton ? false : 'end'}
									aria-label="settings"
									onClick={() => {
										setPaintPropsFormVisible((current) => {
											return !current;
										});
									}}
								>
									<TuneIcon />
								</TuneIconButton>
								{props.showDeleteButton && (
									<>
										<DeleteIconButton
											edge="end"
											aria-label="delete"
											onClick={() => {
												if (typeof setLayerState === 'function') {
													setShowDeletionConfirmationDialog(true);
												}
											}}
										>
											<DeleteIcon />
										</DeleteIconButton>
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
					<ListItemIcon sx={listItemIconStyle}>
						<Checkbox
							disabled={!visible}
							checked={localVisible}
							sx={checkboxStyle}
							onClick={() => {
								setLocalVisible((val) => !val);
							}}
						/>
					</ListItemIcon>
					<ListItemText
						variant="layerlist"
						primary={name}
						secondary={description}
						primaryTypographyProps={{ overflow: 'hidden' }}
					/>
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
