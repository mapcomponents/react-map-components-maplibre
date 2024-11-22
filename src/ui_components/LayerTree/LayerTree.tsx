import React from 'react';
import { useSelector } from 'react-redux';
import { LayerOrderItem, RootState } from '../../stores/map.store';
import LayerTreeListItem from './LayerTreeListItem';
import { List, styled } from '@mui/material';

interface LayerTreeProps {
	mapConfigKey: string;
}

const ListStyled = styled(List)({
	marginTop: '15px',
});

function LayerTree(props: LayerTreeProps) {
	const layerOrder = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs?.[props.mapConfigKey]?.layerOrder
	);

	return (
		<ListStyled>
			{layerOrder?.map?.((el: LayerOrderItem) => (
				<LayerTreeListItem
					key={el.uuid}
					layerOrderConfig={el}
					mapConfigKey={props.mapConfigKey}
				></LayerTreeListItem>
			))}
		</ListStyled>
	);
}

export default LayerTree;
