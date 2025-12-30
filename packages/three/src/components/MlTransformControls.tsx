import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { useThree } from './ThreeContext';

export interface MlTransformControlsProps {
	target?: THREE.Object3D;
	mode?: 'translate' | 'rotate' | 'scale';
	enabled?: boolean;
	space?: 'world' | 'local';
	size?: number;
	onObjectChange?: (object: THREE.Object3D) => void;
}

const MlTransformControls = (props: MlTransformControlsProps) => {
	const { target, mode, enabled, space, size, onObjectChange } = props;
	const { scene, camera, renderer, map, sceneRoot } = useThree();
	const controlsRef = useRef<TransformControls | null>(null);

	useEffect(() => {
		if (!scene || !camera || !renderer || !map || !sceneRoot) return;

		const domElement = renderer.getRenderer().domElement;
		const controls = new TransformControls(camera, domElement);
		controlsRef.current = controls;

		// Set initial mode
		controls.setMode(mode || 'translate');
		controls.setSpace(space || 'world');
		if (size) {
			controls.setSize(size);
		}

		// Add TransformControls root object to the sceneRoot
		// TransformControls has an internal _root that is the actual Object3D
		sceneRoot.add((controls as any)._root);

		// When transform controls are active, disable map interaction
		const onDraggingChanged = (event: any) => {
			if (event.value) {
				// Disable map dragging when using transform controls
				map.dragPan.disable();
				map.scrollZoom.disable();
			} else {
				// Re-enable map dragging
				map.dragPan.enable();
				map.scrollZoom.enable();
			}
		};

		controls.addEventListener('dragging-changed', onDraggingChanged);

		// Trigger callback on object change
		if (onObjectChange) {
			const handleObjectChange = () => {
				if (controls.object) {
					onObjectChange(controls.object);
				}
			};
			controls.addEventListener('objectChange', handleObjectChange);
		}

		return () => {
			controls.removeEventListener('dragging-changed', onDraggingChanged);
			controls.detach();
			sceneRoot.remove((controls as any)._root);
			controls.dispose();
			controlsRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scene, camera, renderer, map, sceneRoot]);

	// Update target object
	useEffect(() => {
		if (!controlsRef.current) return;

		if (target) {
			controlsRef.current.attach(target);
		} else {
			controlsRef.current.detach();
		}
	}, [target]);

	// Update mode
	useEffect(() => {
		if (!controlsRef.current) return;
		// Directly set the mode to avoid detach/reattach cycle
		(controlsRef.current as any).mode = mode || 'translate';
	}, [mode]);

	// Update enabled state
	useEffect(() => {
		if (!controlsRef.current) return;
		controlsRef.current.enabled = enabled !== false;
	}, [enabled]);

	// Update space
	useEffect(() => {
		if (!controlsRef.current) return;
		controlsRef.current.setSpace(space || 'world');
	}, [space]);

	// Update size
	useEffect(() => {
		if (!controlsRef.current || !size) return;
		controlsRef.current.setSize(size);
	}, [size]);

	return null;
};

export default MlTransformControls;
