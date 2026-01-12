import mapContextDecorator from '../../decorators/MapContextDecorator';
import { DeckGlContextProvider } from '../../contexts/DeckGlContext';
import MlScenegraphLayer from './MlScenegraphLayer';

type BartStation = {
	name: string;
	coordinates: [longitude: number, latitude: number];
};

const station_features = [
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.1593141, 50.7150242],
		},
		properties: {
			rotation: 90,
		},
		id: 'node/26945519',
	},
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.1276816, 50.7385235],
		},
		properties: {
			rotation: 180,
		},
		id: 'node/1271017705',
	},
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.1596754, 50.6838092],
		},
		properties: {
			rotation: 90,
		},
		id: 'node/2428355974',
	},
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.0967647, 50.7320436],
		},
		properties: {
			rotation: 90,
		},
		id: 'node/2713060210',
	},
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.1814245, 50.6690703],
		},
		properties: {
			rotation: 90,
		},
		id: 'node/3400717493',
	},
];

const storyoptions = {
	title: 'MapComponents/MlScenegraphLayer',
	component: MlScenegraphLayer,
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template = (context: any) => {
	return (
			<MlScenegraphLayer {...context} />
	);
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

export const TrainstationExample: {[key: string]: any} = Template.bind({});
TrainstationExample.parameters= {};
TrainstationExample.args = {
	mapId: 'map_1',
	id: 'ScenegraphLayer',
	data: station_features,
	getPosition: (d: any) => d.geometry.coordinates,
	getOrientation: (d: any) => [0, d.properties.rotation, 90],
	scenegraph:
		'/assets/3D/train.glb',
	sizeScale: 200,
	_animations: {
		'*': { speed: 5 },
	},
	_lighting: 'pbr',
	pickable: true,
};
