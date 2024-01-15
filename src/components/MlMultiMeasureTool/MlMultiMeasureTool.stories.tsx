import React, { useState } from 'react';
import * as turf from '@turf/turf';
import MlMultiMeasureTool from './MlMultiMeasureTool';
import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlMultiMeasureTool',
	component: MlMultiMeasureTool,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = () => {
	const [unit, setUnit] = useState<turf.Units>('kilometers');

	return (
		<>
			<MlMultiMeasureTool unit={unit} multiType={true} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
