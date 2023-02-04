import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, PaperProps, SxProps, DrawerProps } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

const DrawerHeader = styled('div')(() => ({
	display: 'flex',
	alignItems: 'center',
}));

interface SidebarProps {
	drawerPaperProps?: PaperProps;
	drawerHeaderProps?: Headers;
	drawerButtonStyle?: SxProps | undefined;
	children?: React.ReactNode;
}

export default function Sidebar({
	drawerPaperProps,
	drawerHeaderProps,
	drawerButtonStyle,
	...props
}: SidebarProps & DrawerProps) {
	const mediaIsMobile = useMediaQuery('(max-width:900px)');

	const [drawerOpen, setDrawerOpen] = useState(true);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};
	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};

	return (
		<>
			<IconButton
				onClick={handleDrawerOpen}
				sx={{
					zIndex: 101,
					position: 'relative',
					margin: { lg: '20px', md: '20px', sm: '20px', xs: '10px' },
					...drawerButtonStyle,
				}}
			>
				<MenuIcon />
			</IconButton>
			<Drawer
				transitionDuration={0}
				variant="persistent"
				anchor="left"
				open={drawerOpen}
				PaperProps={{
					sx: {
						maxWidth: { lg: '30%', md: '40%', sm: '50%', xs: '78%' },
						padding: { lg: '20px', md: '20px', sm: '20px', xs: '10px' },
					},
					...drawerPaperProps,
				}}
				sx={{
					flexGrow: 1,
					zIndex: 105,
					position: 'absolute',
					top: 0,
					backgroundColor: '#fafafa',
					display: 'flex',
					flexDirection: 'column',
					maxWidth: { lg: '30%', md: '40%', sm: '50%', xs: '78%' },
					...(drawerOpen ? {} : { left: mediaIsMobile ? '-90vw' : '-20vw' }),
				}}
				{...props}
			>
				<DrawerHeader {...drawerHeaderProps}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Box>{props.children}</Box>
			</Drawer>
		</>
	);
}
