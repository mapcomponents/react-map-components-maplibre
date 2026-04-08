import { useContext, useEffect, useState } from 'react';

import SelectStyleButton from '../SelectStyleButton/SelectStyleButton';
import LayerList from '../LayerList/LayerList';

import mapContextDecorator from '../../decorators/EmptyMapDecorator';
import Sidebar from '../Sidebar';

import { Button } from '@mui/material';
import TopToolbar from '../TopToolbar';

import { MonokaiStyle } from '../../index';
import LayerContext from '../../contexts/LayerContext';
import { StyleSpecification } from 'maplibre-gl';

const storyoptions = {
	title: 'UiComponents/SelectStyleButton',
	component: SelectStyleButton,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const SelectStyleTemplate: any = () => {
	const [openSidebar, setOpenSidebar] = useState(true);

	return (
		<>
			<TopToolbar
				buttons={
					<Button
						variant={openSidebar ? 'contained' : 'outlined'}
						onClick={() => setOpenSidebar(!openSidebar)}
						sx={{ marginRight: { xs: '0px', sm: '10px' } }}
					>
						Sidebar
					</Button>
				}
			/>
			<Sidebar open={openSidebar} setOpen={setOpenSidebar} name={'Layers'}>
				<SelectStyleButton />
			</Sidebar>
		</>
	);
};
export const SelectStyleButtonExample = SelectStyleTemplate.bind({});

SelectStyleButtonExample.parameters = {};
SelectStyleButtonExample.args = {};
