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
	const { scene, camera, renderer, map, sceneRoot } = useThree();
	const controlsRef = useRef<TransformControls | null>(null);

	useEffect(() => {
		if (!scene || !camera || !renderer || !map || !sceneRoot) return;

		const domElement = renderer.getRenderer().domElement;
		const controls = new TransformControls(camera, domElement);
		controlsRef.current = controls;

		// Set initial mode
		controls.setMode(props.mode || 'translate');
		controls.setSpace(props.space || 'world');
		if (props.size) {
			controls.setSize(props.size);
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
		if (props.onObjectChange) {
			const onObjectChange = () => {
				if (controls.object) {
					props.onObjectChange?.(controls.object);
				}
			};
			controls.addEventListener('objectChange', onObjectChange);
		}

		return () => {
			controls.removeEventListener('dragging-changed', onDraggingChanged);
			controls.detach();
			sceneRoot.remove((controls as any)._root);
			controls.dispose();
			controlsRef.current = null;
		};
	}, [scene, camera, renderer, map, sceneRoot]);

	// Update target object
	useEffect(() => {
		if (!controlsRef.current) return;

		if (props.target) {
			controlsRef.current.attach(props.target);
		} else {
			controlsRef.current.detach();
		}
	}, [props.target]);

	// Update mode
	useEffect(() => {
		if (!controlsRef.current) return;
		// Directly set the mode to avoid detach/reattach cycle
		(controlsRef.current as any).mode = props.mode || 'translate';
	}, [props.mode]);

	// Update enabled state
	useEffect(() => {
		if (!controlsRef.current) return;
		controlsRef.current.enabled = props.enabled !== false;
	}, [props.enabled]);

	// Update space
	useEffect(() => {
		if (!controlsRef.current) return;
		controlsRef.current.setSpace(props.space || 'world');
	}, [props.space]);

	// Update size
	useEffect(() => {
		if (!controlsRef.current || !props.size) return;
		controlsRef.current.setSize(props.size);
	}, [props.size]);

	return null;
};

export default MlTransformControls;
