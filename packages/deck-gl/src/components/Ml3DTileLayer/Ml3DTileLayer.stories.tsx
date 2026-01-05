import mapContextDecorator from '../../decorators/MapContextDecorator';
import { DeckGlContextProvider } from '../../contexts/DeckGlContext';
import Ml3DTileLayer from './Ml3DTileLayer';

const storyoptions = {
	title: 'MapComponents/Ml3DTileLayer',
	component: Ml3DTileLayer,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (context: any) => {
	return (
		<DeckGlContextProvider mapId={context.mapId}>
			<Ml3DTileLayer {...context} />
		</DeckGlContextProvider>
	);
};

export const PointCloudExample: { [key: string]: any } = Template.bind({});
PointCloudExample.parameters = {};
PointCloudExample.args = {
	mapId: 'map_1',
	data: 'assets/tiles/tileset.json',
};
export const HamburgExample: { [key: string]: any } = Template.bind({});
HamburgExample.parameters = {};
HamburgExample.args = {
	mapId: 'map_1',
	data: 'https://3dtiles.wheregroup.com/tileset.json',
};
