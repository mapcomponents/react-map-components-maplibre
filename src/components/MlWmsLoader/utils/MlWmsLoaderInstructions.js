import React, { useEffect, useState } from 'react';
import { Button, Paper, Icon, Typography, Grid } from '@mui/material';
import { color, fontSize } from '@mui/system';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import zIndex from '@mui/material/styles/zIndex';
import MlGPXDemoViewer from '../util/demoViewer';
import Fade from '@mui/material/Fade';
import BubbleStyle from '../../../util/BubbleForInstructions';


export default function MlWmsLoaderInstructions(props) {
	const [step1, setStep1] = useState(false);
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
						<BubbleStyle
							bubbleTop="140px"
							bubbleLeft="-180px"
							textMarginTop="190px"
							textMarginLeft="200px"
							iconTransform="rotate(90deg)"
							iconMarginTop="-230px"
							iconMarginLeft="200px"
						>
							Introduce an <br />
							WMS Service <br /> URL here
						</BubbleStyle>
					</div>
				</Fade>
			)}

			{step2 && (
				<Fade in={step2} timeout={600}>
					<div>
						<BubbleStyle
							bubbleLeft="-40px"
							bubbleTop="-150px"
							textMarginTop="240px"
							textMarginLeft="75px"
							iconTransform="rotate(90deg)"
							iconMarginTop="-125px"
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
