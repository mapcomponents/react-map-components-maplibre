import { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MlThreeModelLayer from './MlThreeModelLayer';
import { TopToolbar, useMap, MlNavigationTools, Sidebar } from '@mapcomponents/react-maplibre';
import ThreejsContextDecorator from '../../decorators/ThreejsContextDecorator';
import { useThree } from '../ThreeContext';
import * as THREE from 'three';

const storyoptions = {
	title: 'MapComponents/MlThreeModelLayer',
	component: MlThreeModelLayer,
	argTypes: {
		options: {
			control: {
				type: 'object',
			},
		},
	},
	decorators: ThreejsContextDecorator,
};
export default storyoptions;

const Lights = () => {
	const { scene } = useThree();
	const lightsRef = useRef<THREE.Light[]>([]);

	useEffect(() => {
		if (!scene) return;

		const directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(0, -70, 100).normalize();
		scene.add(directionalLight);

		const directionalLight2 = new THREE.DirectionalLight(0xff2255);
		directionalLight2.position.set(0, 70, 100).normalize();
		scene.add(directionalLight2);

		lightsRef.current = [directionalLight, directionalLight2];

		return () => {
			lightsRef.current.forEach((light) => scene.remove(light));
		};
	}, [scene]);

	return null;
};

const Template: any = () => {
	const [showLayer, setShowLayer] = useState(true);
	const showLayerRef = useRef(true);
	const [scale, setScale] = useState(1);
	const [rotation, setRotation] = useState({ x: 90, y: 90, z: 0 });
	const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const mapHook = useMap({ mapId: 'map_1' });
	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map?.setZoom(15.5);
		mapHook.map?.setPitch(44.5);
		mapHook.map?.setCenter([7.097, 50.7355]);
	}, [mapHook.map]);

	return (
		<>
			<Lights />
			{showLayer && (
				<MlThreeModelLayer
					url="assets/3D/godzilla_simple.glb"
					rotation={{
						x: (rotation.x * Math.PI) / 180,
						y: (rotation.y * Math.PI) / 180,
						z: (rotation.z * Math.PI) / 180,
					}}
					scale={scale}
					position={position}
				/>
			)}

			<TopToolbar
				unmovableButtons={
					<Button
						variant={sidebarOpen ? 'contained' : 'outlined'}
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						Sidebar
					</Button>
				}
			/>
			<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} name="3D Model Config">
				<Box sx={{ padding: '10px' }}>
					<Button
						color="primary"
						variant={showLayer ? 'contained' : 'outlined'}
						onClick={() => {
							setShowLayer(!showLayer);
							showLayerRef.current = !showLayer;
						}}
						sx={{ marginBottom: '20px' }}
					>
						3D model
					</Button>
					<Typography gutterBottom>Scale: {scale}</Typography>
					<Slider
						value={scale}
						onChange={(e, newValue) => setScale(newValue as number)}
						min={0.01}
						max={5}
						step={0.01}
					/>
					<Typography gutterBottom>Rotation X: {rotation.x}°</Typography>
					<Slider
						value={rotation.x}
						onChange={(e, newValue) => setRotation({ ...rotation, x: newValue as number })}
						min={0}
						max={360}
					/>
					<Typography gutterBottom>Rotation Y: {rotation.y}°</Typography>
					<Slider
						value={rotation.y}
						onChange={(e, newValue) => setRotation({ ...rotation, y: newValue as number })}
						min={0}
						max={360}
					/>
					<Typography gutterBottom>Rotation Z: {rotation.z}°</Typography>
					<Slider
						value={rotation.z}
						onChange={(e, newValue) => setRotation({ ...rotation, z: newValue as number })}
						min={0}
						max={360}
					/>
					<Typography gutterBottom>Position X: {position.x}</Typography>
					<Slider
						value={position.x}
						onChange={(e, newValue) => setPosition({ ...position, x: newValue as number })}
						min={-100}
						max={100}
					/>
					<Typography gutterBottom>Position Y: {position.y}</Typography>
					<Slider
						value={position.y}
						onChange={(e, newValue) => setPosition({ ...position, y: newValue as number })}
						min={-100}
						max={100}
					/>
					<Typography gutterBottom>Position Z: {position.z}</Typography>
					<Slider
						value={position.z}
						onChange={(e, newValue) => setPosition({ ...position, z: newValue as number })}
						min={-500}
						max={100}
					/>
				</Box>
			</Sidebar>
			<MlNavigationTools showFollowGpsButton={false} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
