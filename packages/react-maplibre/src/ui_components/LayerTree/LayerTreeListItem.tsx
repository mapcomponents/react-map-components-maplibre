import React, { useState, useCallback } from 'react';
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
	LayerConfig,
	LayerOrderItem,
	WmsLayerConfig,
	useLayerByUuid,
	useMapStore,
	setLayerInMapConfig,
	setMasterVisible,
	updateLayerOrder,
	moveInLayerOrderHelper,
} from '../../stores/map.store';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import TuneIcon from '@mui/icons-material/Tune';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
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
	buttons?: React.JSX.Element;
	sortable?: boolean;
	mapConfigKey: string;
	layerOrderConfig: LayerOrderItem;
	isFirst?: boolean;
	isLast?: boolean;
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
	const layer = useLayerByUuid(props.mapConfigKey, props.layerOrderConfig.uuid);
	const [open, setOpen] = useState(false);

	const moveLayer = useCallback(
		(uuid: string, getNewPos: (oldPos: number) => number) => {
			const mapConfig = useMapStore.getState().mapConfigs[props.mapConfigKey];
			if (!mapConfig) return;
			// Structural sharing – only clones the sibling array where the move happens
			const { result, found } = moveInLayerOrderHelper(
				mapConfig.layerOrder,
				uuid,
				getNewPos
			);
			if (found) {
				updateLayerOrder(props.mapConfigKey, result);
			}
		},
		[props.mapConfigKey]
	);

	const moveDown = useCallback(
(uuid: string) => {
			moveLayer(uuid, (idx) => idx + 1);
		},
		[moveLayer]
	);

	const moveUp = useCallback(
(uuid: string) => {
			moveLayer(uuid, (idx) => idx - 1);
		},
		[moveLayer]
	);

	const toggleVisible = useCallback(
(layer: LayerConfig, nextVisible: boolean, specificLayerId: string): LayerConfig => {
				let updatedLayer: LayerConfig = { ...layer };
			if (layer?.type === 'folder') {
				updatedLayer = {
					...layer,
					visible: nextVisible,
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
						const updatedSubLayers = layer.config.layers.map((l) => {
							if (l.id === specificLayerId) {
								updateSublayerOnly = true;
								return {
									...l,
									layout: {
										...l.layout,
										visibility: nextVisible ? 'visible' : 'none',
									},
								};
							}
							return l;
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
			setLayerInMapConfig(props.mapConfigKey, updatedLayer);
			return updatedLayer;
		},
		[props.mapConfigKey]
	);

	const handleToggleVisibility = useCallback(
		(visible: boolean, specificLayerId = '') => {
			// Read the latest layer from the store to avoid depending on the layer reference
			const currentLayer = useMapStore.getState().mapConfigs[props.mapConfigKey]
				?._layerIndex?.get(props.layerOrderConfig.uuid);
			if (!currentLayer) return;
			const nextVisible = !visible;
			toggleVisible(currentLayer, nextVisible, specificLayerId);
			if (currentLayer.type === 'folder' || (currentLayer.type === 'vt' && specificLayerId === '')) {
				setMasterVisible(props.mapConfigKey, currentLayer.uuid, nextVisible);
			}
		},
		[toggleVisible, props.mapConfigKey, props.layerOrderConfig.uuid]
	);

	const handleTogglePaintProps = useCallback(() => {
		setPaintPropsFormVisible((current) => !current);
	}, []);

	const handleToggleOpen = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	function renderLayerItem(layer: LayerConfig): React.ReactNode {
		const isSingleItem = props.isFirst && props.isLast;
		let visible = true;
		if (layer?.type === 'geojson') {
			// masterVisible:false overrides own visibility for the checkbox display
			visible = layer.masterVisible !== false && layer?.config?.options?.layout?.visibility !== 'none';
			return (
<>
					<ListItemStyled
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							<>
								{props?.buttons}
								{!isSingleItem && (
									<>
										<IconButtonStyled
											disabled={props.isLast}
											onClick={() => {
												moveDown(layer.uuid);
											}}
										>
											<ArrowCircleDownIcon />
										</IconButtonStyled>
										<IconButtonStyled
											disabled={props.isFirst}
											onClick={() => {
												moveUp(layer.uuid);
											}}
										>
											<ArrowCircleUpIcon />
										</IconButtonStyled>
									</>
								)}
								{layer.configurable && (
									<TuneIconButton
										edge={'end'}
										aria-label="settings"
										onClick={handleTogglePaintProps}
									>
										<TuneIcon />
									</TuneIconButton>
								)}
							</>
						}
					>
						<ListItemIconStyled>
							<CheckboxListItemIcon>
								<CheckboxStyled
									data-testid={`layer-checkbox-${layer.uuid}`}
									checked={visible}
									disabled={layer.masterVisible === false}
									onClick={() => handleToggleVisibility(visible)}
								/>
							</CheckboxListItemIcon>
						</ListItemIconStyled>
						<ListItemText
							variant="layerlist"
							primary={layer.name || ''}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis', noWrap: true }}
							sx={{ minWidth: 0, overflow: 'hidden' }}
						/>
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
			const vtVisible = layer.masterVisible !== false && (layer.visible ?? true);
			return (
<>
					<ListItemStyled
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							<>
								{props?.buttons}
								{!isSingleItem && (
									<>
										<IconButtonStyled
											disabled={props.isLast}
											onClick={() => moveDown(layer.uuid)}
										>
											<ArrowCircleDownIcon />
										</IconButtonStyled>
										<IconButtonStyled
											disabled={props.isFirst}
											onClick={() => moveUp(layer.uuid)}
										>
											<ArrowCircleUpIcon />
										</IconButtonStyled>
									</>
								)}
							</>
						}
					>
						<ListItemIconStyled>
							<IconButtonStyled edge="end" aria-label="open" onClick={handleToggleOpen}>
								{open ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
							</IconButtonStyled>
							<CheckboxListItemIcon>
								<CheckboxStyled
									data-testid={`layer-checkbox-${layer.uuid}`}
									checked={vtVisible}
									disabled={layer.masterVisible === false}
									onClick={() => handleToggleVisibility(vtVisible)}
								/>
							</CheckboxListItemIcon>
						</ListItemIconStyled>
						<ListItemText
							variant="layerlist"
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis', noWrap: true }}
							sx={{ minWidth: 0, overflow: 'hidden' }}
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
												data-testid={`layer-checkbox-${subLayer.id}`}
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
										primary={(subLayer as { [key: string]: unknown })['source-layer'] as string}
										primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis', noWrap: true }}
										sx={{ minWidth: 0, overflow: 'hidden' }}
									/>
								</ListItemStyled>
							))}
						</ListStyled>
					</BoxStyled>
				</>
			);
		}
		if (layer?.type === 'wms') {
			const visible = layer.masterVisible !== false && (layer.config?.visible ?? true);
			return (
<>
					<ListItemStyled
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							<>
								{props?.buttons}
								{!isSingleItem && (
									<>
										<IconButtonStyled
											disabled={props.isLast}
											onClick={() => moveDown(layer.uuid)}
										>
											<ArrowCircleDownIcon />
										</IconButtonStyled>
										<IconButtonStyled
											disabled={props.isFirst}
											onClick={() => moveUp(layer.uuid)}
										>
											<ArrowCircleUpIcon />
										</IconButtonStyled>
									</>
								)}
							</>
						}
					>
						<ListItemIconStyled>
							<CheckboxListItemIcon>
								<CheckboxStyled
									data-testid={`layer-checkbox-${layer.uuid}`}
									checked={visible}
									disabled={layer.masterVisible === false}
									onClick={() => handleToggleVisibility(visible)}
								/>
							</CheckboxListItemIcon>
						</ListItemIconStyled>
						<ListItemText
							variant="layerlist"
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis', noWrap: true }}
							sx={{ minWidth: 0, overflow: 'hidden' }}
					/>
					</ListItemStyled>
				</>
			);
		}
		if (layer.type === 'folder') {
			const folderVisible = layer.masterVisible !== false && (layer.visible ?? true);
			return (
<>
					<ListItemStyled
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							<>
								{props?.buttons}
								{!isSingleItem && (
									<>
										<IconButtonStyled
											disabled={props.isLast}
											onClick={() => moveDown(layer.uuid)}
										>
											<ArrowCircleDownIcon />
										</IconButtonStyled>
										<IconButtonStyled
											disabled={props.isFirst}
											onClick={() => moveUp(layer.uuid)}
										>
											<ArrowCircleUpIcon />
										</IconButtonStyled>
									</>
								)}
							</>
						}
					>
						<ListItemIconStyled>
							<IconButtonStyled edge="end" aria-label="open" onClick={handleToggleOpen}>
								{open ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
							</IconButtonStyled>
							<CheckboxListItemIcon>
								<CheckboxStyled
									data-testid={`layer-checkbox-${layer.uuid}`}
									checked={folderVisible}
									disabled={layer.masterVisible === false}
									onClick={() => handleToggleVisibility(folderVisible)}
								/>
							</CheckboxListItemIcon>
						</ListItemIconStyled>
						<ListItemText
							variant="layerlist"
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis', noWrap: true }}
							sx={{ minWidth: 0, overflow: 'hidden' }}
						/>
					</ListItemStyled>
					<BoxStyled key={layer.uuid + '_list'} open={open}>
						<ListStyled disablePadding>
					{props?.layerOrderConfig?.layers?.map((subLayer, idx, arr) => (
<MemoizedLayerTreeListItem
								layerOrderConfig={subLayer}
								key={subLayer.uuid}
								mapConfigKey={props.mapConfigKey}
								isFirst={idx === 0}
								isLast={idx === arr.length - 1}
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

const MemoizedLayerTreeListItem = React.memo(LayerTreeListItem);
export default MemoizedLayerTreeListItem;
