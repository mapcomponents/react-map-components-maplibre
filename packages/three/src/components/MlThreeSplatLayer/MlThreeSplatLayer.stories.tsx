import { useState, useMemo, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import MlThreeSplatLayer from './MlThreeSplatLayer';
import { TopToolbar, Sidebar, MapComponentsProvider, MapLibreMap, MlNavigationTools, getTheme, useMap } from '@mapcomponents/react-maplibre';
import MlThreeJsContextDecorator from '../../decorators/ThreejsContextDecorator';
import { ThreeObjectControls } from '../ThreeObjectControls';
import { useThree } from '../ThreeContext';
import ThreejsUtils from '../../lib/ThreejsUtils';
import * as THREE from 'three';


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
	const { worldMatrix } = useThree();
	const [showLayer, setShowLayer] = useState(true);
	const [scale, setScale] = useState(100);
	const [rotation, setRotation] = useState({ x: 270, y: 0, z: 5 });
	const [useMapCoords, setUseMapCoords] = useState(true);
	const [mapPosition, setMapPosition] = useState({ lng: 7.096800, lat: 50.736000 });
	const [altitude, setAltitude] = useState(30);
	const [position, setPosition] = useState({ x: 0, y: 0, z: 100 });
	const [enableTransformControls, setEnableTransformControls] = useState(false);	const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');	const [sidebarOpen, setSidebarOpen] = useState(true);

	const mapHook = useMap({ mapId: 'map_1' });
	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map?.setZoom(17.5);
		mapHook.map?.setPitch(44.5);
		mapHook.map?.setCenter([7.096614581535903, 50.736500960686556]);
	}, [mapHook.map]);

	// Center map on position when switching coordinate modes
	useEffect(() => {
		if (!mapHook.map) return;
		if (useMapCoords) {
			mapHook.map.setCenter([mapPosition.lng, mapPosition.lat]);
		}
	}, [useMapCoords, mapHook.map]);

	const handleTransformChange = (object: THREE.Object3D) => {
		setRotation({
			x: (object.rotation.x * 180) / Math.PI,
			y: (object.rotation.y * 180) / Math.PI,
			z: (object.rotation.z * 180) / Math.PI,
		});
		setScale(object.scale.x);

		if (useMapCoords && worldMatrix) {
			const [lng, lat, alt] = ThreejsUtils.toMapPosition(worldMatrix, object.position);
			setMapPosition({ lng, lat });
			setAltitude(parseFloat(alt.toFixed(2)));
		} else {
			setPosition({ x: object.position.x, y: object.position.y, z: object.position.z });
		}
	};

	return (
		<>
			{showLayer && (
				<MlThreeSplatLayer
					url="assets/splats/output.splat"
					rotation={{
						x: (rotation.x * Math.PI) / 180,
						y: (rotation.y * Math.PI) / 180,
						z: (rotation.z * Math.PI) / 180,
					}}
					scale={scale}
					enableTransformControls={enableTransformControls}
					transformMode={transformMode}
					onTransformChange={handleTransformChange}
					{...useMapCoords ? {
						mapPosition: [mapPosition.lng, mapPosition.lat],
						altitude: altitude
					} : {
						position: position
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
				<ThreeObjectControls
					showLayer={showLayer}
					setShowLayer={setShowLayer}
					scale={scale}
					setScale={setScale}
					rotation={rotation}
					setRotation={setRotation}
					useMapCoords={useMapCoords}
					setUseMapCoords={setUseMapCoords}
					mapPosition={mapPosition}
					setMapPosition={setMapPosition}
					altitude={altitude}
					setAltitude={setAltitude}
					position={position}
					setPosition={setPosition}
					enableTransformControls={enableTransformControls}
					setEnableTransformControls={setEnableTransformControls}
					transformMode={transformMode}
					setTransformMode={setTransformMode}
					layerName="Splat"
				/>
				<Typography variant="body2" sx={{ mt: 2, p: 1, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
					The splat used is from{' '}
					<Link href="https://www.patreon.com/posts/cluster-fly-141866089" target="_blank" rel="noopener">
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
