import React, { useState } from 'react';
import {
	ListItemText,
	SxProps,
	List,
	styled,
	Box,
	IconButton,
	ListItem,
	ListItemIcon,
} from '@mui/material';
import { CheckboxListItemIcon, CheckboxStyled } from '../LayerList/util/LayerListItemVectorLayer';
import {
	getLayerByUuid,
	LayerConfig,
	RootState,
	setLayerInMapConfig,
	setMasterVisible,
	updateLayerOrder,
} from '../../stores/map.store';
import { useDispatch, useSelector } from 'react-redux';
import { LayerOrderItem } from '../../stores/map.store';
import { KeyboardArrowRight as ExpandLess, ExpandMore } from '@mui/icons-material';
import { Delete as DeleteIcon, Tune as TuneIcon } from '@mui/icons-material';
import ConfirmDialog from '../ConfirmDialog';
import LayerPropertyForm from './util/LayerPropertyForm';
import {
	ArrowCircleDown as ArrowCircleDownIcon,
	ArrowCircleUp as ArrowCircleUpIcon,
} from '@mui/icons-material';

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

	function handleToggleVisibility(visible: boolean) {
		const nextVisible = !visible;
		if (layer) {
			toggleVisible(layer, nextVisible);
			if (layer.type === 'folder') {
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

	function toggleVisible(layer: LayerConfig, nextVisible: boolean): LayerConfig {
		//TODO: update layout for all layer types
		let updatedLayer = layer;
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
							...layer?.config,
							layout: {
								...layer?.config?.layout,
								visibility: nextVisible ? 'visible' : 'none',
							},
						},
					} as LayerConfig;
					break;
				}
				case 'vt': {
					const updatedLayers = layer.config.layers.map((layer) => ({
						...layer,
						layout: {
							...layer.layout,
							visibility: nextVisible ? 'visible' : 'none',
						},
					}));
					updatedLayer = {
						...layer,
						config: {
							...layer.config,
							layers: updatedLayers,
						},
					} as LayerConfig;
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
			visible = layer?.config?.layout?.visibility !== 'none';
			return (
				<>
					<ListItemStyled
						key={layer.uuid}
						sx={{ ...props.listItemSx }}
						secondaryAction={
							layer.configurable ? (
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
							) : undefined
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
			visible = layer.config.layers.every((l) => l.layout?.visibility !== 'none');
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
					</ListItemStyled>

					<ListItemText
						variant="layerlist"
						primary={layer.name || ''}
						secondary={props.description}
						primaryTypographyProps={{ overflow: 'hidden' }}
					/>
				</>
			);
		}
		if (layer?.type === 'wms') {
			//TODO: handle wms
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
									checked={layer?.visible}
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
			return (
				<ListItemStyled key={layer.uuid} sx={{ ...props.listItemSx }}>
					<CheckboxListItemIcon>
						<CheckboxStyled checked={visible} onClick={() => handleToggleVisibility(visible)} />
					</CheckboxListItemIcon>
					<ListItemText
						variant="layerlist"
						primary={layer.name || ''}
						secondary={props.description}
						primaryTypographyProps={{ overflow: 'hidden' }}
					/>
					{props.buttons}
				</ListItemStyled>
			);
		}
	}

	return <>{layer && renderLayerItem(layer)}</>;
}

export default LayerTreeListItem;
