import React from 'react';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlNoiseMap from './MlNoiseMap';
import { DeckGlContextProvider } from '../../contexts/DeckGlContext';
import SimpleDataProvider from '../../contexts/SimpleDataProvider';

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
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/* @ts-ignore */}
			<SimpleDataProvider format="json" url="assets/3D/laerm_points.json">
				<MlNoiseMap {...props} />
			</SimpleDataProvider>
		</DeckGlContextProvider>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	mapId: 'map_1',
};
