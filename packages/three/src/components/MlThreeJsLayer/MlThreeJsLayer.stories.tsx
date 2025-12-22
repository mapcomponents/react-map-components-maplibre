import { useRef, useState } from 'react';
import MapContextDecorator from '../../decorators/MapContextDecorator';
import Button from '@mui/material/Button';
import MlThreeJsLayer from './MlThreeJsLayer';
import { TopToolbar,useMap, MlNavigationTools } from '@mapcomponents/react-maplibre';

const storyoptions = {
	title: 'MapComponents/MlThreeJsLayer',
	component: MlThreeJsLayer,
	argTypes: {
		options: {
			control: {
				type: 'object',
			},
		},
	},
	decorators: MapContextDecorator,
};
export default storyoptions;

const Template: any = () => {
	const [showLayer, setShowLayer] = useState(true);
	const showLayerRef = useRef(true);

	const mapHook = useMap();
	mapHook.map?.setZoom(14.5);
	mapHook.map?.setCenter([7.1, 50.736]);

	return (
		<>
			{showLayer && (
				<MlThreeJsLayer
				/>
			)}

			<TopToolbar
				unmovableButtons={
					<>
						<Button
							color="primary"
							variant={showLayer ? 'contained' : 'outlined'}
							onClick={() => {
								setShowLayer(!showLayer);
								showLayerRef.current = !showLayer;
							}}
						>
							3D model
						</Button>
					</>
				}
			/>
			<MlNavigationTools showFollowGpsButton={false} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
