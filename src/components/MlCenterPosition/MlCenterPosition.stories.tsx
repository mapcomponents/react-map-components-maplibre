import React from 'react';

import MlCenterPosition from './MlCenterPosition';

import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlCenterPosition',
	component: MlCenterPosition,
	argTypes: {},
	decorators: mapContextDecorator,
	parameters: { docs: { source: { type: 'code' } } },
};
export default storyoptions;

const Template = () => <MlCenterPosition />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
