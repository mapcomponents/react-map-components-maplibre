import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '../ThreeContext';
import { SplatLoader } from '../../lib/splats/loaders/SplatLoader';
import { PlySplatLoader } from '../../lib/splats/loaders/PlySplatLoader';

/**
 * Renders splat 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */

export interface MlThreeSplatLayerProps {
	mapId?: string;
	url: string;
	position?: { x: number; y: number; z: number };
	rotation?: { x: number; y: number; z: number };
	scale?: { x: number; y: number; z: number } | number;
	init?: () => void;
	onDone?: () => void;
}

const MlThreeSplatLayer = (props: MlThreeSplatLayerProps) => {
	const { scene } = useThree();
	const modelRef = useRef<THREE.Object3D | undefined>(undefined);
	const [model, setModel] = useState<THREE.Object3D | undefined>(undefined);

	useEffect(() => {
		if (!scene) return;

		if (typeof props.init === 'function') {
			props.init();
		}

		const extension = props.url.split('.').pop()?.toLowerCase();

		const onLoad = (object: THREE.Object3D) => {
			modelRef.current = object;
			scene.add(object);
			setModel(object);
			if (typeof props.onDone === 'function') {
				props.onDone();
			}
		};

		if (extension === 'splat') {
			const loader = new SplatLoader();
			loader.load(props.url, (splatMesh) => {
				onLoad(splatMesh);
			});
		} else if (extension === 'ply') {
			const loader = new PlySplatLoader();
			loader.load(props.url, (splatMesh) => {
				onLoad(splatMesh);
			});
		} else {
			console.warn('MlThreeSplatLayer: Unsupported file extension', extension);
		}

		return () => {
			if (modelRef.current) {
				scene.remove(modelRef.current);
                if ('dispose' in modelRef.current && typeof modelRef.current.dispose === 'function') {
                    (modelRef.current as any).dispose();
                }
				modelRef.current = undefined;
				setModel(undefined);
			}
		};
	}, [scene, props.url]);

	useEffect(() => {
		if (!model) return;

		if (props.position) {
			model.position.set(props.position.x, props.position.y, props.position.z);
		}
		if (props.rotation) {
			model.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z);
		}
		if (props.scale) {
			if (typeof props.scale === 'number') {
				model.scale.set(props.scale, props.scale, props.scale);
			} else {
				model.scale.set(props.scale.x, props.scale.y, props.scale.z);
			}
		}
        model.updateMatrixWorld(true);
	}, [model, props.position, props.rotation, props.scale]);

	return <></>;
};

export default MlThreeSplatLayer;
