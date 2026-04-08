import { useLayerOrder, LayerOrderItem } from '../../stores/map.store';
import LayerTreeListItem from './LayerTreeListItem';
import { List, Stack, styled } from '@mui/material';
import React from 'react';
import SelectStyleButton, {
	SelectStyleButtonProps,
} from '../SelectStyleButton/SelectStyleButton';
import AddLayerButton, {
	AddLayerButtonProps,
} from '../AddLayerButton/AddLayerButton';

export interface LayerTreeProps {
	mapConfigKey: string;
	/** Show a "Select Style" button above the layer list. Pass `true` for defaults or an object to customise. */
	selectStyleButton?: boolean | Omit<SelectStyleButtonProps, 'mapConfigKey'>;
	/** Show an "Add Layer" button above the layer list. Pass `true` for defaults or an object to customise. */
	addLayerButton?: boolean | Omit<AddLayerButtonProps, 'mapConfigKey'>;
	/** Extra React nodes rendered inside the toolbar row (between the built-in buttons). */
	toolbarExtra?: React.ReactNode;
}

const ListStyled = styled(List)({
	marginTop: 0,
});

function LayerTree(props: LayerTreeProps) {
	const layerOrder = useLayerOrder(props.mapConfigKey);

	const showToolbar = props.selectStyleButton || props.addLayerButton || props.toolbarExtra;

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
							mapConfigKey={props.mapConfigKey}
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
				{layerOrder?.map?.((el: LayerOrderItem, idx: number, arr: LayerOrderItem[]) => (
					<LayerTreeListItem
						key={el.uuid}
						layerOrderConfig={el}
						mapConfigKey={props.mapConfigKey}
						isFirst={idx === 0}
						isLast={idx === arr.length - 1}
					/>
				))}
			</ListStyled>
		</>
	);
}

export default React.memo(LayerTree);
