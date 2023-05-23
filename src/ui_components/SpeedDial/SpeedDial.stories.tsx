import React from 'react';

import SpeedDial from './SpeedDial';

import mapContextDecorator from '../../decorators/NoNavToolsDecorator';

const storyoptions = {
	title: 'UiComponents/SpeedDial',
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
