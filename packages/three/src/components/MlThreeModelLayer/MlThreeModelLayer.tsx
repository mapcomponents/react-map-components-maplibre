import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { LngLatLike } from 'maplibre-gl';
import { useThree } from '../ThreeContext';
import ThreejsUtils from '../../lib/ThreejsUtils';
import MlTransformControls from '../MlTransformControls';

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
	enableTransformControls?: boolean;
	transformMode?: 'translate' | 'rotate' | 'scale';
	onTransformChange?: (object: THREE.Object3D) => void;
	init?: () => void;
	onDone?: () => void;
}

const MlThreeModelLayer = (props: MlThreeModelLayerProps) => {
	const {
		url,
		position,
		mapPosition,
		altitude,
		rotation,
		scale,
		enableTransformControls,
		transformMode,
		onTransformChange,
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

	const transformRef = useRef({ position, mapPosition, altitude, rotation, scale });
	transformRef.current = { position, mapPosition, altitude, rotation, scale };
	const worldMatrixInvRef = useRef(worldMatrixInv);
	worldMatrixInvRef.current = worldMatrixInv;

	useEffect(() => {
		if (!scene) return;

		if (typeof initRef.current === 'function') {
			initRef.current();
		}

		const extension = url.split('.').pop()?.toLowerCase();

		const onLoad = (object: THREE.Object3D) => {
			const { position, mapPosition, altitude, rotation, scale } = transformRef.current;
			const worldMatrixInv = worldMatrixInvRef.current;

			if (mapPosition && worldMatrixInv) {
				const scenePos = ThreejsUtils.toScenePosition(worldMatrixInv, mapPosition, altitude);
				object.position.set(scenePos.x, scenePos.y, scenePos.z);
			} else if (position) {
				object.position.set(position.x, position.y, position.z);
			}

			if (rotation) {
				object.rotation.set(rotation.x, rotation.y, rotation.z);
			}
			if (scale) {
				if (typeof scale === 'number') {
					object.scale.set(scale, scale, scale);
				} else {
					object.scale.set(scale.x, scale.y, scale.z);
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

		// Handle position: mapPosition takes precedence over position
		if (mapPosition && worldMatrixInv) {
			const scenePos = ThreejsUtils.toScenePosition(worldMatrixInv, mapPosition, altitude);
			model.position.set(scenePos.x, scenePos.y, scenePos.z);
		} else if (position) {
			model.position.set(position.x, position.y, position.z);
		}

		if (rotation) {
			model.rotation.set(rotation.x, rotation.y, rotation.z);
		}
		if (scale) {
			if (typeof scale === 'number') {
				model.scale.set(scale, scale, scale);
			} else {
				model.scale.set(scale.x, scale.y, scale.z);
			}
		}
	}, [model, position, mapPosition, altitude, rotation, scale, worldMatrixInv]);

	if (enableTransformControls && model) {
		return (
			<MlTransformControls target={model} mode={transformMode} onObjectChange={onTransformChange} />
		);
	}
	return null;
};

export default MlThreeModelLayer;
