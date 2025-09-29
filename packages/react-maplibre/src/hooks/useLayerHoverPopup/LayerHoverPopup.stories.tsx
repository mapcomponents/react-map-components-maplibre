import LayerHoverPopup from './LayerHoverPopup';

import mapContextDecorator from '../../decorators/MapContextDecorator';

const storyoptions = {
	title: 'Hooks/LayerHoverPopup',
	component: LayerHoverPopup,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const Template: any = () => {
	return (
		<>
			<LayerHoverPopup getPopupContent={() => 'Popup content'} />
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
