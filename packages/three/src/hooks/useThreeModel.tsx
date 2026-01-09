import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import { LngLatLike } from 'maplibre-gl';
import { useThree } from '../contexts/ThreeContext';
import ThreejsUtils from '../lib/ThreejsUtils';

export interface ThreeModelTransform {
	rotation?: { x: number; y: number; z: number };
	scale?: { x: number; y: number; z: number } | number;
	position?: { x: number; y: number; z: number };
}

export type ModelLoader = (url: string, onSuccess: (object: THREE.Object3D) => void) => void;

export interface UseThreeModelProps {
	url: string;
	position: LngLatLike;
	transform?: ThreeModelTransform;
	init?: () => void;
	onDone?: () => void;
	loaders: Record<string, ModelLoader>;
	customLoaders?: Record<string, ModelLoader>;
}

/**
 * Recursively dispose of Three.js object resources to prevent memory leaks.
 */
const disposeObject = (obj: THREE.Object3D): void => {
	if ((obj as any).geometry) {
		(obj as any).geometry.dispose();
	}

	if ((obj as any).material) {
		const material = (obj as any).material;
		if (Array.isArray(material)) {
			material.forEach((m) => m.dispose());
		} else {
			material.dispose();
		}
	}

	if ('dispose' in obj && typeof (obj as any).dispose === 'function') {
		(obj as any).dispose();
	}
};

/**
 * Hook to manage loading, transforming, and rendering a 3D model in the MapLibre/Three.js context.
 */
export const useThreeModel = (props: UseThreeModelProps) => {
	const { url, position, transform, init, onDone, loaders, customLoaders } = props;
	const { scene, worldMatrixInv } = useThree();
	const [model, setModel] = useState<THREE.Object3D | undefined>(undefined);
	const modelRef = useRef<THREE.Object3D | undefined>(undefined);

	const initRef = useRef(init);
	const onDoneRef = useRef(onDone);
	initRef.current = init;
	onDoneRef.current = onDone;

	const transformRef = useRef({ position, transform });
	transformRef.current = { position, transform };
	const worldMatrixInvRef = useRef(worldMatrixInv);
	worldMatrixInvRef.current = worldMatrixInv;

	const allLoaders = useMemo(() => ({ ...loaders, ...customLoaders }), [loaders, customLoaders]);

	const updateModelTransform = useCallback(
		(object: THREE.Object3D, currentWorldMatrixInv: THREE.Matrix4 | undefined) => {
			const { position: currentPosition, transform: currentTransform } = transformRef.current;

			if (currentPosition && currentWorldMatrixInv) {
				const scenePos = ThreejsUtils.toScenePosition(currentWorldMatrixInv, currentPosition, 0);
				object.position.set(scenePos.x, scenePos.y, scenePos.z);

				if (currentTransform?.position) {
					object.position.x += currentTransform.position.x;
					object.position.y += currentTransform.position.y;
					object.position.z += currentTransform.position.z;
				}
			}

			if (currentTransform?.rotation) {
				object.rotation.set(
					currentTransform.rotation.x,
					currentTransform.rotation.y,
					currentTransform.rotation.z
				);
			}

			if (currentTransform?.scale) {
				if (typeof currentTransform.scale === 'number') {
					object.scale.set(currentTransform.scale, currentTransform.scale, currentTransform.scale);
				} else {
					object.scale.set(
						currentTransform.scale.x,
						currentTransform.scale.y,
						currentTransform.scale.z
					);
				}
			}

			object.updateMatrixWorld(true);
		},
		[]
	);

	const cleanup = useCallback(() => {
		if (modelRef.current && scene) {
			scene.remove(modelRef.current);
			modelRef.current.traverse(disposeObject);
			disposeObject(modelRef.current);
			modelRef.current = undefined;
			setModel(undefined);
		}
	}, [scene]);

	useEffect(() => {
		if (!scene) return;

		if (typeof initRef.current === 'function') {
			initRef.current();
		}

		let extension = '';
		try {
			const urlObj = new URL(url, window.location.origin);
			extension = urlObj.pathname.split('.').pop()?.toLowerCase() || '';
		} catch (e) {
			extension = url.split('.').pop()?.toLowerCase() || '';
		}

		const loader = allLoaders[extension];
		if (!loader) {
			console.warn(
				`useThreeModel: No loader found for file extension "${extension}". Supported extensions: ${Object.keys(allLoaders).join(', ')}`
			);
			return;
		}

		let isCanceled = false;

		const handleLoad = (object: THREE.Object3D) => {
			if (isCanceled) {
				object.traverse(disposeObject);
				disposeObject(object);
				return;
			}

			if (modelRef.current) {
				cleanup();
			}

			modelRef.current = object;
			updateModelTransform(object, worldMatrixInvRef.current);
			scene.add(object);
			setModel(object);

			if (typeof onDoneRef.current === 'function') {
				onDoneRef.current();
			}
		};

		loader(url, handleLoad);

		return () => {
			isCanceled = true;
			cleanup();
		};
	}, [url, scene, allLoaders, cleanup, updateModelTransform]);

	useEffect(() => {
		if (model) {
			updateModelTransform(model, worldMatrixInv);
		}
	}, [model, position, transform, worldMatrixInv, updateModelTransform]);

	return model;
};
