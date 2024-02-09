import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, updateLayerOrder } from '../../stores/map.store';

interface LayerOrderListProps {
	mapConfigUuid: string;
}

function LayerOrderList(props: LayerOrderListProps) {
	const dispatch = useDispatch();
	const layerOrder = useSelector(
		(state: AppState) => state.mapConfigs[props.mapConfigUuid].layerOrder
	);
	//const layerOrder = store.getState().mapConfig.mapConfigs[props.mapConfigUuid].layerOrder;
	const reorder = (startIndex: number, endIndex: number) => {
		const result = [...layerOrder];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		dispatch(updateLayerOrder({ mapConfigUuid: props.mapConfigUuid, newOrder: result }));
	};

	return (
		<div>
			<h2>Layer Order</h2>
			<ul>
				{layerOrder.map((item) => (
					<li key={item.uuid}>{item.uuid}</li>
				))}
			</ul>
			<button onClick={() => reorder(0, 1)}>Example reorder first and second</button>
		</div>
	);
}

export default LayerOrderList;
