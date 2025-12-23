import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MlThreeSplatLayer from './MlThreeSplatLayer';
import { TopToolbar, Sidebar, MapComponentsProvider, MapLibreMap, MlNavigationTools, getTheme } from '@mapcomponents/react-maplibre';
import MlThreeJsContextDecorator from '../../decorators/ThreejsContextDecorator';


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
	const [scale, setScale] = useState(1);
	const [rotation, setRotation] = useState({ x: 0, y: 0, z: 5 });
	const [position, setPosition] = useState({ x: 80, y: -45, z: 0 });
	const [sidebarOpen, setSidebarOpen] = useState(true);

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
			<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} name="Splat Config">
				<Box sx={{ padding: '10px' }}>
					<Button
						color="primary"
						variant={showLayer ? 'contained' : 'outlined'}
						onClick={() => {
							setShowLayer(!showLayer);
						}}
					>
						{showLayer ? 'Hide' : 'Show'} Layer
					</Button>
					<Typography id="scale-slider" gutterBottom>
						Scale
					</Typography>
					<Slider
						value={scale}
						onChange={(e, newValue) => setScale(newValue as number)}
						aria-labelledby="scale-slider"
						min={0.1}
						max={5}
						step={0.1}
						valueLabelDisplay="auto"
					/>
					<Typography id="rotation-x-slider" gutterBottom>
						Rotation X
					</Typography>
					<Slider
						value={rotation.x}
						onChange={(e, newValue) => setRotation({ ...rotation, x: newValue as number })}
						aria-labelledby="rotation-x-slider"
						min={0}
						max={360}
						valueLabelDisplay="auto"
					/>
					<Typography id="rotation-y-slider" gutterBottom>
						Rotation Y
					</Typography>
					<Slider
						value={rotation.y}
						onChange={(e, newValue) => setRotation({ ...rotation, y: newValue as number })}
						aria-labelledby="rotation-y-slider"
						min={0}
						max={360}
						valueLabelDisplay="auto"
					/>
					<Typography id="rotation-z-slider" gutterBottom>
						Rotation Z
					</Typography>
					<Slider
						value={rotation.z}
						onChange={(e, newValue) => setRotation({ ...rotation, z: newValue as number })}
						aria-labelledby="rotation-z-slider"
						min={0}
						max={360}
						valueLabelDisplay="auto"
					/>
                    <Typography id="position-x-slider" gutterBottom>
						Position X
					</Typography>
					<Slider
						value={position.x}
						onChange={(e, newValue) => setPosition({ ...position, x: newValue as number })}
						aria-labelledby="position-x-slider"
						min={-100}
						max={100}
						valueLabelDisplay="auto"
					/>
                    <Typography id="position-y-slider" gutterBottom>
						Position Y
					</Typography>
					<Slider
						value={position.y}
						onChange={(e, newValue) => setPosition({ ...position, y: newValue as number })}
						aria-labelledby="position-y-slider"
						min={-100}
						max={100}
						valueLabelDisplay="auto"
					/>
                    <Typography id="position-z-slider" gutterBottom>
						Position Z
					</Typography>
					<Slider
						value={position.z}
						onChange={(e, newValue) => setPosition({ ...position, z: newValue as number })}
						aria-labelledby="position-z-slider"
						min={-100}
						max={100}
						valueLabelDisplay="auto"
					/>
				</Box>
			</Sidebar>
		</>
	);
};

export const Default = Template.bind({});
Default.parameters = {};
