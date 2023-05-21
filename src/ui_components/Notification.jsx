import React from 'react';
import { Alert as MuiAlert, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const defaultStyle = {
	position: 'fixed',
	bottom: '10px',
	left: '10px',
	zIndex: 9999,
};

const Notification = ({ severity, message, showSpinner, sx }) => (
	<MuiAlert style={sx} severity={severity}>
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			{message}
			{showSpinner && <CircularProgress size={20} style={{ marginLeft: '15px' }} />}
		</Box>
	</MuiAlert>
);

Notification.defaultProps = {
	severity: 'info',
	showSpinner: false,
	sx: defaultStyle,
};

export default Notification;
