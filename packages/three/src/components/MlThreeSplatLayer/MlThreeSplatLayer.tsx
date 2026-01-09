import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { LngLatLike } from 'maplibre-gl';
import { useThree } from '../ThreeContext';
import { SplatLoader } from '../../lib/splats/loaders/SplatLoader';
import { PlySplatLoader } from '../../lib/splats/loaders/PlySplatLoader';
import ThreejsUtils from '../../lib/ThreejsUtils';

/**
 * Renders splat 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */

export interface MlThreeSplatLayerProps {
	mapId?: string;
	url: string;
	position: LngLatLike;
	transform?: {
		rotation?: { x: number; y: number; z: number };
		scale?: { x: number; y: number; z: number } | number;
		position?: { x: number; y: number; z: number };
	};
	init?: () => void;
	onDone?: () => void;
}

const MlThreeSplatLayer = (props: MlThreeSplatLayerProps) => {
	const {
		url,
		position,
		transform,
		init,
		onDone,
	} = props;
	const { scene, worldMatrixInv } = useThree();
	const modelRef = useRef<THREE.Object3D | undefined>(undefined);
	const [model, setModel] = useState<THREE.Object3D | undefined>(undefined);

	// Use refs for callbacks to avoid re-triggering the effect when they change
	const initRef = useRef(init);
	const onDoneRef = useRef(onDone);
	initRef.current = init;
	onDoneRef.current = onDone;

	const transformRef = useRef({ position, transform });
	transformRef.current = { position, transform };
	const worldMatrixInvRef = useRef(worldMatrixInv);
	worldMatrixInvRef.current = worldMatrixInv;

	useEffect(() => {
		if (!scene) return;

		if (typeof initRef.current === 'function') {
			initRef.current();
		}

		const extension = url.split('.').pop()?.toLowerCase();

		const onLoad = (object: THREE.Object3D) => {
			const { position, transform } = transformRef.current;
			const worldMatrixInv = worldMatrixInvRef.current;

			if (position && worldMatrixInv) {
				const scenePos = ThreejsUtils.toScenePosition(worldMatrixInv, position, 0);
				object.position.set(scenePos.x, scenePos.y, scenePos.z);
				
				// Apply local position offset if provided
				if (transform?.position) {
					object.position.x += transform.position.x;
					object.position.y += transform.position.y;
					object.position.z += transform.position.z;
				}
			}

			if (transform?.rotation) {
				object.rotation.set(transform.rotation.x, transform.rotation.y, transform.rotation.z);
			}
			if (transform?.scale) {
				if (typeof transform.scale === 'number') {
					object.scale.set(transform.scale, transform.scale, transform.scale);
				} else {
					object.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
				}
			}
			object.updateMatrixWorld(true);

			modelRef.current = object;
			scene.add(object);
			setModel(object);
			if (typeof onDoneRef.current === 'function') {
				onDoneRef.current();
			}
		};

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
	}, [scene, url]);

	useEffect(() => {
		if (!model) return;

		if (position && worldMatrixInv) {
			const scenePos = ThreejsUtils.toScenePosition(worldMatrixInv, position, 0);
			model.position.set(scenePos.x, scenePos.y, scenePos.z);
			
			// Apply local position offset if provided
			if (transform?.position) {
				model.position.x += transform.position.x;
				model.position.y += transform.position.y;
				model.position.z += transform.position.z;
			}
		}

		if (transform?.rotation) {
			model.rotation.set(transform.rotation.x, transform.rotation.y, transform.rotation.z);
		}
		if (transform?.scale) {
			if (typeof transform.scale === 'number') {
				model.scale.set(transform.scale, transform.scale, transform.scale);
			} else {
				model.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
			}
		}
		model.updateMatrixWorld(true);
	}, [model, position, transform, worldMatrixInv]);

	return null;
};

export default MlThreeSplatLayer;
