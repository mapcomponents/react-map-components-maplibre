import React, { useContext } from 'react';
import noNavToolsDecorator from '../../decorators/NoNavToolsDecorator';
import TopToolbar from '../../ui_components/TopToolbar';
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
	const loadingOverlayContext = useContext(LoadingOverlayContext);

	return (
		<>
		<TopToolbar
			unmovableButtons={
				<MlThreeJsLayer
				init={() => loadingOverlayContext?.setControlled?.(true)}
				onDone={() => setTimeout(() => loadingOverlayContext?.setLoadingDone?.(true), 1200)}
				/>
			}
		/>
		<MlNavigationTools showFollowGpsButton={false} />
		</>
		
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
