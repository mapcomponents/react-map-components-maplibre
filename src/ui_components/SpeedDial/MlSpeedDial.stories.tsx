import React from 'react';

import SpeedDial from './MlSpeedDial';

import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'UiComponents/MlSpeedDial',
	component: SpeedDial,
	argTypes: {},
	decorators: mapContextDecorator,
	parameters: { docs: { source: { type: 'code' } } },
};
export default storyoptions;

const Template = () => <SpeedDial />;

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
