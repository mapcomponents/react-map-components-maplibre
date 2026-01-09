import { useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { useThreeModel, UseThreeModelProps } from '../../hooks/useThreeModel';

/**
 * Renders obj or gltf 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */

export type MlThreeModelLayerProps = Omit<UseThreeModelProps, 'loadFn'> & {
	mapId?: string; // Kept for compatibility but unused
};

const MlThreeModelLayer = (props: MlThreeModelLayerProps) => {
	const {
		url,
		position,
		transform,
		init,
		onDone,
	} = props;

	const loadFn = useCallback((url: string, onLoad: (object: THREE.Object3D) => void) => {
		// Robust extension extraction
		let extension = '';
		try {
			// Handle absolute and relative URLs
			const urlObj = new URL(url, window.location.origin);
			extension = urlObj.pathname.split('.').pop()?.toLowerCase() || '';
		} catch (e) {
			// Fallback for simple strings or malformed URLs
			extension = url.split('.').pop()?.toLowerCase() || '';
		}

		if (extension === 'glb' || extension === 'gltf') {
			const loader = new GLTFLoader();
			loader.load(url, (gltf) => {
				onLoad(gltf.scene);
			});
		} else if (extension === 'obj') {
			const loader = new OBJLoader();
			loader.load(url, (obj) => {
				onLoad(obj);
			});
		} else {
			console.warn('MlThreeModelLayer: Unsupported file extension', extension);
		}
	}, []);

	useThreeModel({
		url,
		position,
		transform,
		init,
		onDone,
		loadFn
	});

	return null;
};

export default MlThreeModelLayer;