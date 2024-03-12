import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateLayerOrder, getLayerByUuid } from '../../stores/map.store';
import LayerTreeListItem from './LayerTreeListItem';

interface LayerOrderListProps {
	mapConfigUuid: string;
}

function LayerOrderList(props: LayerOrderListProps) {
	const dispatch = useDispatch();
	const layerOrder = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs[props.mapConfigUuid].layerOrder
	);


	function reorder(startIndex: number, endIndex: number) {
		const result = [...layerOrder];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		dispatch(updateLayerOrder({ mapConfigUuid: props.mapConfigUuid, newOrder: result }));
	}

	return (
		<div>
			<h2>Layer Order</h2>
			<ul>
				{layerOrder.map((item) => (
						<LayerTreeListItem
							key={item.uuid}
							visible={true}
							configurable={true}
							//name={getLayerByUuid(state, item.uuid)?.name || "" }
							name={getLayerByUuid(useSelector((state: RootState) => state.mapConfig), item.uuid)?.name || ""}
							layerId={item.uuid}
						></LayerTreeListItem>
				))}
			</ul>
			<button onClick={() => reorder(0, 1)}>Example reorder first and second</button>
		</div>
	);
}

export default LayerOrderList;
