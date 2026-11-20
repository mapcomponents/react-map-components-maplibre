import { useMemo } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { useThreeModel, UseThreeModelProps, ModelLoader } from '../../hooks/useThreeModel';

/**
 * Renders obj or gltf 3D Models on the MapLibreMap
 *
 * @component
 */

export type MlThreeModelLayerProps = Omit<UseThreeModelProps, 'loaders'> & {
	mapId?: string;
};

const MlThreeModelLayer = (props: MlThreeModelLayerProps) => {
	const { url, position, transform, init, onDone, onError, customLoaders } = props;

	const loaders = useMemo<Record<string, ModelLoader>>(
		() => ({
			gltf: (url, onLoad, onError) => {
				const loader = new GLTFLoader();
				loader.load(url, (gltf) => onLoad(gltf.scene), undefined, onError);
			},
			glb: (url, onLoad, onError) => {
				const loader = new GLTFLoader();
				loader.load(url, (gltf) => onLoad(gltf.scene), undefined, onError);
			},
			obj: (url, onLoad, onError) => {
				const loader = new OBJLoader();
				loader.load(url, (obj) => onLoad(obj), undefined, onError);
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

export default MlThreeModelLayer;
