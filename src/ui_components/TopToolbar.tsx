import * as React from 'react';
import { useState, useMemo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

function TopToolbar(props: any) {
	const theme = useTheme();

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	function WhichLogo() {
		if (theme.palette.mode === 'dark') {
			return (
				<img
					src="../../assets/WG-MapComponents-Logo_rgb-weisse-schrift.svg"
					width="250px"
					style={{ color: 'black' }}
				/>
			);
		} else {
			return (
				<img
					src="../../assets/WG-MapComponents-Logo_rgb.svg"
					width="250px"
					style={{ color: 'white' }}
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
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box
						component="a"
						href="/"
						sx={{
							display: { xs: 'flex', sm: 'none', md: 'flex' },
							flexGrow: { xs: '500', sm: 'none', md: '30' },
							color: 'white',
							textDecoration: 'none',
						}}
					>
						<WhichLogo />
					</Box>

					<Box
						component="a"
						href="/"
						sx={{
							display: { xs: 'none', sm: 'flex', md: 'none' },
							flexGrow: { sm: 30 },
							mr: { sm: '0px' },
						}}
					>
						<img src="static/media/.storybook/mapcomponents_logo.png" width="50px" height="50px" />
					</Box>
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

									'&:before': {
										content: '""',
										display: 'block',
										position: 'absolute',
										top: '0px',
										right: '22px',
										width: '10px',
										height: '10px',
										bgcolor: 'background.paper',
										transform: 'translateY(-50%) rotate(45deg)',
									},
								},
							}}
							sx={{
								display: { xs: 'block', sm: 'none' },
							}}
						>
							{props.pages}
						</Menu>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>{props.pages}</Box>
					{props.buttons}
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default TopToolbar;
