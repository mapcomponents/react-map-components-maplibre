import React, { useState } from 'react';
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	styled,
	SxProps,
} from '@mui/material';
import { CheckboxListItemIcon, CheckboxStyled } from '../LayerList/util/LayerListItemVectorLayer';
import {
	getLayerByUuid,
	LayerConfig,
	LayerOrderItem,
	RootState,
	setLayerInMapConfig,
	setMasterVisible,
	updateLayerOrder,
	WmsLayerConfig,
} from '../../stores/map.store';
import { useDispatch, useSelector } from 'react-redux';
import {
	ArrowCircleDown as ArrowCircleDownIcon,
	ArrowCircleUp as ArrowCircleUpIcon,
	Delete as DeleteIcon,
	ExpandMore,
	KeyboardArrowRight as ExpandLess,
	Tune as TuneIcon,
} from '@mui/icons-material';
import ConfirmDialog from '../ConfirmDialog';
import LayerPropertyForm from './util/LayerPropertyForm';

interface LayerTreeListItemProps {
	visible?: boolean;
	type?: 'background' | 'background-labels' | 'layer' | 'wms-layer' | 'vector-tile-layer';
	name?: string;
	description?: string;
	setLayerState?: (state: unknown) => void;
	showDeleteButton?: boolean;
	listItemSx?: SxProps;
	buttons?: JSX.Element;
	sortable?: boolean;
	mapConfigKey: string;
	layerOrderConfig: LayerOrderItem;
}

const TuneIconButton = styled(IconButton)({
	padding: '4px',
	marginTop: '-3px',
});
const DeleteIconButton = styled(IconButton)({
	marginLeft: '20px',
});
const ListItemStyled = styled(ListItem)({
	paddingRight: 0,
	paddingLeft: 0,
	paddingTop: 0,
	paddingBottom: '4px',
});
const ListItemIconStyled = styled(ListItemIcon)({
	minWidth: '30px',
});
const IconButtonStyled = styled(IconButton)({
	marginRight: '0px',
	padding: '0px',
});
const BoxStyled = styled(Box)<{ open: boolean }>(({ open }) => ({
	display: open ? 'block' : 'none',
}));
const ListStyled = styled(List)({
	marginLeft: '50px',
});

function LayerTreeListItem(props: LayerTreeListItemProps) {
	const [paintPropsFormVisible, setPaintPropsFormVisible] = useState(false);
	const [showDeletionConfirmationDialog, setShowDeletionConfirmationDialog] = useState(false);
	const layer = getLayerByUuid(
		useSelector((state: RootState) => state.mapConfig),
		props.layerOrderConfig.uuid
	);
	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();

	const mapConfig = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs[props.mapConfigKey]
	);

	function moveLayer(uuid: string, getNewPos: (oldPos: number) => number) {
		const newLayerOrder = JSON.parse(JSON.stringify(mapConfig.layerOrder));
		const findAndMove = (layers: LayerOrderItem[]): boolean => {
			let found = false;
			layers.forEach((layer, index) => {
				if (found) return;
				if (layer.uuid === uuid) {
					const newPos = getNewPos(index);
					if (newPos < 0 || newPos >= layers.length) {
						throw new Error('New position is out of bounds');
					}
					const [item] = layers.splice(index, 1);
					layers.splice(newPos, 0, item);
					found = true;
				} else if (layer.layers) {
					if (findAndMove(layer.layers)) {
						found = true;
					}
				}
			});
			return found;
		};
		findAndMove(newLayerOrder);
		dispatch(updateLayerOrder({ mapConfigKey: props.mapConfigKey, newOrder: newLayerOrder }));
	}

	const moveDown = (uuid: string) => {
		moveLayer(uuid, (idx) => idx + 1);
	};

	const moveUp = (uuid: string) => {
		moveLayer(uuid, (idx) => idx - 1);
	};

	function handleToggleVisibility(visible: boolean, specificLayerId = '') {
		const nextVisible = !visible;
		if (layer) {
			toggleVisible(layer, nextVisible, specificLayerId);
			if (layer.type === 'folder' || (layer.type === 'vt' && specificLayerId === '')) {
				dispatch(
					setMasterVisible({
						mapConfigKey: props.mapConfigKey,
						layerId: layer.uuid,
						masterVisible: nextVisible,
					})
				);
			}
		}
	}

	function toggleVisible(
		layer: LayerConfig,
		nextVisible: boolean,
		specificLayerId: string
	): LayerConfig {
		//TODO: update layout for all layer types
		let updatedLayer: LayerConfig = { ...layer };
		if (layer?.type === 'folder') {
			updatedLayer = {
				...layer,
				visible: !layer.visible,
			};
		} else {
			switch (layer?.type) {
				case 'geojson': {
					updatedLayer = {
						...layer,
						config: {
							...layer.config,
							options: {
								...layer?.config?.options,
								layout: {
									...layer?.config?.options?.layout,
									visibility: nextVisible ? 'visible' : 'none',
								},
							},
						},
					} as LayerConfig;
					break;
				}
				case 'vt': {
					let updateSublayerOnly = false;
					const updatedSubLayers = layer.config.layers.map((layer) => {
						if (layer.id === specificLayerId) {
							updateSublayerOnly = true;
							return {
								...layer,
								layout: {
									...layer.layout,
									visibility: nextVisible ? 'visible' : 'none',
								},
							};
						}
						return layer;
					});
					if (updateSublayerOnly) {
						updatedLayer = {
							...layer,
							config: {
								...layer.config,
								layers: updatedSubLayers,
							},
						} as LayerConfig;
					} else {
						updatedLayer = {
							...layer,
							visible: nextVisible,
							config: {
								...layer.config,
								layers: updatedSubLayers,
							},
						} as LayerConfig;
					}
					break;
				}
				case 'wms': {
					updatedLayer = {
						...layer,
						visible: nextVisible,
						config: {
							...layer.config,
							visible: nextVisible,
						},
					} as WmsLayerConfig;
					break;
				}
			}
		}
		dispatch(
			setLayerInMapConfig({
				mapConfigKey: props.mapConfigKey,
				layer: updatedLayer,
			})
		);
		return updatedLayer;
	}

	function renderLayerItem(layer: LayerConfig): React.ReactNode {
		let visible = true;
		if (layer?.type === 'geojson') {
			visible = layer?.config?.options?.layout?.visibility !== 'none';
			return (
				<>
					<ListItemStyled
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							<>
								{props?.buttons}
								<IconButtonStyled
									disabled={false}
									onClick={() => {
										moveDown(layer.uuid);
									}}
								>
									<ArrowCircleDownIcon />
								</IconButtonStyled>
								<IconButtonStyled
									disabled={false}
									onClick={() => {
										moveUp(layer.uuid);
									}}
								>
									<ArrowCircleUpIcon />
								</IconButtonStyled>
								{layer.configurable && (
									<>
										<TuneIconButton
											edge={'end'}
											aria-label="settings"
											onClick={() => {
												setPaintPropsFormVisible((current) => {
													return !current;
												});
											}}
										>
											<TuneIcon />
										</TuneIconButton>
									</>
								)}
							</>
						}
					>
						<CheckboxListItemIcon>
							<CheckboxStyled
								checked={visible}
								disabled={layer.masterVisible === false}
								onClick={() => handleToggleVisibility(visible)}
							/>
						</CheckboxListItemIcon>
						<ListItemText
							variant="layerlist"
							primary={layer.name || ''}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden' }}
						/>
						{props.buttons}
					</ListItemStyled>
					{layer.configurable && paintPropsFormVisible && (
						<>
							{props.showDeleteButton && (
								<>
									<DeleteIconButton edge="end" aria-label="delete" onClick={() => {}}>
										<DeleteIcon />
									</DeleteIconButton>
									{showDeletionConfirmationDialog && (
										<ConfirmDialog
											open={showDeletionConfirmationDialog}
											onConfirm={() => {
												setShowDeletionConfirmationDialog(false);
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
							<LayerPropertyForm layerUuid={layer.uuid} mapConfigKey={props.mapConfigKey} />
						</>
					)}
				</>
			);
		}
		if (layer?.type === 'vt') {
			return (
				<>
					<ListItemStyled key={layer.uuid} sx={{ ...props.listItemSx }} secondaryAction={undefined}>
						<ListItemIconStyled>
							<IconButtonStyled edge="end" aria-label="open" onClick={() => setOpen(!open)}>
								{open ? <ExpandMore /> : <ExpandLess />}
							</IconButtonStyled>
							<CheckboxListItemIcon>
								<CheckboxStyled
									checked={layer.visible}
									disabled={layer.masterVisible === false}
									onClick={() => handleToggleVisibility(layer.visible ?? false)}
								/>
							</CheckboxListItemIcon>
						</ListItemIconStyled>
						<ListItemText
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden' }}
						/>
					</ListItemStyled>
					<BoxStyled key={layer.uuid + '_list'} open={open}>
						<ListStyled disablePadding>
							{layer.config?.layers?.map((subLayer) => (
								<ListItemStyled
									key={subLayer.id}
									sx={{ ...props.listItemSx }}
									secondaryAction={undefined}
								>
									{' '}
									<ListItemIconStyled>
										<CheckboxListItemIcon>
											<CheckboxStyled
												checked={(subLayer?.layout?.visibility ?? 'visible') === 'visible'}
												disabled={subLayer?.masterVisible === false}
												onClick={() =>
													handleToggleVisibility(
														subLayer?.layout?.visibility === 'visible',
														subLayer.id
													)
												}
											/>
										</CheckboxListItemIcon>
									</ListItemIconStyled>
									<ListItemText
										key={subLayer.id}
										variant="layerlist"
										primary={subLayer['source-layer']}
										primaryTypographyProps={{ overflow: 'hidden' }}
									/>
								</ListItemStyled>
							))}
						</ListStyled>
					</BoxStyled>
				</>
			);
		}
		if (layer?.type === 'wms') {
			const visible = layer.config?.visible ?? true;
			return (
				<>
					<ListItemStyled key={layer.uuid} sx={{ ...props.listItemSx }} secondaryAction={undefined}>
						<CheckboxListItemIcon>
							<CheckboxStyled
								checked={visible}
								disabled={layer.masterVisible === false}
								onClick={() => handleToggleVisibility(visible)}
							/>
						</CheckboxListItemIcon>
						<ListItemText
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden' }}
						/>
					</ListItemStyled>
				</>
			);
		}
		if (layer.type === 'folder') {
			return (
				<>
					<ListItemStyled key={layer.uuid} sx={{ ...props.listItemSx }}>
						<ListItemIconStyled>
							<IconButtonStyled edge="end" aria-label="open" onClick={() => setOpen(!open)}>
								{open ? <ExpandMore /> : <ExpandLess />}
							</IconButtonStyled>
							<CheckboxListItemIcon>
								<CheckboxStyled
									checked={layer.visible}
									disabled={layer.masterVisible}
									onClick={() => handleToggleVisibility(layer.visible ? layer.visible : false)}
								/>
							</CheckboxListItemIcon>
						</ListItemIconStyled>
						<ListItemText
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden' }}
						/>
					</ListItemStyled>
					<BoxStyled key={layer.uuid + '_list'} open={open}>
						<ListStyled disablePadding>
							{props?.layerOrderConfig?.layers?.map((subLayer) => (
								<LayerTreeListItem
									layerOrderConfig={subLayer}
									key={subLayer.uuid}
									mapConfigKey={props.mapConfigKey}
								/>
							))}
						</ListStyled>
					</BoxStyled>
				</>
			);
		} else {
			return <></>;
		}
	}

	return <>{layer && renderLayerItem(layer)}</>;
}

export default LayerTreeListItem;
