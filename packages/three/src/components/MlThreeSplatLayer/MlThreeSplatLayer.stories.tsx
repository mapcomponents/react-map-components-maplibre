import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import MlThreeSplatLayer from './MlThreeSplatLayer';
import { useMap, TopToolbar, Sidebar } from '@mapcomponents/react-maplibre';
import MlThreeJsContextDecorator from '../../decorators/ThreejsContextDecorator';
import { MlThreeObjectControls } from '../MlThreeObjectControls';

const storyoptions = {
	title: 'MapComponents/MlThreeSplatLayer',
	component: MlThreeSplatLayer,
	argTypes: {
		options: {
			control: {
				type: 'object',
			},
		},
	},
	decorators: MlThreeJsContextDecorator,
};
export default storyoptions;

const Template: any = () => {
	const [showLayer, setShowLayer] = useState(true);
	const [scale, setScale] = useState(100);
	const [rotation, setRotation] = useState({ x: 270, y: 0, z: 5 });
	const [mapPosition, setMapPosition] = useState({ lng: 7.0968, lat: 50.736 });
	const [position, setPosition] = useState({ x: 0, y: 0, z: 30 });
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [enableTransformControls, setEnableTransformControls] = useState(false);
	const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');

	const mapHook = useMap({ mapId: 'map_1' });
	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map?.setZoom(17.5);
		mapHook.map?.setPitch(44.5);
		mapHook.map?.setCenter([7.096614581535903, 50.736500960686556]);
	}, [mapHook.map]);

	return (
		<>
			{showLayer && (
				<MlThreeSplatLayer
					url="assets/splats/output.splat"
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
			<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} name="Splat Config">
				<MlThreeObjectControls
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
					layerName="Splat"
					enableTransformControls={enableTransformControls}
					setEnableTransformControls={setEnableTransformControls}
					transformMode={transformMode}
					setTransformMode={setTransformMode}
				/>
				<Typography
					variant="body2"
					sx={{ mt: 2, p: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}
				>
					The splat used is from{' '}
					<Link
						href="https://www.patreon.com/posts/cluster-fly-141866089"
						target="_blank"
						rel="noopener"
					>
						Cluster Fly
					</Link>{' '}
					by Dany Bittel published under CC.
				</Typography>
			</Sidebar>
		</>
	);
};

export const Default = Template.bind({});
Default.parameters = {};
