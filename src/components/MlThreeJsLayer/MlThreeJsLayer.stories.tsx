import React, { useRef, useState } from 'react';
import noNavToolsDecorator from '../../decorators/NoNavToolsDecorator';
import TopToolbar from '../../ui_components/TopToolbar';
import Button from '@mui/material/Button';
import MlThreeJsLayer from './MlThreeJsLayer';
import { LoadingOverlayContext } from '../../ui_components/LoadingOverlayContext';
import MlNavigationTools from '../MlNavigationTools/MlNavigationTools';

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
	decorators: noNavToolsDecorator,
};
export default storyoptions;

const Template = () => {
	const [showLayer, setShowLayer] = useState(true);
	const showLayerRef = useRef(true);
	const loadingOverlayContext = LoadingOverlayContext as {
		setControlled?: (controlled: boolean) => void;
		setLoadingDone?: (done: boolean) => void;
	};

	return (
		<>
			{showLayer &&
				((
					<MlThreeJsLayer
						init={() => loadingOverlayContext?.setControlled?.(true)}
						onDone={() => setTimeout(() => loadingOverlayContext?.setLoadingDone?.(true), 1200)}
					/>
				) as JSX.Element)}

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
