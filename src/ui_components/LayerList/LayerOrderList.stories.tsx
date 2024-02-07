import React from 'react';
import LayerOrderList from './LayerOrderList';
import Sidebar from '../Sidebar';
import { v4 as uuIdV4 } from 'uuid';
import emptyMapReduxStoreDecorator from '../../decorators/EmptyMapReduxStoreDecorator';

const storyoptions = {
	title: 'UiComponents/LayerOrderList',
	component: LayerOrderList,
	argTypes: {},
	decorators: emptyMapReduxStoreDecorator,
};
export default storyoptions;

const LayerOrder = () => {
	const uuid = uuIdV4();
	//TODO: configure a store
	return (
		<Sidebar>
			<LayerOrderList mapConfigUuid={uuid}></LayerOrderList>
		</Sidebar>
	);
};
export const LayerOrderExample = LayerOrder.bind({});

LayerOrderExample.parameters = {};
LayerOrderExample.args = {};
