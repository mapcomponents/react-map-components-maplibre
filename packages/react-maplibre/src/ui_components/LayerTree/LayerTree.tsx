import { useLayerOrder, LayerOrderItem } from '../../stores/map.store';
import LayerTreeListItem from './LayerTreeListItem';
import { List, styled } from '@mui/material';
import React from 'react';

interface LayerTreeProps {
	mapConfigKey: string;
}

const ListStyled = styled(List)({
	marginTop: '15px',
});

function LayerTree(props: LayerTreeProps) {
	const layerOrder = useLayerOrder(props.mapConfigKey);

	return (
		<ListStyled>
			{layerOrder?.slice().reverse().map?.((el: LayerOrderItem, reversedIdx: number, arr: LayerOrderItem[]) => {
				// isFirst/isLast reflect position in the *original* array (= map z-order)
				// so the bottom item in the list (last in reversed) is index 0 in original → isFirst
				const originalIdx = arr.length - 1 - reversedIdx;
				return (
					<LayerTreeListItem
						key={el.uuid}
						layerOrderConfig={el}
						mapConfigKey={props.mapConfigKey}
						isFirst={originalIdx === 0}
						isLast={originalIdx === arr.length - 1}
					/>
				);
			})}
		</ListStyled>
	);
}

export default React.memo(LayerTree);
