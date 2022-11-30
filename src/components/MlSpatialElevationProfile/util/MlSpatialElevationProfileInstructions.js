import React, { useEffect, useState } from 'react';
import { Button, Paper, Icon, Typography, Grid } from '@mui/material';
import { color, fontSize } from '@mui/system';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import zIndex from '@mui/material/styles/zIndex';
import MlGPXDemoViewer from './demoViewer';
import Fade from '@mui/material/Fade';

const divStyle = {
	width: 475,
	height: 475,
	position: 'fixed',
	right: '5px',
	bottom: '25px',
	display: 'block',
	flexDirection: 'column',
	gap: '5px',
	zIndex: 900,
	borderRadius: 360,
	right: -120,
	bottom: -120,
	backgroundColor: 'steelblue',
	alignItems: 'center',
};

export default function MlSpatialElevationProfileInstructions(props) {
	const [step1, setStep1] = useState(false);
	const [step2, setStep2] = useState(false);
	const [step3, setStep3] = useState(false);
	const [step4, setStep4] = useState(false);

	useEffect(() => {
		if (props.open) {
			setStep1(true);

			setTimeout(() => {
				setStep1(false);
				setStep2(true);
			}, 2500);
			setTimeout(() => {
				setStep2(false);
				setStep3(true);
			}, 5000);
			setTimeout(() => {
				setStep3(false);
				setStep4(true);
			}, 7500);
			setTimeout(() => {
				setStep4(false);
				props.callback(false);
			}, 10000);
		} else {
			return;
		}
	}, [props.open]);

	return (
		<>
			{step1 && (
				<Fade in={step1} timeout={150}>
					<div style={divStyle}>
						<h2 style={{ marginTop: 70, marginLeft: 120, color: 'white', textAlign: 'left' }}>
							You can load your <br />
							own GPX file <br /> here
						</h2>
						<ReplyAllIcon
							sx={{
								color: 'white',
								fontSize: 80,
								transform: 'rotate(180deg)',
								marginTop: 5,
								marginLeft: 22,
							}}
						/>
					</div>
				</Fade>
			)}

			{step2 && (
				<Fade in={step2} timeout={150}>
					<div style={divStyle}>
						<Grid>
							<h2 style={{ marginTop: 70, marginLeft: 120, color: 'white', textAlign: 'left' }}>
								You can see more <br /> information about <br />
								the track <br />
								here
							</h2>
						</Grid>

						<Grid>
							<ReplyAllIcon
								sx={{
									color: 'white',
									fontSize: 80,
									transform: 'rotate(180deg)',
									marginTop: 8,
									marginLeft: 22,
								}}
							/>
						</Grid>
					</div>
				</Fade>
			)}

			{step3 && (
				<Fade in={step3} timeout={150}>
					<div style={divStyle}>
						<Grid>
							<h2 style={{ marginTop: 70, marginLeft: 120, color: 'white', textAlign: 'left' }}>
								You can download <br /> a sample track as a <br />
								GPX file <br />
								here
							</h2>
						</Grid>

						<Grid>
							<ReplyAllIcon
								sx={{
									color: 'white',
									fontSize: 80,
									transform: 'rotate(180deg)',
									marginTop: -5,
									marginLeft: 22,
								}}
							/>
						</Grid>
					</div>
				</Fade>
			)}

			{step4 && (
				<Fade in={step4} timeout={1500}>
					<div
						style={{
							width: 450,
							height: 450,
							position: 'fixed',
							left: '5px',
							top: '25px',
							display: 'block',
							flexDirection: 'column',
							gap: '5px',
							//zIndex: 500,
							borderRadius: 360,
							left: -40,
							top: -150,
							backgroundColor: 'steelblue',
							opacity: 1,
							alignItems: 'center',
							transition: 'ease-in',
							transitionProperty: 'opacity',
						}}
					>
						<Grid>
							<h2 style={{ marginTop: 230, marginRight: 190, color: 'white', textAlign: 'right' }}>
								In demo mode we <br /> provide you some <br /> GPX tracks <br /> to load.
							</h2>
						</Grid>
						<Grid>
							<ReplyAllIcon
								sx={{
									color: 'white',
									fontSize: 80,
									position: 'absolute',
									transform: 'rotate(90deg)',
									marginTop: -18,
									marginLeft: 35,
								}}
							/>
						</Grid>
					</div>
				</Fade>
			)}
		</>
	);
}
