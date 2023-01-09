import React, { useEffect, useState, useRef } from 'react';
import Fade from '@mui/material/Fade';
import BubbleStyle from '../../../util/BubbleForInstructions';

const bubbleBottomRightStyle = {
	bubbleRight: '-120px',
	bubbleBottom: '-120px',
	textMarginTop: '70px',
	textMarginLeft: '120px',
	iconTransform: 'rotate(180deg)',
	iconMarginLeft: '200px',
};

export default function MlGpxViewerInstructions(props: { open: boolean; callback: () => void }) {
	const [activeStep, setActiveStep] = useState<number>();
	const initializedRef = useRef(false);
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
					You can load your <br />
					own GPX file <br /> here
				</>
			),
		},
	];

	const activateStep = (stepId?: number | undefined) => {
			let _nextStep: number | undefined = typeof stepId === 'undefined' ? 0 : stepId + 1;
			if (typeof _nextStep !== 'undefined') {
				if (_nextStep > steps.length + 1) {
					_nextStep = undefined;
				} else {
					setTimeout(() => {
						activateStep(_nextStep);
					}, steps[_nextStep].duration);
				}
			}
			setActiveStep(_nextStep);
		}
	;

	useEffect(() => {
		if (props.open && !initializedRef.current) {
			initializedRef.current = true;
			activateStep();
		}
		if (!props.open) {
			initializedRef.current = false;
			setActiveStep(undefined);
		}
	}, [props.open]);

	return (
		<>
			{typeof activeStep !== 'undefined' && (
				<Fade in={true} timeout={150}>
					<div>
						<BubbleStyle {...steps[activeStep].props}>{steps[activeStep].content}</BubbleStyle>
					</div>
				</Fade>
			)}
		</>
	);
}
