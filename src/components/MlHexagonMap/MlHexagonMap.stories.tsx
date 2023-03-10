import React from 'react';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlHexagonMap from './MlHexagonMap';
import { DeckGlContextProvider } from '../../contexts/DeckGlContext';

const storyoptions = {
	title: 'MapComponents/MlHexagonMap',
	component: MlHexagonMap,
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
			<MlHexagonMap {...props} />
		</DeckGlContextProvider>
	);
};

export const NoiseMap = Template.bind({});
NoiseMap.parameters = {};
NoiseMap.args = {
	mapId: 'map_1',
};
