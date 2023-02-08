import React, { useState } from 'react';

import MlSketchTool from './MlSketchTool';

import mapContextDecorator from '../../decorators/MapContextDecorator';
import Sidebar from '../../ui_components/Sidebar';
import TopToolbar from '../../ui_components/TopToolbar';
import { MenuItem, Typography } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlSketchTool',
	component: MlSketchTool,
	argTypes: {},
	decorators: mapContextDecorator,
};
export default storyoptions;

const sidebarSx = {
	width: {
		top: '64px',
		xs: '80%',
		sm: '60%',
		md: '500px',
		lg: '500px',
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
						<MenuItem onClick={() => setOpenSidebar(!openSidebar)}>
							<Typography textAlign="center">Sketch Tool</Typography>
						</MenuItem>
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
