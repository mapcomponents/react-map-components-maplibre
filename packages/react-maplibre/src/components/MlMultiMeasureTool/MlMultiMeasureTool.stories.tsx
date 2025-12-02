import MlMultiMeasureTool from './MlMultiMeasureTool';
import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'MapComponents/MlMultiMeasureTool',
	component: MlMultiMeasureTool,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template: any = () => {
	return (
		<>
			<MlMultiMeasureTool multiType={true} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
