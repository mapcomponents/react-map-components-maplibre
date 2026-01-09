import { useCallback } from 'react';
import * as THREE from 'three';
import { SplatLoader } from '../../lib/splats/loaders/SplatLoader';
import { PlySplatLoader } from '../../lib/splats/loaders/PlySplatLoader';
import { useThreeModel, UseThreeModelProps } from '../../hooks/useThreeModel';

/**
 * Renders splat 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */

export type MlThreeSplatLayerProps = Omit<UseThreeModelProps, 'loadFn'> & {
	mapId?: string;
};

const MlThreeSplatLayer = (props: MlThreeSplatLayerProps) => {
	const {
		url,
		position,
		transform,
		init,
		onDone,
	} = props;

	const loadFn = useCallback((url: string, onLoad: (object: THREE.Object3D) => void) => {
		let extension = '';
		try {
			const urlObj = new URL(url, window.location.origin);
			extension = urlObj.pathname.split('.').pop()?.toLowerCase() || '';
		} catch (e) {
			extension = url.split('.').pop()?.toLowerCase() || '';
		}

		if (extension === 'splat') {
			const loader = new SplatLoader();
			loader.load(url, (splatMesh) => {
				onLoad(splatMesh);
			});
		} else if (extension === 'ply') {
			const loader = new PlySplatLoader();
			loader.load(url, (splatMesh) => {
				onLoad(splatMesh);
			});
		} else {
			console.warn('MlThreeSplatLayer: Unsupported file extension', extension);
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

export default MlThreeSplatLayer;
