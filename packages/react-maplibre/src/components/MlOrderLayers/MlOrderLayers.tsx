import MlLayer from '../MlLayer/MlLayer';

export interface MlOrderLayersProps {
	/**
	 * Id of the target MapLibre instance in mapContext
	 */
	mapId?: string;
	layerIds: string[];
	insertBeforeLayer?: string;
}

/**
 * Creates an invisible layer for each entry in props.layerIds with the id `order-{entry}` and a reliable order
 *
 */
const MlOrderLayers = (props: MlOrderLayersProps) => {
	const reversedLayerIds = props?.layerIds.toReversed();

	return (
		<>
			{reversedLayerIds &&
				reversedLayerIds.map((layer, idx) => {
					const insertBeforeLayer = idx > 0 ? reversedLayerIds[idx - 1] : props.insertBeforeLayer;
					return <MlLayer layerId={layer} key={layer} insertBeforeLayer={insertBeforeLayer} />;
				})}
		</>
	);
};

export default MlOrderLayers;
