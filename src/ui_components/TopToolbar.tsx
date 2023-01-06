import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, AppBarProps, ToolbarProps } from '@mui/material';

interface TopToolbarProps extends AppBarProps {
	toolbarProps?: ToolbarProps;
}
export default function TopToolbar({ toolbarProps, ...props }: TopToolbarProps) {
	return (
		<AppBar
			sx={{
				minHeight: '62px',
				backgroundColor: '#f1f1f1',
				position: 'absolute',
				zIndex: 120,
			}}
			color="primary"
			position="static"
			{...props}
		>
			<Toolbar {...toolbarProps}>{props.children}</Toolbar>
		</AppBar>
	);
}
