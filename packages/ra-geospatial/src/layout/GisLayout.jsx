import * as React from 'react';
import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppBar, Menu, Sidebar, useSidebarState } from 'react-admin';

const GisLayout = ({ children, title }) => {
	const [open] = useSidebarState();
	const [contentOpen, setContentOpen] = useState(true);

	React.useEffect(() => {
		setContentOpen(true);
	}, [children]);
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				zIndex: 1,
				minHeight: '100%',
				position: 'relative',
				backgroundColor: 'transparent',
				pointerEvents: 'none',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<AppBar title={title} open={open} sx={{ pointerEvents: 'all' }} />
				<Box
					sx={{
						display: 'flex',
						flexGrow: 1,
						marginTop: '3em',
					}}
				>
					<Sidebar
						sx={{
							backgroundColor: '#f0f0f0',
							pointerEvents: 'all',
							overflow: 'hidden',
						}}
					>
						<Menu />
					</Sidebar>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							maxHeight: '50vh',
							position: 'fixed',
							bottom: '0',
							width: '100%',
							backgroundColor: '#fafafa',
							overflow: 'auto',
							pointerEvents: 'all',
							boxShadow: '0px 0px 8px rgba(0,0,0,0.2)',
							height: contentOpen ? 'auto' : '40px',
						}}
					>
						<IconButton
							onClick={() => setContentOpen((val) => !val)}
							sx={{ position: 'absolute', top: 0, zIndex: 100 }}
						>
							{contentOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
						</IconButton>

						<Box
							sx={{
								maxWidth: '600px',
								width: '100%',
								height: '100%',
							}}
						>
							{children}
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default GisLayout;
