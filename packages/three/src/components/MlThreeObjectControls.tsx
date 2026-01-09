import { useRef, useLayoutEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as THREE from 'three';
import { LngLatLike } from 'maplibre-gl';
import MlThreeGizmo from './MlThreeGizmo';
import { useThree } from '../contexts/ThreeContext';
import ThreejsUtils from '../lib/ThreejsUtils';

export interface ThreeObjectControlsProps {
	showLayer: boolean;
	setShowLayer: (show: boolean) => void;
	scale: number;
	setScale: (scale: number) => void;
	rotation: { x: number; y: number; z: number };
	setRotation: (rotation: { x: number; y: number; z: number }) => void;
	mapPosition: { lng: number; lat: number };
	setMapPosition: (position: { lng: number; lat: number }) => void;
	position: { x: number; y: number; z: number };
	setPosition: (position: { x: number; y: number; z: number }) => void;
	enableTransformControls?: boolean;
	setEnableTransformControls?: (enable: boolean) => void;
	transformMode?: 'translate' | 'rotate' | 'scale';
	setTransformMode?: (mode: 'translate' | 'rotate' | 'scale') => void;
	layerName?: string;
}

export const MlThreeObjectControls = ({
	showLayer,
	setShowLayer,
	scale,
	setScale,
	rotation,
	setRotation,
	mapPosition,
	setMapPosition,
	position,
	setPosition,
	enableTransformControls,
	setEnableTransformControls,
	transformMode,
	setTransformMode,
	layerName = 'Layer',
}: ThreeObjectControlsProps) => {
	const { scene, worldMatrixInv } = useThree();
	const dummyMeshRef = useRef<THREE.Mesh | undefined>(undefined);
	const [dummyMeshReady, setDummyMeshReady] = useState(false);

	// Create and manage dummy mesh for transform controls
	useLayoutEffect(() => {
		if (!scene || !worldMatrixInv || !enableTransformControls) {
			// Clean up dummy mesh when controls are disabled
			if (dummyMeshRef.current) {
				scene?.remove(dummyMeshRef.current);
				dummyMeshRef.current.geometry.dispose();
				(dummyMeshRef.current.material as THREE.Material).dispose();
				dummyMeshRef.current = undefined;
				setDummyMeshReady(false);
			}
			return;
		}

		// Create invisible dummy mesh at the model position
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ visible: false });
		const dummyMesh = new THREE.Mesh(geometry, material);

		// Position the dummy mesh
		const scenePos = ThreejsUtils.toScenePosition(
			worldMatrixInv,
			[mapPosition.lng, mapPosition.lat] as LngLatLike,
			0
		);
		dummyMesh.position.set(
			scenePos.x + position.x,
			scenePos.y + position.y,
			scenePos.z + position.z
		);
		dummyMesh.rotation.set(
			(rotation.x * Math.PI) / 180,
			(rotation.y * Math.PI) / 180,
			(rotation.z * Math.PI) / 180
		);
		dummyMesh.scale.set(scale, scale, scale);

		scene.add(dummyMesh);
		dummyMeshRef.current = dummyMesh;
		setDummyMeshReady(true);

		return () => {
			if (dummyMeshRef.current) {
				scene.remove(dummyMeshRef.current);
				dummyMeshRef.current.geometry.dispose();
				(dummyMeshRef.current.material as THREE.Material).dispose();
				dummyMeshRef.current = undefined;
				setDummyMeshReady(false);
			}
		};
	}, [scene, worldMatrixInv, enableTransformControls]);

	// Update dummy mesh position when props change (but only when controls are enabled)
	useLayoutEffect(() => {
		if (!dummyMeshRef.current || !worldMatrixInv) return;

		const scenePos = ThreejsUtils.toScenePosition(
			worldMatrixInv,
			[mapPosition.lng, mapPosition.lat] as LngLatLike,
			0
		);
		dummyMeshRef.current.position.set(
			scenePos.x + position.x,
			scenePos.y + position.y,
			scenePos.z + position.z
		);
		dummyMeshRef.current.rotation.set(
			(rotation.x * Math.PI) / 180,
			(rotation.y * Math.PI) / 180,
			(rotation.z * Math.PI) / 180
		);
		dummyMeshRef.current.scale.set(scale, scale, scale);
		dummyMeshRef.current.updateMatrixWorld(true);
	}, [position, rotation, scale, mapPosition, worldMatrixInv]);

	const handleObjectChange = (object: THREE.Object3D) => {
		if (!worldMatrixInv) return;

		// Get the base scene position from map coordinates
		const scenePos = ThreejsUtils.toScenePosition(
			worldMatrixInv,
			[mapPosition.lng, mapPosition.lat] as LngLatLike,
			0
		);

		// Calculate the offset position (object position - base scene position)
		setPosition({
			x: object.position.x - scenePos.x,
			y: object.position.y - scenePos.y,
			z: object.position.z - scenePos.z,
		});

		// Update rotation (convert from radians to degrees)
		setRotation({
			x: (object.rotation.x * 180) / Math.PI,
			y: (object.rotation.y * 180) / Math.PI,
			z: (object.rotation.z * 180) / Math.PI,
		});

		// Update scale (assuming uniform scale)
		setScale(object.scale.x);
	};

	return (
		<>
			{dummyMeshReady && dummyMeshRef.current && enableTransformControls && (
				<MlThreeGizmo
					target={dummyMeshRef.current}
					mode={transformMode || 'translate'}
					enabled={enableTransformControls}
					onObjectChange={handleObjectChange}
				/>
			)}
			<Box sx={{ padding: '10px' }}>
			<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 2 }}>
				<Button
					color="primary"
					variant={showLayer ? 'contained' : 'outlined'}
					onClick={() => setShowLayer(!showLayer)}
					size="small"
				>
					{showLayer ? 'Hide' : 'Show'} {layerName}
				</Button>
				{setEnableTransformControls && (
					<Button
						color="info"
						variant={enableTransformControls ? 'contained' : 'outlined'}
						onClick={() => setEnableTransformControls(!enableTransformControls)}
						size="small"
					>
						3D Gizmo
					</Button>
				)}
			</Box>

			{setTransformMode && enableTransformControls && (
				<Box sx={{ marginBottom: 2 }}>
					<ButtonGroup variant="outlined" size="small" fullWidth aria-label="transform mode">
						<Button
							variant={transformMode === 'translate' ? 'contained' : 'outlined'}
							onClick={() => setTransformMode('translate')}
						>
							Move
						</Button>
						<Button
							variant={transformMode === 'rotate' ? 'contained' : 'outlined'}
							onClick={() => setTransformMode('rotate')}
						>
							Rotate
						</Button>
						<Button
							variant={transformMode === 'scale' ? 'contained' : 'outlined'}
							onClick={() => setTransformMode('scale')}
						>
							Scale
						</Button>
					</ButtonGroup>
				</Box>
			)}
			<Typography gutterBottom>Scale: {scale.toFixed(2)}</Typography>
			<Slider
				value={scale}
				onChange={(e, newValue) => setScale(newValue as number)}
				min={0.01}
				max={150}
				step={0.01}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Rotation X: {rotation.x}°</Typography>
			<Slider
				value={rotation.x}
				onChange={(e, newValue) => setRotation({ ...rotation, x: newValue as number })}
				min={0}
				max={360}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Rotation Y: {rotation.y}°</Typography>
			<Slider
				value={rotation.y}
				onChange={(e, newValue) => setRotation({ ...rotation, y: newValue as number })}
				min={0}
				max={360}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Rotation Z: {rotation.z}°</Typography>
			<Slider
				value={rotation.z}
				onChange={(e, newValue) => setRotation({ ...rotation, z: newValue as number })}
				min={0}
				max={360}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Longitude: {mapPosition.lng.toFixed(6)}</Typography>
			<Slider
				value={mapPosition.lng}
				onChange={(e, newValue) => setMapPosition({ ...mapPosition, lng: newValue as number })}
				min={7.09}
				max={7.11}
				step={0.0001}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Latitude: {mapPosition.lat.toFixed(6)}</Typography>
			<Slider
				value={mapPosition.lat}
				onChange={(e, newValue) => setMapPosition({ ...mapPosition, lat: newValue as number })}
				min={50.73}
				max={50.74}
				step={0.0001}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Position X: {position.x}</Typography>
			<Slider
				value={position.x}
				onChange={(e, newValue) => setPosition({ ...position, x: newValue as number })}
				min={-100}
				max={100}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Position Y: {position.y}</Typography>
			<Slider
				value={position.y}
				onChange={(e, newValue) => setPosition({ ...position, y: newValue as number })}
				min={-100}
				max={100}
				valueLabelDisplay="auto"
			/>
			<Typography gutterBottom>Position Z: {position.z}</Typography>
			<Slider
				value={position.z}
				onChange={(e, newValue) => setPosition({ ...position, z: newValue as number })}
				min={-500}
				max={100}
				valueLabelDisplay="auto"
			/>
		</Box>
		</>
	);
};
