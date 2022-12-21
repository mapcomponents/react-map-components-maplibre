import React, { useEffect, useState } from 'react';
import { Button, Paper, Icon, Typography, Grid } from '@mui/material';
import { color, fontSize } from '@mui/system';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import zIndex from '@mui/material/styles/zIndex';
import MlGPXDemoViewer from '../util/demoViewer';
import Fade from '@mui/material/Fade';
import BubbleStyle from '../../../util/BubbleForInstructions';

function BubbleMidLeft(props) {
	return (
		<BubbleStyle
		bubbleTop= '140px'
			bubbleLeft="-100px"
			textMarginTop="150px"
			textMarginLeft="130px"
			iconTransform="rotate(90deg)"
			iconMarginTop={props.iconMarginTop}
			iconMarginLeft="130px"
			zIndex
		>
			{props.children}
		</BubbleStyle>
	);
}

export default function MlWmsLoaderInstructions(props) {
	const [step1, setStep1] = useState(true);
	const [step2, setStep2] = useState(false);

	useEffect(() => {
		if (props.open) {
			setStep1(true);

			setTimeout(() => {
				setStep2(true);
				setStep1(false);
			}, 2500);

			setTimeout(() => {
				setStep2(false);
			}, 5500);
		} else {
			return;
		}
	}, [props.open]);

	return (
		<>
			{step1 && (
				<Fade in={step1} timeout={300}>
					<div>
						<BubbleMidLeft iconMarginTop="-200px">
							Introduce an <br />
							WMS Service <br />  URL here
						</BubbleMidLeft>
					</div>
				</Fade>
			)}

			{step2 && (
				<Fade in={step2} timeout={300}>
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
							In demo mode we <br /> provide you some <br /> WMS links <br /> to copy and use.
						</BubbleStyle>
					</div>
				</Fade>
			)}
		</>
	);
}
