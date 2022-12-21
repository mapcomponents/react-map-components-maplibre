import React from 'react';
import { Button, Paper, Icon, Typography, Grid } from '@mui/material';
import { color, fontSize } from '@mui/system';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import zIndex from '@mui/material/styles/zIndex';
import MlGPXDemoViewer from './demoViewer';
import Fade from '@mui/material/Fade';

function BubbleForInstruction(props) {
	return (
		<>
			<div
				style={{
					zIndex: 110,
					width: '475px',
					height: '475px',
					position: 'fixed',
					display: 'block',
					borderRadius: '360px',
					backgroundColor: 'steelblue',
					right: props.bubbleRight,
					bottom: props.bubbleBottom,
					left: props.bubbleLeft,
					top: props.bubbleTop
				}}
			>
				<h2
					style={{
						marginTop: props.textMarginTop,
						marginLeft: props.textMarginLeft,
						color: 'white',
						textAlign: 'left',
					}}
				>
					{props.children}
				</h2>
				<ReplyAllIcon
					style={{
						color: 'white',
						fontSize: '80px',
						position: 'absolute',
						transform: props.iconTransform,
						marginTop: props.iconMarginTop,
						marginLeft: props.iconMarginLeft,
					}}
				/>
			</div>
		</>
	);
}
export default BubbleForInstruction;
