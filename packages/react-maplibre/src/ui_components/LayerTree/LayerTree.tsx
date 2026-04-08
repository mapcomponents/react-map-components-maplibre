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
			{layerOrder?.map?.((el: LayerOrderItem) => (
				<LayerTreeListItem
					key={el.uuid}
					layerOrderConfig={el}
					mapConfigKey={props.mapConfigKey}
				/>
			))}
		</ListStyled>
	);
}

export default React.memo(LayerTree);
