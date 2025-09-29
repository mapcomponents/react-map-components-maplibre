import React from 'react';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Box, Typography } from '@mui/material';

function BubbleForInstruction(props) {
	return (
		<>
			<Box
				sx={{
					width: '475px',
					height: '475px',
					position: 'fixed',
					display: 'block',
					borderRadius: '360px',
					bgcolor: 'primary.main',
					right: props.bubbleRight,
					bottom: props.bubbleBottom,
					left: props.bubbleLeft,
					top: props.bubbleTop,
					zIndex: props.zIndex,
				}}
			>
				<Typography
					variant="h5"
					sx={{
						marginTop: props.textMarginTop,
						marginLeft: props.textMarginLeft,
						color: 'text.contrast',
						textAlign: 'left',
					}}
				>
					<b>{props.children}</b>
				</Typography>
				<ReplyAllIcon
					sx={{
						color: 'text.contrast',
						fontSize: '80px',
						position: 'absolute',
						transform: props.iconTransform,
						marginTop: props.iconMarginTop,
						marginLeft: props.iconMarginLeft,
					}}
				/>
			</Box>
		</>
	);
}
export default BubbleForInstruction;
