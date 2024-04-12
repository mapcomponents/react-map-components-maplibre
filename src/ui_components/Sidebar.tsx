import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Paper, Drawer, IconButton, PaperProps, DrawerProps, Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { Global } from '@emotion/react';
import { Typography, SwipeableDrawer } from '@mui/material/';

const DrawerHeader = styled('div')(() => ({
	display: 'flex',
	alignItems: 'center',
}));

interface SidebarProps {
	drawerPaperProps?: PaperProps;
	drawerHeaderProps?: Headers;
	children?: React.ReactNode;
	open?: boolean;
	setOpen?: (val: boolean) => void;
	name?: string;
	drawerBleeding?: number;
}

const defaultDrawerBleeding = 56;

const Puller = styled(Box)(({ theme }) => ({
	width: 30,
	height: 6,
	backgroundColor: theme.palette.text.primary,
	borderRadius: 3,
	position: 'absolute',
	top: 8,
	left: 'calc(50% - 15px)',
}));

export default function Sidebar({
	drawerPaperProps,
	drawerHeaderProps,
	setOpen,
	...props
}: SidebarProps & DrawerProps) {
	const mediaIsMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	const [drawerOpen, setDrawerOpen] = useState(false);
	const drawerBleeding = props.drawerBleeding ? props.drawerBleeding : defaultDrawerBleeding;
	return (
		<>
			{!mediaIsMobile ? (
				<Box sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }}>
					<Drawer
						transitionDuration={0}
						variant="persistent"
						anchor="left"
						open={typeof props.open === 'undefined' ? drawerOpen : props.open}
						PaperProps={{
							...drawerPaperProps,
							sx: {
								maxWidth: { lg: '30%', md: '40%', sm: '50%', xs: '78%' },
								padding: { sm: '84px 20px 20px 20px', xs: '74px 10px 10px 10px' },
								width: {
									xs: '80%',
									sm: '60%',
									md: '350px',
									lg: '350px',
								},
								boxSizing: 'border-box',
								...drawerPaperProps?.sx,
							},
						}}
						sx={{
							flexGrow: 1,
							zIndex: 105,
							position: 'absolute',
							bottom: 0,
							display: 'flex',
							flexDirection: 'column',
							maxWidth: { lg: '30%', md: '40%', sm: '50%', xs: '78%' },
							...(drawerOpen ? {} : { left: mediaIsMobile ? '-90vw' : '-20vw' }),
						}}
						{...props}
					>
						<DrawerHeader {...drawerHeaderProps}>
							<Typography variant="h6">{props.name}</Typography>
							<IconButton
								onClick={
									setOpen
										? () => {
												setOpen?.(false);
										  }
										: () => {
												setDrawerOpen(false);
										  }
								}
								sx={{
									position: 'absolute',
									right: '20px',
								}}
							>
								<CloseIcon />
							</IconButton>
						</DrawerHeader>
						<Box>{props.children}</Box>
					</Drawer>
				</Box>
			) : (
				<Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
					<Global
						styles={{
							'.MuiDrawer-root > .MuiPaper-root': {
								height: `calc(50% - ${drawerBleeding}px)`,
								overflow: 'visible',
							},
						}}
					/>
					<SwipeableDrawer
						anchor="bottom"
						open={typeof props.open === 'undefined' ? drawerOpen : props.open}
						onClose={
							setOpen
								? () => {
										setOpen?.(false);
								  }
								: () => {
										setDrawerOpen(false);
								  }
						}
						onOpen={
							setOpen
								? () => {
										setOpen?.(true);
								  }
								: () => {
										setDrawerOpen(true);
								  }
						}
						swipeAreaWidth={drawerBleeding}
						disableSwipeToOpen={false}
						hideBackdrop={true}
						ModalProps={{
							keepMounted: true,
							sx: {
								top: `calc(90%)`,
							},
						}}
					>
						<Paper
							sx={{
								position: 'absolute',
								top: -drawerBleeding,
								borderTopLeftRadius: 8,
								borderTopRightRadius: 8,
								visibility: 'visible',
								right: 0,
								left: 0,
							}}
						>
							<Puller />
							<Typography variant="h6" sx={{ p: '13px' }}>
								{props.name}
							</Typography>
						</Paper>

						<Paper
							sx={{
								px: '15px',
								pb: '15px',
								height: '100%',
								overflow: 'auto',
								paddingTop: '20px',
							}}
						>
							{props.children}
						</Paper>
					</SwipeableDrawer>
				</Box>
			)}
			;
		</>
	);
}
