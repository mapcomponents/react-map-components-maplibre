import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateLayerOrder } from '../../stores/map.store';
import LayerTreeListItem from './LayerTreeListItem';

interface LayerOrderListProps {
	mapConfigUuid: string;
}

function LayerOrderList(props: LayerOrderListProps) {
	const dispatch = useDispatch();
	const layerOrder = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs[props.mapConfigUuid].layerOrder
	);
	const layers = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs[props.mapConfigUuid].layers
	);

	//TODO: move this to somewhere else. To a hook or in the store
	function getLayerByUuid(uuid: string) {
		for (const key in layers) {
			if (Object.prototype.hasOwnProperty.call(layers, key)) {
				const layer = layers[key];
				if (layer.uuid === uuid) {
					return layer;
				}
			}
		}
		return null;
	}

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
					<>
						<LayerTreeListItem
							visible={true}
							configurable={true}
							name={getLayerByUuid(item.uuid)?.name}
						></LayerTreeListItem>
					</>
				))}
			</ul>
			<button onClick={() => reorder(0, 1)}>Example reorder first and second</button>
		</div>
	);
}

export default LayerOrderList;
