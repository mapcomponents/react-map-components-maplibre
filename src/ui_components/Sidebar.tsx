import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, PaperProps, SxProps, DrawerProps} from '@mui/material';
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

export default function Sidebar({ drawerPaperProps, drawerHeaderProps, drawerButtonStyle, ...props }: SidebarProps & DrawerProps) {
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
					padding: '20px',
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
						maxWidth: '20%',
						padding: '40px',
					},
					...drawerPaperProps,
				}}
				sx={{
					flexGrow: 1,
					zIndex: 105,
					position: 'absolute',
					top: 0,
					display: 'flex',
					flexDirection: 'column',
					maxWidth: mediaIsMobile ? '90vw' : '20vw',
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
