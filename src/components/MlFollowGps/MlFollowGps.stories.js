import React from 'react';

import MlFollowGps from './MlFollowGps';

import noNavToolsDecorator from '../../decorators/NoNavToolsDecorator';
import useMediaQuery from '@mui/material/useMediaQuery';

const storyoptions = {
	title: 'MapComponents/MlFollowGps',
	component: MlFollowGps,
	argTypes: {},
	decorators: noNavToolsDecorator,
};
export default storyoptions;

const Template = (props) => {
	const mediaIsMobile = useMediaQuery('(max-width:900px)');
	return (
		<>
			<div
				style={{
					position: 'fixed',
					right: '11px',
					bottom: mediaIsMobile ? '130px' : '45px',
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					zIndex: 1000,
				}}
			>
				<MlFollowGps {...props} />
			</div>
		</>
	);
};
export const ExampleConfig = Template.bind({});
ExampleConfig.parameters = {};
ExampleConfig.args = {
	followUserPosition: false,
};
