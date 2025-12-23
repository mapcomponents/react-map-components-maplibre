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
	position?: { x: number; y: number; z: number };
	mapPosition?: LngLatLike;
	altitude?: number;
	rotation?: { x: number; y: number; z: number };
	scale?: { x: number; y: number; z: number } | number;
	init?: () => void;
	onDone?: () => void;
}

const MlThreeModelLayer = (props: MlThreeModelLayerProps) => {
	const { scene, worldMatrixInv } = useThree();
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

		if (extension === 'glb' || extension === 'gltf') {
			const loader = new GLTFLoader();
			loader.load(props.url, (gltf) => {
				onLoad(gltf.scene);
			});
		} else if (extension === 'obj') {
			const loader = new OBJLoader();
			loader.load(props.url, (obj) => {
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
	}, [scene, props.url]);

	useEffect(() => {
		if (!model) return;

		// Handle position: mapPosition takes precedence over position
		if (props.mapPosition && worldMatrixInv) {
			const scenePos = ThreejsUtils.toScenePosition(worldMatrixInv, props.mapPosition, props.altitude);
			model.position.set(scenePos.x, scenePos.y, scenePos.z);
		} else if (props.position) {
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
	}, [model, props.position, props.mapPosition, props.altitude, props.rotation, props.scale]);

	return <></>;
};

export default MlThreeModelLayer;
