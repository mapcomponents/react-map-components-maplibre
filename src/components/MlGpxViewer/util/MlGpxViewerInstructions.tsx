import React from 'react';
import Instructions from '../../../util/Instructions';

const bubbleBottomRightStyle = {
	bubbleRight: '-120px',
	bubbleBottom: '-120px',
	textMarginTop: '70px',
	textMarginLeft: '120px',
	iconTransform: 'rotate(180deg)',
	iconMarginLeft: '200px',
};

const steps = [
		{
			duration: 3000,
			props: {
				...bubbleBottomRightStyle,
				iconMarginTop: '43px',
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
			},
			content: (
				<>
					In demo mode we <br /> provide you some <br /> GPX tracks <br /> to load.
				</>
			),
		},
	];
export default function MlGpxViewerInstructions(props: { open: boolean}) {
	
	return (
		<>
			<Instructions steps={steps} open={props.open} />
		</>
	);
}
