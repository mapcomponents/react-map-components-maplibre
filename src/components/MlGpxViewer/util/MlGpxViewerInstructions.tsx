import React from 'react';
import Instructions from '../../../util/Instructions';
import { useMediaQuery } from '@mui/material';

const bubbleBottomRightStyle = {
	bubbleRight: '-120px',
	textMarginTop: '70px',
	textMarginLeft: '120px',
	iconTransform: 'rotate(180deg)',
	iconMarginLeft: '200px',
	zIndex: 200,
};

const getSteps = (mediaIsMobile:boolean) => [
	{
		duration: 3000,
		props: {
			...bubbleBottomRightStyle,
			iconMarginTop: '43px',
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
			iconMarginTop: '68px',
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
			bubbleLeft: '-40px',
			bubbleTop: '-150px',
			textMarginTop: '230px',
			textMarginLeft: '75px',
			iconTransform: 'rotate(90deg)',
			iconMarginTop: '-135px',
			iconMarginLeft: '280px',
			zIndex: 400,
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
