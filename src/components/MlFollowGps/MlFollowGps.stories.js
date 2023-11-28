import React from 'react';

import { useEffect, useState } from 'react';
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
	const mediaIsMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

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

const catalogueTemplate = (props) => {
	const mediaIsMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

	const [showTooltip, setShowTooltip] = useState(true);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowTooltip(false);
		}, 4000);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<>
			{showTooltip && (
				<div
					style={{
						position: 'fixed',
						right: mediaIsMobile ? '70px' : '46px',
						color: '#009ee0',
						backgroundColor: '#fff',
						bottom: mediaIsMobile ? '56px' : '50px',
						fontSize: '20px',
						fontWeight: 'bold',
						display: 'flex',
						flexDirection: 'column',
						gap: '5px',
						zIndex: 1000,
					}}
				>
					MlFollowGPS Button ➤
				</div>
			)}

			<div
				style={{
					position: 'fixed',
					right: '11px',
					bottom: props.mediaIsMobile ? '130px' : '45px',
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

export const standardConfig = Template.bind({});
standardConfig.parameters = {};
standardConfig.args = {
	followUserPosition: false,
};

export const catalogueDemo = catalogueTemplate.bind({});
catalogueDemo.parameters = {};
catalogueDemo.args = {
	followUserPosition: false,
};
