import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Link } from '@mui/material';

function TopToolbar(props: JSX.Element) {
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
					style={{ width: '100%', maxWidth: '250px' }}
				/>
			);
		} else {
			return (
				<img
					src="../../assets/WG-MapComponents-Logo_rgb.svg"
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
			<Container maxWidth="lg">
				<Toolbar disableGutters>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							flexGrow: { md: '30' },
						}}
					>
						<Link href="/">
							<WhichLogo />
						</Link>
					</Box>
					<Box
						component="a"
						href="/"
						sx={{
							display: { xs: 'flex', sm: 'flex', md: 'none' },
							flexGrow: { xs: '500' },
							mr: { sm: '0px' },
						}}
					>
						<img src="static/media/.storybook/mapcomponents_logo.png" width="50px" height="50px" />
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
					<Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>{props.buttons}</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default TopToolbar;
