import MlGeojsonLayerWithSource from './MlGeojsonLayerWithSource';

import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlGeojsonLayerWithSource',
	component: MlGeojsonLayerWithSource,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template: any = () => <MlGeojsonLayerWithSource />;

export const ExampleConfig = Template.bind({});
ExampleConfig.args = { mapId: 'map_1' };
