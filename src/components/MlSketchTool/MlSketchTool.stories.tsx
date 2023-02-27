import React, { useState } from 'react';

import MlSketchTool from './MlSketchTool';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import { Button } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlSketchTool',
	component: MlSketchTool,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const sidebarSx = {
	top: '64px',
	width: {
		xs: '80%',
		sm: '60%',
	},
	minWidth: {
		md: '350px',
		lg: '350px',
	},
	maxWidth: {
		md: '550px',
		lg: '550px',
	},

	boxSizing: 'border-box',
};

const Template = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	return (
		<>
			<TopToolbar
				buttons={
					<>
						<Button
							variant={openSidebar ? 'contained' : 'outlined'}
							onClick={() => setOpenSidebar(!openSidebar)}
							sx={{ marginRight: { xs: '0px', sm: '10px' } }}
						>
							Sketch Tool
						</Button>
					</>
				}
			/>
			<Sidebar
				drawerPaperProps={{ sx: sidebarSx }}
				open={openSidebar}
				setOpen={setOpenSidebar}
				name={'Sketch Tool'}
			>
				<MlSketchTool />
			</Sidebar>
		</>
	);
};

export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {};
