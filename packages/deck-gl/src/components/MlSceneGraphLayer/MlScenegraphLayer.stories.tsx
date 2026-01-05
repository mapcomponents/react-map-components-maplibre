import mapContextDecorator from '../../decorators/MapContextDecorator';
import { DeckGlContextProvider } from '../../contexts/DeckGlContext';
import MlScenegraphLayer from './MlScenegraphLayer';

const station_features = [
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.1593141, 50.7150242],
		},
		id: 'node/26945519',
	},
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.1276816, 50.7385235],
		},
		id: 'node/1271017705',
	},
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.1596754, 50.6838092],
		},
		id: 'node/2428355974',
	},
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.0967647, 50.7320436],
		},
		id: 'node/2713060210',
	},
	{
		type: 'Feature',
		geometry: {
			type: 'Point',
			coordinates: [7.1814245, 50.6690703],
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
		<DeckGlContextProvider mapId={context.mapId}>
			<MlScenegraphLayer {...context} />
		</DeckGlContextProvider>
	);
};

export const ExampleConfig: { [key: string]: any } = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	mapId: 'map_1',
	id: 'ExampleLayer',
	data: station_features,
	scenegraph: '/assets/3D/Pointer.glb',
	getPosition: (d: any) => {
		console.log(d);
		return d.geometry.coordinates
	},
	sizeScale: 0.15,
	getOrientation: () => [0, 0, 90],
	getTranslation: () => [0, 0, 1.4],
	_lighting: 'pbr',
	pickable: true,
};
