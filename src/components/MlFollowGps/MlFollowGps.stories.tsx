import React from 'react';

import { useEffect, useState } from 'react';
import MlFollowGps, { MlFollowGpsProps } from './MlFollowGps';

import noNavToolsDecorator from '../../decorators/NoNavToolsDecorator';
import { Theme, useMediaQuery } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlFollowGps',
	component: MlFollowGps,
	argTypes: {},
	decorators: noNavToolsDecorator,
};
export default storyoptions;

const Template = (props:MlFollowGpsProps) => {
	const mediaIsMobile = useMediaQuery((theme:Theme) => theme.breakpoints.down('md'));

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

const catalogueTemplate = (props:MlFollowGpsProps) => {
	const mediaIsMobile = useMediaQuery((theme:Theme) => theme.breakpoints.down('md'));

	const [showTooltip, setShowTooltip] = useState(true);
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowTooltip(false);
		}, 7000);
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
						bottom: mediaIsMobile ? '56px' : '48px',
						fontSize: '20px',
						display: 'flex',
						fontFamily: 'sans-serif',
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

export const StandardConfig = Template.bind({});
StandardConfig.parameters = {};
StandardConfig.args = {
	followUserPosition: false,
};

export const CatalogueDemo = catalogueTemplate.bind({});
CatalogueDemo.parameters = {};
CatalogueDemo.args = {
	followUserPosition: false,
};
