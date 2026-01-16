import mapContextDecorator from '../../decorators/MapContextDecorator';
import MlScenegraphLayer from './MlScenegraphLayer';

type BartStation = {
	name: string;
	coordinates: [longitude: number, latitude: number];
};

const wgLocations = [
	{
		id: '1',
		type: 'Feature',
		properties: {
			Standort: 'Bonn',
			Mitarbeitende: 26,
		},
		geometry: {
			coordinates: [7.085121767634178, 50.738628929850876],
			type: 'Point',
		},
	},
	{
		id: '2',
		type: 'Feature',
		properties: {
			Standort: 'Freiburg',
			Mitarbeitende: 10,
		},
		geometry: {
			coordinates: [7.842759788570362, 47.98905444717667],
			type: 'Point',
		},
	},
	{
		id: '3',
		type: 'Feature',
		properties: {
			Standort: 'Berlin',
			Mitarbeitende: 13,
		},
		geometry: {
			coordinates: [13.330420447460796, 52.492768290796676],
			type: 'Point',
		},
	},
	{
		id: '4',
		type: 'Feature',
		properties: {
			Standort: 'Hamburg',
			Mitarbeitende: 3,
		},
		geometry: {
			coordinates: [10.041789021808029, 53.5511363175323],
			type: 'Point',
		},
	},
];

const storyoptions = {
	title: 'MapComponents/MlScenegraphLayer',
	component: MlScenegraphLayer,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (context: any) => {
	return <MlScenegraphLayer {...context} />;
};

export const DeckglExample: { [key: string]: any } = Template.bind({});
DeckglExample.parameters = {
	mapOptions: {
		zoom: 10,
		center: [-122.2, 37.773972],
		pitch: 60,
	},
};
DeckglExample.args = {
	mapId: 'map_1',
	id: 'ScenegraphLayer',
	data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
	getPosition: (d: BartStation) => d.coordinates,
	getOrientation: () => [0, Math.random() * 180, 90],
	scenegraph:
		'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb',
	sizeScale: 500,
	_animations: {
		'*': { speed: 5 },
	},
	_lighting: 'pbr',
	pickable: true,
};

export const WhereGroupLocationExample: { [key: string]: any } = Template.bind({});
WhereGroupLocationExample.parameters = {
	mapOptions: {
		center: [10.4, 50],
		pitch: 56,
		zoom: 6,
	},
};
WhereGroupLocationExample.args = {
	mapId: 'map_1',
	id: 'ScenegraphLayer',
	data: wgLocations,
	getPosition: (d: any) => d.geometry.coordinates,
	getOrientation: () => [0, 0, 90],
	getColor: () => [255, 255, 255],
	scenegraph: '/assets/3D/WhereGroupLogo.glb',
	sizeScale: 100,
	_animations: {
		'*': { speed: 5 },
	},
	_lighting: 'pbr',
	pickable: true,
};
