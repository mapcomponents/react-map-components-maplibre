import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { LngLatLike } from 'maplibre-gl';
import { useThree } from '../ThreeContext';
import ThreejsUtils from '../../lib/ThreejsUtils';

/**
 * Renders obj or gltf 3D Models on the MapLibreMap referenced by props.mapId
 *
 * @component
 */

export interface MlThreeModelLayerProps {
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

const MlThreeModelLayer = (props: MlThreeModelLayerProps) => {
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

			modelRef.current = object;
			scene.add(object);
			setModel(object);
			if (typeof onDoneRef.current === 'function') {
				onDoneRef.current();
			}
		};

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

		return () => {
			if (modelRef.current) {
				scene.remove(modelRef.current);
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

export default MlThreeModelLayer;