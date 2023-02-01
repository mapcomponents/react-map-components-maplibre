import React, { useMemo } from 'react';

import { MapComponentsProvider } from '../index';
import './style.css';
import MlNavgiationTools from '../components/MlNavigationTools/MlNavigationTools';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import getTheme from '../ui_components/MapcomponentsTheme';

const decorators = [
	(Story, context) => {
		const theme = useMemo(() => getTheme(context?.globals?.theme), [context?.globals?.theme]);

		return (
			<div className="fullscreen_map">
				<MapComponentsProvider>
					<MUIThemeProvider theme={theme}>
						<Story />
					</MUIThemeProvider>
				</MapComponentsProvider>
			</div>
		);
	},
];

export default decorators;
