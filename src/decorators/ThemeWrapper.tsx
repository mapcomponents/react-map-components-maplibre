import React from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {},
		secondary: {},
	},
});

export default function ThemeWrapper(props: { children: unknown }) {
	return <MUIThemeProvider theme={theme}>{props?.children}</MUIThemeProvider>;
}
