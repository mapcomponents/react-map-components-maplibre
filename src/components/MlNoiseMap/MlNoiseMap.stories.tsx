import React from 'react';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlNoiseMap from './MlNoiseMap';
import { DeckGlContextProvider } from '../../contexts/DeckGlContext';

const storyoptions = {
	title: 'MapComponents/MlNoiseMap',
	component: MlNoiseMap,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;
interface TemplateProbs {
	mapId: string;
}

const Template = (props: TemplateProbs) => {
	return (
		<DeckGlContextProvider {...props}>
			<MlNoiseMap {...props} />
		</DeckGlContextProvider>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	mapId: '1',
};
