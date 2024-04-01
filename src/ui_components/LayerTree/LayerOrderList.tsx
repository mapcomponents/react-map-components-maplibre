import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateLayerOrder, getLayerByUuid } from '../../stores/map.store';
import LayerTreeListItem from './LayerTreeListItem';

interface LayerOrderListProps {
	mapConfigKey: string;
}

function LayerOrderList(props: LayerOrderListProps) {
	const dispatch = useDispatch();
	const layerOrder = useSelector(
		(state: RootState) => state.mapConfig.mapConfigs?.[props.mapConfigKey]?.layerOrder
	);
	const mapState = useSelector((state: RootState) => state.mapConfig);

	function reorder(startIndex: number, endIndex: number) {
		const result = [...layerOrder];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		dispatch(updateLayerOrder({ mapConfigKey: props.mapConfigKey, newOrder: result }));
	}
	console.log(layerOrder)

	return (
		<div>
			<ul>
				{layerOrder?.map?.((layer) => (
					<LayerTreeListItem
						key={layer.uuid}
						visible={true}
						configurable={true}
						name={getLayerByUuid(mapState, layer.uuid)?.name || ''}
						layerOrderConfig={layer}
						mapConfigKey={props.mapConfigKey}
					></LayerTreeListItem>
				))}
			</ul>
			<button onClick={() => reorder(0, 1)}>Example reorder first and second</button>
		</div>
	);
}

export default LayerOrderList;
