import React, { useEffect, useState, useRef } from 'react';
import {Fade, SxProps} from '@mui/material';
import BubbleStyle from './BubbleForInstructions';

interface StepObject {
	duration: number;
	props: SxProps;
	content: JSX.Element;
}

interface InstructionProps {
	steps: Array<StepObject>;
	open: boolean;
	callback?: () => void;
}

const Instructions = (props: InstructionProps) => {
	const [activeStep, setActiveStep] = useState<number>();
	const initializedRef = useRef(false);

	const activateStep = (stepId?: number | undefined) => {
		let _nextStep: number | undefined = typeof stepId === 'undefined' ? 0 : stepId + 1;
		if (typeof _nextStep !== 'undefined') {
			if (_nextStep > props.steps.length + 1) {
				_nextStep = undefined;
			} else {
				setTimeout(() => {
					activateStep(_nextStep);
				}, props.steps[_nextStep].duration);
			}
		}
		setActiveStep(_nextStep);
	};
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
						{/* @ts-ignore */}
						<BubbleStyle {...props.steps[activeStep].props}>
							{props.steps[activeStep].content}
						</BubbleStyle>
					</div>
				</Fade>
			)}
		</>
	);
};

export default Instructions;
