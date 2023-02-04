import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, AppBarProps, ToolbarProps, SxProps } from '@mui/material';

interface TopToolbarProps extends AppBarProps {
	toolbarProps?: ToolbarProps;
	appBarStyle?: SxProps
}
export default function TopToolbar({ toolbarProps, appBarStyle, ...props }: TopToolbarProps) {
	return (
		<AppBar
			sx={{
				minHeight: '62px',
				position: 'absolute',
				zIndex: 120,
				...appBarStyle,
			}}
			position="static"
			{...props}
		>
			<Toolbar {...toolbarProps}>{props.children}</Toolbar>
		</AppBar>
	);
}
