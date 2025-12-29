import { useState, useMemo, useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import MlThreeSplatLayer from './MlThreeSplatLayer';
import { TopToolbar, Sidebar, MapComponentsProvider, MapLibreMap, MlNavigationTools, getTheme, useMap } from '@mapcomponents/react-maplibre';
import MlThreeJsContextDecorator from '../../decorators/ThreejsContextDecorator';
import { ThreeObjectControls } from '../ThreeObjectControls';


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
	const [useMapCoords, setUseMapCoords] = useState(true);
	const [mapPosition, setMapPosition] = useState({ lng: 7.096800, lat: 50.736000 });
	const [altitude, setAltitude] = useState(104);
	const [position, setPosition] = useState({ x: 0, y: 0, z: 100 });
	const [enableTransformControls, setEnableTransformControls] = useState(false);	const [transformMode, setTransformMode] = useState<'translate' | 'rotate' | 'scale'>('translate');	const [sidebarOpen, setSidebarOpen] = useState(true);

	const mapHook = useMap({ mapId: 'map_1' });
	useEffect(() => {
		if (!mapHook.map) return;
		mapHook.map?.setZoom(15.5);
		mapHook.map?.setPitch(44.5);
		mapHook.map?.setCenter([7.097, 50.7355]);
	}, [mapHook.map]);

	// Center map on position when switching coordinate modes
	useEffect(() => {
		if (!mapHook.map) return;
		if (useMapCoords) {
			mapHook.map.setCenter([mapPosition.lng, mapPosition.lat]);
		}
	}, [useMapCoords, mapHook.map]);

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
					enableTransformControls={enableTransformControls}				transformMode={transformMode}					{...useMapCoords ? {
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
