import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
	tooltip: {
		position: 'fixed',
		top: '100px',
		left: '100px',
		zIndex: 100000,
	},
}));

export default function Legend() {
	const classes = useStyles();

	return <div className={classes.tooltip}>tooltip</div>;
}
