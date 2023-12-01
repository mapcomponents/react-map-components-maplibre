import React, { useEffect, useState } from 'react';

import MlScaleReference, { MlScaleReferenceProps } from './MlScaleReference';

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
	return <TopToolbar unmovableButtons={<MlScaleReference {...props} />} />;
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
				<div
					style={{
						position: 'fixed',
						right: mediaIsMobile ? '110px' : '175px',
						color: '#009ee0',
						backgroundColor: '#fff',
						top: mediaIsMobile ? '20px' : '22px',
						fontSize: '16px',
						fontFamily: 'sans-serif',
						display: 'flex',
						flexDirection: 'column',
						gap: '5px',
						zIndex: 5000,
					}}
				>
					Use Zoom to explore functionality ➤
				</div>
			)}
			<TopToolbar unmovableButtons={<MlScaleReference {...props} />} />;
		</>
	);
};

const OverlayTemplate = (props: MlScaleReferenceProps) => {
	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	return (
		<div
			style={{
				position: 'absolute',
				zIndex: 1000,
				bottom: mediaIsMobile ? '38px' : '8px',
				left: '10px',
			}}
		>
			<MlScaleReference {...props} />
		</div>
	);
};

export const Toolbar = ToolbarTemplate.bind({});
Toolbar.args = {};

export const Overlay = OverlayTemplate.bind({});
Overlay.args = {};

export const catalogueDemo = catalgoueTemplate.bind({});
catalogueDemo.args = {};
