import mapContextDecorator from '../../decorators/MapContextDecorator';
import Ml3DTileLayer from './Ml3DTileLayer';

const storyoptions = {
	title: 'MapComponents/Ml3DTileLayer',
	component: Ml3DTileLayer,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (context: any) => {
	return <Ml3DTileLayer {...context} />;
};

export const PointCloudExample: { [key: string]: any } = Template.bind({});
PointCloudExample.parameters = {
	mapOptions: {
		center: [7.842650747974176, 47.98896351950512],
		pitch: 43.5,
		zoom: 22,
		bearing: -8.151137833252392,
	},
};
PointCloudExample.args = {
	mapId: 'map_1',
	id: 'PointCould',
	data: 'assets/tiles/tileset.json',
	pointSize: 2,
};
export const HamburgExample: { [key: string]: any } = Template.bind({});
HamburgExample.parameters = {
	mapOptions: {
		center: [9.993682, 53.551086],
		pitch: 58,
		zoom: 14.788260082345504,
		bearing: 0,
	},
};
HamburgExample.args = {
	mapId: 'map_1',
	data: 'https://3dtiles.wheregroup.com/tileset.json',
};
