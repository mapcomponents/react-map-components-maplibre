import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

export interface TopToolbarProps {
	children?: React.ReactNode;
	unmovableButtons?: React.ReactNode;
	buttons?: React.ReactNode;
	darkLogo?: React.ReactNode;
	ligthLogo?: React.ReactNode;
	mobileLogo?: React.ReactNode;
}

function TopToolbar(props: TopToolbarProps) {
	const theme = useTheme();

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	function WhichLogo(): any {
		if (theme.palette.mode === 'dark') {
			return props.darkLogo ? (
				props.darkLogo
			) : (
				<img
					src={'assets/WG-MapComponents-Logo_rgb-weisse-schrift.svg'}
					style={{ width: '100%', maxWidth: '250px' }}
				/>
			);
		} else {
			return props.ligthLogo ? (
				props.ligthLogo
			) : (
				<img
					src={'assets/WG-MapComponents-Logo_rgb.svg'}
					style={{ width: '100%', maxWidth: '250px' }}
				/>
			);
		}
	}

	return (
		<AppBar
			sx={{
				minHeight: '62px',
				position: 'absolute',
				zIndex: 1300,
			}}
			position="static"
		>
			<Toolbar disableGutters>
				<Box
					sx={{
						marginLeft: '25px',
						display: { xs: 'none', md: 'flex' },
						flexGrow: { md: '30' },
					}}
				>
					<WhichLogo />
				</Box>
				<Box
					component="a"
					href="/"
					sx={{
						marginLeft: '25px',
						display: { xs: 'flex', sm: 'flex', md: 'none' },
						flexGrow: { xs: '500' },
						mr: { sm: '0px' },
					}}
				>
					{props.mobileLogo ? (
						props.mobileLogo
					) : (
						<img src={'assets/mapcomponents_logo.png'} width="50px" height="50px" />
					)}
				</Box>
				<Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>{props.unmovableButtons}</Box>
				{props.buttons ? (
					<Box sx={{ flexGrow: 22, display: { xs: 'flex', sm: 'none' } }}>
						<IconButton onClick={handleOpenNavMenu}>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							PaperProps={{
								elevation: 24,
								sx: {
									overflow: 'visible',
									mt: '15px',
								},
							}}
							sx={{
								display: { xs: 'block', sm: 'none' },
							}}
						>
							<Box sx={{ paddingLeft: '10px', paddingRight: '10px' }}>{props.buttons}</Box>
						</Menu>
					</Box>
				) : (
					''
				)}
				<Box sx={{ marginRight: '25px', display: { xs: 'none', sm: 'flex' } }}>{props.buttons}</Box>
			</Toolbar>
		</AppBar>
	);
}

export default TopToolbar;
