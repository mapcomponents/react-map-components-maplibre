import { useMemo } from 'react';
import { SplatLoader } from '../../lib/splats/loaders/SplatLoader';
import { PlySplatLoader } from '../../lib/splats/loaders/PlySplatLoader';
import { useThreeModel, UseThreeModelProps, ModelLoader } from '../../hooks/useThreeModel';

/**
 * Renders splat 3D Models on the MapLibreMap
 *
 * @component
 */

export type MlThreeSplatLayerProps = Omit<UseThreeModelProps, 'loaders'> & {
	mapId?: string;
};

const MlThreeSplatLayer = (props: MlThreeSplatLayerProps) => {
	const { url, position, transform, init, onDone, onError, customLoaders } = props;

	const loaders = useMemo<Record<string, ModelLoader>>(
		() => ({
			splat: (url, onLoad, onError) => {
				const loader = new SplatLoader();
				loader.load(url, (splatMesh) => onLoad(splatMesh), undefined, onError);
			},
			ply: (url, onLoad, onError) => {
				const loader = new PlySplatLoader();
				loader.load(url, (splatMesh) => onLoad(splatMesh), undefined, onError);
			},
		}),
		[]
	);

	useThreeModel({
		url,
		position,
		transform,
		init,
		onDone,
		onError,
		loaders,
		customLoaders,
	});

	return null;
};

export default MlThreeSplatLayer;
