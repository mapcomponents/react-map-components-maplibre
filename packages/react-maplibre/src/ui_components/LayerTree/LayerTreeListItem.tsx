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
import { CheckboxListItemIcon, CheckboxStyled } from './styledComponents';
import {
	LayerConfig,
	LayerOrderItem,
	WmsLayerConfig,
	useLayerByUuid,
	useMapStore,
	setLayerInMapConfig,
	setMasterVisible,
	updateLayerOrder,
	reorderInLayerOrderHelper,
	moveInLayerOrderHelper,
} from '../../stores/map.store';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteIcon from '@mui/icons-material/Delete';
import TuneIcon from '@mui/icons-material/Tune';
import ConfirmDialog from '../ConfirmDialog';
import LayerPropertyForm from './util/LayerPropertyForm';
import {
	DragScopeProvider,
	useDragReorder,
	DragHandle,
	DropIndicator,
	type ReorderMode,
} from './useDragReorder';
import { STYLE_LAYER_UUID_SET } from './styleLayerUuids';

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
	/** Store key – defaults to `'map_1'`. */
	mapId: string;
	layerOrderConfig: LayerOrderItem;
	/** Reorder UI mode inherited from LayerTree. */
	reorderMode?: ReorderMode;
	/** Position flags for arrow-button disabled state. */
	isFirst?: boolean;
	isLast?: boolean;
	/** Number of reorderable (non-style-pinned) siblings at this level. When ≤ 1 all reorder UI is hidden. */
	reorderableSiblingCount?: number;
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
	const layer = useLayerByUuid(props.mapId, props.layerOrderConfig.uuid);
	const [open, setOpen] = useState(false);

	const reorderMode = props.reorderMode ?? 'both';
	// Style background/labels layers must never be reordered
	const isStyleLayer = STYLE_LAYER_UUID_SET.has(props.layerOrderConfig.uuid);
	const effectiveReorderMode: ReorderMode = isStyleLayer ? 'none' : reorderMode;
	// Hide all reorder UI when this item is the only reorderable sibling
	const aloneAtLevel = (props.reorderableSiblingCount ?? 0) <= 1;
	const showDnD = !aloneAtLevel && (effectiveReorderMode === 'dnd' || effectiveReorderMode === 'both');
	const showArrows = !aloneAtLevel && (effectiveReorderMode === 'arrows' || effectiveReorderMode === 'both');
	const isSingleItem = props.isFirst && props.isLast;

	// ── DnD reorder callback ───────────────────────────────────

	const onReorder = useCallback(
		(draggedUuid: string, targetUuid: string, position: 'before' | 'after') => {
			const mapConfig = useMapStore.getState().mapConfigs[props.mapId];
			if (!mapConfig) return;
			const { result, found } = reorderInLayerOrderHelper(
				mapConfig.layerOrder,
				draggedUuid,
				targetUuid,
				position
			);
			if (found) {
				updateLayerOrder(props.mapId, result);
			}
		},
		[props.mapId]
	);

	const { rowProps, dragHandleProps, showIndicatorAbove, showIndicatorBelow } = useDragReorder({
		uuid: props.layerOrderConfig.uuid,
		onReorder,
		enabled: showDnD,
	});

	// ── Arrow-button move callbacks ────────────────────────────

	const moveDown = useCallback(
		(uuid: string) => {
			const mapConfig = useMapStore.getState().mapConfigs[props.mapId];
			if (!mapConfig) return;
			const { result, found } = moveInLayerOrderHelper(mapConfig.layerOrder, uuid, (i) => i + 1);
			if (found) updateLayerOrder(props.mapId, result);
		},
		[props.mapId]
	);

	const moveUp = useCallback(
		(uuid: string) => {
			const mapConfig = useMapStore.getState().mapConfigs[props.mapId];
			if (!mapConfig) return;
			const { result, found } = moveInLayerOrderHelper(mapConfig.layerOrder, uuid, (i) => i - 1);
			if (found) updateLayerOrder(props.mapId, result);
		},
		[props.mapId]
	);

	// ── Visibility toggle ──────────────────────────────────────

	const toggleVisible = useCallback(
		(layer: LayerConfig, nextVisible: boolean, specificLayerId: string): LayerConfig => {
			let updatedLayer: LayerConfig = { ...layer };
			if (layer?.type === 'folder') {
				updatedLayer = { ...layer, visible: nextVisible };
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
									layout: { ...l.layout, visibility: nextVisible ? 'visible' : 'none' },
								};
							}
							return l;
						});
						if (updateSublayerOnly) {
							updatedLayer = {
								...layer,
								config: { ...layer.config, layers: updatedSubLayers },
							} as LayerConfig;
						} else {
							updatedLayer = {
								...layer,
								visible: nextVisible,
								config: { ...layer.config, layers: updatedSubLayers },
							} as LayerConfig;
						}
						break;
					}
					case 'wms': {
						updatedLayer = {
							...layer,
							visible: nextVisible,
							config: { ...layer.config, visible: nextVisible },
						} as WmsLayerConfig;
						break;
					}
				}
			}
			setLayerInMapConfig(props.mapId, updatedLayer);
			return updatedLayer;
		},
		[props.mapId]
	);

	const handleToggleVisibility = useCallback(
		(visible: boolean, specificLayerId = '') => {
			const currentLayer = useMapStore.getState().mapConfigs[props.mapId]
				?._layerIndex?.get(props.layerOrderConfig.uuid);
			if (!currentLayer) return;
			const nextVisible = !visible;
			toggleVisible(currentLayer, nextVisible, specificLayerId);
			if (currentLayer.type === 'folder' || (currentLayer.type === 'vt' && specificLayerId === '')) {
				setMasterVisible(props.mapId, currentLayer.uuid, nextVisible);
			}
		},
		[toggleVisible, props.mapId, props.layerOrderConfig.uuid]
	);

	const handleTogglePaintProps = useCallback(() => {
		setPaintPropsFormVisible((current) => !current);
	}, []);

	const handleToggleOpen = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	// ── Shared arrow buttons fragment ──────────────────────────

	function ArrowButtons({ uuid }: { uuid: string }) {
		if (!showArrows || isSingleItem) return null;
		return (
			<>
				<IconButtonStyled disabled={props.isLast} onClick={() => moveDown(uuid)}>
					<ArrowCircleDownIcon />
				</IconButtonStyled>
				<IconButtonStyled disabled={props.isFirst} onClick={() => moveUp(uuid)}>
					<ArrowCircleUpIcon />
				</IconButtonStyled>
			</>
		);
	}

	// ── Render per layer type ──────────────────────────────────

	function renderLayerItem(layer: LayerConfig): React.ReactNode {
		if (layer?.type === 'geojson') {
			const visible = layer.masterVisible !== false && layer?.config?.options?.layout?.visibility !== 'none';
			return (
				<>
					{showIndicatorAbove && <DropIndicator />}
					<ListItemStyled
						{...rowProps}
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							<>
								{props?.buttons}
								<ArrowButtons uuid={layer.uuid} />
								{layer.configurable && (
									<TuneIconButton edge="end" aria-label="settings" onClick={handleTogglePaintProps}>
										<TuneIcon />
									</TuneIconButton>
								)}
							</>
						}
					>
						<DragHandle {...dragHandleProps} />
						<CheckboxListItemIcon>
							<CheckboxStyled
								data-testid={`layer-checkbox-${layer.uuid}`}
								checked={visible}
								disabled={layer.masterVisible === false}
								onClick={() => handleToggleVisibility(visible)}
							/>
						</CheckboxListItemIcon>
						<ListItemText
							variant="layerlist"
							primary={layer.name || ''}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis', noWrap: true }}
							sx={{ minWidth: 0, overflow: 'hidden' }}
						/>
					</ListItemStyled>
					{showIndicatorBelow && <DropIndicator />}
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
											onConfirm={() => setShowDeletionConfirmationDialog(false)}
											onCancel={() => setShowDeletionConfirmationDialog(false)}
											title="Delete layer"
											text="Are you sure you want to delete this layer?"
										/>
									)}
								</>
							)}
							<LayerPropertyForm layerUuid={layer.uuid} mapId={props.mapId} />
						</>
					)}
				</>
			);
		}
		if (layer?.type === 'vt') {
			const vtVisible = layer.masterVisible !== false && (layer.visible ?? true);
			return (
				<>
					{showIndicatorAbove && <DropIndicator />}
					<ListItemStyled
						{...rowProps}
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							<>
								{props?.buttons}
								<ArrowButtons uuid={layer.uuid} />
							</>
						}
					>
						<DragHandle {...dragHandleProps} />
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
						<ListItemText
							variant="layerlist"
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis', noWrap: true }}
							sx={{ minWidth: 0, overflow: 'hidden' }}
						/>
					</ListItemStyled>
					{showIndicatorBelow && <DropIndicator />}
					<BoxStyled key={layer.uuid + '_list'} open={open}>
						<ListStyled disablePadding>
							{layer.config?.layers?.map((subLayer) => (
								<ListItemStyled key={subLayer.id} sx={{ ...props.listItemSx }}>
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
					{showIndicatorAbove && <DropIndicator />}
					<ListItemStyled
						{...rowProps}
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							<>
								{props?.buttons}
								<ArrowButtons uuid={layer.uuid} />
							</>
						}
					>
						<DragHandle {...dragHandleProps} />
						<CheckboxListItemIcon>
							<CheckboxStyled
								data-testid={`layer-checkbox-${layer.uuid}`}
								checked={visible}
								disabled={layer.masterVisible === false}
								onClick={() => handleToggleVisibility(visible)}
							/>
						</CheckboxListItemIcon>
						<ListItemText
							variant="layerlist"
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis', noWrap: true }}
							sx={{ minWidth: 0, overflow: 'hidden' }}
						/>
					</ListItemStyled>
					{showIndicatorBelow && <DropIndicator />}
				</>
			);
		}
		if (layer.type === 'folder') {
			const folderVisible = layer.masterVisible !== false && (layer.visible ?? true);

			const folderLayers = props?.layerOrderConfig?.layers;
			const folderReorderableCount = folderLayers?.filter(
				(s) => !STYLE_LAYER_UUID_SET.has(s.uuid)
			).length ?? 0;

			const children = folderLayers?.map((subLayer, idx, arr) => (
				<MemoizedLayerTreeListItem
					layerOrderConfig={subLayer}
					key={subLayer.uuid}
					mapId={props.mapId}
					reorderMode={effectiveReorderMode}
					isFirst={idx === 0}
					isLast={idx === arr.length - 1}
					reorderableSiblingCount={folderReorderableCount}
				/>
			));

			return (
				<>
					{showIndicatorAbove && <DropIndicator />}
					<ListItemStyled
						{...rowProps}
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							<>
								{props?.buttons}
								<ArrowButtons uuid={layer.uuid} />
							</>
						}
					>
						<DragHandle {...dragHandleProps} />
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
						<ListItemText
							variant="layerlist"
							primary={layer.name}
							secondary={props.description}
							primaryTypographyProps={{ overflow: 'hidden', textOverflow: 'ellipsis', noWrap: true }}
							sx={{ minWidth: 0, overflow: 'hidden' }}
						/>
					</ListItemStyled>
					{showIndicatorBelow && <DropIndicator />}
					<BoxStyled key={layer.uuid + '_list'} open={open}>
						<ListStyled disablePadding>
							{showDnD ? <DragScopeProvider>{children}</DragScopeProvider> : children}
						</ListStyled>
					</BoxStyled>
				</>
			);
		}
		return null;
	}

	return <>{layer && renderLayerItem(layer)}</>;
}

const MemoizedLayerTreeListItem = React.memo(LayerTreeListItem);
export default MemoizedLayerTreeListItem;