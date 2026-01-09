import { useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import MlThreeModelLayer from './MlThreeModelLayer';
import { useMap, TopToolbar, Sidebar } from '@mapcomponents/react-maplibre';
import ThreejsContextDecorator from '../../decorators/ThreejsContextDecorator';
import { useThree } from '../ThreeContext';
import { ThreeObjectControls } from '../ThreeObjectControls';
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
	const [scale, setScale] = useState(1);
	const [rotation, setRotation] = useState({ x: 90, y: 90, z: 0 });
	const [mapPosition, setMapPosition] = useState({ lng: 7.097, lat: 50.7355 });
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
					position={[mapPosition.lng, mapPosition.lat]}
					transform={{
						rotation: {
							x: (rotation.x * Math.PI) / 180,
							y: (rotation.y * Math.PI) / 180,
							z: (rotation.z * Math.PI) / 180,
						},
						scale: scale,
						position: position,
					}}
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
				<ThreeObjectControls
					showLayer={showLayer}
					setShowLayer={setShowLayer}
					scale={scale}
					setScale={setScale}
					rotation={rotation}
					setRotation={setRotation}
					mapPosition={mapPosition}
					setMapPosition={setMapPosition}
					position={position}
					setPosition={setPosition}
					layerName="Model"
				/>
			</Sidebar>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
