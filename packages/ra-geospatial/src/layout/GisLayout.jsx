import * as React from 'react';
import { useState } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppBar, Menu, Sidebar, useSidebarState } from 'react-admin';

const Root = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
	zIndex: 1,
	minHeight: '100%',
	position: 'relative',
	backgroundColor: 'transparent',
	pointerEvents: 'none',
}));

const AppFrame = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
}));

const ContentWithSidebar = styled('main')(() => ({
	display: 'flex',
	flexGrow: 1,
	marginTop: '3em',
}));

const Content = styled('div')(() => ({
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
}));

const ContentWrapper = styled(Box)(() => ({
	maxWidth: '600px',
	width: '100%',
	height: '100%',
}));

const GisLayout = ({ children, title }) => {
	const [open] = useSidebarState();
	const [contentOpen, setContentOpen] = useState(true);

	React.useEffect(() => {
		setContentOpen(true);
	}, [children]);
	return (
		<Root>
			<AppFrame>
				<AppBar title={title} open={open} sx={{ pointerEvents: 'all' }} />
				<ContentWithSidebar>
					<Sidebar
						sx={{
							backgroundColor: '#f0f0f0',
							pointerEvents: 'all',
							overflow: 'hidden',
						}}
					>
						<Menu />
					</Sidebar>
					<Content
						sx={{
							...(contentOpen ? {} : { height: '40px', overflow: 'hidden' }),
						}}
					>
						<IconButton
							onClick={() => setContentOpen((val) => !val)}
							sx={{ position: 'absolute', top: 0, zIndex: 100 }}
						>
							{contentOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
						</IconButton>

						<ContentWrapper>{children}</ContentWrapper>
					</Content>
				</ContentWithSidebar>
			</AppFrame>
		</Root>
	);
};

export default GisLayout;
