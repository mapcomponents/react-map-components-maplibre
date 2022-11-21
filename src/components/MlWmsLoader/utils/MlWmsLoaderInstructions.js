import React, { useEffect, useState } from 'react';
import { Button, Paper, Icon, Typography, Grid } from '@mui/material';
import { color, fontSize } from '@mui/system';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import zIndex from '@mui/material/styles/zIndex';
import MlGPXDemoViewer from '../util/demoViewer';
import Fade from '@mui/material/Fade';

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
					<div
						style={{
							width: 350,
							height: 350,
							position: 'fixed',
							left: '5px',
							top: '25px',
							display: 'block',
							flexDirection: 'column',
							gap: '5px',
							zIndex: 500,
							borderRadius: 360,
							left: -50,
							top: 150,
							backgroundColor: 'steelblue',
							opacity: 1,
							alignItems: 'center',
							transition: 'ease-in',
							transitionProperty: 'opacity',
						}}
					>
						<ReplyAllIcon
							sx={{
								color: 'white',
								fontSize: 80,
								transform: 'rotate(90deg)',
								marginTop: 3,
								marginLeft: 18,
							}}
						/>
						<h2 style={{ marginTop: 50, marginLeft: 70, color: 'white', textAlign: 'left' }}>
							Introduce an <br />
							WMS Service URL <br /> here
						</h2>
					</div>
				</Fade>
			)}

			{step2 && (
				<Fade in={step2} timeout={300}>
					<div
						style={{
							width: 350,
							height: 350,
							position: 'fixed',
							left: '5px',
							top: '25px',
							display: 'block',
							flexDirection: 'column',
							gap: '5px',
							zIndex: 500,
							borderRadius: 360,
							left: -50,
							top: 70,
							backgroundColor: 'steelblue',
							opacity: 1,
							alignItems: 'center',
							transition: 'ease-in',
							transitionProperty: 'opacity',
						}}
					>
						<ReplyAllIcon
							sx={{
								color: 'white',
								fontSize: 80,
								transform: 'rotate(150deg)',
								marginTop: 4,
								marginLeft: 22,
							}}
						/>

						<h2 style={{ marginTop: 30, marginLeft: 70, color: 'white', textAlign: 'left' }}>
							In demo mode we <br /> provide you some <br /> WMS links <br /> to copy and use.
						</h2>
					</div>
				</Fade>
			)}
		</>
	);
}
