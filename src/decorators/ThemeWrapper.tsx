import React from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import theme from '../ui_components/MapcomponentsTheme';

export default function ThemeWrapper(props: { children: unknown }) {
	return <MUIThemeProvider theme={theme}>{props?.children}</MUIThemeProvider>;
}
