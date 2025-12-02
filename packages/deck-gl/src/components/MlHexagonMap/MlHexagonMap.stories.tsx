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

interface TemplateProps {
	mapId: string;
}

const Template = (props: TemplateProps) => (
	<DeckGlContextProvider {...props}>
		<MlHexagonMap {...props} />
	</DeckGlContextProvider>
);

// eslint-disable-next-line
export const NoiseMap: { [key: string]: any } = Template.bind({});
NoiseMap.parameters = {};
NoiseMap.args = {
	mapId: 'map_1',
};
