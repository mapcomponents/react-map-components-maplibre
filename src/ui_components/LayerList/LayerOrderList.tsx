import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateLayerOrder, AppState } from '../../stores/map.store';

interface LayerOrderListProps {
	mapConfigUuid: string;
}

function LayerOrderList(props: LayerOrderListProps) {
	const dispatch = useDispatch();
	const layerOrder = useSelector(
		(state: AppState) => state.mapConfigs[props.mapConfigUuid].layerOrder || []
	);

	const reorder = (startIndex: number, endIndex: number) => {
		const result = Array.from(layerOrder);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		// Dispatch the action to update the layer order in the Redux store
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
