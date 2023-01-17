import React from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
});

export default function ThemeWrapper(props: { children: unknown }) {
	return <MUIThemeProvider theme={theme}>{props?.children}</MUIThemeProvider>;
}
