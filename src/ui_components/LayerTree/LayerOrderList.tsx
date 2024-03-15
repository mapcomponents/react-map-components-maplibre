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
	const mapState = useSelector((state: RootState) => state.mapConfig);

	function reorder(startIndex: number, endIndex: number) {
		const result = [...layerOrder];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		dispatch(updateLayerOrder({ mapConfigUuid: props.mapConfigUuid, newOrder: result }));
	}

	return (
		<div>
			<ul>
				{layerOrder.map((layer) => (
					<LayerTreeListItem
						key={layer.uuid}
						visible={true}
						configurable={true}
						name={getLayerByUuid(mapState, layer.uuid)?.name || ''}
						layerId={layer.uuid}
						mapConfigId={props.mapConfigUuid}
					></LayerTreeListItem>
				))}
			</ul>
			<button onClick={() => reorder(0, 1)}>Example reorder first and second</button>
		</div>
	);
}

export default LayerOrderList;
