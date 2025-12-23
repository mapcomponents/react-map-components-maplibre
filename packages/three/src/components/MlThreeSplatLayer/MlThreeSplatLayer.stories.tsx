import { useState, useMemo, useEffect } from 'react';
import Button from '@mui/material/Button';
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
	const [scale, setScale] = useState(2);
	const [rotation, setRotation] = useState({ x: 0, y: 0, z: 5 });
	const [useMapCoords, setUseMapCoords] = useState(true);
	const [mapPosition, setMapPosition] = useState({ lng: 7.097, lat: 50.7355 });
	const [altitude, setAltitude] = useState(76);
	const [position, setPosition] = useState({ x: 0, y: 0, z: 100 });
	const [sidebarOpen, setSidebarOpen] = useState(true);

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
					layerName="Splat"
				/>
			</Sidebar>
		</>
	);
};

export const Default = Template.bind({});
Default.parameters = {};
