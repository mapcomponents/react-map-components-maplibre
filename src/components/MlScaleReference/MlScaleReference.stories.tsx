import React, { useEffect, useState } from 'react';

import MlScaleReference, { MlScaleReferenceProps } from './MlScaleReference';
import Box from '@mui/material/Box';
import TopToolbar from '../../ui_components/TopToolbar';
import mapContextDecorator from '../../decorators/MapContextDecorator';
import { useMediaQuery, Theme } from '@mui/material';

const storyoptions = {
	title: 'MapComponents/MlScaleReference',
	component: MlScaleReference,
	argTypes: {
		url: {},
		layer: {},
	},
	decorators: mapContextDecorator,
};
export default storyoptions;

const ToolbarTemplate = (props: MlScaleReferenceProps) => {
	return (
		<TopToolbar
			unmovableButtons={
				<MlScaleReference {...props} verticalOffset="24px" horizontalOffset="40px" />
			}
		/>
	);
};

const catalgoueTemplate = (props: MlScaleReferenceProps) => {
	const [showTooltip, setShowTooltip] = useState(true);
	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowTooltip(false);
		}, 7000);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<>
			{showTooltip && (
				<Box
					sx={{
						position: 'fixed',
						right: { xs: '105px', md: '175px' },
						color: '#009ee0',
						backgroundColor: '#fff',
						top: { xs: '20px', md: '22px' },
						fontSize: '16px',
						fontFamily: 'sans-serif',
						display: 'flex',
						flexDirection: 'column',
						gap: '5px',
						zIndex: 5000,
					}}
				>
					{mediaIsMobile
						? 'Use Zoom to view functionality ➤'
						: 'Use Zoom to explore functionality ➤'}
				</Box>
			)}
			<TopToolbar
				unmovableButtons={
					<MlScaleReference {...props} verticalOffset="24px" horizontalOffset="40px" />
				}
			/>
			;
		</>
	);
};

const OverlayTemplate = (props: MlScaleReferenceProps) => {
	return <MlScaleReference {...props} />;
};

export const Toolbar = ToolbarTemplate.bind({});
Toolbar.args = {};

export const Overlay = OverlayTemplate.bind({});
Overlay.args = {};

export const exampleConfig = catalgoueTemplate.bind({});
exampleConfig.args = {};
