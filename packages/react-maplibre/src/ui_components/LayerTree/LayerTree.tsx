import { useLayerOrder, LayerOrderItem } from '../../stores/map.store';
import LayerTreeListItem from './LayerTreeListItem';
import { DragScopeProvider, type ReorderMode } from './useDragReorder';
import { STYLE_LAYER_UUIDS, STYLE_LAYER_UUID_SET } from './styleLayerUuids';
import { List, Stack, styled } from '@mui/material';
import React, { useMemo } from 'react';
import SelectStyleButton, {
	SelectStyleButtonProps,
} from '../SelectStyleButton/SelectStyleButton';
import AddLayerButton, {
	AddLayerButtonProps,
} from '../AddLayerButton/AddLayerButton';

export interface LayerTreeProps {
	/** Store key – defaults to `'map_1'` (same as the default MapLibreMap mapId). */
	mapId?: string;
	/** Show a "Select Style" button above the layer list. Pass `true` for defaults or an object to customise. */
	selectStyleButton?: boolean | Omit<SelectStyleButtonProps, 'mapId'>;
	/** Show an "Add Layer" button above the layer list. Pass `true` for defaults or an object to customise. */
	addLayerButton?: boolean | Omit<AddLayerButtonProps, 'mapId'>;
	/** Extra React nodes rendered inside the toolbar row (between the built-in buttons). */
	toolbarExtra?: React.ReactNode;
	/**
	 * How users can reorder layers:
	 * - `'dnd'` – drag handle only
	 * - `'arrows'` – up / down arrow buttons only
	 * - `'both'` – drag handle **and** arrow buttons (default)
	 * - `'none'` – reordering disabled
	 */
	reorderMode?: ReorderMode;
	/** Show background style layers in the tree (default `true`). */
	showBackground?: boolean;
	/** Show label style layers in the tree (default `true`). */
	showLabels?: boolean;
}

const ListStyled = styled(List)({
	marginTop: 0,
});

function LayerTree(props: LayerTreeProps) {
	const mapId = props.mapId ?? 'map_1';
	const layerOrder = useLayerOrder(mapId);
	const reorderMode = props.reorderMode ?? 'both';
	const showBackground = props.showBackground ?? true;
	const showLabels = props.showLabels ?? true;

	// Filter out background / labels folders when hidden
	const filteredOrder = useMemo(() => {
		if (!layerOrder) return undefined;
		if (showBackground && showLabels) return layerOrder;
		return layerOrder.filter((item) => {
			if (!showBackground && STYLE_LAYER_UUIDS.bgFolder === item.uuid) return false;
			if (!showLabels && STYLE_LAYER_UUIDS.labelsFolder === item.uuid) return false;
			return true;
		});
	}, [layerOrder, showBackground, showLabels]);

	const showToolbar = props.selectStyleButton || props.addLayerButton || props.toolbarExtra;
	const showDragScope = reorderMode === 'dnd' || reorderMode === 'both';

	// Count how many siblings are actually reorderable (not pinned style layers)
	const reorderableSiblingCount = useMemo(
		() => filteredOrder?.filter((el) => !STYLE_LAYER_UUID_SET.has(el.uuid)).length ?? 0,
		[filteredOrder]
	);

	const items = filteredOrder?.map?.((el: LayerOrderItem, idx: number, arr: LayerOrderItem[]) => (
		<LayerTreeListItem
			key={el.uuid}
			layerOrderConfig={el}
			mapId={mapId}
			reorderMode={reorderMode}
			isFirst={idx === 0}
			isLast={idx === arr.length - 1}
			reorderableSiblingCount={reorderableSiblingCount}
		/>
	));

	return (
		<>
			{showToolbar && (
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					sx={{ px: 1, pt: 1 }}
				>
					{props.selectStyleButton && (
						<SelectStyleButton
							mapId={mapId}
							{...(typeof props.selectStyleButton === 'object'
								? props.selectStyleButton
								: {})}
						/>
					)}
					{props.addLayerButton && (
						<AddLayerButton
							{...(typeof props.addLayerButton === 'object'
								? props.addLayerButton
								: {})}
						/>
					)}
					{props.toolbarExtra}
				</Stack>
			)}
			<ListStyled>
				{showDragScope ? <DragScopeProvider>{items}</DragScopeProvider> : items}
			</ListStyled>
		</>
	);
}

export default React.memo(LayerTree);
