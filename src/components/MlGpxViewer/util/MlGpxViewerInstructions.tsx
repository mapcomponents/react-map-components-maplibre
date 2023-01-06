import React, { useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import BubbleStyle from '../../../util/BubbleForInstructions';

function BubbleBottomRight(props: { iconMarginTop: string; children: unknown }) {
	return (
		<BubbleStyle
			bubbleRight="-120px"
			bubbleBottom="-120px"
			textMarginTop="70px"
			textMarginLeft="120px"
			iconTransform="rotate(180deg)"
			iconMarginTop={props.iconMarginTop}
			iconMarginLeft="200px"
		>
			{props.children}
		</BubbleStyle>
	);
}

export default function MlGpxViewerInstructions(props: { open: boolean; callback: () => void }) {
	const [step1, setStep1] = useState(false);
	const [step2, setStep2] = useState(false);
	const [step4, setStep4] = useState(false);

	useEffect(() => {
		if (props.open) {
			setStep1(true);

			setTimeout(() => {
				setStep1(false);
				setStep2(true);
			}, 3000);
			setTimeout(() => {
				setStep2(false);
				setStep4(true);
			}, 6000);
			setTimeout(() => {
				setStep4(false);
				if (typeof props.callback === 'function') {
					props.callback();
				}
			}, 9000);
		} else {
			return;
		}
	}, [props.open]);

	return (
		<>
			{step1 && (
				<Fade in={step1} timeout={150}>
					<div>
						<BubbleBottomRight iconMarginTop="43px">
							You can load your <br />
							own GPX file <br /> here
						</BubbleBottomRight>
					</div>
				</Fade>
			)}
			{step2 && (
				<Fade in={step2} timeout={150}>
					<div>
						<BubbleBottomRight iconMarginTop="68px">
							You can see more <br /> information about <br />
							the track <br />
							here
						</BubbleBottomRight>
					</div>
				</Fade>
			)}

			{step4 && (
				<Fade in={step4} timeout={1500}>
					<div>
						<BubbleStyle
							bubbleLeft="-40px"
							bubbleTop="-150px"
							textMarginTop="230px"
							textMarginLeft="75px"
							iconTransform="rotate(90deg)"
							iconMarginTop="-135px"
							iconMarginLeft="280px"
						>
							In demo mode we <br /> provide you some <br /> GPX tracks <br /> to load.
						</BubbleStyle>
					</div>
				</Fade>
			)}
		</>
	);
}
