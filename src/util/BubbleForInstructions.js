import React from 'react';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

function BubbleForInstruction(props) {
	return (
		<>
			<div
				style={{
					width: '475px',
					height: '475px',
					position: 'fixed',
					display: 'block',
					borderRadius: '360px',
					backgroundColor: 'steelblue',
					right: props.bubbleRight,
					bottom: props.bubbleBottom,
					left: props.bubbleLeft,
					top: props.bubbleTop,
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
