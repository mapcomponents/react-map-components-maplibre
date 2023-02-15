import React from 'react';
import Instructions from '../../../util/Instructions';
import { useMediaQuery } from '@mui/material';

const bubbleBottomRightStyle = {
	bubbleTop: '-150px',
	textMarginTop: '230px',
	textMarginLeft: '75px',
	iconTransform: 'rotate(90deg)',
	iconMarginLeft: '280px',
	zIndex: 400,
};

const getSteps = (mediaIsMobile: boolean) => [
	{
		duration: 3000,
		props: {
			...bubbleBottomRightStyle,
			bubbleLeft: '595px',
			iconMarginTop: '-130px',
			bubbleBottom: mediaIsMobile ? '90px' : 0,
		},
		content: (
			<>
				You can see more <br /> information about <br />
				the track <br />
				here
			</>
		),
	},
	{
		duration: 3000,
		props: {
			...bubbleBottomRightStyle,
			bubbleLeft: '705px',
			iconMarginTop: '-100px',
			bubbleBottom: mediaIsMobile ? '90px' : 0,
		},
		content: (
			<>
				You can load your <br />
				own GPX file <br /> here
			</>
		),
	},

	{
		duration: 3000,
		props: {
			...bubbleBottomRightStyle,
			bubbleLeft: '820px',
			iconMarginTop: '-130px',
			bubbleBottom: mediaIsMobile ? '90px' : 0,
		},
		content: (
			<>
				In demo mode we <br /> provide you some <br /> GPX tracks <br /> to load.
			</>
		),
	},
];
export default function MlGpxViewerInstructions(props: { open: boolean }) {
	const mediaIsMobile = useMediaQuery('(max-width:900px)');

	return (
		<>
			<Instructions steps={getSteps(mediaIsMobile)} open={props.open} />
		</>
	);
}
