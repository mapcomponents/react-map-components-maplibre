import React from 'react';
import Instructions from '../../../util/Instructions';

const steps = [
	{
		duration: 2500,
		props: {
			bubbleTop: '200px',
			bubbleLeft: '-180px',
			textMarginTop: '150px',
			textMarginLeft: '200px',
			iconTransform: 'rotate(90deg)',
			iconMarginTop: '-210px',
			iconMarginLeft: '200px',
			zIndex: '1210',
		},
		content: (
			<>
				Introduce an <br />
				WMS Service <br /> URL here
			</>
		),
	},
	{
		duration: 3000,
		props: {
			bubbleLeft: '-40px',
			bubbleTop: '-150px',
			textMarginTop: '240px',
			textMarginLeft: '75px',
			iconTransform: 'rotate(90deg)',
			iconMarginTop: '-125px',
			iconMarginLeft: '280px',
			zIndex: '1210',
		},
		content: (
			<>
				In demo mode we <br /> provide you some <br /> WMS links <br /> to copy and use.
			</>
		),
	},
];

export default function MlWmsLoaderInstructions(props: { open: boolean }) {
	return (
		<>
			<Instructions steps={steps} open={props.open} />
		</>
	);
}
